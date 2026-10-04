# weexcel

Landing page served at **weexcel.cookjam.co.uk**. For now it says "In construction" and links to [cookjam.co.uk](https://cookjam.co.uk/).

It is a static-assets-only Cloudflare Worker built with Vite and the Cloudflare Vite plugin. There is no Worker script and no JavaScript on the page.

## Layout

| File              | What it does                                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| `index.html`      | The page.                                                                                        |
| `src/styles.css`  | All styling. Colours are the CookJam brand tokens from the main app's `src/index.css`.           |
| `public/_headers` | Security headers (CSP, nosniff, referrer policy), `noindex`, and long caching for hashed assets. |
| `wrangler.json`   | Worker config. Routes `weexcel.cookjam.co.uk/*` to the Worker; `workers.dev` is off.             |

## Commands

```bash
npm install
npm run dev       # local dev server
npm run preview   # production build served locally
npm run build     # build into dist/
```

## Publishing

`.github/workflows/deploy-cloudflare.yml` runs on every push to `main` (and on demand). It installs with `npm ci`, runs `npm run build`, then runs `wrangler deploy` through `cloudflare/wrangler-action@v3`, pinned to the repo's Wrangler (`4.136.1`).

`wrangler deploy` reads the config the build generates (`dist/wrangler.json`), so the build step must run first.

### Secrets

Both are GitHub Actions secrets, read by these exact names:

| Secret                  | Value                                                                      |
| ----------------------- | -------------------------------------------------------------------------- |
| `CLOUDFLARE_API_TOKEN`  | The Cloudflare API token described below.                                  |
| `CLOUDFLARE_ACCOUNT_ID` | The Cloudflare account that owns the `weexcel` Worker and `cookjam.co.uk`. |

They can be repository secrets or organisation secrets on `San-Vibe-Coding-2025`. An organisation secret only reaches this repo if its repository access includes `weexcel`. On the organisation's Free plan, organisation secrets reach public repositories only, and this repo is public.

### Cloudflare API token

| Scope        | Permission             |
| ------------ | ---------------------- |
| All accounts | Workers Scripts: Edit  |
| All accounts | Account Settings: Edit |
| All zones    | Workers Routes: Edit   |
| All zones    | DNS: Edit              |
| All zones    | Zone: Edit             |

A token with only **Cloudflare Pages: Edit** fails with `No access to the specified service`, because this project is a Worker, not a Pages project.

### Domain

`weexcel.cookjam.co.uk` has its own proxied DNS record in the `cookjam.co.uk` zone. The Worker is attached to it as a **route** (`weexcel.cookjam.co.uk/*`, zone `cookjam.co.uk`), so it answers every request and the record's origin is never contacted.

Do not switch the route to a custom domain (`"custom_domain": true`). A custom domain needs the hostname to have no DNS record, and the deploy fails with `Hostname 'weexcel.cookjam.co.uk' already has externally managed DNS records` (code 100117).

## Notes

- The page is `noindex` (meta tag and `X-Robots-Tag`) while it is a placeholder. Remove both when the real page lands.
- `weexcel` is a reserved label in the main CookJam app (`cookjam-web-otp-working`), so it can never be registered there as a partner host.
