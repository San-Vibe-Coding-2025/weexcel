# weexcel

Landing page served at **weexcel.cookjam.co.uk**. For now it says "In construction" and links to [cookjam.co.uk](https://cookjam.co.uk/).

It is a static-assets-only Cloudflare Worker built with Vite and the Cloudflare Vite plugin. There is no Worker script and no JavaScript on the page.

## Layout

| File               | What it does                                                                                     |
| ------------------ | ------------------------------------------------------------------------------------------------ |
| `index.html`       | The page.                                                                                        |
| `src/styles.css`   | All styling. Colours are the CookJam brand tokens from the main app's `src/index.css`.           |
| `public/_headers`  | Security headers (CSP, nosniff, referrer policy), `noindex`, and long caching for hashed assets. |
| `wrangler.json`    | Worker config. Claims `weexcel.cookjam.co.uk` as a custom domain; `workers.dev` is off.         |

## Commands

```bash
npm install
npm run dev       # local dev server
npm run preview   # production build served locally
npm run build     # build into dist/
```

## Notes

- The page is `noindex` (meta tag and `X-Robots-Tag`) while it is a placeholder. Remove both when the real page lands.
- `weexcel` is a reserved label in the main CookJam app (`cookjam-web-otp-working`), so it can never be registered there as a partner host.
