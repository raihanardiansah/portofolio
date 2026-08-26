// ── Portfolio data ──

export const defaultProfile = {
  name: 'Raihan Ardi Ansah',
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
  bio_ja: [
    'デモ段階を超えた実用的なウェブサイトとフルスタックアプリケーションを構築します。',
    'デザイン、コード、デプロイメントを結びつけ、人々が実際に使用できる製品を作成します。',
    'コンテキストの理解からフィードバックの反復まで、問題をエンドツーエンドで解決します。',
    'ソフトウェアエンジニアリング、ウェブ開発、テクノロジー職の機会を歓迎します。',
  ],
  bio_ko: [
    '데모 단계를 넘어선 실용적인 웹사이트와 풀스택 애플리케이션을 구축합니다.',
    '디자인, 코드, 배포를 연결하여 사람들이 실제로 사용할 수 있는 제품을 만듭니다.',
    '맥락 이해부터 피드백 반복에 이르기까지 문제를 처음부터 끝까지 해결합니다.',
    '소프트웨어 엔지니어링, 웹 개발 및 기술 직무의 기회에 열려 있습니다.',
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
    role_ja: 'フリーランス',
    role_ko: '프리랜서',
    logo: 'https://ui-avatars.com/api/?name=FW&background=18181b&color=fff&size=80',
    period: '2025 — Present',
    description: 'Building websites and web applications that translate real-world needs into clean, user-friendly digital experiences.',
    description_id: 'Membangun website dan aplikasi web yang menerjemahkan kebutuhan nyata menjadi pengalaman digital yang rapi dan mudah digunakan.',
    description_zh: '构建将现实需求转化为整洁、用户友好数字体验的网站和Web应用程序。',
    description_ja: '現実のニーズをすっきりと使いやすいデジタル体験に変換するウェブサイトやウェブアプリケーションを構築します。',
    description_ko: '현실의 요구를 깔끔하고 사용자 친화적인 디지털 경험으로 변환하는 웹사이트와 웹 애플리케이션을 구축합니다.',
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
    points_ja: [
      'レスポンシブなポートフォリオサイトやランディングページの開発',
      'フロントエンド、バックエンド、データベース、デプロイメントを単一のワークフローに統合',
      '関係者と協力して要件を技術的な解決策に変換'
    ],
    points_ko: [
      '반응형 포트폴리오 웹사이트 및 랜딩 페이지 개발',
      '프론트엔드, 백엔드, 데이터베이스 및 배포를 단일 워크플로우로 연결',
      '이해관계자와 협력하여 요구 사항을 기술 솔루션으로 변환'
    ],
    tags: ['React', 'Vite', 'Laravel', 'Tailwind'],
  },
  {
    title: 'Active Student',
    role: 'AMIKOM University Yogyakarta · Informatics Engineering',
    role_id: 'Universitas AMIKOM Yogyakarta · Teknik Informatika',
    role_zh: '日惹AMIKOM大学 · 信息工程',
    role_ja: 'アミコム大学ジョグジャカルタ校 · 情報工学',
    role_ko: '아미콤 대학교 욕야카르타 · 정보공학',
    logo: 'https://ui-avatars.com/api/?name=AM&background=18181b&color=fff&size=80',
    period: '2024 — Present',
    description: 'Studying software engineering while building projects that combine web development, databases, and exploration of new technologies.',
    description_id: 'Mempelajari software engineering sambil mengerjakan project yang menggabungkan web development, database, dan eksplorasi teknologi baru.',
    description_zh: '在学习软件工程的同时，构建结合了Web开发、数据库和新技术探索的项目。',
    description_ja: 'ソフトウェア工学を学びながら、ウェブ開発、データベース、新技術の探索を組み合わせたプロジェクトを構築しています。',
    description_ko: '소프트웨어 공학을 공부하면서 웹 개발, 데이터베이스 및 신기술 탐구를 결합한 프로젝트를 구축하고 있습니다.',
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
    points_ja: [
      'ウェブ開発、データベース、データ構造の知識を深める',
      '実用的な現実世界のアプローチで学術プロジェクトを構築',
      'AIツール、サーバーインフラ、自動化の実験'
    ],
    points_ko: [
      '웹 개발, 데이터베이스 및 자료 구조에 대한 지식 심화',
      '실용적인 현실 세계의 접근 방식으로 학술 프로젝트 구축',
      'AI 도구, 서버 인프라 및 자동화 실험'
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
    desc_ja: '多言語の挨拶、ダークモード、アコーディオンセクション、GitHubアクティビティ、レスポンシブレイアウトを備えたシングルページポートフォリオ。',
    desc_ko: '다국어 인사말, 다크 모드, 아코디언 섹션, GitHub 활동 및 반응형 레이아웃을 갖춘 단일 페이지 포트폴리오.',
    overview: 'Building a personal portfolio that is quickly understood by recruiters and clients, while also serving as a space to showcase technical thinking and attention to UI details.',
    overview_id: 'Membangun personal portfolio yang cepat dipahami recruiter dan client, sekaligus menjadi ruang untuk menunjukkan cara berpikir teknis dan perhatian terhadap detail UI.',
    overview_zh: '构建一个让招聘人员和客户快速理解的个人作品集，同时作为展示技术思维和对UI细节关注的空间。',
    overview_ja: '採用担当者やクライアントにすぐに理解される個人ポートフォリオを構築すると同時に、技術的な思考やUIの細部へのこだわりを示す空間としても機能します。',
    overview_ko: '채용 담당자와 클라이언트가 빠르게 이해할 수 있는 개인 포트폴리오를 구축하는 동시에 기술적 사고와 UI 세부 사항에 대한 관심을 보여주는 공간으로 활용합니다.',
    role: 'Design, frontend development, deployment',
    role_id: 'Desain, frontend development, deployment',
    role_zh: '设计，前端开发，部署',
    role_ja: 'デザイン、フロントエンド開発、デプロイメント',
    role_ko: '디자인, 프론트엔드 개발, 배포',
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
    desc_ja: 'ウェブコンテンツを読みやすく再利用しやすい形式に抽出する自己ホスト型の実験。サーバー上の内部サービスとして実行されます。',
    desc_ko: '웹 콘텐츠를 더 읽고 재사용하기 쉬운 형식으로 추출하는 자체 호스팅 실험입니다. 서버에서 내부 서비스로 실행됩니다.',
    overview: 'Infrastructure and automation experiment to run a web extractor independently on a Linux server with a systemd manageable service.',
    overview_id: 'Eksperimen infrastructure dan automation untuk menjalankan web extractor secara mandiri di server Linux dengan service yang dapat dikelola systemd.',
    overview_zh: '基础设施和自动化实验，在Linux服务器上独立运行Web提取器，并带有systemd可管理服务。',
    overview_ja: 'systemdで管理可能なサービスを使用してLinuxサーバー上で独立してウェブエクストラクタを実行するインフラストラクチャと自動化の実験。',
    overview_ko: 'systemd 관리 가능한 서비스를 사용하여 Linux 서버에서 웹 추출기를 독립적으로 실행하기 위한 인프라 및 자동화 실험입니다.',
    role: 'Infrastructure, service setup, automation',
    role_id: 'Infrastruktur, pengaturan service, otomatisasi',
    role_zh: '基础设施，服务设置，自动化',
    role_ja: 'インフラストラクチャ、サービス設定、自動化',
    role_ko: '인프라, 서비스 설정, 자동화',
    tags: ['Web Scraping', 'Linux', 'Systemd'],
    gallery: ['/gallery/extractor-overview.svg', '/gallery/extractor-flow.svg'],
  },
];

export const currentlyLearning = ['Docker', 'Linux server', 'PostgreSQL', 'System design', 'AI tools'];
