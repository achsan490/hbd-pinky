# 🐷 Birthday Surprise Website Romantis (Tema Babi Pink 💕)

Website hadiah ulang tahun interaktif, playful, romantis, dan elegan dengan tema babi pink (*pink pig*), dibuat khusus untuk pacar tercinta. Siap langsung dijalankan secara lokal dan dideploy ke **Vercel** tanpa konfigurasi rumit!

---

## ✨ Fitur & Interaksi Utama

1. **Opening Surprise Card 🎁**: Halaman pembuka manis dengan kartu digital, floating hearts, babi pink lucu, dan tombol *"BUKA SURPRISE 💕"*. Musik romantis otomatis mulai berputar setelah tombol ditekan.
2. **Hero Section 📸**: Ucapan ulang tahun personal dengan polaroid aesthetic (washi tape, sticker babi, efek scale & fade, shadow lembut).
3. **Custom Music Player 🎵**: Pemutar musik bertema babi yang ikut bergoyang saat musik berputar, equalizer animasi, volume slider, dan time progress. Dilengkapi *fallback romantic chime box* otomatis jika file MP3 belum dimasukkan.
4. **Little Memories 🖼️**: Galeri foto scrapbook polaroid interaktif dengan modal fullscreen, caption manis, serta tombol navigasi *next/prev*.
5. **Video Moment 🎬**: Pemutar klip video dengan frame cute, play/pause custom, dan fallback preview jika video belum ada.
6. **A Little Letter For You 💌**: Amplop pink dengan segel wax berbentuk hati. Klik segel untuk membuka lipatan amplop dan membaca surat cinta panjang secara interaktif.
7. **Interactive Pig Companion 🐷**: Karakter babi pink yang melayang di pojok layar, mengikuti kursor/sentuhan layar secara halus, berkedip, wiggling, dan berbicara kutipan manis saat diklik. Terdapat **Secret Easter Egg** saat diklik 5 kali!
8. **Interactive Birthday Cake 🎂**: Kue ulang tahun bertingkat dengan lilin yang menyala. Klik lilin untuk meniupnya hingga padam, layar meredup romantis, confetti berhamburan, dan muncul doa tulus + tombol *"One More Hug 🫂"*.
9. **Mini Game - Catch the Hearts 💕**: Permainan menangkap 10 hati cinta yang melayang untuk membuka *"LOVE LEVEL: MAXIMUM 🐷💗"*.
10. **Our Little Story (Timeline) 📖**: Timeline kenangan perjalanan cinta bergaya scrapbook diary (*First Meet, First Chat, First Date, Favorite Memory, Today*).
11. **Final Surprise 👀**: Pertanyaan penutup romantis *"Forever?"* dengan pilihan *"YES 💗"* & *"OF COURSE 🥺"* menuju pesta selebrasi confetti puncak.
12. **Floating Navigation Bar 🧭**: Navigasi pil mengambang di atas dengan indikator progress scrolling perjalanan kejutan.

---

## 🚀 Cara Menjalankan Secara Lokal

1. Buka terminal di folder project ini:
   ```bash
   npm install
   npm run dev
   ```
2. Buka browser di [http://localhost:3000](http://localhost:3000)

---

## 📝 Cara Mengganti Teks, Nama, & Konten (Hanya 1 File!)

Semua nama pacar, tanggal, ucapan, isi surat, teks timeline, dan quotes dapat diedit langsung di:

📂 [`src/config/birthdayData.ts`](file:///d:/project/web-ulangtahun/src/config/birthdayData.ts)

Contoh yang bisa kamu ubah:
* `recipientName`: Nama panggilan pacar kamu (misal: "Clarissa", "Sayang")
* `nickname`: Panggilan gemas (misal: "Bubu 🐷💕")
* `letter`: Seluruh isi paragraf surat cinta romantis
* `timeline`: Tanggal dan cerita momen pertama kalian
* `pigQuotes`: Kata-kata lucu dari babi pink saat diklik

---

## 📁 Cara Mengganti Foto, Video, & Musik

Cukup timpa file di dalam folder `/public` dengan nama file yang sama:

| Asset | Lokasi File | Keterangan |
| :--- | :--- | :--- |
| **Foto Hero & Galeri** | `/public/images/photo-1.jpg`<br>`/public/images/photo-2.jpg`<br>`/public/images/photo-3.jpg`<br>`/public/images/photo-4.jpg`<br>`/public/images/photo-5.jpg` | Foto pacar / foto kalian berdua |
| **Musik Latar** | `/public/music/birthday.mp3` | Lagu favorit kalian (format `.mp3`) |
| **Video Momen** | `/public/videos/moment.mp4` | Video kenangan manis (format `.mp4`) |
| **Karakter Babi** | `/public/pig/pig.png` | Gambar/avatar babi pink lucu |

> **Catatan:** Project sudah dilengkapi dengan ilustrasi placeholder dan synthesizer nada musik otomatis, sehingga website sudah langsung tampil cantik dan mengeluarkan suara merdu meskipun kamu belum memasukkan file asli!

---

## 🌐 Cara Deploy ke Vercel (Gratis & Mudah)

1. Upload folder project ini ke akun GitHub kamu:
   ```bash
   git init
   git add .
   git commit -m "feat: romantic birthday surprise website"
   git branch -M main
   git remote add origin https://github.com/USERNAME/web-ulangtahun.git
   git push -u origin main
   ```
2. Buka [vercel.com](https://vercel.com) dan login dengan akun GitHub kamu.
3. Klik **"Add New Project"** lalu pilih repository `web-ulangtahun`.
4. Klik tombol **"Deploy"** (tanpa perlu ubah setting apa pun).
5. Dalam 1-2 menit, website kamu sudah aktif secara online dengan link Vercel yang bisa langsung kamu kirim ke pacar kamu! 💕
