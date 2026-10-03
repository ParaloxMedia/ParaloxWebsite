// Shared by the static build and the optional Node server.
const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// JSON inside <script>: escape "<" so "</script>" in text can't close the tag.
const jsonForScript = (o) => JSON.stringify(o).replace(/</g, '\\u003c');

// Site links and contact details shown with every page outline.
const SITE_NAV = [['/', 'Home'], ['/ai', 'AI'], ['/engineering', 'Engineering'], ['/media', 'Media'], ['/growth', 'Growth'],
  ['/works', 'Work'], ['/about', 'About'], ['/pulse', 'Pulse'], ['/contact', 'Contact']];
const NAP = 'Paralox Media · 14 Sir Baron Jayathilake Mawatha, Colombo 00100, Sri Lanka · +94 75 032 8833 · info@paraloxmedia.com';

/** A page's text outline as plain HTML, for crawlers that do not run JavaScript. React replaces it on load. */
function renderBody(body) {
  const item = (it) => `<li>${it.href ? `<a href="${esc(it.href)}">${esc(it.name)}</a>` : `<strong>${esc(it.name)}</strong>`}${it.text ? `: ${esc(it.text)}` : ''}</li>`;
  const section = (s) => `<section>${s.h2 ? `<h2>${esc(s.h2)}</h2>` : ''}${(s.paras || []).map((p) => `<p>${esc(p)}</p>`).join('')}`
    + `${s.items?.length ? `<ul>${s.items.map(item).join('')}</ul>` : ''}${s.more ? `<p><a href="${esc(s.more.href)}">${esc(s.more.label)}</a></p>` : ''}</section>`;
  return '<div class="prerender">'
    + '<style>.prerender{max-width:760px;margin:0 auto;padding:110px 20px 60px;color:#E9E3FA;line-height:1.6}.prerender a{color:#C9B5FF}html.is-loading .prerender{visibility:hidden}</style>'
    + `<nav aria-label="Site">${SITE_NAV.map(([h, t]) => `<a href="${h}">${t}</a>`).join(' · ')}</nav>`
    + `<main><h1>${esc(body.h1)}</h1>${body.intro ? `<p>${esc(body.intro)}</p>` : ''}${(body.sections || []).map(section).join('')}</main>`
    + `<footer><p>${esc(NAP)}</p></footer></div>`;
}

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
    .replace('</head>', `    ${tags}\n  </head>`)
    // Replaces any outline already in the template (server.cjs renders from the built home page).
    .replace(/<div id="root">[\s\S]*?<\/div>(?=\s*<\/body>)/, `<div id="root">${status !== 404 && !meta.private && meta.body ? renderBody(meta.body) : ''}</div>`);
}


module.exports = { renderIndex };
