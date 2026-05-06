import { useEffect } from 'react';

function setMeta(selector, attr, value) {
  const el = document.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

export function useSEO({ title, description }) {
  useEffect(() => {
    const url = window.location.href;

    document.title = title;

    setMeta('meta[name="description"]',            'content', description);
    setMeta('meta[property="og:title"]',           'content', title);
    setMeta('meta[property="og:description"]',     'content', description);
    setMeta('meta[property="og:url"]',             'content', url);
    setMeta('meta[name="twitter:title"]',          'content', title);
    setMeta('meta[name="twitter:description"]',    'content', description);
    setMeta('link[rel="canonical"]',               'href',    url);
  }, [title, description]);
}
