import { useEffect } from 'react';
import { usePortfolioData, useLanguage, getLoc } from '../store';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function Resume() {
  const data = usePortfolioData();
  const lang = useLanguage();

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
          ← Back to Home
        </Link>
        <button 
          onClick={handlePrint}
          className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg text-sm font-bold shadow-md hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors cursor-pointer"
        >
          Print / Download PDF
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
            {data.profile.whatsapp && <span>{data.profile.whatsapp}</span>}
            {data.profile.linkedin && <a href={`https://linkedin.com/in/${data.profile.linkedin}`} className="text-black">linkedin.com/in/{data.profile.linkedin}</a>}
            {data.profile.github && <a href={`https://github.com/${data.profile.github}`} className="text-black">github.com/{data.profile.github}</a>}
            <a href={window.location.origin} className="text-black">{window.location.host}</a>
          </div>
        </header>

        {/* Bio */}
        {getBio().length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-3">Profile</h2>
            <div className="text-sm text-zinc-700 space-y-1 print:break-inside-avoid">
              {getBio().map((b, i) => <p key={i}>{b}</p>)}
            </div>
          </section>
        )}

        {/* Experience */}
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-3">Experience</h2>
          <div className="space-y-6">
            {data.experiences.map((exp, i) => (
              <div key={i} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-zinc-900">{getLoc(lang, exp.title, exp.title_id, exp.title_zh, exp.title_ja, exp.title_ko)}</h3>
                  <span className="text-sm font-mono text-zinc-500 shrink-0">{exp.period}</span>
                </div>
                <div className="flex justify-between items-baseline mb-2">
                  <p className="text-sm font-medium text-zinc-700">{getLoc(lang, exp.role, exp.role_id, exp.role_zh, exp.role_ja, exp.role_ko)}</p>
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
            <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-3">Education</h2>
            <div className="space-y-6">
              {data.educations.map((edu, i) => (
                <div key={i} className="print:break-inside-avoid">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-zinc-900">{getLoc(lang, edu.title, edu.title_id, edu.title_zh, edu.title_ja, edu.title_ko)}</h3>
                    <span className="text-sm font-mono text-zinc-500 shrink-0">{edu.period}</span>
                  </div>
                  <div className="flex justify-between items-baseline mb-2">
                    <p className="text-sm font-medium text-zinc-700">{getLoc(lang, edu.role, edu.role_id, edu.role_zh, edu.role_ja, edu.role_ko)}</p>
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

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-3">Selected Projects</h2>
          <div className="space-y-5">
            {(data.projects.filter(p => p.featured).length > 0 ? data.projects.filter(p => p.featured) : data.projects).slice(0, 4).map((p, i) => (
              <div key={i} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-zinc-900">{p.title}</h3>
                  <span className="text-sm font-mono text-zinc-500 shrink-0">{getLoc(lang, p.role, p.role_id, p.role_zh, p.role_ja, p.role_ko)}</span>
                </div>
                <p className="text-sm text-zinc-600 mb-1 leading-relaxed">{getLoc(lang, p.desc, p.desc_id, p.desc_zh, p.desc_ja, p.desc_ko)}</p>
                <div className="flex justify-between items-baseline">
                  <p className="text-xs font-mono text-zinc-500">Tech: {p.tags.join(', ')}</p>
                  <div className="flex gap-3 text-xs font-mono text-black">
                    {p.liveUrl && <a href={p.liveUrl}>Live Demo ↗</a>}
                    {p.githubUrl && <a href={p.githubUrl}>GitHub ↗</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates & Awards */}
        {data.certificates && data.certificates.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-3">Certifications & Awards</h2>
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
          <h2 className="text-lg font-bold uppercase tracking-widest text-zinc-900 border-b border-zinc-200 pb-1 mb-3">Skills</h2>
          <div className="text-sm text-zinc-700 grid grid-cols-1 gap-2 leading-relaxed">
            {Object.entries(data.stack).map(([category, items]) => (
              <div key={category} className="print:break-inside-avoid">
                <strong className="text-zinc-900">{category}:</strong> {items.map(i => i.name).join(', ')}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
