export interface MemoryPhoto {
  id: number;
  src: string;
  title: string;
  date: string;
  caption: string;
  rotation?: string;
  tag?: string;
}

export interface TimelineItem {
  id: number;
  phase: string;
  title: string;
  date: string;
  description: string;
  emoji: string;
  badge: string;
}

export const birthdayData = {
  // Nama pacar dan tanggal ulang tahun
  recipientName: "Anggi Octoria Nainggolan",
  nickname: "Anggi 🐷💕",
  birthDate: "04 Oktober 2026",

  // Teks pembuka
  opening: {
    title: "Happy Birthday, Ayangg! 🐷💗",
    subtitle: "ada sesuatu yang aku siapin spesial buat kamu di 04 Oktober ini...",
    buttonText: "BUKA SURPRISE 💕",
  },

  // Hero Section
  hero: {
    greeting: "Happy Birthday,",
    subtext: "Selamat ulang tahun untuk perempuan paling spesial buat aku.",
    photo: "/images/photo-8.jpg",
    photoCaption: "The prettiest smile in the universe ✨",
    badge: "04 Oktober 2026 🎂",
  },

  // Musik latar belakang (Lagu Batak dari Jun Munthe - Pulut Roham)
  music: {
    title: "Pulut Roham",
    artist: "Jun Munthe 🎵",
    src: "/music/birthday.mp3",
  },

  // Foto Kenangan (Semua foto asli dari C:\Users\ASUS\Downloads\image)
  memories: [
    {
      id: 1,
      src: "/images/photo-1.jpg",
      title: "Senyuman Paling Manis 🌸",
      date: "Spesial",
      caption: "Senyuman kamu yang selalu bisa bikin hari paling lelah sekalipun jadi terasa damai.",
      rotation: "-rotate-2",
      tag: "Favorite",
    },
    {
      id: 2,
      src: "/images/photo-2.jpg",
      title: "Momen Bersamamu 💕",
      date: "Kenangan Manis",
      caption: "Waktu seakan berhenti setiap kali lagi bareng kamu. Ketawa bareng dan ngebahas hal-hal kecil tapi bermakna.",
      rotation: "rotate-2",
      tag: "Sweet Date",
    },
    {
      id: 3,
      src: "/images/photo-3.jpg",
      title: "Tingkah Gemasmu 🐷",
      date: "Setiap Hari",
      caption: "Ekspresi lucu dan manjanya kamu yang selalu bikin aku gemas dan jatuh cinta setiap hari.",
      rotation: "-rotate-1",
      tag: "Cute Mood",
    },
    {
      id: 4,
      src: "/images/photo-4.jpg",
      title: "Hari Penuh Tawa 🎈",
      date: "Bahagia Selalu",
      caption: "Semoga tawa riang kamu ini bertahan selamanya, karena itu kebahagiaan terbesar buat aku.",
      rotation: "rotate-3",
      tag: "Joyful",
    },
    {
      id: 5,
      src: "/images/photo-5.jpg",
      title: "Hangatnya Cerita Kita 🍓",
      date: "Bersama Kamu",
      caption: "Terima kasih sudah selalu ada, mendengarkan, dan menjadi tempat ternyaman untuk pulang.",
      rotation: "-rotate-3",
      tag: "Warmth",
    },
    {
      id: 6,
      src: "/images/photo-6.jpg",
      title: "Tatapan Paling Tulus ✨",
      date: "Istimewa",
      caption: "Mata yang selalu memancarkan kehangatan dan ketulusan terdalam.",
      rotation: "rotate-1",
      tag: "Special",
    },
    {
      id: 7,
      src: "/images/photo-7.jpg",
      title: "Bidadari Cantikku 👸",
      date: "Cantik Selalu",
      caption: "Di mataku, kamu selalu jadi perempuan paling menawan di seluruh semesta.",
      rotation: "-rotate-2",
      tag: "Gorgeous",
    },
    {
      id: 8,
      src: "/images/photo-8.jpg",
      title: "Bahagia Sederhana 🌷",
      date: "Momen Indah",
      caption: "Nggak butuh hal mewah, yang penting ada kamu di sampingku selalu.",
      rotation: "rotate-2",
      tag: "Peaceful",
    },
    {
      id: 9,
      src: "/images/photo-9.jpg",
      title: "Kesayangan Aku 💖",
      date: "Forever & Always",
      caption: "Setiap potret ini merekam betapa beruntungnya aku punya kamu dalam hidupku.",
      rotation: "-rotate-1",
      tag: "Forever",
    },
    {
      id: 10,
      src: "/images/photo-10.jpg",
      title: "Gemas & Manja 🥰",
      date: "My Princess",
      caption: "Tingkah manjanya yang nggak ada duanya, bikin hati meleleh setiap saat.",
      rotation: "rotate-3",
      tag: "Lovely",
    },
    {
      id: 11,
      src: "/images/photo-11.jpg",
      title: "Kenangan Terindah 💫",
      date: "Cerita Kita",
      caption: "Langkah-langkah kecil yang kita lewati berdua menuju masa depan.",
      rotation: "-rotate-2",
      tag: "Memories",
    },
    {
      id: 12,
      src: "/images/photo-12.jpg",
      title: "Our Special Story 🌸",
      date: "Selamanya",
      caption: "Semoga kisah kita selalu dipenuhi cinta, tawa, dan pelukan hangat.",
      rotation: "rotate-2",
      tag: "Everlasting",
    },
  ] as MemoryPhoto[],

  // Video Section (Video asli dari C:\Users\ASUS\Downloads\image)
  video: {
    title: "Some Moments I Want You To Remember 💕",
    subtitle: "Kompilasi momen-momen kecil yang bikin aku makin sayang sama kamu.",
    src: "/videos/moment.mp4",
    poster: "/images/photo-1.jpg",
    caption: "Setiap detik yang kita lewati bareng selalu jadi momen terbaik dalam hidup aku. 🐷✨",
  },

  // Surat Cinta Digital
  letter: {
    title: "A Little Letter For You 💌",
    salutation: "Untuk kamu yang hari ini bertambah satu tahun lebih dewasa...",
    paragraphs: [
      "Aku mungkin nggak selalu bisa memberikan hal yang sempurna, tapi aku selalu berharap bisa menjadi salah satu alasan kamu tersenyum.",
      "Semoga di umur kamu yang baru ini, banyak hal baik datang ke hidup kamu.",
      "Semoga semua yang kamu impikan perlahan menjadi kenyataan.",
      "Dan semoga aku masih bisa berada di samping kamu, menemani banyak cerita berikutnya.",
      "Happy Birthday, Sayang. ❤️",
    ],
    closing: "Dengan segenap cinta,\nSi Babi Pink Kamu 🐷💕",
  },

  // Interactive Pig quotes
  pigQuotes: [
    "hehe kamu klik aku 😳",
    "sayang banget ya sama dia 🐷💕",
    "jangan lupa senyum hari ini!",
    "happy birthday, my favorite human! 🎂",
    "peluk dulu sini 🤗",
    "kamu cantik banget hari ini ✨",
    "oink oink! semoga harimu menyenangkan 🐽",
    "jangan begadang terus ya sayang! 🌙",
    "aku babi pink pembawa berkah & cinta 🐷💖",
  ],
  pigEasterEggThreshold: 5,
  pigEasterEggText: "SECRET UNLOCKED 🐷💗 Kamu dapat 1000x pelukan & ciuman tanpa batas!",

  // Birthday Cake
  cake: {
    title: "Make a Wish ✨",
    subtitle: "Pikirkan satu permohonan tulus dari hatimu, lalu klik lilinnya...",
    wishSuccessMessage: "Semoga semua wish kamu tahun ini terkabul. 💗",
    hugButtonText: "One More Hug 🫂",
    hugCelebrationText: "KIRIM PELUKAN HANGAT PALING ERAT BUAT KAMU! 🤗💕",
  },

  // Mini Game: Catch the Hearts
  miniGame: {
    title: "Catch the Hearts 💕",
    subtitle: "Tangkap 10 hati cinta yang melayang untuk membuka cinta level tertinggi!",
    target: 10,
    winTitle: "LOVE LEVEL: MAXIMUM 🐷💗",
    winSubtitle: "Selamat! Cintaku ke kamu sudah resmi melampaui batas semesta!",
  },

  // Timeline Hubungan
  timeline: [
    {
      id: 1,
      phase: "01",
      title: "First Meet 🌸",
      date: "Awal Cerita Kita",
      description: "Pertama kali mata kita saling bertatapan. Saat itu aku belum tahu kalau kamu bakal jadi orang paling penting dalam hidupku.",
      emoji: "👀",
      badge: "Pertemuan Pertama",
    },
    {
      id: 2,
      phase: "02",
      title: "First Chat 💬",
      date: "Malam-Malam Seru",
      description: "Obrolan pertama yang canggung tapi bikin senyum-senyum sendiri sampai larut malam.",
      emoji: "📱",
      badge: "Mulai Dekat",
    },
    {
      id: 3,
      phase: "03",
      title: "First Date 🌸",
      date: "Detak Jantung Berdebar",
      description: "Kencan pertama kita yang penuh deg-degan tapi manis banget, ditemani tawa malu-malu.",
      emoji: "🍦",
      badge: "Kencan Pertama",
    },
    {
      id: 4,
      phase: "04",
      title: "Favorite Memory 🌟",
      date: "Momen Tak Terlupakan",
      description: "Saat kita jalan berdua di bawah langit malam, berbagi cerita rahasia dan impian masa depan.",
      emoji: "✨",
      badge: "Momen Terindah",
    },
    {
      id: 5,
      phase: "05",
      title: "Today & Beyond 🐷💕",
      date: "04 Oktober 2026",
      description: "Hari ini adalah perayaan ulang tahunmu yang ke-22, dan awal dari lebih banyak petualangan indah kita berdua.",
      emoji: "🎂",
      badge: "Hari Ini & Selamanya",
    },
  ] as TimelineItem[],

  // Final Surprise
  finalSurprise: {
    teaserTitle: "Wait... One More Thing 👀",
    buttonText: "CLICK ME 💕",
    headline: "Happy Birthday, Anggi 💗",
    subheadline1: "Thank you for being part of my life.",
    subheadline2: "Let's make more memories together.",
    question: "Forever?",
    option1: "YES 💗",
    option2: "OF COURSE 🥺",
    celebrationText: "YAYYYYY 🐷💕 I LOVE YOU SO MUCH, ANGGI!!",
  },
};
