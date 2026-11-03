// Product page addresses and the shelf each bottle belongs to.
export const productSlug = (name: string) =>
  name.toLowerCase().replace(/['’]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const productUrl = (name: string) => `/produk/${productSlug(name)}`;

export const momentInfo: Record<string, { label: string; when: string; field: string }> = {
  pagi: { label: 'Pagi', when: 'Pagi hari, sebagai botol pembuka atau pengganti sarapan.', field: 'gw' },
  siang: { label: 'Siang', when: 'Siang hari, sebagai makan siang atau saat lapar di jam kerja.', field: 'day' },
  sore: { label: 'Sore', when: 'Sore hari, saat butuh yang hangat dan gurih.', field: 'broth' },
  camilan: { label: 'Camilan', when: 'Di sela hari, saat ingin yang manis.', field: 'shot' },
  malam: { label: 'Malam', when: 'Malam hari, sebagai penutup hari.', field: 'night' },
  'kapan saja': { label: 'Kapan saja', when: 'Kapan saja, saat butuh yang segar.', field: 'tonic' },
};
