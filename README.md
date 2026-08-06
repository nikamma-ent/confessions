# Pinocchio — Confess

Anonymous confession wall for Shashwat Bulusu's album *Pinocchio* (Aug 21, 2026).

- **Frontend**: `index.html`, static, hosted on GitHub Pages.
- **Backend**: `api/confessions.js`, a Vercel serverless function backed by Vercel Postgres.

## Deploy

### 1. Push this repo to GitHub

```bash
git init
git add .
git commit -m "Pinocchio confession wall"
git remote add origin <your-repo-url>
git push -u origin main
```

### 2. GitHub Pages (frontend)

Repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main`, folder `/ (root)`.
Your site will be live at `https://<username>.github.io/<repo>/`.

### 3. Vercel (backend)

1. Import the same repo at [vercel.com/new](https://vercel.com/new).
2. In the project → **Storage** tab → **Create Database** → **Postgres**. This auto-injects the `POSTGRES_URL` env vars the API needs.
3. Open the Postgres **Query** tab (or connect with `psql`) and run the contents of [`schema.sql`](schema.sql) once to create the `confessions` table.
4. (Optional, recommended) In **Settings → Environment Variables**, add `ALLOWED_ORIGIN` = `https://<username>.github.io` to lock the API down to your GitHub Pages origin instead of `*`.
5. Deploy. Note the resulting domain, e.g. `https://pinocchio-confess.vercel.app`.

### 4. Wire the frontend to the backend

In `index.html`, set:

```js
const API_URL = 'https://pinocchio-confess.vercel.app/api/confessions';
```

Commit and push — GitHub Pages will pick up the change automatically.

## Local API testing

```bash
npm install
npx vercel dev
```

This serves `api/confessions.js` locally (needs `vercel login` + `vercel link` first so it can pull the Postgres env vars).
