// Cart store: localStorage, 7-day life. One start date per order (see WRD "Aturan keranjang").
export type Line = {
  id: string;            // sku + options hash
  sku: string;
  name: string;
  meta?: string;         // formula, flavours, variant, pack contents
  price: number;
  qty: number;
  img?: string;
  kind: 'program' | 'support';
};
export type Cart = { lines: Line[]; startDate?: string; updated: number };

const KEY = 'rd_cart_v1';
const LIFE = 7 * 24 * 3600 * 1000;

export const rupiah = (n: number) => 'Rp' + n.toLocaleString('id-ID');

export function load(): Cart {
  try {
    const c = JSON.parse(localStorage.getItem(KEY) || 'null') as Cart | null;
    if (c && Date.now() - c.updated < LIFE) return c;
  } catch {}
  return { lines: [], updated: Date.now() };
}

function save(c: Cart) {
  c.updated = Date.now();
  try { localStorage.setItem(KEY, JSON.stringify(c)); } catch {}
  document.dispatchEvent(new CustomEvent('cart:change', { detail: c }));
}

export function add(line: Omit<Line, 'qty'> & { qty?: number }, startDate?: string, opts: { silent?: boolean } = {}) {
  const c = load();
  if (line.kind === 'program' && startDate && c.startDate && c.startDate !== startDate && c.lines.some(l => l.kind === 'program')) {
    return { ok: false as const, reason: 'date' as const, current: c.startDate };
  }
  const found = c.lines.find(l => l.id === line.id);
  if (found) found.qty = Math.min(found.qty + (line.qty ?? 1), 12);
  else c.lines.push({ ...line, qty: line.qty ?? 1 });
  if (startDate) c.startDate = startDate;
  save(c);
  if (!opts.silent) document.dispatchEvent(new CustomEvent('cart:added', { detail: { name: line.name, img: line.img, meta: line.meta, qty: line.qty ?? 1, price: line.price, count: count(c) } }));
  return { ok: true as const };
}

export function setQty(id: string, qty: number) {
  const c = load();
  const l = c.lines.find(x => x.id === id);
  if (!l) return;
  if (qty <= 0) c.lines = c.lines.filter(x => x.id !== id);
  else l.qty = Math.min(qty, 12);
  if (!c.lines.some(x => x.kind === 'program')) delete c.startDate;
  save(c);
}

export function setDate(d: string) { const c = load(); c.startDate = d; save(c); }
export function clear() { save({ lines: [], updated: Date.now() }); }
export const count = (c: Cart) => c.lines.reduce((s, l) => s + l.qty, 0);
export const subtotal = (c: Cart) => c.lines.reduce((s, l) => s + l.qty * l.price, 0);
export const hasProgram = (c: Cart) => c.lines.some(l => l.kind === 'program');

// ---- dates -----------------------------------------------------------
export type Cutoff = { daysBefore: number; hour: number; startWeekdays: number[]; blackout: string[] };
const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
export const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const fromIso = (s: string) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const longDate = (s: string) => { const d = fromIso(s); return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`; };
export const shortDate = (s: string) => { const d = fromIso(s); return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`; };
export const addDays = (s: string, n: number) => { const d = fromIso(s); d.setDate(d.getDate() + n); return iso(d); };

/** Earliest start date: delivery is H-1, ordering closes `daysBefore` days before start at `hour`. */
export function earliestStart(cut: Cutoff, now = new Date()) {
  const d = new Date(now);
  let lead = cut.daysBefore;
  if (now.getHours() >= cut.hour) lead += 1;
  d.setDate(d.getDate() + lead);
  for (let i = 0; i < 60; i++) {
    const s = iso(d);
    if (cut.startWeekdays.includes(d.getDay()) && !cut.blackout.includes(s)) return s;
    d.setDate(d.getDate() + 1);
  }
  return iso(d);
}
export function isValidStart(s: string, cut: Cutoff, now = new Date()) {
  const d = fromIso(s);
  return s >= earliestStart(cut, now) && cut.startWeekdays.includes(d.getDay()) && !cut.blackout.includes(s);
}
export function deliveries(start: string, days: number) {
  const out = [addDays(start, -1)];
  if (days >= 5) out.push(addDays(start, 2));
  return out;
}
export function cutoffSentence(cut: Cutoff, now = new Date()) {
  const start = earliestStart(cut, now);
  const close = addDays(start, -cut.daysBefore);
  return `Pesan sebelum ${shortDate(close)} pukul ${String(cut.hour).padStart(2, '0')}.00 untuk mulai ${shortDate(start)}.`;
}

// ---- WhatsApp ---------------------------------------------------------
export type Order = {
  name: string; phone: string; zone: string; district: string; address?: string;
  gift?: { to: string; phone: string; card?: string }; source: string; ref?: string;
  member?: string; fit: 'sudah lolos' | 'perlu konsultasi' | 'belum, mohon ditanyakan';
};
export function orderNumber(start?: string) {
  const d = start ? fromIso(start) : new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  return `RD-${ymd}-${String(Math.floor(1000 + Math.random() * 9000))}`;
}
export function message(c: Cart, o: Order, no: string, programDays: number) {
  const L: string[] = ['Halo Reset Detox, saya mau pesan.', '', `No. order: ${no}`];
  if (c.startDate) {
    L.push(`${hasProgram(c) ? 'Mulai program' : 'Tanggal kirim'}: ${longDate(c.startDate)}`);
    if (hasProgram(c)) {
      const dv = deliveries(c.startDate, programDays);
      L.push(dv.length > 1 ? `Kirim 1: ${shortDate(dv[0])} | Kirim 2: ${shortDate(dv[1])}` : `Kirim: ${shortDate(dv[0])}`);
    }
  }
  L.push('');
  for (const l of c.lines) {
    L.push(`${l.qty}x ${l.name} - ${rupiah(l.qty * l.price)}`);
    if (l.meta) L.push(`   ${l.meta}`);
  }
  L.push('', `Subtotal: ${rupiah(subtotal(c))}`, 'Ongkir: menunggu konfirmasi admin', '');
  L.push(`Nama: ${o.name}`, `Area: ${o.zone}${o.district ? ', ' + o.district : ''}`, `Alamat: ${o.address?.trim() ? o.address.trim() : 'saya kirim di chat'}`);
  L.push(`Hadiah: ${o.gift ? `ya, untuk ${o.gift.to} (${o.gift.phone})${o.gift.card ? ' — kartu: ' + o.gift.card : ''}` : 'tidak'}`);
  L.push(`Sumber: ${o.source}${o.ref ? ` (ref ${o.ref})` : ''}`);
  if (o.member) L.push(`Kode member: ${o.member}`);
  if (hasProgram(c)) L.push(`Cek kecocokan: ${o.fit}`);
  return L.join('\n');
}
export const waLink = (num: string, text: string) => `https://wa.me/${num}?text=${encodeURIComponent(text)}`;

// referral / UTM → short ref code, kept for the session
export function captureRef() {
  try {
    const p = new URLSearchParams(location.search);
    const parts = [p.get('utm_source'), p.get('utm_medium'), p.get('utm_campaign')].filter(Boolean);
    const ref = p.get('ref') || (parts.length ? parts.join('-') : '');
    if (ref) sessionStorage.setItem('rd_ref', ref.slice(0, 40));
    return sessionStorage.getItem('rd_ref') || '';
  } catch { return ''; }
}
