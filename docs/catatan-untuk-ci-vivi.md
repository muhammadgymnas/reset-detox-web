# Catatan untuk Ci Vivi: apa yang masuk ke website, apa yang belum, dan kenapa

Dua file Ci Vivi dipakai sebagai bahan, bukan ditempel utuh. Setiap kalimat ditimbang dengan satu pertanyaan: **bisakah dibuktikan kalau ada yang bertanya?** Yang lolos masuk. Yang belum lolos tidak dibuang, hanya ditunda sampai ada buktinya (kolom "Yang dibutuhkan").

## 1. Warna

Dipakai: hitam, putih, abu, ivory, dan krem sebagai batas terhangat. Tidak ada hijau, oranye, kuning, atau ungu sebagai warna dasar.
Satu pengecualian kecil: titik di ujung judul ("Ini reset.") dan angka di ikon keranjang tetap berwarna koral, karena itu penanda brand. Kalau Ci Vivi ingin benar-benar tanpa warna, ganti satu nilai `--dot` di `src/styles/global.css`.

## 2. Bagian "bahas program" (halaman Reset 5 Hari)

Dari file *Buat Badan yang Capek Gonta-Ganti Cara*:

| Bagian di file | Nasibnya di website |
|---|---|
| Pembuka "sudah rutin olahraga, timbangan tetap" | Dipakai sebagai judul, hampir apa adanya |
| 4 perubahan tubuh | Dipakai 3, ditulis ulang (lihat bawah) |
| "Selama 5 hari kamu pause dari pola..." | Dipakai, tanpa frasa "bikin tubuh makin berat" |
| Formula diracik dari bahan yang dikonsumsi founder dan keluarga | Dipakai (klaim dari klien, mohon konfirmasi) |
| "Kenapa 5 hari": hari 1–2, 3, 4–5 | Dipakai, kalimat hati-hatinya (biasanya, dapat) dipertahankan |
| "Hasil yang ingin kamu lihat" | Dipakai, dibingkai sebagai "perubahan yang paling sering dicari peserta" |
| Cara memulai (4 langkah) | Sudah ada di halaman Cara kerja; ditambah "panduan kembali makan" di langkah terakhir |
| Isi box pagi sampai malam | Sudah ada ("Di dalam box" dan "Satu harimu"), tidak diduplikasi |
| Bukan juice cleanse / bukan diet fiber | Dijadikan satu pertanyaan di FAQ, bukan daftar "bukan X, bukan Y" |
| Ajakan "konsultasi awal gratis, tanpa kewajiban membeli" | Dipakai di akhir halaman (mohon konfirmasi benar) |
| Empat testimoni dan tiga screenshot WhatsApp | **Tidak dipakai.** File sendiri menandainya sebagai template |

**Soal "metabolisme melambat".** Studi di jurnal *Science* (Pontzer dkk., 2021, 6.421 orang) menemukan pengeluaran energi harian, setelah disesuaikan dengan massa bebas lemak, relatif stabil dari usia 20 sampai 60. Jadi kalimat itu tidak dipakai. Gantinya yang lebih kuat buktinya:
- Massa otot turun sekitar 3–8% tiap dekade setelah usia 30 (tinjauan di NIH/PubMed Central).
- Setelah menopause, komposisi tubuh bergeser ke lebih sedikit otot dan lebih banyak lemak di perut (studi 2026, PubMed 41598677).

Kedua sumber ditautkan di halaman supaya pembaca bisa memeriksa sendiri.

## 3. Wording "reset" dari file v8

**Dipakai:**
- Penjelasan Reset 1 Hari: "satu hari untuk tahu apakah tubuhmu cocok menjalaninya, bukan untuk menurunkan berat badan, tanpa janji hasil tertentu." Ini menggantikan kalimat lama "Biasanya jawabannya iya", yang tidak bisa dibuktikan.
- Pertanyaan FAQ "Apa bedanya 1 Day dan 5 Day".
- Pertanyaan FAQ "Apakah hasilnya bertahan setelah selesai", tanpa kalimat "metabolisme bekerja lebih efisien".

**Belum dipakai, dan yang dibutuhkan agar bisa:**

| Klaim di v8 | Masalahnya | Yang dibutuhkan |
|---|---|---|
| "Tingkat keberhasilan >98%" | "Berhasil" belum didefinisikan | Definisi berhasil, jumlah peserta yang diukur, periode, dan cara mengukurnya |
| "Rata-rata turun 2–5 kg" | Belum ada sumber data | Data agregat peserta, bukan beberapa cerita |
| "Dari ketergantungan gula ke pembakaran lemak", "metabolisme di-reset", "sistem dibersihkan" | Klaim fisiologis yang belum didukung bukti untuk program 5 hari | Tinjauan ahli gizi atau dokter, plus studi atau data internal |
| "Dipercaya dokter, bidan, nutritionist, dan public figure, tanpa endorsement berbayar" | Tidak ada nama dan bukti | Nama, izin tertulis, dan bukti tidak berbayar |
| Testimoni bernama dengan angka (Flora Suwardi, Vithree Soon, Lala, Franda, Samuel Zylgwyn, KokoVegetarian, Ms.V3) | Angka berat dan lemak adalah data pribadi dan klaim hasil | Izin tertulis tiap orang, sumber aslinya (postingan atau chat), angka dari mereka sendiri |
| Testimoni "cancer survivor" | Terbaca seolah program membantu penyintas kanker | Sebaiknya tidak dipakai sama sekali |
| "Batch terbatas, 30 peserta per batch" | Website memakai pilih tanggal mulai sendiri, jadi kuota ini tidak ada di sistem | Kalau memang ada kuota, perlu sistem kuota nyata. Kalau tidak, jangan ditayangkan |
| "Alumni 1 Day dapat penawaran upgrade ke 5 Day" | Belum ada di sistem pemesanan | Aturan penawarannya |
| "5.000+ peserta" (v8) dan "7.000+ peserta" (file program) | Dua angka berbeda untuk hal yang sama | Satu angka resmi dengan tanggal datanya |
| "Less cravings · More control · Better habits" | Klaim hasil dalam bentuk tagline | Bisa dipakai kalau klaim craving sudah didukung data |

**Catatan regulasi.** Peraturan BPOM No. 1 Tahun 2022 mengatur klaim pada label dan iklan pangan olahan: klaim harus berbasis bukti ilmiah, dan iklan harus sesuai label yang disetujui. Klaim seperti "turunkan berat badan" dan "lingkar perut berkurang" sebaiknya ditinjau oleh konsultan regulasi sebelum tayang. Saya bukan penasihat hukum; ini pengingat untuk dicek, bukan kesimpulan.

**Dua perbedaan penamaan:** file Ci Vivi menulis "Full Meal Day/Night", sedangkan label botol dan katalog memakai "Body Reset Meal Day/Night". Website mengikuti label. Mohon konfirmasi nama mana yang resmi.

## 4. Kesiapan tayang (dari panduan launch)

Sudah ada di website:
- Mesin pencari **tidak diizinkan** mengindeks sampai hari peluncuran (`noindex` dan `robots.txt` tertutup). Ini disengaja, supaya salinan uji dengan testimoni yang belum berizin tidak muncul di Google.
- Saat tayang: set variabel `PUBLIC_INDEXING=true` di pengaturan build hosting, lalu deploy ulang. Ini langkah yang paling sering terlupa.
- Sitemap, halaman 404, gambar pratinjau saat link dibagikan, dan canonical sudah ada.

Belum ada, perlu diputuskan:
- **Pengukuran.** Belum ada analitik. Minimal ukur klik "Beli sekarang" dan "Tanya admin di WhatsApp", supaya hasil situs bisa dibandingkan, bukan ditebak.
- **Tes di HP asli** oleh Ci Vivi dan tim (iPhone dan Android), termasuk membuka link dari dalam Instagram.
- **Bukti izin testimoni:** izin semua cerita dan video sudah dikonfirmasi pemilik proyek lewat chat (November 2026), dan label "Draf" sudah dihapus. Simpan bukti tertulisnya.
- **Siapa yang membalas WhatsApp** pesanan, dan di jam berapa.

Urutan peluncuran yang disarankan, dari kecil ke besar: (1) Ci Vivi dan tim mencoba pesan sampai pesan WhatsApp terbentuk; (2) kirim ke daftar alumni lewat WhatsApp, saluran yang dimiliki sendiri; (3) baru buka ke publik dan ke sosial media.

## 5. Bahan konten sosial dari materi ini

Hanya memakai kalimat yang sudah lolos di atas. Tanpa janji hasil, tanpa angka yang belum terbukti.

**Carousel Instagram (6 slide): "Sudah olahraga dan jaga makan, tapi timbangan tetap?"**
1. Judul: kalimat pembuka di atas.
2. "Seiring usia, tubuh berubah. Cara yang dulu berhasil bisa berhenti bekerja."
3. Otot: turun sekitar 3–8% tiap dekade setelah usia 30.
4. Perut: lemak cenderung menumpuk di area perut, terutama setelah menopause.
5. Kebiasaan: makanan manis dan olahan ada di mana-mana, makin sering dimakan makin sulit dilepas.
6. "Usahamu tidak salah. Mau tahu cocok atau tidak? Cek kecocokan, 60 detik. Link di bio."
Caption: dua kalimat, satu pertanyaan sungguhan di akhir (misalnya "Bagian mana yang paling terasa buatmu?"). Sertakan sumber di komentar pertama.

**Reel 20 detik: "Satu hari rendah gula, cukup kuat nggak?"**
- 0–3 detik: teks di layar "Satu hari rendah gula dan karbo." Suara: pertanyaannya langsung.
- 3–15 detik: tunjukkan botol sesuai jam (07.00, 09.30, 12.00, 15.30, 18.30). Hanya produk dan jam, tanpa klaim.
- 15–20 detik: "Reset 1 Hari. Untuk tahu tubuhmu cocok atau tidak. Bukan untuk menurunkan berat badan."
Subtitle wajib, karena sebagian besar penonton tanpa suara.

**Pesan WhatsApp ke alumni (saluran sendiri):**
> Halo [Nama]. Reset Detox sekarang punya website baru: semua produk dengan harga, keranjang, dan pesan langsung terkirim ke WhatsApp admin. Kalau mau coba lagi mulai dari satu hari saja, ada di sini: [link]. Kalau ada yang kurang pas, balas pesan ini ya.

Aturan untuk semua postingan: tidak memakai testimoni, nama, atau foto siapa pun tanpa izin tertulis, dan tidak menyebut hasil berat badan.

## 6. Brief "Landing Page" (12 November)

Keputusan yang sudah diambil: checkout tetap lewat WhatsApp (bayar langsung dan marketplace-only ditunda), jumlah peserta ditulis **7.000+**, tautan Tokopedia, Shopee, dan Instagram sudah dipakai.

**Sudah dikerjakan**
- Menu: **Tentang** (halaman baru) dan tombol **Konsultasi** (WhatsApp) di header. "Cerita" dipindah ke footer dengan nama **Testimoni** supaya tidak bentrok dengan "Cerita Kami" di brief.
- Hero lebih ringkas, dengan "Not a diet. It's a reset." sebagai kalimat pendamping.
- **Kenapa kami berbeda?** di Home dan halaman Tentang: bukan juice cleanse biasa, bukan fiber cleanse atau pencahar, lebih dari sekumpulan botol. Baris ketiga dari brief ("bukan pembatasan kalori ekstrem") belum dipakai, lihat bagian "ditunda".
- Halaman **Tentang**: keyakinan, janji, tiga pilar (Accessible, Enjoyable, Nourishing), angka sejak 2018 dan 7.000+.
- **Area pengantaran** di halaman Cara kerja. Ditulis dari zona yang sudah ada di situs; daftar kecamatan belum ada.
- **Juga ada di sini**: Tokopedia, Shopee, Instagram (Home dan footer).
- **Kolaborasi brand** sebagai jalur ketiga di halaman Kontak, tanpa syarat komersial.
- **Mini quiz** diperluas: 7 pertanyaan skrining + 4 pertanyaan kebutuhan (mulai dari mana, pengalaman, rencana mulai, yang dicari). Ringkasannya ikut ke pesan WhatsApp, tetapi hanya kalau orangnya sendiri menekan tombol.

**Ditunda, nanti direview bersama**
- Total kalori per program: dari jadwal contoh, hari 1–3 formula perempuan sekitar 768 kkal, jadi bertabrakan dengan klaim "bukan pembatasan kalori ekstrem". Butuh angka resmi dan tinjauan ahli gizi.
- Estimasi penurunan berat badan per program.
- Filter "benefits" di katalog.
- Klaim "dairy-free", "natural", dan "high protein" untuk seluruh merek.
- Ikon "Why Reset works" dari versi 1.

**Butuh dari Ci Vivi**
- Daftar kecamatan yang dilayani per kota (apa yang dimaksud "sebagian").
- Tautan postingan Instagram atau YouTube asli untuk tiap video testimoni, supaya video yang kita simpan sendiri bisa diganti embed.
- Teks cerita pendiri ("Lahir karena mimpi, besar karena tetangga") untuk halaman Tentang.
- Syarat kemitraan (minimum order, harga, komisi) untuk jalur B2B dan kreator.
- Foto orang memegang produk. Saat ini hanya ada satu foto.
- Kata "aman" (safer) di janji merek: pastikan sejalan dengan tinjauan ahli gizi.
- Halaman Privasi masih berbunyi "Draf untuk ditinjau legal sebelum tayang". Perlu ditinjau lalu teks drafnya dihapus sebelum peluncuran.
