import { useEffect } from 'react';
import { usePortfolioData, useLanguage, getLoc } from '../store';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const T = {
  en: {
    profile: 'Profile',
    experience: 'Experience',
    education: 'Education',
    certifications: 'Certifications & Awards',
    skills: 'Skills',
    backHome: '← Back to Home',
    printPdf: 'Print / Download PDF',
    categories: {
      'Frontend': 'Frontend',
      'Mobile': 'Mobile',
      'Backend & Database': 'Backend & Database',
      'Data Science & AI': 'Data Science & AI',
      'Tools & Workflow': 'Tools & Workflow',
    },
  },
  id: {
    profile: 'Profil',
    experience: 'Pengalaman',
    education: 'Pendidikan',
    certifications: 'Sertifikasi & Penghargaan',
    skills: 'Keahlian',
    backHome: '← Kembali ke Beranda',
    printPdf: 'Cetak / Unduh PDF',
    categories: {
      'Frontend': 'Frontend',
      'Mobile': 'Mobile',
      'Backend & Database': 'Backend & Database',
      'Data Science & AI': 'Data Science & AI',
      'Tools & Workflow': 'Alat & Alur Kerja',
    },
  },
  zh: {
    profile: '个人简介',
    experience: '工作经验',
    education: '教育背景',
    certifications: '证书与奖项',
    skills: '技能',
    backHome: '← 返回首页',
    printPdf: '打印 / 下载 PDF',
    categories: {
      'Frontend': '前端',
      'Mobile': '移动端',
      'Backend & Database': '后端与数据库',
      'Data Science & AI': '数据科学与AI',
      'Tools & Workflow': '工具与工作流',
    },
  },
  ja: {
    profile: 'プロフィール',
    experience: '職歴',
    education: '学歴',
    certifications: '資格・受賞歴',
    skills: 'スキル',
    backHome: '← ホームへ戻る',
    printPdf: '印刷 / PDFをダウンロード',
    categories: {
      'Frontend': 'フロントエンド',
      'Mobile': 'モバイル',
      'Backend & Database': 'バックエンド＆データベース',
      'Data Science & AI': 'データサイエンス＆AI',
      'Tools & Workflow': 'ツール＆ワークフロー',
    },
  },
  ko: {
    profile: '프로필',
    experience: '경력',
    education: '학력',
    certifications: '자격증 및 수상',
    skills: '기술',
    backHome: '← 홈으로 돌아가기',
    printPdf: '인쇄 / PDF 다운로드',
    categories: {
      'Frontend': '프론트엔드',
      'Mobile': '모바일',
      'Backend & Database': '백엔드 및 데이터베이스',
      'Data Science & AI': '데이터 과학 및 AI',
      'Tools & Workflow': '도구 및 워크플로우',
    },
  },
};

export default function Resume() {
  const data = usePortfolioData();
  const lang = useLanguage();
  const L = T[lang] || T.en;

  useEffect(() => {
    document.title = `Resume - ${data.profile.name}`;
  }, [data.profile.name]);

  const handlePrint = () => {
    window.print();
  };

  const getBio = () => {
    const arr = getLoc(lang, data.profile.bio, data.profile.bio_id, data.profile.bio_zh, data.profile.bio_ja, data.profile.bio_ko);
    return Array.isArray(arr) ? arr : [];
  };

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 py-8 print:bg-white print:py-0 text-zinc-900 font-sans">
      <Helmet>
        <title>Resume - {data.profile.name}</title>
      </Helmet>
      
      {/* Action Bar (hidden when printing) */}
      <div className="max-w-[800px] mx-auto px-5 mb-6 flex justify-between items-center print:hidden">
        <Link to="/" className="text-sm font-mono text-zinc-500 hover:text-black dark:hover:text-white transition-colors">
          {L.backHome}
        </Link>
        <button 
          onClick={handlePrint}
          className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
        >
          {L.printPdf}
        </button>
      </div>

      {/* A4 Paper Container */}
      <div className="max-w-[800px] mx-auto bg-white p-10 sm:p-14 shadow-xl print:shadow-none print:p-0 print:max-w-none">
        
        {/* Header */}
        <header className="border-b-2 border-zinc-900 pb-6 mb-6">
          <h1 className="text-4xl font-bold tracking-tight mb-2 uppercase text-zinc-900">{data.profile.name}</h1>
          <p className="text-zinc-600 mb-4">{data.profile.location}</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-zinc-600 font-mono">
            {data.profile.email && <a href={`mailto:${data.profile.email}`} className="text-black">{data.profile.email}</a>}
            {data.profile.whatsapp && <a href={`https://wa.me/${data.profile.whatsapp.replace(/\D/g, '')}`} className="text-black">{data.profile.whatsapp}</a>}
            {data.profile.linkedin && <a href={`https://linkedin.com/in/${data.profile.linkedin}`} className="text-black">linkedin.com/in/{data.profile.linkedin}</a>}
            {data.profile.github && <a href={`https://github.com/${data.profile.github}`} className="text-black">github.com/{data.profile.github}</a>}
            <a href={window.location.origin} className="text-black">{window.location.host}</a>
          </div>
        </header>

        {/* Bio */}
        {getBio().length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-3">{L.profile}</h2>
            <p className="text-sm text-zinc-700 leading-relaxed print:break-inside-avoid">
              {getBio().join(' ')}
            </p>
          </section>
        )}

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-3">{L.experience}</h2>
          <div className="space-y-6">
            {data.experiences.map((exp, i) => (
              <div key={i} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-zinc-900">{getLoc(lang, exp.title, exp.title_id, exp.title_zh, exp.title_ja, exp.title_ko)}</h3>
                  <span className="text-sm font-mono text-zinc-500 shrink-0">{exp.period}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <p className="text-sm font-medium text-zinc-700">{getLoc(lang, exp.role, exp.role_id, exp.role_zh, exp.role_ja, exp.role_ko)}</p>
                  {exp.location && <span className="text-xs text-zinc-500 shrink-0">{exp.location}</span>}
                </div>
                {exp.description && (
                  <p className="text-sm text-zinc-600 whitespace-pre-wrap leading-relaxed">
                    {getLoc(lang, exp.description, exp.description_id, exp.description_zh, exp.description_ja, exp.description_ko)}
                  </p>
                )}
                {exp.points && (
                  <ul className="text-sm text-zinc-600 list-disc list-inside mt-2 space-y-1">
                    {(getLoc(lang, exp.points, exp.points_id, exp.points_zh, exp.points_ja, exp.points_ko) || []).map((p, j) => (
                      <li key={j}>{p}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        {data.educations && data.educations.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-3">{L.education}</h2>
            <div className="space-y-6">
              {data.educations.map((edu, i) => (
                <div key={i} className="print:break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-zinc-900">{getLoc(lang, edu.title, edu.title_id, edu.title_zh, edu.title_ja, edu.title_ko)}</h3>
                    <span className="text-sm font-mono text-zinc-500 shrink-0">{edu.period}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-sm font-medium text-zinc-700">{getLoc(lang, edu.role, edu.role_id, edu.role_zh, edu.role_ja, edu.role_ko)}</p>
                    {edu.location && <span className="text-xs text-zinc-500 shrink-0">{edu.location}</span>}
                  </div>
                  {edu.description && (
                    <p className="text-sm text-zinc-600 whitespace-pre-wrap leading-relaxed">
                      {getLoc(lang, edu.description, edu.description_id, edu.description_zh, edu.description_ja, edu.description_ko)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certificates & Awards */}
        {data.certificates && data.certificates.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-3">{L.certifications}</h2>
            <div className="space-y-3">
              {data.certificates.map((cert, i) => (
                <div key={i} className="print:break-inside-avoid">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-zinc-900 text-sm">{getLoc(lang, cert.title, cert.title_id, cert.title_zh, cert.title_ja, cert.title_ko)}</h3>
                    <span className="text-sm font-mono text-zinc-500 shrink-0">{cert.date}</span>
                  </div>
                  <p className="text-sm text-zinc-600">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack */}
        <section className="print:break-inside-avoid">
          <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-3">{L.skills}</h2>
          <div className="text-sm text-zinc-700 grid grid-cols-1 gap-2 leading-relaxed">
            {Object.entries(data.stack).map(([category, items]) => (
              <div key={category} className="print:break-inside-avoid">
                <strong className="text-zinc-900">{L.categories[category] || category}:</strong> {items.map(i => i.name).join(', ')}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
