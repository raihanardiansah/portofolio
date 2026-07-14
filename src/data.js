// ── Portfolio data ──
export const greetings = ['Halo', 'Hello', 'こんにちは', '안녕하세요', '你好', 'مرحبًا'];

export const stack = {
  Frontend: [
    { name: 'HTML', icon: 'html5' },
    { name: 'CSS', icon: 'css' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'React', icon: 'react' },
    { name: 'Tailwind CSS', icon: 'tailwindcss' },
    { name: 'Vite', icon: 'vite' },
  ],
  'Backend & Database': [
    { name: 'Node.js', icon: 'nodedotjs' },
    { name: 'Python', icon: 'python' },
    { name: 'Laravel', icon: 'laravel' },
    { name: 'PHP', icon: 'php' },
    { name: 'MySQL', icon: 'mysql' },
    { name: 'PostgreSQL', icon: 'postgresql' },
  ],
  'Tools & Others': [
    { name: 'Git', icon: 'git' },
    { name: 'Figma', icon: 'figma' },
    { name: 'Docker', icon: 'docker' },
    { name: 'Linux', icon: 'linux' },
    { name: 'Postman', icon: 'postman' },
  ],
};

export const experiences = [
  {
    title: 'Freelance Web Developer',
    role: 'Self-employed',
    logo: 'https://ui-avatars.com/api/?name=FW&background=18181b&color=fff&size=80',
    period: '2025 — Sekarang',
    description: 'Membangun website dan aplikasi web yang menerjemahkan kebutuhan nyata menjadi pengalaman digital yang rapi dan mudah digunakan.',
    points: [
      'Mengembangkan website portofolio dan landing page yang responsif',
      'Menghubungkan frontend, backend, database, dan deployment dalam satu alur kerja',
      'Berkolaborasi dengan stakeholder untuk menerjemahkan kebutuhan menjadi solusi teknis',
    ],
    tags: ['React', 'Vite', 'Laravel', 'Tailwind'],
  },
  {
    title: 'Mahasiswa Aktif',
    role: 'Universitas AMIKOM Yogyakarta · Teknik Informatika',
    logo: 'https://ui-avatars.com/api/?name=AM&background=18181b&color=fff&size=80',
    period: '2024 — Sekarang',
    description: 'Mempelajari software engineering sambil mengerjakan project yang menggabungkan web development, database, dan eksplorasi teknologi baru.',
    points: [
      'Mendalami pengembangan web, basis data, dan struktur data',
      'Mengerjakan project akademik dengan pendekatan solusi nyata',
      'Bereksperimen dengan AI tools, server infrastructure, dan automation',
    ],
    tags: ['Software Engineering', 'Web Development', 'Database'],
  },
];

export const projects = [
  {
    slug: 'web-portofolio-pribadi',
    title: 'Web Portofolio Pribadi',
    desc: 'Portfolio satu halaman dengan greeting multi-bahasa, dark mode, accordion sections, GitHub activity, dan responsive layout.',
    overview: 'Membangun personal portfolio yang cepat dipahami recruiter dan client, sekaligus menjadi ruang untuk menunjukkan cara berpikir teknis dan perhatian terhadap detail UI.',
    role: 'Design, frontend development, deployment',
    tags: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    gallery: ['/gallery/portfolio-overview.svg', '/gallery/portfolio-mobile.svg'],
    liveUrl: 'http://159.65.131.196:8000',
    liveLabel: 'Live demo',
  },
  {
    slug: 'web-extractor-service',
    title: 'Web Extractor Service',
    desc: 'Eksperimen self-hosted untuk mengekstrak konten web menjadi format yang lebih mudah dibaca dan digunakan kembali. Berjalan sebagai service internal di server.',
    overview: 'Eksperimen infrastructure dan automation untuk menjalankan web extractor secara mandiri di server Linux dengan service yang dapat dikelola systemd.',
    role: 'Infrastructure, service setup, automation',
    tags: ['Web Scraping', 'Linux', 'Systemd'],
    gallery: ['/gallery/extractor-overview.svg', '/gallery/extractor-flow.svg'],
  },
];

export const currentlyLearning = ['Docker', 'Linux server', 'PostgreSQL', 'System design', 'AI tools'];
