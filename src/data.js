// ── Portfolio data ──

export const defaultProfile = {
  name: 'Raihan',
  location: 'Semarang, Indonesia',
  timezone: 'Asia/Jakarta',
  timezoneLabel: 'WIB',
  mapX: 76.6,
  mapY: 54,
  email: 'raihanardiansah@gmail.com',
  github: 'raihanardiansah',
  linkedin: 'raihanardiansah',
  whatsapp: '+6281234567890',
  availableForWork: true,
  bio: [
    'Building practical websites and full-stack applications beyond the demo stage.',
    'Connecting design, code, and deployment into products people can actually use.',
    'Solving problems end to end — from understanding context to iterating on feedback.',
    'Open to opportunities in software engineering, web development, and tech roles.',
  ],
  bio_id: [
    'Membangun website dan aplikasi full-stack yang praktis, bukan sekadar demo.',
    'Menghubungkan desain, kode, dan deployment menjadi produk yang benar-benar bisa digunakan.',
    'Menyelesaikan masalah dari awal hingga akhir — dari memahami konteks hingga iterasi berdasarkan masukan.',
    'Terbuka untuk peluang di bidang software engineering, web development, dan peran teknologi lainnya.',
  ],
  bio_zh: [
    '构建超越演示阶段的实用网站和全栈应用程序。',
    '将设计、代码和部署连接成人们真正可以使用的产品。',
    '端到端地解决问题 — 从理解上下文到根据反馈进行迭代。',
    '对软件工程、Web开发和技术职位的机会持开放态度。',
  ],
  cvUrl: '',
};

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
    role_id: 'Pekerja Lepas',
    role_zh: '自由职业者',
    logo: 'https://ui-avatars.com/api/?name=FW&background=18181b&color=fff&size=80',
    period: '2025 — Present',
    description: 'Building websites and web applications that translate real-world needs into clean, user-friendly digital experiences.',
    description_id: 'Membangun website dan aplikasi web yang menerjemahkan kebutuhan nyata menjadi pengalaman digital yang rapi dan mudah digunakan.',
    description_zh: '构建将现实需求转化为整洁、用户友好数字体验的网站和Web应用程序。',
    points: [
      'Developing responsive portfolio websites and landing pages',
      'Connecting frontend, backend, database, and deployment in a single workflow',
      'Collaborating with stakeholders to translate requirements into technical solutions'
    ],
    points_id: [
      'Mengembangkan website portofolio dan landing page yang responsif',
      'Menghubungkan frontend, backend, database, dan deployment dalam satu alur kerja',
      'Berkolaborasi dengan stakeholder untuk menerjemahkan kebutuhan menjadi solusi teknis',
    ],
    points_zh: [
      '开发响应式作品集网站和登陆页面',
      '在单一工作流中连接前端、后端、数据库和部署',
      '与利益相关者合作，将需求转化为技术解决方案'
    ],
    tags: ['React', 'Vite', 'Laravel', 'Tailwind'],
  },
  {
    title: 'Active Student',
    role: 'AMIKOM University Yogyakarta · Informatics Engineering',
    role_id: 'Universitas AMIKOM Yogyakarta · Teknik Informatika',
    role_zh: '日惹AMIKOM大学 · 信息工程',
    logo: 'https://ui-avatars.com/api/?name=AM&background=18181b&color=fff&size=80',
    period: '2024 — Present',
    description: 'Studying software engineering while building projects that combine web development, databases, and exploration of new technologies.',
    description_id: 'Mempelajari software engineering sambil mengerjakan project yang menggabungkan web development, database, dan eksplorasi teknologi baru.',
    description_zh: '在学习软件工程的同时，构建结合了Web开发、数据库和新技术探索的项目。',
    points: [
      'Deepening knowledge in web development, databases, and data structures',
      'Building academic projects with practical real-world approaches',
      'Experimenting with AI tools, server infrastructure, and automation'
    ],
    points_id: [
      'Mendalami pengembangan web, basis data, dan struktur data',
      'Mengerjakan project akademik dengan pendekatan solusi nyata',
      'Bereksperimen dengan AI tools, server infrastructure, dan automation',
    ],
    points_zh: [
      '深化在Web开发、数据库和数据结构方面的知识',
      '以实用的现实世界方法构建学术项目',
      '尝试AI工具、服务器基础设施和自动化'
    ],
    tags: ['Software Engineering', 'Web Development', 'Database'],
  },
];

export const projects = [
  {
    slug: 'web-portofolio-pribadi',
    title: 'Web Portofolio Pribadi',
    desc: 'A single-page portfolio with multi-language greetings, dark mode, accordion sections, GitHub activity, and a responsive layout.',
    desc_id: 'Portfolio satu halaman dengan greeting multi-bahasa, dark mode, accordion sections, GitHub activity, dan responsive layout.',
    desc_zh: '单页作品集，具有多语言问候、深色模式、手风琴部分、GitHub活动和响应式布局。',
    overview: 'Building a personal portfolio that is quickly understood by recruiters and clients, while also serving as a space to showcase technical thinking and attention to UI details.',
    overview_id: 'Membangun personal portfolio yang cepat dipahami recruiter dan client, sekaligus menjadi ruang untuk menunjukkan cara berpikir teknis dan perhatian terhadap detail UI.',
    overview_zh: '构建一个让招聘人员和客户快速理解的个人作品集，同时作为展示技术思维和对UI细节关注的空间。',
    role: 'Design, frontend development, deployment',
    role_id: 'Desain, frontend development, deployment',
    role_zh: '设计，前端开发，部署',
    tags: ['React', 'Vite', 'Tailwind CSS', 'JavaScript'],
    gallery: ['/gallery/portfolio-overview.svg', '/gallery/portfolio-mobile.svg'],
    liveUrl: 'http://159.65.131.196:8000',
    liveLabel: 'Live demo',
  },
  {
    slug: 'web-extractor-service',
    title: 'Web Extractor Service',
    desc: 'A self-hosted experiment to extract web content into formats that are easier to read and reuse. Runs as an internal service on the server.',
    desc_id: 'Eksperimen self-hosted untuk mengekstrak konten web menjadi format yang lebih mudah dibaca dan digunakan kembali. Berjalan sebagai service internal di server.',
    desc_zh: '一个自托管的实验，用于将Web内容提取为更容易阅读和重复使用的格式。作为服务器上的内部服务运行。',
    overview: 'Infrastructure and automation experiment to run a web extractor independently on a Linux server with a systemd manageable service.',
    overview_id: 'Eksperimen infrastructure dan automation untuk menjalankan web extractor secara mandiri di server Linux dengan service yang dapat dikelola systemd.',
    overview_zh: '基础设施和自动化实验，在Linux服务器上独立运行Web提取器，并带有systemd可管理服务。',
    role: 'Infrastructure, service setup, automation',
    role_id: 'Infrastruktur, pengaturan service, otomatisasi',
    role_zh: '基础设施，服务设置，自动化',
    tags: ['Web Scraping', 'Linux', 'Systemd'],
    gallery: ['/gallery/extractor-overview.svg', '/gallery/extractor-flow.svg'],
  },
];

export const currentlyLearning = ['Docker', 'Linux server', 'PostgreSQL', 'System design', 'AI tools'];
