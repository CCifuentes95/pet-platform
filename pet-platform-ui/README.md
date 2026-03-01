# pet-platform-ui

Next.js 16 frontend for the Pet Platform — a pet grooming booking application.

## Stack

| Tool | Purpose |
|------|---------|
| Next.js 16 (App Router) | Framework |
| TypeScript | Language |
| Tailwind CSS v4 | Styling |
| Shadcn/UI + Radix UI | Component primitives |
| TanStack Query | Server state management |
| Zustand | Client state management |
| Auth0 | Authentication |
| pnpm | Package manager |

## Route Structure

```
app/
├── (public)/          # Unauthenticated pages: landing, service listing, availability
├── (dashboard)/       # Authenticated client views: my appointments, booking flow
└── (admin)/           # Admin panel: groomer management, dashboard, AI chat
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm lint         # ESLint
pnpm type-check   # TypeScript check (npx tsc --noEmit)
```

## Environment Variables

Create a `.env.local` file at the root of this directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080
AUTH0_SECRET=
AUTH0_BASE_URL=
AUTH0_ISSUER_BASE_URL=
AUTH0_CLIENT_ID=
AUTH0_CLIENT_SECRET=
```

## Deployment

Deployed to **Vercel**. Merges to `main` trigger automatic deployments.
