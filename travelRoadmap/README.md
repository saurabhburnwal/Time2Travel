# Time2Travel Frontend (`travelRoadmap`)

React + TypeScript SPA for the Time2Travel platform. It integrates with the Express backend for core trip/user flows and with Supabase client access for selected host operations.

## Implemented Features

- 🔐 Auth UX: register, login, email verification, forgot-password OTP reset.
- 🧭 Trip planning flow: destination + preferences → stay selection → roadmap options → itinerary/map/expenses/final review.
- 🛣️ Roadmap styles currently supported in UI: **Fastest** and **Budget Friendly**.
- 🗺️ Map and itinerary views: ordered POIs with day-wise grouping.
- 💸 Expense breakdown: accommodation, transport, food, and entry fee components.
- 🏠 Host flows: host registration, dashboard, properties, guests, earnings, reviews, availability.
- 🛡️ Admin flows: admin dashboard and profile with backend-driven table management.
- 📄 Trip PDF generation and email trigger from final review.

## Project Structure

```
travelRoadmap/
├── src/
│   ├── App.tsx                # Route definitions + protected role routes
│   ├── pages/                 # Landing, planner, roadmap, host/admin pages
│   ├── services/              # Backend API client + Supabase-backed services
│   ├── contexts/              # Auth and trip state providers
│   ├── components/            # Shared UI elements
│   └── tests/                 # Vitest test suite
├── public/                    # Static assets
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── postcss.config.js
```

## Environment Variables

Create `travelRoadmap/.env` (or copy `.env.example`) and set:

```env
VITE_API_URL=http://localhost:5000
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Notes:
- `VITE_API_URL` defaults to `http://localhost:5000` if not provided.
- Supabase keys are required for host-related client flows that use `supabaseClient.ts`.

## Setup & Run

```bash
cd travelRoadmap
npm install
npm run dev
```

Dev server runs on `http://localhost:3000`.

Additional scripts:

```bash
npm run build
npm run preview
npm test
```

## Backend Dependency

Frontend assumes the backend API is running and reachable at `VITE_API_URL`.

From `Time2Travel/backend`:

```bash
npm install
npm run dev
```

## Current Scope Notes

- Roadmap generation currently exposes two styles (`fastest`, `budget`) from backend and UI.
- Stay selection supports hotels and verified local hosts; there is no separate hostel-only backend model.
- Data shown in trip outputs comes from project datasets and database records; values are estimates where applicable (for example, costs and travel durations).

## License

MIT (see project root `LICENSE`).
