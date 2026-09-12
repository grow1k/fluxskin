# FluxSkin

Self-hosted CS2 inventory web app built with React, TanStack Start, Nitro, Better Auth and PostgreSQL.

## Local development

```bash
npm ci
cp .env.example .env
npm run dev
```

The development server listens on `http://127.0.0.1:8080`.

## Production build

For a normal VPS/Node deployment:

```bash
npm ci
NITRO_PRESET=node npm run build
NODE_ENV=production PORT=3000 HOST=127.0.0.1 npm start
```

The Node production server is emitted to `.output/server/index.mjs`.

## VPS deployment

1. Install Node.js 22, PostgreSQL and Nginx.
2. Create `/opt/fluxskin` and clone the repository there.
3. Create `/opt/fluxskin/.env` from `.env.example`.
4. Set a real `DATABASE_URL`, `BETTER_AUTH_URL` and a random `BETTER_AUTH_SECRET`.
5. Run `npm ci`.
6. Run `NITRO_PRESET=node npm run build`; migrations are applied automatically when `DATABASE_URL` is present.
7. Install `deploy/fluxskin.service` as a systemd unit and start it.
8. Install `deploy/nginx-fluxskin.conf`, point DNS at the VPS, then enable HTTPS with Certbot.
9. Check `https://fluxskin.ru/health` and the login page.

Never commit `.env`, database credentials, OAuth secrets or `BETTER_AUTH_SECRET`.
