# RenovAIHub

Vercel-ready full-stack website for renovation planning.

## Stack

- Next.js (App Router)
- React
- Backend API route at `/api/estimate`

## Run Locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create `.env.local` from `.env.example` and update values as needed.

Required for this starter:

- `NEXT_PUBLIC_APP_NAME` (frontend display name)
- `ESTIMATOR_BASE_RATE_PER_SQFT`
- `ESTIMATOR_MIN_AREA`
- `ESTIMATOR_MIN_BUDGET`
- `ESTIMATOR_RUSH_MONTH_THRESHOLD`
- `ESTIMATOR_RUSH_PREMIUM`
- `ESTIMATOR_LOW_RANGE_FACTOR`
- `ESTIMATOR_HIGH_RANGE_FACTOR`

Optional:

- `LEAD_WEBHOOK_URL`
- `JWT_SECRET`
- `DATABASE_URL`

## Cloudflare Workers Setup

This repository includes `wrangler.toml` and OpenNext scripts so Cloudflare can run the
Next.js frontend and backend API route on Workers.

Install and test Worker build locally:

```bash
npm install
npm run cf:build
```

Preview locally with Worker runtime:

```bash
npm run cf:preview
```

Deploy with Wrangler:

```bash
npm run cf:deploy
```

For deployed Worker environments, add secrets using Wrangler:

```bash
wrangler secret put JWT_SECRET
wrangler secret put DATABASE_URL
```

For non-secret values, define them in `wrangler.toml` under `vars`.

### Why your site showed README instead of the app

If Cloudflare is set as a static Pages deployment (publishing repository files), it may
render `README.md` as the homepage. Switching to the Worker deployment flow above builds
and serves the actual Next.js application.

## API

`POST /api/estimate`

Request JSON:

```json
{
	"name": "Alex",
	"email": "alex@example.com",
	"projectType": "Kitchen",
	"areaSqft": 450,
	"budget": 90000,
	"targetMonths": 5
}
```

Response JSON includes:

- `estimatedMin`
- `estimatedMax`
- `timelinePlan`

## Deploy To Vercel

1. Push this repo to GitHub.
2. In Vercel, click **Add New Project**.
3. Import this repository.
4. Use defaults (Framework: Next.js) and deploy.

Vercel automatically builds and serves both frontend pages and backend API routes.
