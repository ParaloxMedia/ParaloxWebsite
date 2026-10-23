import { useEffect, useRef } from 'react';

/**
 * Instagram posts via Instagram's official embed: the video plays on the page but stays
 * hosted on Instagram, so views count there. embed.js swaps each placeholder for Instagram's
 * player; the placeholders are injected as raw HTML so React never reconciles that swap.
 */
export default function InstagramPosts({ posts, className = '' }) {
  const box = useRef(null);
  useEffect(() => {
    const run = () => window.instgrm?.Embeds.process();
    if (window.instgrm) { run(); return; }
    let s = document.querySelector('script[data-ig-embed]');
    if (!s) {
      s = Object.assign(document.createElement('script'), { src: 'https://www.instagram.com/embed.js', async: true });
      s.dataset.igEmbed = '';
      document.body.appendChild(s);
    }
    s.addEventListener('load', run);
    return () => s.removeEventListener('load', run);
  }, []);
  const html = posts.map((code) => {
    const url = `https://www.instagram.com/p/${code}/`;
    return `<div class="pj-ig-item"><blockquote class="instagram-media" data-instgrm-permalink="${url}?utm_source=ig_embed" data-instgrm-version="14"><a href="${url}" target="_blank" rel="noopener">View this post on Instagram</a></blockquote></div>`;
  }).join('');
  return <div ref={box} className={`pj-ig ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
