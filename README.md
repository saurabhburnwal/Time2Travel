# 🌍 Time2Travel — Budget-Constrained Intelligent Travel Roadmap System

> A smart travel planning system that generates optimised day-wise itineraries based on your destination, budget, travel style, and group type — using graph-based route optimisation.

---

## 📌 Project Overview

This is a comprehensive **III MCA Software Project** developed as part of the **Software Project Development** curriculum. Time2Travel is a full-stack web application developed to provide a seamless travel experience, from planning to execution.

The system allows travellers to:
- Set their destination, budget, days, travel type, and group size
- Receive **2 intelligent roadmap options** (fastest and budget-friendly)
- View day-wise itineraries plotted on an interactive map
- Compare accommodation options (hotels & verified local hosts)
- Get a complete **expense breakdown** (accommodation, transport, food, entry fees)
- **New:** Securely reset passwords via OTP verification
- **New:** Manage emergency contacts and post-trip reviews with enhanced safety features

---

## 🗂️ Modules

| # | Module | Description |
|---|--------|-------------|
| 1 | **User Management** | Registration, login (JWT), secure password reset (OTP), role-based access |
| 2 | **Travel Preferences** | Save destination, budget, days, travel type, group type |
| 3 | **Intelligent Roadmap Generator** | NNA route optimisation, 4 roadmap styles, day grouping |
| 4 | **Map & Visualization** | Interactive Leaflet.js maps with routes, distances, and times |
| 5 | **Host Dashboard** | Manage properties, availability, earnings, and guest reviews |
| 6 | **Admin Dashboard** | Extensive system management, user status, host verification, and reporting |
| 7 | **Safety & Reviews** | Emergency contacts, hospitality reviews, and hospitality tracking |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion |
| Maps | Leaflet.js + React-Leaflet |
| Backend | Node.js, Express.js (REST API) |
| Database | PostgreSQL via Supabase (local) |
| Auth | JSON Web Tokens (JWT), bcryptjs, **OTP Verification** |
| Email | Nodemailer (SMTP Service) |

---

## 📁 Project Structure

```
Time2Travel/
├── travelRoadmap/          # Frontend (React + Vite + TypeScript)
│   ├── src/
│   │   ├── pages/          # Auth, Admin, Host, and Traveler pages
│   │   ├── components/     # Navbar, Dashboard widgets, UI components
│   │   ├── services/       # Centralized API service layer
│   │   └── lib/            # Utility functions and configurations
│   └── package.json
│
├── backend/                # REST API (Node.js + Express.js)
│   ├── controllers/        # Business logic for all modules
│   ├── routes/             # API endpoint definitions
│   ├── utils/              # Email service, route optimizer, calculators
│   ├── tests/              # Jest/Supertest integration tests
│   └── server.js           # App entry point
│
├── supabase/
│   ├── migrations/         # Database schema and evolution scripts
│   └── seed.sql            # Master seed data for development
└── README.md
```

---

## 🔌 REST API Reference

### Auth & Security
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/login` | Authenticate user and return JWT |
| `POST` | `/auth/forgot-password` | Request OTP for password reset |
| `POST` | `/auth/verify-otp` | Validate 6-digit verification code |
| `POST` | `/auth/reset-password` | Set new password with valid token |

### Admin & User Management
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/admin/stats` | 🔐 Admin | Get system-wide usage statistics |
| `GET` | `/users/me` | 🔐 | Get current user's full profile |
| `PUT` | `/users/me` | 🔐 | Update profile / change password |
| `PATCH` | `/users/:id/role` | 🔐 Admin | Modify user permissions |

### Host & Accommodation
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/hosts/dashboard`| 🔐 Host | Get earnings, guests, and property stats |
| `POST` | `/hosts/reviews` | 🔐 | Submit host hospitality review |
| `GET` | `/hosts/availability`| 🔐 Host | Manage property booking dates |

---

## 👥 Roles & Access

| Role | Permissions |
|------|-------------|
| **Traveler** | Plan trips, book hosts, save itineraries, safety contacts |
| **Host** | **Advanced**: Manage property, track earnings, host hospitality tracking |
| **Admin** | **Master**: System audits, host verification, user moderation, analytics |

---

## 📄 License

MIT License — See [LICENSE](./LICENSE) for details.
