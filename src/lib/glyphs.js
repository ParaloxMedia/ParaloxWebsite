// Line glyphs drawn on a 48×48 grid (3px stroke, round joins) — the Paralox service icon style.
export const GLYPHS = {
  ai: '<rect x="12" y="12" width="24" height="24" rx="6"/><path d="M19 6v6M29 6v6M19 36v6M29 36v6M6 19h6M6 29h6M36 19h6M36 29h6"/><path d="M24 17.5c.8 4 2.5 5.7 6.5 6.5-4 .8-5.7 2.5-6.5 6.5-.8-4-2.5-5.7-6.5-6.5 4-.8 5.7-2.5 6.5-6.5z"/>',
  code: '<path d="M16 14 6 24l10 10M32 14l10 10-10 10M27.5 9 20.5 39"/>',
  play: '<rect x="5" y="10" width="38" height="28" rx="7"/><path d="M20 17.5v13l10.5-6.5z"/>',
  growth: '<path d="M6 30c13-3 24-9 33-19M31 10h9v9M14 41v-6M24 41v-10M34 41v-14"/>',
  chat: '<path d="M11 10h26a5 5 0 0 1 5 5v13a5 5 0 0 1-5 5H23l-9 7v-7h-3a5 5 0 0 1-5-5V15a5 5 0 0 1 5-5z"/><path d="M15 19h18M15 25h11"/>',
  agent: '<rect x="9" y="15" width="30" height="22" rx="9"/><path d="M24 15V9"/><circle cx="24" cy="7" r="1.5"/><path d="M18 24.5h2M28 24.5h2"/><path d="M5 24v6M43 24v6"/>',
  flow: '<circle cx="11" cy="11" r="5"/><circle cx="37" cy="24" r="5"/><circle cx="11" cy="37" r="5"/><path d="M16 11h6a10 10 0 0 1 10 10M32 27a10 10 0 0 1-10 10h-6"/>',
  data: '<ellipse cx="24" cy="11" rx="14" ry="5"/><path d="M10 11v26c0 2.8 6.3 5 14 5s14-2.2 14-5V11M10 24c0 2.8 6.3 5 14 5s14-2.2 14-5"/>',
  cloud: '<path d="M14 36h21a8 8 0 0 0 1.2-15.9A11 11 0 0 0 15 17.5 9.3 9.3 0 0 0 14 36z"/>',
  api: '<path d="M18 7v8M30 7v8M13 15h22v7a11 11 0 0 1-22 0zM24 33v8"/>',
  spark: '<path d="M24 7c1.6 8.3 5.2 11.9 13.5 13.5-8.3 1.6-11.9 5.2-13.5 13.5-1.6-8.3-5.2-11.9-13.5-13.5C18.8 18.9 22.4 15.3 24 7z"/><path d="M38 33c.5 2.7 1.6 3.8 4.3 4.3-2.7.5-3.8 1.6-4.3 4.3-.5-2.7-1.6-3.8-4.3-4.3 2.7-.5 3.8-1.6 4.3-4.3z"/>',
  audio: '<path d="M8 20v8M16 14v20M24 8v32M32 16v16M40 21v6"/>',
  search: '<circle cx="21" cy="21" r="13"/><path d="M30.5 30.5 41 41"/>',
  funnel: '<path d="M7 9h34L28 25v12l-8 4V25z"/>',
  camera: '<rect x="5" y="14" width="38" height="26" rx="7"/><path d="M17 14l3-6h8l3 6"/><circle cx="24" cy="27" r="7"/>',
  calendar: '<rect x="7" y="10" width="34" height="31" rx="6"/><path d="M7 19h34M16 6v8M32 6v8M16 28h5M27 28h5M16 34h5"/>',
  doc: '<path d="M13 6h15l9 9v27H13z"/><path d="M28 6v9h9M19 24h12M19 30h12M19 36h7"/>',
  check: '<circle cx="24" cy="24" r="17"/><path d="M16 24.5l5.5 5.5L32 19"/>',
  mail: '<rect x="6" y="11" width="36" height="26" rx="6"/><path d="M8 14l16 12 16-12"/>',
  user: '<circle cx="24" cy="16" r="8"/><path d="M9 41c1.5-8 7.5-12 15-12s13.5 4 15 12"/>',
  browser: '<rect x="5" y="9" width="38" height="30" rx="6"/><path d="M5 17h38M11 13h.01M15 13h.01M19 13h.01M17 25l-5 4.5 5 4.5M31 25l5 4.5-5 4.5"/>',
};

export const STAR_PATH = 'M24 4c2 10.5 6.5 15 17 17-10.5 2-15 6.5-17 17-2-10.5-6.5-15-17-17C17.5 19 22 14.5 24 4z';

// Rounded-rect path helper for the glass scenes
export const rr = (x, y, w, h, r) =>
  `M${x + r} ${y}H${x + w - r}A${r} ${r} 0 0 1 ${x + w} ${y + r}V${y + h - r}A${r} ${r} 0 0 1 ${x + w - r} ${y + h}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + h - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;
export const circ = (cx, cy, r) => `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
