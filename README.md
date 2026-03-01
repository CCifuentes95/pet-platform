# Pet Platform

A production-grade **pet grooming booking platform** built to demonstrate senior engineering practices: clean architecture, documented trade-offs, embedded AI, and a fully automated deployment pipeline.

---

## What is this?

Pet Platform lets clients book grooming appointments online and gives admins a real-time dashboard to manage groomers, availability, and revenue — with a natural-language AI assistant for querying business data.

The project is deliberately engineered for depth over breadth. Every decision has a reason, every layer has clear boundaries, and the system is designed to scale without rewriting.

---

## Architecture Overview

```
Client → Vercel (Next.js 15) → Render (Spring Boot 3 API) → Neon (Serverless Postgres)
                                          ↕
                                  OpenAI GPT-4o-mini (Spring AI)
```

### Backend — Modular Monolith

- **Java 21** with Virtual Threads (Project Loom)
- **Spring Boot 3.3+** structured as a modular monolith under `com.petplatform.modules.*`
- Modules are strictly isolated — no cross-module imports; only `shared/` is common
- **Spring AI** for in-process AI calls (no extra microservice)
- **Flyway** for versioned SQL migrations
- **Auth0 + Spring Security** (JWT / OAuth2 Resource Server)
- **MapStruct** for entity ↔ DTO mapping, **Lombok** for boilerplate

### Frontend — Next.js App Router

- **Next.js 15** with TypeScript and the App Router
- Route groups: `(public)`, `(dashboard)`, `(admin)`
- **TanStack Query** for server state, **Zustand** for client state
- **Tailwind CSS + Shadcn/UI** component library

### Infrastructure

| Concern | Tool |
|---------|------|
| Hosting (API) | Render |
| Hosting (UI) | Vercel |
| Database | Neon (Serverless PostgreSQL) |
| Auth | Auth0 |
| AI | OpenAI via Spring AI |
| Email | Resend |
| Feature Flags | LaunchDarkly |
| CI/CD | GitHub Actions → Render auto-deploy |

---

## Key Features

- **Appointment booking** with real-time availability and optimistic locking
- **Groomer management** (admin CRUD)
- **Revenue dashboard** with stats and filters
- **AI chat assistant** — admins can query business data in plain English
- **Role-based access** — `ROLE_CLIENT` vs `ROLE_ADMIN` enforced at every layer
- **Email notifications** via Resend on booking events

---

## Domain Model

```
Groomer (1) ──── (*) TimeSlot
    │                   │
    └──── (*) Appointment ────── (1) Client
                 │
                 └──── (1) ServiceType
```

Appointment lifecycle: `PENDING → CONFIRMED → COMPLETED / CANCELLED`

---

## Project Structure

```
/
├── backend-core/      # Java 21 + Spring Boot modular monolith
│   └── src/main/java/com/petplatform/
│       ├── shared/    # Auth, config, exceptions, shared DTOs
│       └── modules/
│           └── grooming/  # Domain, repositories, services, API, AI
└── frontend-ui/       # Next.js 15 App Router + TypeScript
    ├── app/
    │   ├── (public)/
    │   ├── (dashboard)/
    │   └── (admin)/
    └── features/grooming/
```

---

## Engineering Principles

- **Clean architecture** with enforced module boundaries
- **Architectural Decision Records (ADRs)** documenting trade-offs
- **AI integration** done right — in-process, not bolted on
- **Production infrastructure** — real hosting, real constraints
- **Testing discipline** — unit, integration (Testcontainers), and API (MockMvc) layers
- **Security by default** — JWT auth, role enforcement, no secrets in code

---

## Getting Started

### Prerequisites

- Java 21+
- Node.js 20+
- Docker (for local Postgres)

### Backend

```bash
cd backend-core
docker-compose up -d      # start local Postgres
./gradlew bootRun
```

### Frontend

```bash
cd frontend-ui
npm install
npm run dev
```

API docs available at `http://localhost:8080/swagger-ui.html` when running locally.

---

## License

MIT
