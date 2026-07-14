import { useState, useEffect } from 'react';
import {
  greetings as defaultGreetings,
  stack as defaultStack,
  experiences as defaultExperiences,
  projects as defaultProjects,
  currentlyLearning as defaultCurrentlyLearning,
} from './data';

// ── API Config ────────────────────────────────────────────────────
const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost:5000'
  : ''; // VPS: same origin (frontend & backend on one server)

// ── Auth keys (still in localStorage) ─────────────────────────────
export const ADMIN_PASSWORD_KEY = 'portfolio_admin_pass';
export const DEFAULT_PASSWORD = 'admin123';

// ── Default profile ───────────────────────────────────────────────
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
  cvUrl: '',
};

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

// ── API helpers ───────────────────────────────────────────────────
function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000); // 3s timeout
  return fetch(url, { ...options, signal: controller.signal }).finally(() => clearTimeout(timeout));
}

async function apiGet(path) {
  const res = await fetchWithTimeout(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json();
}

async function apiPost(path, body, password) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${password}`
    },
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  return res.json();
}

function mergeDefaults(backendData) {
  return {
    ...defaultData,
    ...backendData,
    profile: { ...defaultProfile, ...(backendData.profile || {}) },
  };
}

// ── Read ──────────────────────────────────────────────────────────
export async function getPortfolioData() {
  try {
    const data = await apiGet('/api/data');
    if (data && Object.keys(data).length > 0) {
      cachedData = mergeDefaults(data);
      return cachedData;
    }
  } catch (e) {
    console.warn('Failed to fetch portfolio data, using cache/defaults:', e.message);
  }
  if (cachedData) return cachedData;
  return { ...defaultData, profile: { ...defaultProfile } };
}

export function getCachedData() {
  if (cachedData) return cachedData;
  return { ...defaultData, profile: { ...defaultProfile } };
}

// ── Subscribe to data changes ─────────────────────────────────────
export function onDataChange(fn) {
  listeners.add(fn);
  return () => { listeners.delete(fn); };
}

// ── Write ─────────────────────────────────────────────────────────
export async function setPortfolioData(data, password) {
  try {
    await apiPost('/api/data', data, password);
    cachedData = mergeDefaults(data);
    notify();
    return true;
  } catch (e) {
    console.warn('Failed to save portfolio data:', e.message);
    return false;
  }
}

// Alias
export async function saveToBackend(data, password) {
  return setPortfolioData(data, password);
}

// ── Reset ─────────────────────────────────────────────────────────
export async function resetPortfolioData(password) {
  try {
    await apiPost('/api/data', defaultData, password);
    cachedData = { ...defaultData, profile: { ...defaultProfile } };
    notify();
  } catch (e) {
    console.warn('Failed to reset data:', e.message);
  }
}

// ── Sync (called on app load) ─────────────────────────────────────
export async function syncPortfolioData() {
  return getPortfolioData();
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
    let cancelled = false;
    getPortfolioData().then(d => {
      if (!cancelled) setData(d);
    });
    return onDataChange(() => {
      getPortfolioData().then(d => {
        if (!cancelled) setData(d);
      });
    });
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
