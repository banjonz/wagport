# Wagport

Route check and guides for moving a dog out of the UAE. Next.js static export.

- `data/rules.json`: the rules database. Every rule carries an official source and a last-verified date. The site reads dates and windows only from here.
- `app/components/RouteCheck.js`: the free check (verdict + dated deadlines).
- `app/guides/[route]`: one guide page per route, generated from the rules.

## Run locally
    npm install
    npm run dev

## Deploy (Vercel)
Import this repo in Vercel. Framework preset: Next.js. No environment variables needed. Then add `wagport.co` under Project → Settings → Domains and copy the DNS records Vercel shows into GoDaddy.
