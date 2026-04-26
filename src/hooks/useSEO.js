import { useEffect } from 'react';

export function useSEO({ title, description }) {
  useEffect(() => {
    document.title = title;
    let el = document.querySelector('meta[name="description"]');
    if (el) el.setAttribute('content', description);

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
  }, [title, description]);
}
