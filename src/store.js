import { useState, useEffect } from 'react';
import {
  greetings as defaultGreetings,
  stack as defaultStack,
  experiences as defaultExperiences,
  projects as defaultProjects,
  currentlyLearning as defaultCurrentlyLearning,
  defaultProfile,
} from './data';

// ── Storage keys ──────────────────────────────────────────────────
export const ADMIN_PASSWORD_KEY = 'portfolio_admin_pass';
export const DEFAULT_PASSWORD = 'admin123';
const DATA_STORAGE_KEY = 'portfolio_data';

// ── Default data ──────────────────────────────────────────────────
export const defaultData = {
  greetings: defaultGreetings,
  stack: defaultStack,
  experiences: defaultExperiences,
  projects: defaultProjects,
  currentlyLearning: defaultCurrentlyLearning,
  profile: defaultProfile,
  gallery: [],
  blogs: [],
};

// ── In-memory cache ───────────────────────────────────────────────
let cachedData = null;
const listeners = new Set();

function notify() {
  listeners.forEach(fn => fn());
}

function mergeDefaults(data) {
  return {
    ...defaultData,
    ...data,
    profile: { ...defaultProfile, ...(data.profile || {}) },
  };
}

// ── Read from localStorage (falls back to data.js defaults) ────────
export function getCachedData() {
  if (cachedData) return cachedData;
  try {
    const stored = localStorage.getItem(DATA_STORAGE_KEY);
    if (stored) {
      cachedData = mergeDefaults(JSON.parse(stored));
      return cachedData;
    }
  } catch (e) {
    console.warn('Failed to read localStorage:', e.message);
  }
  cachedData = { ...defaultData, profile: { ...defaultProfile } };
  return cachedData;
}

// ── Subscribe to data changes ─────────────────────────────────────
export function onDataChange(fn) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

// ── Write to localStorage ─────────────────────────────────────────
export function saveToLocal(data) {
  try {
    cachedData = mergeDefaults(data);
    localStorage.setItem(DATA_STORAGE_KEY, JSON.stringify(cachedData));
    notify();
    return true;
  } catch (e) {
    console.warn('Failed to save to localStorage:', e.message);
    return false;
  }
}

// ── Reset to defaults (clears localStorage) ───────────────────────
export function resetToDefaults() {
  localStorage.removeItem(DATA_STORAGE_KEY);
  cachedData = { ...defaultData, profile: { ...defaultProfile } };
  notify();
}

// ── Export: generate & download data.js ───────────────────────────
export function exportDataJs(data) {
  const d = data || getCachedData();
  const content = `// ── Portfolio data ──

export const defaultProfile = ${JSON.stringify(d.profile, null, 2)};

export const greetings = ${JSON.stringify(d.greetings, null, 2)};

export const stack = ${JSON.stringify(d.stack, null, 2)};

export const experiences = ${JSON.stringify(d.experiences, null, 2)};

export const projects = ${JSON.stringify(d.projects, null, 2)};

export const currentlyLearning = ${JSON.stringify(d.currentlyLearning, null, 2)};
`;
  const blob = new Blob([content], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.js';
  a.click();
  URL.revokeObjectURL(url);
}

export async function copyDataJs(data) {
  const d = data || getCachedData();
  const content = `// ── Portfolio data ──

export const defaultProfile = ${JSON.stringify(d.profile, null, 2)};

export const greetings = ${JSON.stringify(d.greetings, null, 2)};

export const stack = ${JSON.stringify(d.stack, null, 2)};

export const experiences = ${JSON.stringify(d.experiences, null, 2)};

export const projects = ${JSON.stringify(d.projects, null, 2)};

export const currentlyLearning = ${JSON.stringify(d.currentlyLearning, null, 2)};
`;
  try {
    await navigator.clipboard.writeText(content);
    return true;
  } catch (e) {
    console.error('Failed to copy:', e);
    return false;
  }
}

// ── Admin auth ────────────────────────────────────────────────────
export function checkAdminPassword(password) {
  const stored = localStorage.getItem(ADMIN_PASSWORD_KEY) || DEFAULT_PASSWORD;
  return password === stored;
}

export function setAdminPassword(newPassword) {
  localStorage.setItem(ADMIN_PASSWORD_KEY, newPassword);
}

// ── Utility ───────────────────────────────────────────────────────
export function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function generateId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

// ── Language ──────────────────────────────────────────────────────
export const LANGUAGES = ['en', 'id', 'zh'];
export const LANG_LABELS = { en: 'EN', id: 'ID', zh: '中文' };

export function getLanguage() {
  return localStorage.getItem('portfolio_lang') || 'en';
}

export function setLanguage(lang) {
  localStorage.setItem('portfolio_lang', lang);
  window.dispatchEvent(new Event('portfolio-lang-changed'));
}

// ── Custom Hooks ──────────────────────────────────────────────────
export function usePortfolioData() {
  const [data, setData] = useState(getCachedData);

  useEffect(() => {
    return onDataChange(() => setData(getCachedData()));
  }, []);

  return data;
}

export function useLanguage() {
  const [lang, setLang] = useState(getLanguage);

  useEffect(() => {
    const handler = () => setLang(getLanguage());
    window.addEventListener('portfolio-lang-changed', handler);
    return () => window.removeEventListener('portfolio-lang-changed', handler);
  }, []);

  return lang;
}

export function getLoc(lang, base, id, zh, ja, ko) {
  if (lang === 'zh' && zh) return zh;
  if (lang === 'ja' && ja) return ja;
  if (lang === 'ko' && ko) return ko;
  if (lang === 'id' && id) return id;
  return base;
}
