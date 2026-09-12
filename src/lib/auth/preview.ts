/**
 * Preview authentication configuration (server-only).
 *
 * Production credentials must be supplied through environment variables. This
 * module intentionally contains no client secret so repository contents remain
 * safe to publish or inspect.
 */
export const PREVIEW_CLIENT_ID = "";
export const PREVIEW_CLIENT_SECRET = "";

/** Optional preview auth broker issuer. */
export const GROK_ISSUER_DEFAULT = "https://auth.grok.me";

/** Preview hosts accepted by the auth layer when preview auth is configured. */
export const PREVIEW_ALLOWED_HOSTS = ["*.grok-sandbox.com"] as const;
