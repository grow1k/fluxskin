export function resolveOgTitle(
  site = {},
  appName = DEFAULT_APP_NAME,
  host = "",
  documentTitle = "",
) {
  const fromDoc = String(documentTitle ?? "").trim();
  if (fromDoc) return fromDoc;
  const fromSite = String(site.title ?? "").trim();
  if (fromSite) return fromSite;
  const fromHost = appNameFromHost(host);
  if (fromHost && fromHost !== DEFAULT_APP_NAME) return fromHost;
  const fromArg = String(appName ?? "").trim();
  return fromArg || DEFAULT_APP_NAME;
}
