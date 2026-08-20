# Selihom Website — Documentation Bundle

Full end-to-end documentation for building the Selihom Mental Health Patients Resource Center website: **React 19 + Vite + Tailwind CSS v4 + Firebase**, with Chapa for donation payments.

This bundle was produced from the client-supplied research materials (`SELIHOM.docx`, awareness-deck `.pptx`) plus current (2026) technical and Ethiopia-market research.

## Read in this order

1. **`research.md`** — what we know about Selihom, the Ethiopian mental-health context, the audience, and the technology/payment landscape. Everything else is built on this.
2. **`specification.md`** — functional & non-functional requirements, sitemap, tech-stack summary, acceptance criteria.
3. **`architecture.md`** — system design: Firebase data model, security rules, the Chapa payment flow, CI/CD, folder structure.
4. **`design.md`** — brand, color, typography, component system, page-layout notes, accessibility and imagery guidelines.
5. **`roadmap.md`** — phased build plan with estimates, exit criteria, and a risk register.
6. **`todo.md`** — the same plan as a flat, checkable task list.

## Stack at a glance

| Layer | Choice |
|---|---|
| Frontend | React 19, TypeScript, Vite 7 |
| Styling | Tailwind CSS v4 |
| Routing | React Router v7 |
| Server state | TanStack Query |
| Forms | React Hook Form + Zod |
| i18n | react-i18next (English + Amharic) |
| Backend | Firebase (Auth, Firestore, Storage, Cloud Functions, Hosting) |
| Payments | Chapa (Ethiopian mobile-money + international cards) |
| CI/CD | GitHub Actions → Firebase Hosting |

## Non-negotiables baked into every doc

- **Bilingual, genuinely** — English and Amharic (Ge'ez script) are both first-class, not an afterthought.
- **Mobile-first, low-bandwidth-first** — most of the real audience is on a phone, often on 3G/4G.
- **Donations must be server-verified** — a donation is never marked "paid" from the client; only a Cloud Function that independently confirms with Chapa can do that.
- **No identifiable patient content without documented consent** — enforced at the database rules layer, not just editorial policy.
- **Non-technical staff must be able to publish content** — the whole point of the admin CMS in `architecture.md`/`specification.md`.

## Getting started (once you begin building)

```bash
# frontend
npm create vite@latest selihom-website -- --template react-ts
cd selihom-website
npm install
npm install -D tailwindcss @tailwindcss/vite
npm install react-router-dom @tanstack/react-query zustand
npm install react-hook-form zod @hookform/resolvers
npm install react-i18next i18next
npm install firebase

# backend
npm install -g firebase-tools
firebase login
firebase init   # Hosting, Firestore, Functions, Storage, Emulators
```

See `architecture.md` §2.2 for the full recommended folder structure and §7 for the CI/CD pipeline to set up alongside this.

## Open questions to resolve before/at Phase 0

See `research.md` §4 — NGO/merchant registration status, existing brand assets, content ownership post-launch, patient-consent process, and domain/locale defaults. These block parts of the roadmap and are worth resolving first.
