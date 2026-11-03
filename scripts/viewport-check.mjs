// Loads every built page at real device sizes and reports layout breakage:
// sideways scroll, elements poking past the screen, clipped text, broken images, missing h1 on the first screen.
// usage: node scripts/viewport-check.mjs [baseUrl] [outDir]
import { readdirSync, statSync, mkdirSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { Browser, sleep } from '../../.agents/skills/design-taste-frontend/scripts/lib/cdp.mjs';

const base = process.argv[2] || 'http://localhost:4321';
const out = process.argv[3] || '.taste-skill/viewports';
mkdirSync(out, { recursive: true });

const sizes = [
  { name: 'desktop-1920', w: 1920, h: 1080 },
  { name: 'desktop-1366', w: 1366, h: 768 },
  { name: 'tablet-1024', w: 1024, h: 768 },
  { name: 'tablet-768', w: 768, h: 1024 },
  { name: 'mobile-412', w: 412, h: 915, mobile: true },
  { name: 'mobile-360', w: 360, h: 800, mobile: true },
];
const pages = [];
(function walk(d) {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) { if (f !== '_astro') walk(p); }
    else if (f === 'index.html') pages.push('/' + relative('dist', d).replace(/\\/g, '/'));
  }
})('dist');
pages.sort();
const isProduct = (p) => p.startsWith('/produk/');
const shotPages = new Set(['/', '/shop', '/kontak', '/pesan', '/produk/chicken-bone-broth', '/program/reset-3-hari', '/cara-kerja', '/faq']);

const CHECK = `(() => {
  const W = document.documentElement.clientWidth;
  const res = { sideScroll: document.documentElement.scrollWidth - W, wide: [], clipped: [], broken: [], h1: null, header: null };
  for (const el of document.querySelectorAll('body *')) {
    if (el.closest('dialog:not([open]), [hidden], .shelf-track, [data-shelf], .visually-hidden, .sr-name')) continue;
    const cs = getComputedStyle(el); if (cs.display === 'none' || cs.visibility === 'hidden' || cs.position === 'fixed') continue;
    const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
    let clippedByParent = false;
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) { const o = getComputedStyle(a); if (/(hidden|clip|auto|scroll)/.test(o.overflowX)) { clippedByParent = true; break; } }
    if (!clippedByParent && (r.right > W + 1 || r.left < -1)) res.wide.push(el.tagName.toLowerCase() + '.' + String(el.className.baseVal ?? el.className).split(' ')[0] + ' ' + Math.round(r.left) + '→' + Math.round(r.right));
    const txt = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (txt && el.scrollWidth > el.clientWidth + 2 && /(hidden|clip)/.test(cs.overflowX) && cs.textOverflow !== 'ellipsis') res.clipped.push(el.tagName.toLowerCase() + ' "' + el.textContent.trim().slice(0, 40) + '"');
  }
  // a display word wider than its own column spills into the gutter next to it
  res.spill = [...document.querySelectorAll('h1, h2, h3')].filter((h) => h.offsetParent && !h.closest('.visually-hidden') && !h.matches('.visually-hidden') && h.scrollWidth > h.clientWidth + 2).map((h) => h.textContent.trim().slice(0, 30) + ' +' + (h.scrollWidth - h.clientWidth) + 'px');
  for (const i of document.images) if (i.complete && i.naturalWidth === 0 && i.getAttribute('src')) res.broken.push(i.currentSrc || i.src);
  const h = document.querySelector('h1'); if (h) { const r = h.getBoundingClientRect(); res.h1 = Math.round(r.top + scrollY); }
  const hd = document.querySelector('.site-header'); if (hd) res.header = Math.round(hd.getBoundingClientRect().height);
  res.wide = [...new Set(res.wide)].slice(0, 6); res.clipped = res.clipped.slice(0, 6);
  return res;
})()`;

const browser = await Browser.launch({ width: 1920, height: 1080 });
const report = [];
try {
  for (const s of sizes) {
    const page = await browser.newPage({ width: s.w, height: s.h, dsf: 1, mobile: !!s.mobile });
    for (const p of pages) {
      if (isProduct(p) && !['desktop-1920', 'tablet-768', 'mobile-360'].includes(s.name)) continue;
      await page.goto(base + p, { timeoutMs: 30000, settleMs: 500 });
      // load every lazy picture and reveal every entrance, then measure the finished page
      await page.eval(`(async () => { document.querySelectorAll('img[loading=lazy]').forEach((i) => (i.loading = 'eager')); document.querySelectorAll('[data-rise]').forEach((e) => e.classList.add('in')); await document.fonts.ready; await Promise.all([...document.images].map((i) => i.complete ? 0 : new Promise((r) => { i.onload = i.onerror = r; setTimeout(r, 4000); }))); return 1; })()`);
      await sleep(400);
      const r = await page.eval(CHECK);
      const issues = [];
      if (r.sideScroll > 0) issues.push(`side-scroll ${r.sideScroll}px`);
      if (r.wide.length) issues.push(`past edge: ${r.wide.join('; ')}`);
      if (r.clipped.length) issues.push(`clipped text: ${r.clipped.join('; ')}`);
      if (r.spill.length) issues.push(`heading wider than its box: ${r.spill.join('; ')}`);
      if (r.broken.length) issues.push(`broken img: ${r.broken.length}`);
      if (r.h1 != null && r.h1 > s.h) issues.push(`h1 below first screen (${r.h1}px)`);
      if (r.header && r.header > (s.w > 860 ? 92 : 68)) issues.push(`header ${r.header}px tall (wrapped?)`);
      report.push({ size: s.name, page: p, issues });
      if (shotPages.has(p)) {
        await page.eval('window.scrollTo(0,0)'); await sleep(200);
        await page.screenshot({ path: join(out, `${s.name}${p.replace(/\//g, '_') || '_home'}.jpg`), quality: 70 });
      }
      if (issues.length) console.log(`${s.name.padEnd(13)} ${p.padEnd(34)} ${issues.join(' | ')}`);
    }
    await page.close();
  }
} finally { await browser.close(); }
writeFileSync(join(out, 'report.json'), JSON.stringify(report, null, 1));
const bad = report.filter((x) => x.issues.length).length;
console.log(`\n${report.length} page loads, ${bad} with issues`);
