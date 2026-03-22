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

For local Worker development, place values in `.dev.vars`.

For deployed Worker environments, add variables using Wrangler:

```bash
wrangler secret put JWT_SECRET
wrangler secret put DATABASE_URL
```

For non-secret values, define them in `wrangler.toml` under `vars`.

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
