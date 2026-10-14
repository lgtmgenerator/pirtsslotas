# pirtsslotas.lv

Static site (Latvian at the root, `en/` and `ru/` copies). Served from Hostnet cPanel at
`/home2/jdacom/public_html/pirtsslotas`.

## Deployment

Push to `main`. The GitHub Action calls the cPanel API to pull this repo into
`/home2/jdacom/repos/pirtsslotas` and run `.cpanel.yml`, which rsyncs the files into the
document root. The `CPANEL_TOKEN` repository secret holds a cPanel API token for user `jdacom`.
