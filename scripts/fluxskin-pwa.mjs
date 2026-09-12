/**
 * FluxSkin-owned PWA and social-preview helpers.
 *
 * This module has no dependency on the platform that originally scaffolded the
 * project. It is shared by Vite and Nitro and only emits standard web metadata.
 */

/** @typedef {{ title?: string, description?: string }} SiteMeta */
/** @typedef {{ host?: string, site?: SiteMeta, documentTitle?: string }} HeadOptions */
/** @typedef {{ push: (chunk: Uint8Array|string) => Uint8Array[], flush: () => Uint8Array[] }} HeadInjector */

export const FLUXSKIN_NAME = "FluxSkin";
export const FLUXSKIN_URL = "https://fluxskin.ru";
export const FLUXSKIN_MANIFEST = "/manifest.webmanifest";
export const FLUXSKIN_ICON = "/favicon.svg";
export const FLUXSKIN_OG_IMAGE = "/og.jpg";

/** @param {unknown} value */
export function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** @param {unknown} hostHeader */
export function publicAppHost(hostHeader) {
  const host = String(hostHeader ?? "")
    .split(",")[0]
    .trim()
    .split(":")[0]
    .toLowerCase();
  if (!host || !/^[a-z0-9.-]+$/.test(host) || !host.includes(".")) return "";
  if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) return "";
  if (host === "localhost" || host.endsWith(".localhost")) return "";
  return host;
}

/** @param {unknown} hostHeader */
export function resolvePublicHost(hostHeader) {
  return (
    publicAppHost(process.env?.VITE_PUBLIC_HOSTNAME) ||
    publicAppHost(hostHeader) ||
    new URL(FLUXSKIN_URL).hostname
  );
}

/** @param {unknown} pathname */
export function isDocumentPath(pathname) {
  const path = String(pathname ?? "");
  return (
    !path.startsWith("/api/") &&
    !path.startsWith("/@") &&
    !path.startsWith("/node_modules") &&
    !path.startsWith("/__vite") &&
    !/\.[a-z0-9]+$/i.test(path)
  );
}

export function renderWebManifest() {
  return JSON.stringify(
    {
      name: FLUXSKIN_NAME,
      short_name: FLUXSKIN_NAME,
      id: "/",
      start_url: "/",
      scope: "/",
      display: "standalone",
      background_color: "#09090b",
      theme_color: "#09090b",
      icons: [{ src: FLUXSKIN_ICON, sizes: "any", type: "image/svg+xml", purpose: "any maskable" }],
    },
    null,
    2,
  );
}

/** @param {string} appName */
export function pwaHeadTags(appName = FLUXSKIN_NAME) {
  return [
    `<link rel="manifest" href="${FLUXSKIN_MANIFEST}">`,
    `<link rel="icon" href="${FLUXSKIN_ICON}" type="image/svg+xml">`,
    `<link rel="apple-touch-icon" href="${FLUXSKIN_ICON}">`,
    `<meta name="apple-mobile-web-app-title" content="${escapeHtml(appName)}">`,
    '<meta name="apple-mobile-web-app-capable" content="yes">',
    '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">',
    '<meta name="theme-color" content="#09090b">',
  ];
}

/** @param {string} html */
function readTitle(html) {
  const match = String(html ?? "").match(/<title\b[^>]*>([^<]*)<\/title>/i);
  return match ? match[1].trim() : FLUXSKIN_NAME;
}

/** @param {string} html */
function metaTagsToRemove(html) {
  return String(html).replace(/<meta\b[^>]*>/gi, (tag) => {
    const attrs = [...tag.matchAll(/\b(property|name)\s*=\s*["']([^"']+)["']/gi)];
    return attrs.some(([, , value]) =>
      /^(og:|twitter:)/i.test(value) || /^(description|theme-color)$/i.test(value),
    ) ? "" : tag;
  });
}

/** @param {HeadOptions} options */
export function ogHeadTags({ host = "", site = {}, documentTitle = FLUXSKIN_NAME } = {}) {
  const title = String(site.title ?? documentTitle ?? FLUXSKIN_NAME).trim() || FLUXSKIN_NAME;
  const description = String(site.description ?? "CS2 skins, inventory and loadouts in FluxSkin.").trim();
  const publicHost = resolvePublicHost(host);
  const image = `https://${publicHost}${FLUXSKIN_OG_IMAGE}`;
  return [
    '<meta name="twitter:card" content="summary_large_image">',
    `<meta name="description" content="${escapeHtml(description)}">`,
    '<meta property="og:type" content="website">',
    `<meta property="og:site_name" content="${escapeHtml(FLUXSKIN_NAME)}">`,
    `<meta property="og:title" content="${escapeHtml(title)}">`,
    `<meta property="og:description" content="${escapeHtml(description)}">`,
    `<meta property="og:url" content="${escapeHtml(FLUXSKIN_URL)}">`,
    `<meta property="og:image" content="${escapeHtml(image)}">`,
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
  ];
}

/** @param {string} html @param {HeadOptions} options */
export function injectFluxSkinHead(html, { host = "", site = {} } = {}) {
  const source = String(html);
  if (!/<head\b[^>]*>/i.test(source)) return source;
  const cleaned = metaTagsToRemove(source);
  const title = readTitle(cleaned);
  const tags = [
    ...pwaHeadTags(site.title || FLUXSKIN_NAME),
    ...ogHeadTags({ host, site, documentTitle: title }),
  ];
  const head = tags.join("\n    ");
  if (cleaned.includes("<!-- fluxskin-head -->")) return cleaned;
  return cleaned.replace(/<\/head>/i, `    <!-- fluxskin-head -->\n    ${head}\n  </head>`);
}

/** @param {HeadOptions} options @returns {HeadInjector} */
export function createHeadInjector({ host = "", site = {} } = {}) {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let pending = "";
  let injected = false;
  const marker = "</head>";
  return {
    /** @param {Uint8Array|string} chunk */
    push(chunk) {
      if (injected) return [typeof chunk === "string" ? encoder.encode(chunk) : chunk];
      pending += typeof chunk === "string" ? chunk : decoder.decode(chunk, { stream: true });
      const index = pending.toLowerCase().indexOf(marker);
      if (index < 0) return [];
      const html = injectFluxSkinHead(pending, { host, site });
      injected = true;
      return [encoder.encode(html)];
    },
    flush() {
      if (injected) return [];
      injected = true;
      return [encoder.encode(injectFluxSkinHead(pending, { host, site }))];
    },
  };
}
