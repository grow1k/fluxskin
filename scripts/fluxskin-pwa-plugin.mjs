import { createHeadInjector, injectFluxSkinHead, renderWebManifest, isDocumentPath } from "./fluxskin-pwa.mjs";

const MANIFEST_PATH = "/manifest.webmanifest";

function requestHost(req) {
  const forwarded = req.headers["x-forwarded-host"];
  const host = forwarded ?? req.headers.host ?? req.headers[":authority"] ?? "";
  return Array.isArray(host) ? host[0] : host;
}

function serveManifest(middlewares) {
  middlewares.use((req, res, next) => {
    if ((req.method ?? "GET").toUpperCase() !== "GET") return next();
    const path = (req.url ?? "").split("?", 1)[0];
    if (path !== MANIFEST_PATH) return next();
    const body = Buffer.from(renderWebManifest(), "utf8");
    res.statusCode = 200;
    res.setHeader("content-type", "application/manifest+json; charset=utf-8");
    res.setHeader("cache-control", "public, max-age=3600");
    res.setHeader("content-length", String(body.byteLength));
    res.end(body);
  });
}

function injectDevHtml(middlewares) {
  middlewares.use((req, res, next) => {
    const rawUrl = req.url ?? "";
    const path = rawUrl.split("?", 1)[0];
    if ((req.method ?? "GET").toUpperCase() !== "GET" || !isDocumentPath(path)) return next();
    if (!String(req.headers.accept ?? "").includes("text/html")) return next();

    const originalWrite = res.write.bind(res);
    const originalEnd = res.end.bind(res);
    const injector = createHeadInjector({ host: requestHost(req) });
    let mode = null;

    const decide = () => {
      if (mode) return mode;
      const contentType = String(res.getHeader("content-type") ?? "");
      const encoded = Boolean(res.getHeader("content-encoding"));
      mode = contentType.includes("text/html") && !encoded ? "inject" : "pass";
      if (mode === "inject" && !res.headersSent) res.removeHeader("content-length");
      return mode;
    };

    res.write = (chunk, encoding, cb) => {
      if (decide() === "pass") return originalWrite(chunk, encoding, cb);
      const done = typeof encoding === "function" ? encoding : cb;
      if (chunk) for (const out of injector.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk), typeof encoding === "string" ? encoding : "utf8"))) originalWrite(out);
      if (typeof done === "function") done();
      return true;
    };

    res.end = (chunk, encoding, cb) => {
      const done = typeof encoding === "function" ? encoding : cb;
      if (decide() === "pass") return originalEnd(chunk, encoding, cb);
      if (chunk) for (const out of injector.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk), typeof encoding === "string" ? encoding : "utf8"))) originalWrite(out);
      for (const out of injector.flush()) originalWrite(out);
      return originalEnd(undefined, undefined, done);
    };

    next();
  });
}

export function fluxSkinPwaPlugin() {
  return {
    name: "fluxskin:pwa",
    transformIndexHtml(html) {
      return injectFluxSkinHead(html);
    },
    configureServer(server) {
      serveManifest(server.middlewares);
      injectDevHtml(server.middlewares);
    },
    configurePreviewServer(server) {
      serveManifest(server.middlewares);
    },
  };
}
