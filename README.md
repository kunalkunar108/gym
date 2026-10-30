# GymFlow — Gym Lead CRM

A gym lead-management application for independent gyms and fitness centres in India.

## Current status

**Phase 1 — project foundation.** The dashboard is currently a visual preview populated with sample data. It is not connected to authentication or a database yet. Do not use it to manage real customer information.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- Supabase Auth + PostgreSQL + Row Level Security (planned)
- React Router, React Hook Form, Zod, Recharts, date-fns, Sonner, Lucide

## Local development

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
cp .env.example .env
npm run dev
```

The app can start without Supabase credentials while the UI foundation is being developed. Supabase configuration will be required for authentication and database-backed features.

## Environment variables

Only the Supabase project URL and publishable/anon key belong in the browser environment:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

**Never put a Supabase service-role key in a Vite `VITE_*` variable or commit secrets to Git.**

## Product constraints

- One gym workspace in the first release
- One owner and at most five staff accounts
- Owner and staff permissions enforced in PostgreSQL RLS and trusted backend operations
- Asia/Kolkata display timezone; timestamps stored as timezone-aware values
- Architecture should support future gym-level tenant isolation

## Planned implementation phases

1. Foundation and app shell
2. Supabase schema, authentication, and RLS
3. Owner-managed staff invitations and a five-staff cap
4. Lead CRUD, pipeline, search, filters, and pagination
5. Activities, follow-ups, and WhatsApp click-to-chat
6. Dashboard metrics, reports, and CSV export
7. Responsive polish, accessibility, and security tests
8. Production deployment and operational documentation

## Security

The UI is not a security boundary. Roles, workspace membership, staff limits, and data access must be enforced by database policies and trusted server-side functions. Activity history should be append-only.
