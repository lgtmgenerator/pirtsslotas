# pirtsslotas.lv

Vite + React + React Router site in three languages (`/`, `/en`, `/ru`). Hosted on Hostnet
cPanel at `/home2/jdacom/public_html/pirtsslotas`.

## Develop

```bash
npm install
npm run dev
```

## Deployment

Push to `main`. The GitHub Action builds the site, commits the `dist` output to the `deploy` branch (which
includes `public/.cpanel.yml`), then calls the cPanel API to pull that branch
into `/home2/jdacom/repos/pirtsslotas` and run the `.cpanel.yml` tasks, which replace the
document root contents. The `CPANEL_TOKEN` repository secret holds a cPanel API token for
user `jdacom`. Never edit the `deploy` branch by hand; it is overwritten on every build.
