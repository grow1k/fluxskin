import assert from "node:assert/strict";
import test from "node:test";
import {
  FLUXSKIN_ICON,
  FLUXSKIN_MANIFEST,
  FLUXSKIN_NAME,
  FLUXSKIN_OG_IMAGE,
  createHeadInjector,
  injectFluxSkinHead,
  isDocumentPath,
  publicAppHost,
  renderWebManifest,
} from "./fluxskin-pwa.mjs";

test("renders a FluxSkin-owned manifest", () => {
  const manifest = JSON.parse(renderWebManifest());
  assert.equal(manifest.name, FLUXSKIN_NAME);
  assert.equal(manifest.short_name, FLUXSKIN_NAME);
  assert.equal(manifest.start_url, "/");
  assert.equal(manifest.icons[0].src, FLUXSKIN_ICON);
  assert.doesNotMatch(renderWebManifest(), /grok/i);
});

test("injects standard PWA and OG metadata", () => {
  const out = injectFluxSkinHead("<html><head><title>FluxSkin</title></head><body></body></html>", {
    host: "fluxskin.ru",
  });
  assert.match(out, new RegExp(`href="${FLUXSKIN_MANIFEST}"`));
  assert.match(out, new RegExp(`content="https://fluxskin\\.ru${FLUXSKIN_OG_IMAGE}"`));
  assert.match(out, /property="og:type" content="website"/);
  assert.match(out, /property="og:site_name" content="FluxSkin"/);
  assert.doesNotMatch(out, /grok/i);
});

test("replaces stale social metadata without duplicating it", () => {
  const html = '<html><head><meta property="og:title" content="Old"><meta name="twitter:card" content="summary"></head></html>';
  const once = injectFluxSkinHead(html, { host: "fluxskin.ru" });
  const twice = injectFluxSkinHead(once, { host: "fluxskin.ru" });
  assert.equal(once, twice);
  assert.doesNotMatch(once, /content="Old"/);
  assert.equal(once.split('property="og:title"').length - 1, 1);
  assert.equal(once.split('name="twitter:card"').length - 1, 1);
});

test("escapes site metadata", () => {
  const out = injectFluxSkinHead("<html><head></head></html>", {
    host: "fluxskin.ru",
    site: { title: '"><script>alert(1)</script>', description: "A & B" },
  });
  assert.match(out, /&quot;&gt;&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.match(out, /A &amp; B/);
  assert.doesNotMatch(out, /<script>alert\(1\)/);
});

test("keeps local development host out of absolute social URLs", () => {
  assert.equal(publicAppHost("localhost:8080"), "");
  assert.equal(publicAppHost("127.0.0.1:8080"), "");
});

test("document path detection ignores assets and APIs", () => {
  assert.equal(isDocumentPath("/"), true);
  assert.equal(isDocumentPath("/catalog"), true);
  assert.equal(isDocumentPath("/api/health"), false);
  assert.equal(isDocumentPath("/assets/app.js"), false);
});

test("stream injector handles a head boundary split across chunks", () => {
  const injector = createHeadInjector({ host: "fluxskin.ru" });
  assert.deepEqual(injector.push(new TextEncoder().encode("<html><head><title>Flux")), []);
  const out = injector.push(new TextEncoder().encode("Skin</title></head><body>ok</body></html>"));
  const html = new TextDecoder().decode(out[0]);
  assert.match(html, /fluxskin-head/);
  assert.match(html, /og:image/);
  assert.match(html, /<body>ok<\/body>/);
  assert.deepEqual(injector.flush(), []);
});
