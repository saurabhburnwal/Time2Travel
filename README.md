# 🌍 Time2Travel
### Budget-Constrained Intelligent Travel Roadmap System

> A full-stack travel planning ecosystem that generates optimized day-wise itineraries using Nearest Neighbor Algorithms — connecting travelers with locally verified homestay hosts.

---

## 📌 Project Overview

Time2Travel is a comprehensive **MCA Software Project** built to bring local cultural tourism to the forefront of modern travel planning. Instead of generic trip suggestions, it uses graph-based route optimization to build the most efficient or budget-friendly path through a traveler's chosen destination — and then directly connects them with verified local hosts.

### What makes it different:
- **NNA Route Optimization** — Points of Interest are visited in an algorithmically optimal order, minimizing backtracking.
- **4 Roadmap Styles** — Fastest, Budget, Scenic, and Balanced.
- **Category-Aware Itineraries** — High-priority categories (e.g., Culture, Adventure) are intelligently prioritized in the itinerary generation.
- **Real Host Ecosystem** — Hosts register, get admin-verified, and manage listings, guests, and earnings from a dedicated dashboard.
- **Transport & Budget Calculation** — Automatic estimation of transport costs and total trip budget based on the selected roadmap style.
- **Secure Auth Flow** — JWT in HttpOnly cookies (XSS-safe), email verification, OTP password reset.

---

## 🏗️ Architecture

```
Browser (React SPA)
      │
      │  HTTPS Requests (cookie-based JWT)
      ▼
Express REST API (Node.js) ─── Nodemailer SMTP ──► Gmail
      │
      │  Parameterized SQL (pg)
      ▼
PostgreSQL (Supabase Local Docker)
      │
      ├── migrations/   → Schema evolution (DDL)
      └── seed.sql      → Static/master data

Frontend also communicates directly with Supabase JS Client
for host-specific tables (host_bookings, host_properties etc.)
```

### Design Decisions:
- **HttpOnly Cookies** — JWT is never accessible via JavaScript. XSS-proof.
- **Role Middleware** — `verifyToken` + `requireRole('admin' | 'host')` guard every sensitive endpoint independently.
- **Client-side SHA-256** — Password is hashed in the browser before transit; then bcrypt-hashed again server-side.
- **Allowlist for Admin CRUD** — Dynamic table access is restricted to an explicit `ALLOWED_TABLES` list in `adminController.js`.

---

## 🛠️ Tech Stack

| Layer | Technology | Notes |
|-------|------------|-------|
| UI Framework | React 18 + TypeScript | Type-safe component system |
| Styling | Tailwind CSS | Utility-first, responsive design |
| Animations | Framer Motion | Page transitions and micro-animations |
| Maps | Leaflet.js + React-Leaflet | Interactive route and POI rendering |
| Build Tool | Vite | Fast HMR dev server |
| Backend | Node.js + Express.js | REST API with cookie-based sessions |
| Auth | JWT + bcryptjs | HttpOnly secure sessions |
| Email | Nodemailer (Gmail SMTP) | Verification, Welcome, OTP, Trip PDF |
| Database | PostgreSQL via Supabase | Relational model with migrations |
| DB Client | `pg` (node-postgres) | Direct parameterized queries |

---

## 📂 Project Structure

```
Time2Travel-main/
├── backend/
│   ├── controllers/             # Business logic
│   │   ├── authController.js     Register, Login, OTP, Verify Email
│   │   ├── roadmapController.js  NNA generation, save, PDF email
│   │   ├── reviewController.js   Destination + Host reviews
│   │   ├── hostRegistrationController.js  Host approval workflow
│   │   ├── adminController.js    Generic table CRUD (allowlisted)
│   │   ├── userController.js     Profile management
│   │   ├── expenseController.js  Expense tracking per roadmap
│   │   ├── safetyController.js   Emergency contacts
│   │   └── ...                   + 6 more controllers
│   ├── middleware/
│   │   ├── auth.js               JWT extraction and verification
│   │   ├── roleCheck.js          Role-based access factory
│   │   └── errorHandler.js       Global error handler
│   ├── routes/                   14 route modules
│   ├── utils/
│   │   ├── emailService.js       All SMTP templates
│   │   ├── routeOptimizer.js     NNA + distance algorithms
│   │   └── expenseEstimator.js   Budget calculations
│   ├── config/db.js              PostgreSQL pool config
│   ├── .env                      Secrets (not committed)
│   ├── .env.example              Template for new devs
│   └── server.js                 Entry point, CORS, middleware
│
├── travelRoadmap/
│   └── src/
│       ├── pages/               26 UI pages
│       │   ├── Landing.tsx       Public homepage with reviews
│       │   ├── TripPlanner.tsx   Step 1 — Trip parameters
│       │   ├── StaySelection.tsx Step 2 — Hotel vs Host
│       │   ├── RoadmapOptions.tsx Step 3 — Pick a style
│       │   ├── Itinerary.tsx     Day-wise view
│       │   ├── MapView.tsx       Interactive route map
│       │   ├── ExpenseBreakdown.tsx Budget summary
│       │   ├── FinalReview.tsx   Trip summary + PDF
│       │   ├── HostFeedback.tsx  Post-trip host review
│       │   ├── HostDashboard.tsx Host analytics overview
│       │   ├── HostGuests.tsx    Guest management
│       │   ├── HostEarnings.tsx  Settled vs Pending earnings
│       │   ├── HostReviews.tsx   All reviews received
│       │   ├── AdminDashboard.tsx Full database admin
│       │   └── ...              + 12 more pages
│       ├── services/            20 API service modules
│       ├── contexts/AuthContext.tsx  Global auth state
│       ├── components/          Shared UI (Navbar, HostNav, etc)
│       └── App.tsx              Route definitions + guards
│
└── supabase/
    ├── migrations/              8 SQL migration files
    └── seed.sql                 Master seed data
```

---

## 🚀 Getting Started

### Prerequisites
| Tool | Version | Purpose |
|------|---------|---------|
| Node.js | v18+ | Backend + Frontend runtime |
| Docker Desktop | Latest | Supabase local DB |
| Supabase CLI | Latest | DB management |

Install Supabase CLI globally:
```bash
npm install -g supabase
```

---

## 🗄️ Database Commands (Supabase)

All commands run from the **project root** (`Time2Travel-main/`).

### Start the DB
```bash
supabase start
```
Starts PostgreSQL + Supabase Studio in Docker. Services available at:
- **Database**: `postgresql://postgres:postgres@localhost:54322/postgres`
- **Studio UI**: `http://localhost:54323`
- **API**: `http://localhost:54321`

### Reset the DB (fresh slate)
```bash
supabase db reset
```
Wipes all data, re-runs every migration file in order, then applies `seed.sql`. Use when you want a clean start or after adding new migrations.

### Save your current data changes
If you've added data through the app or Supabase Studio and want to persist it for the next reset:
```bash
npx supabase db dump --local --data-only > supabase/seed.sql```

This overwrites `seed.sql` with the current state of your database. **Run this before every `db reset`** if you want to keep your data.

### Apply new migrations without reset
```bash
supabase db push
```

### Stop the DB
```bash
supabase stop
```

---

## ⚙️ Backend Commands

Navigate to the `backend/` directory:

```bash
cd backend
npm install          # First time setup
```

### Environment Setup
Copy `.env.example` to `.env` and fill in:
```env
PORT=5000
DB_HOST=localhost
DB_PORT=54322
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres
JWT_SECRET=your_very_long_random_secret_key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:3000
APP_BASE_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-google-app-password
```

> **Gmail App Password**: Go to Google Account → Security → 2-Step Verification → App Passwords. Generate one specifically for this app.

### Run the server
```bash
npm run dev      # Development (auto-restarts with nodemon)
npm start        # Production
npm test         # Jest integration tests
```
Server starts at: `http://localhost:5000`
Health check: `http://localhost:5000/api/health`

---

## 🖥️ Frontend Commands

Navigate to the `travelRoadmap/` directory:

```bash
cd travelRoadmap
npm install          # First time setup
npm run dev          # Start dev server
npm run build        # Production build (outputs to dist/)
npm run preview      # Preview the production build locally
```
App runs at: `http://localhost:3000`

---

## 🧪 Testing

The project uses a comprehensive testing suite for both the backend (Jest) and frontend (Vitest), with a focus on achieving high coverage for critical performance and business logic.

### 🟢 Backend Testing (Jest)
Located in `backend/tests/`.
- **Run all tests**: `npm test`
- **Run with coverage**: `npm run test -- --coverage`
- **Critical Coverage (88%+ achieved)**:
    - `lookupController.js` (91.6%): State/Destination search and metadata filtering.
    - `placeController.js` (90.0%): Point of Interest retrieval and destination mapping.
    - `hotelController.js` (88.2%): Accommodation management and custom hotel insertion.
    - `routeOptimizer.js` (93.4%): Nearest Neighbor Algorithm (NNA) for route efficiency.
    - `expenseEstimator.js` (100%): Budget calculation logic across roadmap styles.
    - `authController.js` & `roadmapController.js`: Secure session and itinerary generation flows.

### 🔵 Frontend Testing (Vitest + JSDOM)
Located in `travelRoadmap/src/tests/`.
- **Run all tests**: `npm test`
- **Run with coverage**: `npm run test -- --coverage`
- **Critical Coverage (86%+ achieved)**:
    - `TripPlanner.tsx` (86.6%): Complex multi-step trip parameter UI with framer-motion.
    - `TripContext.tsx` (97.6%): Global state management for persistent trip data.
    - `destinationsService.ts` (100%): Robust API wrappers for destination/state fetching.
    - `ForgotPassword.test.tsx`: End-to-end UI flow for password recovery.
    - `authService.test.ts`: Login and OTP service logic.
    - `StarRating.test.tsx` & `AnimatedPage.test.tsx`: Shared UI components.

> [!NOTE]
> Backend tests include a `NODE_ENV=test` check to prevent side effects like sending real emails or starting the Express listener during unit test execution.

---

## 🔌 REST API Reference

Base URL: `http://localhost:5000/api`
Authentication: JWT stored in `HttpOnly` cookie `tt_token` (set on login, sent automatically by browser).

---

### Auth (`/api/auth`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | Public | Create account. Sends verification email. |
| `POST` | `/login` | Public | Authenticate. Sets `tt_token` HttpOnly cookie. |
| `GET` | `/me` | 🔐 Cookie | Get current logged-in user details. |
| `POST` | `/logout` | Public | Clears the session cookie. |
| `GET` | `/verify-email?token=` | Public | Validates the link from verification email. |
| `POST` | `/resend-verification` | Public | Resend email verification link. |
| `POST` | `/forgot-password` | Public | Generate & email 6-digit OTP. |
| `POST` | `/verify-otp` | Public | Validate OTP, returns short-lived reset JWT. |
| `POST` | `/reset-password` | Public | Set new password using reset JWT. |

---

### Users (`/api/users`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/me` | 🔐 | Fetch own full profile. |
| `PUT` | `/me` | 🔐 | Update name, phone, gender. |
| `GET` | `/` | 🛡️ Admin | List all users in the system. |
| `PATCH` | `/:id/status` | 🛡️ Admin | Activate or deactivate a user account. |
| `PATCH` | `/:id/role` | 🛡️ Admin | Promote or demote a user's role. |
| `DELETE` | `/:id` | 🛡️ Admin | Permanently delete a user. |

---

### Roadmap Generator (`/api/roadmap`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/generate` | 🔐 | Run NNA optimizer. Returns 4 itinerary styles. |
| `POST` | `/save` | 🔐 | Save chosen roadmap and stay selection. |
| `GET` | `/my` | 🔐 | Get all saved trips for current user. |
| `GET` | `/:id` | 🔐 | Get full trip details incl. places and host info. |
| `PATCH` | `/:id/complete` | 🔐 | Mark a trip as completed. |
| `DELETE` | `/:id` | 🔐 | Delete a saved roadmap. |
| `POST` | `/email-pdf` | 🔐 | Generate trip PDF and email it to the user. |

---

### Destinations (`/api/destinations`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | Public | List all available destinations. |
| `GET` | `/:id` | Public | Get a specific destination by ID. |

---

### Travel Preferences (`/api/preferences`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | 🔐 | Get current user's saved preferences. |
| `POST` | `/` | 🔐 | Save travel preferences (budget, days, style). |
| `PUT` | `/:id` | 🔐 | Update an existing preference. |
| `DELETE` | `/:id` | 🔐 | Remove a preference. |

---

### Reviews (`/api/reviews`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/recent` | Public | Get latest reviews (for landing page). |
| `GET` | `/` | Public | Get reviews for a roadmap via `?roadmap_id=`. |
| `GET` | `/me` | 🔐 | Get the current user's submitted reviews. |
| `GET` | `/host?host_id=` | Public | Get all reviews for a specific host. |
| `GET` | `/host/me` | 🔐 | Get host reviews submitted by current user. |
| `POST` | `/` | 🔐 | Submit a destination review. |
| `POST` | `/host` | 🔐 | Submit host review + record contribution payment. |
| `PUT` | `/:id` | 🔐 | Edit own review. |
| `DELETE` | `/:id` | 🔐 | Delete own review. |

---

### Hosts (`/api/hosts`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/?destination_id=` | Public | List verified hosts by destination. |
| `POST` | `/register` | 🔐 | Submit a host profile (pre-approval). |
| `GET` | `/me` | 🔐 | Get own host profile. |
| `PUT` | `/me` | 🔐 | Update own host profile. |
| `PATCH` | `/:id/verify` | 🛡️ Admin | Verify or unverify a host profile. |

---

### Host Registrations (`/api/host-registrations`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | 🔐 | Submit a new full host registration form. |
| `GET` | `/my` | 🔐 | Get own most recent registration status. |
| `GET` | `/my-all` | 🔐 | Get all own registration submissions. |
| `GET` | `/` | 🛡️ Admin | List all registrations in the system. |
| `PATCH` | `/:id` | 🛡️ Admin | Update registration status (approve/reject). |
| `POST` | `/:id/approve` | 🛡️ Admin | Approve — auto-creates host profile and property. |
| `POST` | `/:id/reject` | 🛡️ Admin | Reject with an optional reason. |
| `DELETE` | `/:id` | 🛡️ Admin | Delete a registration record. |

---

### Expenses (`/api/expenses`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/roadmap/:roadmapId` | 🔐 | Get expense breakdown for a trip. |
| `POST` | `/roadmap/:roadmapId` | 🔐 | Save expense breakdown for a trip. |
| `PUT` | `/:id` | 🔐 | Update an expense record. |
| `DELETE` | `/:id` | 🔐 | Remove an expense record. |

---

### Safety Contacts (`/api/safety`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/contacts` | 🔐 | Get all emergency contacts for current user. |
| `POST` | `/contacts` | 🔐 | Add a new emergency contact. |
| `PUT` | `/contacts/:id` | 🔐 | Update an emergency contact. |
| `DELETE` | `/contacts/:id` | 🔐 | Remove an emergency contact. |

---

### Places & Hotels (`/api/places`, `/api/hotels`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/places?destination_id=` | Public | Get POIs for a destination. |
| `GET` | `/api/hotels?destination_id=` | Public | Get hotels for a destination. |

---

### Admin CRUD (`/api/admin`)
> All admin routes require `🛡️ Admin` role.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tables/:tableName` | Fetch up to 500 rows from any allowed table. |
| `POST` | `/tables/:tableName` | Insert a new row into a table. |
| `PUT` | `/tables/:tableName/:id` | Update an existing row by primary key. |
| `DELETE` | `/tables/:tableName/:id` | Delete a row by primary key. |

**Allowed Tables**: `destinations`, `hotels`, `places`, `reviews`, `users`, `host_profiles`, `host_registrations`, `host_properties`, `host_bookings`, `travel_types`, `roadmaps`, `roadmap_types`, `roadmap_places`, `roadmap_accommodations`, `expenses`, `roles`, `group_types`, `travel_preferences`, `safety_contacts`

---

## 👥 Roles & Access Levels

| Role | Login Access | Capabilities |
|------|-------------|--------------|
| **Traveler** | `/login` | Plan trips, pick stays, view maps, manage contacts, submit reviews |
| **Host** | `/login` (auto-routed) | Dashboard, Guests, Properties, Earnings (Settled/Pending), Reviews, Availability |
| **Admin** | `/login` (auto-routed) | Full system CRUD, host approvals, user management, data audits |

---

## 🗺️ User Flow

```
Landing Page
   │
   ├─ Browse Destinations, Reviews
   │
   ▼
Register → Email Verification Link → Login
   │
   ▼
TripPlanner (Budget, Days, Style, Group Size)
   │
   ▼
StaySelection (Hotel vs. Homestay Host)
   │
   ▼
RoadmapOptions (Pick Fastest / Budget / Scenic / Balanced)
   │
   ▼
Itinerary → MapView → ExpenseBreakdown → FinalReview
   │
   ▼ (Post-trip)
HostFeedback (Star ratings + Contribution Amount)
   │
   └── Updates Host Earnings (Settled vs. Pending)
       └── Visible immediately in Host Dashboard
```

---

## 🔐 Security Overview
- Passwords are **SHA-256 hashed client-side** before being sent, then **bcrypt-hashed server-side**.
- JWTs live in `HttpOnly, SameSite=strict` cookies — inaccessible to JavaScript.
- Password reset uses a **6-digit OTP** (15 min expiry) + a scoped purpose-claim JWT.
- Email verification tokens are **invalidated on first use**.
- All DB queries use **parameterized values** — no raw string concatenation on user input.

---

## 📄 License
MIT License — See [LICENSE](./LICENSE) for details.
