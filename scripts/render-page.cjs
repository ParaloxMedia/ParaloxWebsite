// Shared by the static build and the optional Node server.
const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// JSON inside <script>: escape "<" so "</script>" in text can't close the tag.
const jsonForScript = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

function renderIndex(html, { key, meta, status }, origin = 'https://paraloxmedia.com') {
  if (!meta) return html;
  const url = `${origin}${meta.canonical || key}`;
  const image = /^https?:/.test(meta.image) ? meta.image : `${origin}${encodeURI(decodeURI(meta.image))}`;
  const ogTitle = meta.ogTitle || meta.title;
  const tags = [
    `<meta name="description" content="${esc(meta.description)}" />`,
    meta.private ? '<meta name="robots" content="noindex, nofollow, noarchive" />'
      : status === 404 ? '<meta name="robots" content="noindex" />'
      : '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />',
    // Private pages (the shared rate card) never expose their link in the HTML.
    meta.private && '<meta name="referrer" content="no-referrer" />',
    status !== 404 && !meta.private && `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="${esc(meta.type || 'website')}" />`,
    `<meta property="og:site_name" content="Paralox Media" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:title" content="${esc(ogTitle)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    !meta.private && `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:secure_url" content="${esc(image)}" />`,
    `<meta property="og:image:alt" content="${esc(ogTitle)}" />`,
    meta.width && `<meta property="og:image:width" content="${meta.width}" />`,
    meta.height && `<meta property="og:image:height" content="${meta.height}" />`,
    meta.published && `<meta property="article:published_time" content="${esc(meta.published)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(ogTitle)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
    status !== 404 && !meta.private && meta.jsonld && `<script type="application/ld+json">${jsonForScript(meta.jsonld)}</script>`,
  ].filter(Boolean).join('\n    ');
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(status === 404 ? 'Page not found | Paralox Media' : meta.title)}</title>`)
    .replace(/\s*<meta\s+(?:name="(?:description|robots|twitter:[^"]*)"|property="(?:og|article):[^"]*")[^>]*>/gi, '')
    .replace(/\s*<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '')
    .replace('</head>', `    ${tags}\n  </head>`);
}


module.exports = { renderIndex };
