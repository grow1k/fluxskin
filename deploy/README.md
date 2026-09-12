# FluxSkin deployment

## Production

1. Install Node.js 22, PostgreSQL and Nginx.
2. Clone the repository into `/opt/fluxskin`.
3. Copy `.env.example` to `.env` and set production secrets.
4. Run `npm ci`.
5. Run `NITRO_PRESET=node npm run build`.
6. Install `deploy/fluxskin.service` into `/etc/systemd/system/`.
7. Enable and start the service.
8. Install `deploy/nginx-fluxskin.conf` into Nginx.
9. Point `fluxskin.ru` DNS to the VPS.
10. Issue TLS with Certbot.

## Checks

```bash
systemctl status fluxskin
journalctl -u fluxskin -n 100 --no-pager
curl http://127.0.0.1:3000/health
curl https://fluxskin.ru/health
```

Never commit `.env`, PostgreSQL credentials, OAuth client secrets or `BETTER_AUTH_SECRET`.
