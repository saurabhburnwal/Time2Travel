# 🌍 Time2Travel — Budget-Constrained Intelligent Travel Roadmap System

> A smart travel planning system that generates optimised day-wise itineraries based on your destination, budget, travel style, and group type — using graph-based route optimisation.

---

## 📌 Project Overview

Time2Travel is a full-stack web application developed as part of the **MCA Trimester III — Software Project Development** course.

The system allows travellers to:
- Set their destination, budget, days, travel type, and group size
- Receive **4 intelligent roadmap options** (fastest, scenic, budget-friendly, balanced)
- View day-wise itineraries plotted on an interactive map
- Compare accommodation options (hotels & verified local hosts)
- Get a complete **expense breakdown** (accommodation, transport, food, entry fees)
- Manage safety contacts and submit post-trip reviews

---

## 🗂️ Modules

| # | Module | Description |
|---|--------|-------------|
| 1 | **User Management** | Registration, login (JWT), role-based access (Traveler / Host / Admin) |
| 2 | **Travel Preferences** | Save destination, budget, days, travel type, group type |
| 3 | **Intelligent Roadmap Generator** | NNA route optimisation, 4 roadmap styles, day grouping |
| 4 | **Map & Visualization** | Interactive Leaflet.js maps with routes, distances, and times |
| 5 | **Accommodation** | Hotel listings and verified local host accommodations |
| 6 | **Expense Estimation** | Breakdown of accommodation, transport, food, and entry fees |
| 7 | **Safety & Reviews** | Emergency contacts, solo traveler safety tips, post-trip reviews |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS |
| Maps | Leaflet.js + React-Leaflet |
| Backend | Node.js, Express.js (REST API) |
| Database | PostgreSQL via Supabase (local) |
| Auth | JSON Web Tokens (JWT) + bcryptjs |
| Animations | Framer Motion |

---

## 📁 Project Structure

```
Time2Travel/
├── travelRoadmap/          # Frontend (React + Vite + TypeScript)
│   ├── src/
│   │   ├── pages/          # 14 page components
│   │   ├── components/     # Navbar, Footer, etc.
│   │   ├── contexts/       # AuthContext, TripContext
│   │   ├── lib/            # supabaseService.ts (DB calls)
│   │   └── data/           # mockData.ts (fallback data)
│   ├── .env                # Supabase URL + anon key
│   └── package.json
│
├── backend/                # REST API (Node.js + Express.js)
│   ├── config/db.js        # PostgreSQL connection pool
│   ├── controllers/        # 12 controller files
│   ├── middleware/
│   │   ├── auth.js         # JWT verification
│   │   ├── roleCheck.js    # Role-based access control
│   │   └── errorHandler.js # Global error handler
│   ├── routes/             # 12 Express router files
│   ├── utils/
│   │   ├── routeOptimizer.js   # NNA algorithm + 4 roadmap styles
│   │   └── expenseEstimator.js # Cost calculator
│   ├── .env
│   └── server.js           # App entry point (port 5000)
│
├── supabase/
│   ├── migrations/         # SQL schema (14 tables)
│   └── seed.sql            # Seed data
│
└── README.md
```

---

## 🗃️ Database Schema (14 Tables)

```
users          roles           destinations      travel_types
group_types    places          hotels            host_profiles
roadmaps       roadmap_types   roadmap_places    roadmap_accommodations
travel_preferences              expenses
safety_contacts                 reviews
```

Key relationships:
- `users` → `roles` (Traveler / Host / Admin)
- `roadmaps` → `destinations`, `roadmap_types`, `users`
- `roadmap_places` → `roadmaps`, `places`
- `expenses` → `roadmaps`
- `reviews` → `roadmaps`, `users`

---

## 🧠 Intelligent Roadmap Generator

The core algorithm in `backend/utils/routeOptimizer.js`:

1. **Haversine Formula** — Calculates true geographic distance (km) between two lat/lng coordinates
2. **Nearest Neighbor Algorithm (NNA)** — Greedily builds the shortest visiting route from the starting place
3. **Day Grouping** — Splits the route into days (max 8 hours/day), estimating start & end times per place
4. **4 Route Styles** generated simultaneously:

| Style | Strategy |
|-------|----------|
| ⚡ Fastest | Pure NNA — minimum total travel |
| 🏔️ Scenic | Iconic/high-value places first, then NNA |
| 💰 Budget | Free/cheap places first, paid appended |
| ⚖️ Balanced | Interleaved high/low-value places via NNA |

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- [Supabase CLI](https://supabase.com/docs/guides/cli)

### 1. Start the Database

```bash
# From project root
npx supabase start
```

This starts a local PostgreSQL instance at `localhost:54322` and the Supabase API at `localhost:54321`.

### 2. Start the Backend API

```bash
cd backend
npm install       # First time only
npm start
```

API runs at **http://localhost:5000**

### 3. Start the Frontend

```bash
cd travelRoadmap
npm install       # First time only
npm run dev
```

Frontend runs at **http://localhost:5173**

---

## 🔌 REST API Reference

Base URL: `http://localhost:5000/api`  
🔐 = Requires `Authorization: Bearer <token>` header

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register new user, returns JWT |
| `POST` | `/auth/login` | Login, returns JWT |

### Users
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/users/me` | 🔐 | Get own profile |
| `PUT` | `/users/me` | 🔐 | Update own profile |
| `GET` | `/users` | 🔐 Admin | List all users |
| `PATCH` | `/users/:id/status` | 🔐 Admin | Activate/deactivate |
| `PATCH` | `/users/:id/role` | 🔐 Admin | Change role |

### Lookup (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/lookup/states` | All states |
| `GET` | `/lookup/destinations?state=` | Destinations by state |
| `GET` | `/lookup/travel-types` | Travel type options |
| `GET` | `/lookup/group-types` | Group type options |

### Roadmap Generator (Module 3 — Core)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/roadmap/generate` | 🔐 | Generate 4 roadmap options |
| `POST` | `/roadmap/save` | 🔐 | Save selected roadmap |
| `GET` | `/roadmap` | 🔐 | My saved roadmaps |
| `GET` | `/roadmap/:id` | 🔐 | Roadmap detail + itinerary |
| `DELETE` | `/roadmap/:id` | 🔐 | Delete roadmap |

**Generate Roadmap — Request Body:**
```json
{
  "destination": "Munnar",
  "days": 3,
  "budget": 5000,
  "travelType": "Nature",
  "groupType": "Duo",
  "accommodationPerNight": 1500
}
```

### Destinations & Places (Public)
```
GET  /destinations              — All destinations (?state=Kerala)
GET  /destinations/:id          — Single destination
GET  /destinations/:id/places   — Places for a destination
GET  /places                    — All places (?destination_id=&travel_type=)
GET  /places/:id                — Single place
```

### Accommodation
```
GET  /hotels?destination_id=    — Hotels for a destination
GET  /hotels/:id                — Single hotel
GET  /hosts?destination_id=     — Active verified hosts (public)
POST /hosts/register            🔐 Register as host
GET  /hosts/me                  🔐 Own host profile
PUT  /hosts/me                  🔐 Update host profile
PATCH /hosts/:id/verify         🔐 Admin — Verify host
```

### Expenses, Safety & Reviews
```
GET/POST /expenses/roadmap/:id  🔐
PUT      /expenses/:id          🔐

GET/POST/DELETE /safety/contacts        🔐

GET  /reviews?roadmap_id=       — Public
GET  /reviews/recent            — Public (landing page)
POST /reviews                   🔐
PUT/DELETE /reviews/:id         🔐 (own reviews only)
```

---

## 👥 Roles & Access

| Role | Permissions |
|------|-------------|
| **Traveler** | Plan trips, save roadmaps, reviews, safety contacts |
| **Host** | All traveler rights + manage host profile |
| **Admin** | All rights + manage users, verify hosts |

---

## 📄 License

MIT License — See [LICENSE](./LICENSE) for details.
