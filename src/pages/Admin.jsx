import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import {
  usePortfolioData,
  saveToLocal,
  resetToDefaults,
  exportDataJs,
  copyDataJs,
  checkAdminPassword,
  setAdminPassword,
  generateSlug,
  generateId,
  defaultData,
  getCachedData,
} from '../store';

// Toast component for notifications
function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bg = type === 'success' ? 'bg-black dark:bg-white' : 'bg-red-500';
  return (
    <div className={`fixed bottom-4 right-4 ${bg} text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm font-mono flex items-center gap-2 animate-in slide-in-from-bottom-5`}>
      {type === 'success' ? '✓' : '✕'} {message}
    </div>
  );
}

export default function Admin() {
  const [auth, setAuth] = useState(false);
  const [passInput, setPassInput] = useState('');
  const [error, setError] = useState('');
  
  const data = usePortfolioData();
  const [localData, setLocalData] = useState(null);
  const [activeTab, setActiveTab] = useState('Profile');
  const [toast, setToast] = useState(null);

  const currentData = localData || data;
  const updateLocal = (newData) => setLocalData(newData);

  const showToast = (message, type = 'success') => setToast({ message, type });

  const handleLogin = (e) => {
    e.preventDefault();
    if (checkAdminPassword(passInput)) {
      setAuth(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleSave = (updatedSection, sectionName) => {
    const newData = { ...currentData, ...updatedSection };
    const ok = saveToLocal(newData);
    updateLocal(newData);
    if (ok) {
      showToast(`${sectionName} saved! Download data.js in Settings to make it permanent.`);
    } else {
      showToast('Failed to save.', 'error');
    }
  };

  if (!auth) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl w-full max-w-sm">
          <h1 className="text-2xl font-mono text-white mb-6 font-bold text-center">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input 
                type="password" 
                value={passInput}
                onChange={(e) => setPassInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white font-mono focus:outline-none focus:border-black dark:border-white"
                autoFocus
              />
            </div>
            {error && <p className="text-red-400 text-xs font-mono">{error}</p>}
            <button type="submit" className="w-full bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white font-mono py-2 rounded-lg transition-colors">
              Access Panel
            </button>
            <div className="text-center pt-4">
              <Link to="/" className="text-xs text-zinc-500 hover:text-zinc-300 font-mono">← Back to site</Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  const tabs = ['Profile', 'Projects', 'Experience', 'Stack', 'Learning', 'Gallery', 'Blog', 'Settings'];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
      {/* Sidebar */}
      <aside className="md:w-56 bg-zinc-900 dark:bg-zinc-950 text-zinc-300 flex flex-col md:h-screen sticky top-0 shrink-0">
        <div className="p-5 border-b border-zinc-800">
          <h2 className="font-mono font-bold text-white text-lg">Portfolio Admin</h2>
          <Link to="/" className="text-xs font-mono text-zinc-500 hover:text-white mt-1 inline-block">← Back to site</Link>
        </div>
        <nav className="flex-1 overflow-x-auto md:overflow-y-auto flex md:flex-col p-3 gap-1">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 rounded-lg text-sm font-mono text-left whitespace-nowrap transition-colors ${
                activeTab === tab ? 'bg-black dark:bg-white text-white dark:text-black text-white' : 'hover:bg-zinc-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-zinc-800 hidden md:flex md:flex-col gap-1">
          <button
            onClick={() => exportDataJs(getCachedData())}
            className="w-full px-4 py-2 rounded-lg text-sm font-mono text-left text-emerald-400 hover:bg-zinc-800 transition-colors"
          >
            ⬇ Download data.js
          </button>
          <button
            onClick={async () => {
              const ok = await copyDataJs(getCachedData());
              setToast(ok ? { message: 'Code copied to clipboard!', type: 'success' } : { message: 'Failed to copy', type: 'error' });
            }}
            className="w-full px-4 py-2 rounded-lg text-sm font-mono text-left text-blue-400 hover:bg-zinc-800 transition-colors"
          >
            📋 Copy Code
          </button>
          <button 
            onClick={() => setAuth(false)}
            className="w-full px-4 py-2 rounded-lg text-sm font-mono text-left text-red-400 hover:bg-zinc-800 transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto min-h-0">
        <div className="max-w-4xl mx-auto">
          {activeTab === 'Profile' && <ProfileSection profile={currentData.profile} onSave={(p) => handleSave({profile: p}, 'Profile')} />}
          {activeTab === 'Projects' && <ProjectsSection projects={currentData.projects} onSave={(p) => handleSave({projects: p}, 'Projects')} />}
          {activeTab === 'Experience' && <ExperienceSection experiences={currentData.experiences} onSave={(e) => handleSave({experiences: e}, 'Experience')} />}
          {activeTab === 'Stack' && <StackSection stack={currentData.stack} onSave={(s) => handleSave({stack: s}, 'Stack')} />}
          {activeTab === 'Learning' && <LearningSection learning={currentData.currentlyLearning} onSave={(l) => handleSave({currentlyLearning: l}, 'Learning')} />}
          {activeTab === 'Gallery' && <GallerySection gallery={currentData.gallery || []} onSave={(g) => handleSave({gallery: g}, 'Gallery')} />}
          {activeTab === 'Blog' && <BlogSection blogs={currentData.blogs || []} onSave={(b) => handleSave({blogs: b}, 'Blog')} />}
          {activeTab === 'Settings' && <SettingsSection onReset={() => {
            if (confirm('Reset semua data ke default? Perubahan yang belum di-download akan hilang.')) {
              resetToDefaults();
              updateLocal(null);
              showToast('Data reset to defaults');
            }
          }} onExport={() => { exportDataJs(getCachedData()); }} />}
        </div>
      </main>

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

// ── Components for each section ──────────────────────────────────────

const inputCls = "w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white font-mono";
const labelCls = "block text-xs font-mono text-zinc-500 dark:text-zinc-400 mb-1 uppercase tracking-wider";
const cardCls = "bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl p-5 mb-4";
const btnSaveCls = "bg-black dark:bg-white text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 text-white px-5 py-2.5 rounded-lg text-sm font-medium font-mono transition-colors";
const btnDeleteCls = "bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-mono transition-colors";
const btnCancelCls = "bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 px-4 py-2 rounded-lg text-sm font-mono text-zinc-800 dark:text-zinc-200 transition-colors";

function ProfileSection({ profile, onSave }) {
  const [p, setP] = useState(profile);
  const [bio, setBio] = useState(profile.bio ? profile.bio.join('\n') : '');
  const [bioId, setBioId] = useState(profile.bio_id ? profile.bio_id.join('\n') : '');
  const [bioZh, setBioZh] = useState(profile.bio_zh ? profile.bio_zh.join('\n') : '');
  const [bioJa, setBioJa] = useState(profile.bio_ja ? profile.bio_ja.join('\n') : '');
  const [bioKo, setBioKo] = useState(profile.bio_ko ? profile.bio_ko.join('\n') : '');
  const [editLang, setEditLang] = useState('en');
  const langs = ['en', 'id', 'zh', 'ja', 'ko'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...p, bio: bio.split('\n').filter(l => l.trim()), bio_id: bioId.split('\n').filter(l => l.trim()), bio_zh: bioZh.split('\n').filter(l => l.trim()), bio_ja: bioJa.split('\n').filter(l => l.trim()), bio_ko: bioKo.split('\n').filter(l => l.trim()) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold font-mono border-b border-zinc-200 dark:border-zinc-700 pb-2">Profile Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className={labelCls}>Name</label><input type="text" className={inputCls} value={p.name} onChange={e=>setP({...p, name: e.target.value})} required/></div>
        <div><label className={labelCls}>Location</label><input type="text" className={inputCls} value={p.location} onChange={e=>setP({...p, location: e.target.value})} required/></div>
        <div><label className={labelCls}>Timezone</label><input type="text" className={inputCls} value={p.timezone || 'Asia/Jakarta'} onChange={e=>setP({...p, timezone: e.target.value})} placeholder="e.g. Asia/Jakarta"/></div>
        <div>
          <label className={labelCls}>Time Format</label>
          <select className={inputCls} value={p.timezoneLabel || 'UTC'} onChange={e=>setP({...p, timezoneLabel: e.target.value})}>
            <option value="UTC">Display UTC (e.g. UTC+7)</option>
            <option value="WIB">Display WIB</option>
          </select>
        </div>
        <div><label className={labelCls}>Map Dot X (%)</label><input type="number" step="0.1" className={inputCls} value={p.mapX || 76.6} onChange={e=>setP({...p, mapX: parseFloat(e.target.value)})} /></div>
        <div><label className={labelCls}>Map Dot Y (%)</label><input type="number" step="0.1" className={inputCls} value={p.mapY || 54} onChange={e=>setP({...p, mapY: parseFloat(e.target.value)})} /></div>
        <div><label className={labelCls}>Email</label><input type="email" className={inputCls} value={p.email} onChange={e=>setP({...p, email: e.target.value})} required/></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 col-span-2">
            <div><label className={labelCls}>GitHub (username)</label><input type="text" className={inputCls} value={p.github} onChange={e=>setP({...p, github: e.target.value})} required/></div>
            <div><label className={labelCls}>LinkedIn (username)</label><input type="text" className={inputCls} value={p.linkedin} onChange={e=>setP({...p, linkedin: e.target.value})} required/></div>
            <div><label className={labelCls}>WhatsApp (e.g. 62812...)</label><input type="text" className={inputCls} value={p.whatsapp || ''} onChange={e=>setP({...p, whatsapp: e.target.value})} /></div>
        </div>
        <div><label className={labelCls}>CV URL (empty = coming soon)</label><input type="url" className={inputCls} value={p.cvUrl} onChange={e=>setP({...p, cvUrl: e.target.value})} /></div>
      </div>
      <div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={p.availableForWork} onChange={e=>setP({...p, availableForWork: e.target.checked})} className="w-4 h-4 rounded border-zinc-300 text-black dark:text-white focus:ring-black dark:focus:ring-white"/>
          <span className="text-sm font-mono">Available for work</span>
        </label>
      </div>
      <div>
        <label className={labelCls}>Bio (One point per line)</label>
        <div className="flex gap-2 mb-2">
          {langs.map(l => (
            <button type="button" key={l} onClick={()=>setEditLang(l)} className={`px-2 py-1 text-xs font-mono rounded ${editLang === l ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>{l.toUpperCase()}</button>
          ))}
        </div>
        {editLang === 'en' && <textarea className={`${inputCls} h-32 mb-4`} value={bio} onChange={e=>setBio(e.target.value)} required placeholder="Bio (EN)" />}
        {editLang === 'id' && <textarea className={`${inputCls} h-32 mb-4`} value={bioId} onChange={e=>setBioId(e.target.value)} placeholder="Bio (ID)" />}
        {editLang === 'zh' && <textarea className={`${inputCls} h-32 mb-4`} value={bioZh} onChange={e=>setBioZh(e.target.value)} placeholder="Bio (ZH)" />}
        {editLang === 'ja' && <textarea className={`${inputCls} h-32 mb-4`} value={bioJa} onChange={e=>setBioJa(e.target.value)} placeholder="Bio (JA)" />}
        {editLang === 'ko' && <textarea className={`${inputCls} h-32 mb-4`} value={bioKo} onChange={e=>setBioKo(e.target.value)} placeholder="Bio (KO)" />}
      </div>
      <button type="submit" className={btnSaveCls}>Save Profile</button>
    </form>
  );
}

function ProjectsSection({ projects, onSave }) {
  const [list, setList] = useState(projects);
  const [editing, setEditing] = useState(null); // null or index or 'new'
  
  const move = (index, dir) => {
    if (index + dir < 0 || index + dir >= list.length) return;
    const newList = [...list];
    [newList[index], newList[index + dir]] = [newList[index + dir], newList[index]];
    setList(newList);
    onSave(newList);
  };

  const remove = (index) => {
    if(confirm('Delete project?')) {
      const newList = list.filter((_, i) => i !== index);
      setList(newList);
      onSave(newList);
    }
  };

  if (editing !== null) {
    return <ProjectForm 
      project={editing === 'new' ? {title:'', desc:'', desc_zh:'', overview:'', overview_zh:'', role:'', role_zh:'', tags:[], gallery:[], liveUrl:'', liveLabel:''} : list[editing]}
      onSave={(proj) => {
        const newList = [...list];
        if (editing === 'new') newList.push({...proj, slug: generateSlug(proj.title)});
        else newList[editing] = {...proj, slug: generateSlug(proj.title)};
        setList(newList);
        onSave(newList);
        setEditing(null);
      }}
      onCancel={() => setEditing(null)}
    />;
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-2 mb-6">
        <h2 className="text-2xl font-bold font-mono">Projects</h2>
        <button onClick={() => setEditing('new')} className="bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-sm font-mono">+ New</button>
      </div>
      <div className="space-y-3">
        {list.map((p, i) => (
          <div key={p.slug} className={`${cardCls} p-4 flex items-center justify-between`}>
            <div>
              <h3 className="font-bold">{p.title} {p.featured && <span className="text-yellow-500 text-xs ml-1">★ Featured</span>}</h3>
              <p className="text-xs text-zinc-500 font-mono mt-1">{p.tags.join(', ')}</p>
            </div>
            <div className="flex gap-2 items-center">
              <button onClick={()=>move(i, -1)} disabled={i===0} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded disabled:opacity-30">↑</button>
              <button onClick={()=>move(i, 1)} disabled={i===list.length-1} className="px-2 py-1 bg-zinc-100 dark:bg-zinc-700 rounded disabled:opacity-30">↓</button>
              <button onClick={()=>setEditing(i)} className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white dark:text-black dark:text-white rounded text-xs font-mono">Edit</button>
              <button onClick={()=>remove(i)} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded text-xs font-mono">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectForm({ project, onSave, onCancel }) {
  const [p, setP] = useState({...project, tags: project.tags.join(', '), gallery: project.gallery.join('\n')});
  const [editLang, setEditLang] = useState('en');
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSave({...p, tags: p.tags.split(',').map(s=>s.trim()).filter(Boolean), gallery: p.gallery.split('\n').map(s=>s.trim()).filter(Boolean)});
    }} className={cardCls}>
      <h3 className="text-lg font-bold font-mono mb-4">{project.title ? 'Edit Project' : 'New Project'}</h3>
      <div className="space-y-4">
        <div><label className={labelCls}>Title</label><input type="text" className={inputCls} value={p.title} onChange={e=>setP({...p, title:e.target.value})} required/></div>
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-800/30">
          <div className="flex gap-2 mb-4">
            {['en', 'id', 'zh', 'ja', 'ko'].map(l => (
              <button type="button" key={l} onClick={()=>setEditLang(l)} className={`px-3 py-1 text-xs font-mono rounded ${editLang === l ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>{l.toUpperCase()}</button>
            ))}
          </div>
          
          <div className={editLang === 'en' ? 'block' : 'hidden'}>
            <div className="mb-3"><label className={labelCls}>Role (EN)</label><input type="text" className={inputCls} value={p.role || ''} onChange={e=>setP({...p, role:e.target.value})} required/></div>
            <div className="mb-3"><label className={labelCls}>Short Desc (EN)</label><textarea className={`${inputCls} h-20`} value={p.desc || ''} onChange={e=>setP({...p, desc:e.target.value})} required/></div>
            <div className="mb-3"><label className={labelCls}>Full Overview (EN)</label><div className="bg-white dark:bg-zinc-900 text-black dark:text-white"><ReactQuill theme="snow" value={p.overview || ''} onChange={val=>setP({...p, overview:val})} /></div></div>
          </div>
          
          {['id', 'zh', 'ja', 'ko'].map(l => (
            <div key={l} className={editLang === l ? 'block' : 'hidden'}>
              <div className="mb-3"><label className={labelCls}>Role ({l.toUpperCase()})</label><input type="text" className={inputCls} value={p[`role_${l}`] || ''} onChange={e=>setP({...p, [`role_${l}`]:e.target.value})} /></div>
              <div className="mb-3"><label className={labelCls}>Short Desc ({l.toUpperCase()})</label><textarea className={`${inputCls} h-20`} value={p[`desc_${l}`] || ''} onChange={e=>setP({...p, [`desc_${l}`]:e.target.value})} /></div>
              <div className="mb-3"><label className={labelCls}>Full Overview ({l.toUpperCase()})</label><div className="bg-white dark:bg-zinc-900 text-black dark:text-white"><ReactQuill theme="snow" value={p[`overview_${l}`] || ''} onChange={val=>setP({...p, [`overview_${l}`]:val})} /></div></div>
            </div>
          ))}
        </div>
        <div><label className={labelCls}>Tags (comma separated)</label><input type="text" className={inputCls} value={p.tags} onChange={e=>setP({...p, tags:e.target.value})} required/></div>
        <div><label className={labelCls}>Gallery Image URLs (one per line)</label><textarea className={`${inputCls} h-32`} value={p.gallery} onChange={e=>setP({...p, gallery:e.target.value})}/></div>
        <div className="grid grid-cols-2 gap-4">
          <div><label className={labelCls}>Live URL (optional)</label><input type="url" className={inputCls} value={p.liveUrl} onChange={e=>setP({...p, liveUrl:e.target.value})} /></div>
          <div><label className={labelCls}>Live Button Label</label><input type="text" className={inputCls} value={p.liveLabel || ''} onChange={e=>setP({...p, liveLabel:e.target.value})} placeholder="e.g. Open live project" /></div>
        </div>
        <label className="flex items-center gap-2 pt-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 accent-black dark:accent-white" checked={p.featured || false} onChange={e=>setP({...p, featured: e.target.checked})} />
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Show on Home Page (Featured)</span>
        </label>
      </div>
      <div className="mt-6 flex gap-3">
        <button type="submit" className={btnSaveCls}>Save Project</button>
        <button type="button" onClick={onCancel} className={btnCancelCls}>Cancel</button>
      </div>
    </form>
  );
}

function ExperienceSection({ experiences, onSave }) {
  const [list, setList] = useState(experiences);

  const remove = (index) => {
    if(confirm('Delete experience?')) {
      const newList = list.filter((_, i) => i !== index);
      setList(newList);
      onSave(newList);
    }
  };

  const emptyExp = {title:'', role:'', period:'', description:'', points:[], tags:[]};
  const [eData, setEData] = useState({...emptyExp, points: '', points_id: '', points_zh: '', points_ja: '', points_ko: '', tags: ''});
  const [editIndex, setEditIndex] = useState(null);
  const [editLang, setEditLang] = useState('en');

  const openExpForm = (index) => {
    const exp = index === -1 ? emptyExp : list[index];
    setEData({
      ...exp,
      points: (exp.points || []).join('\n'),
      points_id: exp.points_id ? exp.points_id.join('\n') : '',
      points_zh: exp.points_zh ? exp.points_zh.join('\n') : '',
      points_ja: exp.points_ja ? exp.points_ja.join('\n') : '',
      points_ko: exp.points_ko ? exp.points_ko.join('\n') : '',
      tags: (exp.tags || []).join(', '),
      logo: exp.logo || '',
    });
    setEditIndex(index);
    setEditLang('en');
  };

  if (editIndex !== null) {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        const obj = {...eData, 
          points: eData.points.split('\n').filter(Boolean), 
          points_id: eData.points_id ? eData.points_id.split('\n').filter(Boolean) : [], 
          points_zh: eData.points_zh ? eData.points_zh.split('\n').filter(Boolean) : [], 
          points_ja: eData.points_ja ? eData.points_ja.split('\n').filter(Boolean) : [], 
          points_ko: eData.points_ko ? eData.points_ko.split('\n').filter(Boolean) : [], 
          tags: eData.tags.split(',').map(s=>s.trim()).filter(Boolean)
        };
        delete obj.logo;
        if (eData.logo) obj.logo = eData.logo;
        const newList = [...list];
        if (editIndex === -1) newList.unshift(obj);
        else newList[editIndex] = obj;
        setList(newList);
        onSave(newList);
        setEditIndex(null);
      }} className={cardCls}>
        <h3 className="text-lg font-bold font-mono mb-4">{editIndex === -1 ? 'New Experience' : 'Edit Experience'}</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelCls}>Title / Company</label><input type="text" className={inputCls} value={eData.title} onChange={e=>setEData({...eData, title:e.target.value})} required/></div>
            <div><label className={labelCls}>Company Logo URL (optional)</label><input type="url" className={inputCls} value={eData.logo || ''} onChange={e=>setEData({...eData, logo:e.target.value})} placeholder="https://..." /></div>
          </div>
          <div><label className={labelCls}>Period (e.g. 2021 - Present)</label><input type="text" className={inputCls} value={eData.period} onChange={e=>setEData({...eData, period:e.target.value})} required/></div>
          
          <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-800/30">
            <div className="flex gap-2 mb-4">
              {['en', 'id', 'zh', 'ja', 'ko'].map(l => (
                <button type="button" key={l} onClick={()=>setEditLang(l)} className={`px-3 py-1 text-xs font-mono rounded ${editLang === l ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>{l.toUpperCase()}</button>
              ))}
            </div>
            
            <div className={editLang === 'en' ? 'block' : 'hidden'}>
              <div className="mb-3"><label className={labelCls}>Role (EN)</label><input type="text" className={inputCls} value={eData.role || ''} onChange={e=>setEData({...eData, role:e.target.value})} required/></div>
              <div className="mb-3"><label className={labelCls}>Desc (EN)</label><textarea className={`${inputCls} h-20`} value={eData.description || ''} onChange={e=>setEData({...eData, description:e.target.value})} required/></div>
              <div><label className={labelCls}>Bullet Points (EN)</label><textarea className={`${inputCls} h-32`} value={eData.points || ''} onChange={e=>setEData({...eData, points:e.target.value})} required/></div>
            </div>
            
            {['id', 'zh', 'ja', 'ko'].map(l => (
              <div key={l} className={editLang === l ? 'block' : 'hidden'}>
                <div className="mb-3"><label className={labelCls}>Role ({l.toUpperCase()})</label><input type="text" className={inputCls} value={eData[`role_${l}`] || ''} onChange={e=>setEData({...eData, [`role_${l}`]:e.target.value})} /></div>
                <div className="mb-3"><label className={labelCls}>Desc ({l.toUpperCase()})</label><textarea className={`${inputCls} h-20`} value={eData[`description_${l}`] || ''} onChange={e=>setEData({...eData, [`description_${l}`]:e.target.value})} /></div>
                <div><label className={labelCls}>Bullet Points ({l.toUpperCase()})</label><textarea className={`${inputCls} h-32`} value={eData[`points_${l}`] || ''} onChange={e=>setEData({...eData, [`points_${l}`]:e.target.value})} /></div>
              </div>
            ))}
          </div>
          <div><label className={labelCls}>Tags (comma separated)</label><input type="text" className={inputCls} value={eData.tags} onChange={e=>setEData({...eData, tags:e.target.value})} required/></div>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="submit" className={btnSaveCls}>Save Experience</button>
          <button type="button" onClick={()=>setEditIndex(null)} className={btnCancelCls}>Cancel</button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-2 mb-6">
        <h2 className="text-2xl font-bold font-mono">Experience</h2>
        <button onClick={() => openExpForm(-1)} className="bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-sm font-mono">+ New</button>
      </div>
      <div className="space-y-3">
        {list.map((e, i) => (
          <div key={i} className={`${cardCls} p-4 flex items-center justify-between`}>
            <div>
              <h3 className="font-bold">{e.title}</h3>
              <p className="text-xs text-zinc-500 font-mono mt-1">{e.role} ({e.period})</p>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>openExpForm(i)} className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white rounded text-xs font-mono">Edit</button>
              <button onClick={()=>remove(i)} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded text-xs font-mono">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function StackSection({ stack, onSave }) {
  const [s, setS] = useState(stack);
  const [newCat, setNewCat] = useState('');

  const handleAddCat = (e) => {
    e.preventDefault();
    if(newCat && !s[newCat]) {
      const obj = {...s, [newCat]: []};
      setS(obj);
      onSave(obj);
      setNewCat('');
    }
  };

  const handleDelCat = (cat) => {
    if(confirm(`Delete category ${cat}?`)) {
      const obj = {...s};
      delete obj[cat];
      setS(obj);
      onSave(obj);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-mono border-b border-zinc-200 dark:border-zinc-700 pb-2 mb-6">Tech Stack</h2>
      <div className="space-y-6">
        {Object.entries(s).map(([cat, items]) => (
          <div key={cat} className={cardCls}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-lg font-mono">{cat}</h3>
              <button onClick={()=>handleDelCat(cat)} className="text-red-500 text-xs hover:underline font-mono">Delete Category</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
              {items.map((item, i) => (
                <div key={i} className="flex items-center justify-between border border-zinc-200 dark:border-zinc-700 rounded px-2 py-1 text-sm bg-zinc-50 dark:bg-zinc-800/50">
                  <div className="flex items-center gap-2">
                    <img src={`https://cdn.simpleicons.org/${item.icon}/6b7280`} alt="" className="w-4 h-4" onError={e=>e.currentTarget.style.display='none'}/>
                    <span className="font-mono text-xs">{item.name}</span>
                  </div>
                  <button onClick={() => {
                    const arr = [...items];
                    arr.splice(i, 1);
                    const obj = {...s, [cat]: arr};
                    setS(obj);
                    onSave(obj);
                  }} className="text-red-400 hover:text-red-500 font-bold">&times;</button>
                </div>
              ))}
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              const name = e.target.name.value;
              const icon = e.target.icon.value;
              const obj = {...s, [cat]: [...items, {name, icon}]};
              setS(obj);
              onSave(obj);
              e.target.reset();
            }} className="flex gap-2">
              <input type="text" name="name" placeholder="Name (e.g. React)" className={`${inputCls} py-1 text-xs`} required/>
              <input type="text" name="icon" placeholder="SimpleIcons slug (e.g. react)" className={`${inputCls} py-1 text-xs`} required/>
              <button type="submit" className="bg-zinc-800 text-white px-3 py-1 rounded text-xs font-mono shrink-0">Add</button>
            </form>
          </div>
        ))}
        <form onSubmit={handleAddCat} className={`${cardCls} bg-zinc-50 dark:bg-zinc-900/50 border-dashed flex gap-2 items-center`}>
          <input type="text" value={newCat} onChange={e=>setNewCat(e.target.value)} placeholder="New Category Name" className={inputCls} required/>
          <button type="submit" className="bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm font-mono shrink-0">Add Category</button>
        </form>
      </div>
    </div>
  );
}

function LearningSection({ learning, onSave }) {
  const [list, setList] = useState(learning);
  const [val, setVal] = useState('');

  return (
    <div>
      <h2 className="text-2xl font-bold font-mono border-b border-zinc-200 dark:border-zinc-700 pb-2 mb-6">Currently Learning</h2>
      <div className={cardCls}>
        <div className="flex flex-wrap gap-2 mb-6">
          {list.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1 px-3 py-1 bg-zinc-100 dark:bg-zinc-900 dark:bg-zinc-700 text-black dark:text-white dark:text-black dark:text-white rounded-full text-sm font-mono border border-zinc-300 dark:border-zinc-700 dark:border-blue-800">
              {item}
              <button onClick={()=>{
                const arr = list.filter((_, idx)=>idx!==i);
                setList(arr);
                onSave(arr);
              }} className="hover:text-red-500 ml-1 font-bold">&times;</button>
            </span>
          ))}
          {list.length === 0 && <span className="text-sm text-zinc-500 font-mono">No items.</span>}
        </div>
        <form onSubmit={(e)=>{
          e.preventDefault();
          if(val && !list.includes(val)){
            const arr = [...list, val];
            setList(arr);
            onSave(arr);
            setVal('');
          }
        }} className="flex gap-2">
          <input type="text" value={val} onChange={e=>setVal(e.target.value)} placeholder="Topic (e.g. Rust, Go, Three.js)" className={inputCls} required/>
          <button type="submit" className="bg-zinc-800 text-white px-4 py-2 rounded-lg text-sm font-mono shrink-0">Add Topic</button>
        </form>
      </div>
    </div>
  );
}

function GallerySection({ gallery, onSave }) {
  const [list, setList] = useState(gallery);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({id: '', src:'', alt:'', caption:''});

  const openForm = (item) => {
    setForm(item);
    setEditing(true);
  };

  if (editing) {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        const arr = [...list];
        if (form.id && list.some(item => item.id === form.id)) {
          // Edit existing
          const idx = list.findIndex(item => item.id === form.id);
          arr[idx] = form;
        } else {
          // New item
          arr.push({...form, id: generateId()});
        }
        setList(arr);
        onSave(arr);
        setEditing(null);
      }} className={cardCls}>
        <h3 className="text-lg font-bold font-mono mb-4">{form.id && list.some(item => item.id === form.id) ? 'Edit Image' : 'Add Image'}</h3>
        <div className="space-y-4">
          <div><label className={labelCls}>Image URL</label><input type="url" className={inputCls} value={form.src} onChange={e=>setForm({...form, src:e.target.value})} required/></div>
          {form.src && <img src={form.src} alt="preview" className="h-32 object-contain bg-zinc-100 dark:bg-zinc-900 rounded" onError={e=>e.currentTarget.style.display='none'}/>}
          <div><label className={labelCls}>Caption</label><input type="text" className={inputCls} value={form.caption} onChange={e=>setForm({...form, caption:e.target.value})} required/></div>
          <div><label className={labelCls}>Alt Text</label><input type="text" className={inputCls} value={form.alt} onChange={e=>setForm({...form, alt:e.target.value})}/></div>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="submit" className={btnSaveCls}>Save Image</button>
          <button type="button" onClick={()=>setEditing(null)} className={btnCancelCls}>Cancel</button>
        </div>
      </form>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-2 mb-6">
        <h2 className="text-2xl font-bold font-mono">Standalone Gallery</h2>
        <button onClick={() => openForm({id: '', src:'', alt:'', caption:''})} className="bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-sm font-mono">+ Add Image</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {list.map((g, i) => (
          <div key={g.id} className={`${cardCls} p-2 flex flex-col`}>
            <img src={g.src} alt={g.alt} className="w-full h-32 object-cover rounded mb-2 bg-zinc-100 dark:bg-zinc-900" />
            <p className="text-xs font-bold truncate mb-2">{g.caption}</p>
            <div className="flex gap-2 mt-auto">
              <button onClick={()=>openForm(g)} className="flex-1 py-1 bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white rounded text-xs font-mono">Edit</button>
              <button onClick={()=>{
                if(confirm('Delete image?')){
                  const arr = list.filter((_, idx)=>idx!==i);
                  setList(arr);
                  onSave(arr);
                }
              }} className="flex-1 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded text-xs font-mono">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsSection({ onReset, onExport }) {
  const [curr, setCurr] = useState('');
  const [newPass, setNewPass] = useState('');
  const [msg, setMsg] = useState('');

  const handleChangePass = (e) => {
    e.preventDefault();
    if (!checkAdminPassword(curr)) {
      setMsg('Current password incorrect.');
      return;
    }
    if (newPass.length < 4) {
      setMsg('New password too short.');
      return;
    }
    setAdminPassword(newPass);
    setMsg('Password updated successfully.');
    setCurr('');
    setNewPass('');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold font-mono border-b border-zinc-200 dark:border-zinc-700 pb-2 mb-6">Settings</h2>

      <div className={`${cardCls} border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20`}>
        <h3 className="font-bold font-mono text-emerald-700 dark:text-emerald-400 mb-2">⬇ Export &amp; Publish</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
          Download file yang sudah diedit, lalu replace di project dan <code className="bg-zinc-100 dark:bg-zinc-800 px-1 rounded">git push</code> — Vercel akan otomatis deploy.
        </p>
        <button onClick={onExport} className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium font-mono transition-colors">
          ⬇ Download data.js
        </button>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-3 font-mono">
          Replace file lama di: <code>src/data.js</code>
        </p>
      </div>

      <div className={cardCls}>
        <h3 className="font-bold font-mono mb-4">Change Admin Password</h3>
        <form onSubmit={handleChangePass} className="max-w-sm space-y-4">
          <div><label className={labelCls}>Current Password</label><input type="password" value={curr} onChange={e=>setCurr(e.target.value)} className={inputCls} required/></div>
          <div><label className={labelCls}>New Password</label><input type="password" value={newPass} onChange={e=>setNewPass(e.target.value)} className={inputCls} required/></div>
          {msg && <p className={`text-xs font-mono ${msg.includes('success') ? 'text-emerald-500' : 'text-red-500'}`}>{msg}</p>}
          <button type="submit" className={btnSaveCls}>Update Password</button>
        </form>
      </div>

      <div className={`${cardCls} border-red-200 dark:border-red-900/50 bg-red-50/50 dark:bg-red-950/20`}>
        <h3 className="font-bold font-mono text-red-600 dark:text-red-400 mb-2">Danger Zone</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Reset semua data ke template default. Pastikan sudah download data.js terlebih dahulu.</p>
        <button onClick={onReset} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium font-mono transition-colors">
          Reset All Data to Defaults
        </button>
      </div>
    </div>
  );
}


function BlogForm({ post, onSave, onCancel }) {
  const [bData, setBData] = useState({...post, tags: (post.tags||[]).join(', '), title_zh: post.title_zh || '', excerpt_zh: post.excerpt_zh || '', content_zh: post.content_zh || '', title_ja: post.title_ja || '', excerpt_ja: post.excerpt_ja || '', content_ja: post.content_ja || '', title_ko: post.title_ko || '', excerpt_ko: post.excerpt_ko || '', content_ko: post.content_ko || ''});
  const [editLang, setEditLang] = useState('en');

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const obj = {...bData, tags: bData.tags.split(',').map(s=>s.trim()).filter(Boolean), slug: generateSlug(bData.title)};
      onSave(obj);
    }} className={cardCls}>
      <h3 className="text-lg font-bold font-mono mb-4">{!post.slug ? 'New Post' : 'Edit Post'}</h3>
      <div className="space-y-4">
        <div><label className={labelCls}>Date (YYYY-MM-DD)</label><input type="date" className={inputCls} value={bData.date} onChange={e=>setBData({...bData, date:e.target.value})} required/></div>
        
        <div className="border border-zinc-200 dark:border-zinc-700 rounded-lg p-4 bg-zinc-50 dark:bg-zinc-800/30">
          <div className="flex gap-2 mb-4">
            {['en', 'id', 'zh', 'ja', 'ko'].map(l => (
              <button type="button" key={l} onClick={()=>setEditLang(l)} className={`px-3 py-1 text-xs font-mono rounded ${editLang === l ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'}`}>{l.toUpperCase()}</button>
            ))}
          </div>
          
          <div className={editLang === 'en' ? 'block' : 'hidden'}>
            <div className="mb-3"><label className={labelCls}>Title (EN)</label><input type="text" className={inputCls} value={bData.title || ''} onChange={e=>setBData({...bData, title:e.target.value})} required/></div>
            <div className="mb-3"><label className={labelCls}>Excerpt (EN)</label><textarea className={`${inputCls} h-20`} value={bData.excerpt || ''} onChange={e=>setBData({...bData, excerpt:e.target.value})} required/></div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className={labelCls}>Content (EN)</label>
              </div>
              <div className="bg-white dark:bg-zinc-900 text-black dark:text-white"><ReactQuill theme="snow" value={bData.content || ''} onChange={val=>setBData({...bData, content:val})} /></div>
            </div>
          </div>
          
          {['id', 'zh', 'ja', 'ko'].map(l => (
            <div key={l} className={editLang === l ? 'block' : 'hidden'}>
              <div className="mb-3"><label className={labelCls}>Title ({l.toUpperCase()})</label><input type="text" className={inputCls} value={bData[`title_${l}`] || ''} onChange={e=>setBData({...bData, [`title_${l}`]:e.target.value})} /></div>
              <div className="mb-3"><label className={labelCls}>Excerpt ({l.toUpperCase()})</label><textarea className={`${inputCls} h-20`} value={bData[`excerpt_${l}`] || ''} onChange={e=>setBData({...bData, [`excerpt_${l}`]:e.target.value})} /></div>
              <div className="mb-3"><label className={labelCls}>Content ({l.toUpperCase()})</label><div className="bg-white dark:bg-zinc-900 text-black dark:text-white"><ReactQuill theme="snow" value={bData[`content_${l}`] || ''} onChange={val=>setBData({...bData, [`content_${l}`]:val})} /></div></div>
            </div>
          ))}
        </div>
        <div><label className={labelCls}>Tags (comma separated)</label><input type="text" className={inputCls} value={bData.tags} onChange={e=>setBData({...bData, tags:e.target.value})} /></div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 accent-black dark:accent-white" checked={bData.draft || false} onChange={e=>setBData({...bData, draft: e.target.checked})} />
          <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">Draft (hide from public)</span>
        </label>
      </div>
      <div className="mt-6 flex gap-3">
        <button type="submit" className={btnSaveCls}>Save Post</button>
        <button type="button" onClick={onCancel} className={btnCancelCls}>Cancel</button>
      </div>
    </form>
  );
}

function BlogSection({ blogs = [], onSave }) {
  const [list, setList] = useState(blogs);
  const [editing, setEditing] = useState(null);

  const remove = (index) => {
    if(confirm('Delete post?')) {
      const newList = list.filter((_, i) => i !== index);
      setList(newList);
      onSave(newList);
    }
  };

  if (editing !== null) {
    const post = editing === 'new' ? {title:'', title_id:'', title_zh:'', excerpt:'', excerpt_id:'', excerpt_zh:'', content:'', content_id:'', content_zh:'', date: new Date().toISOString().split('T')[0], tags:[], draft: false} : list[editing];
    return <BlogForm post={post} onSave={(obj) => {
      const newList = [...list];
      if (editing === 'new') newList.unshift(obj);
      else newList[editing] = obj;
      setList(newList);
      onSave(newList);
      setEditing(null);
    }} onCancel={() => setEditing(null)} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-700 pb-2 mb-6">
        <h2 className="text-2xl font-bold font-mono">Blog</h2>
        <button onClick={() => setEditing('new')} className="bg-zinc-800 text-white px-3 py-1.5 rounded-lg text-sm font-mono">+ New</button>
      </div>
      <div className="space-y-3">
        {list.map((b, i) => (
          <div key={i} className={`${cardCls} p-4 flex items-center justify-between`}>
            <div>
              <h3 className="font-bold">{b.title} {b.draft && <span className="text-red-500 text-xs ml-1">(Draft)</span>}</h3>
              <p className="text-xs text-zinc-500 font-mono mt-1">{b.date}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>setEditing(i)} className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700 text-black dark:text-white dark:text-black dark:text-white rounded text-xs font-mono">Edit</button>
              <button onClick={()=>remove(i)} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded text-xs font-mono">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
