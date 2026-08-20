# TODO — Selihom Website Build Checklist

> Companion to `roadmap.md`. Check items off as they're completed. Grouped by the same phases.

## Phase 0 — Discovery & Foundations
- [ ] Get client answers to all 5 open questions in `research.md` §4
- [ ] Confirm Selihom's NGO registration status / bank details for a Chapa merchant account
- [ ] Create `selihom-dev` Firebase project
- [ ] Create `selihom-staging` Firebase project
- [ ] Create `selihom-prod` Firebase project
- [ ] Register domain name (or confirm existing one) and get DNS access
- [ ] Create Chapa account, obtain sandbox API keys
- [ ] Identify the 2–4 staff who will use the admin CMS
- [ ] Identify a translator/reviewer for Amharic content (start early, not in Phase 6)
- [ ] Client sign-off on `specification.md`

## Phase 1 — Project Setup & Design System
- [ ] `npm create vite@latest` — React + TypeScript template
- [ ] Install Tailwind CSS v4 + `@tailwindcss/vite` plugin
- [ ] Install React Router v7
- [ ] Install TanStack Query
- [ ] Install Zustand
- [ ] Install React Hook Form + Zod
- [ ] Install react-i18next + set up `en.json` / `am.json` skeleton
- [ ] Define color tokens (`design.md` §3) as Tailwind `@theme` variables
- [ ] Define type scale (`design.md` §4) as Tailwind `@theme` variables
- [ ] Self-host Latin fonts (Fraunces/Lora + Inter/Public Sans)
- [ ] Self-host Noto Sans Ethiopic, verify Ge'ez glyph rendering
- [ ] Build `Button` component (primary/donate/secondary/ghost variants)
- [ ] Build `Card`, `Input`, `Textarea`, `Select`, `Badge`, `Alert`, `Modal` components
- [ ] Build `Header`, `Footer`, `LanguageSwitcher`, mobile nav drawer
- [ ] Build `StickyDonateBar`
- [ ] Set up GitHub repo + branch protection on `main`
- [ ] Set up GitHub Actions: lint + typecheck + build on every PR
- [ ] Configure `firebase.json` Hosting rewrites (SPA fallback)
- [ ] Deploy empty shell to a Hosting preview channel

## Phase 2 — Core Public Pages
- [ ] Home page (hero, impact strip, services teaser, founder/press teaser, story teaser, closing CTA)
- [ ] About page (founder, vision, mission, history)
- [ ] Services page (all 6 service areas)
- [ ] Awareness / Mental Health in Ethiopia page (with sourced stats)
- [ ] Stories page (placeholder/anonymized content OK for now)
- [ ] Gallery page
- [ ] Blog listing page
- [ ] Blog post template page
- [ ] Events listing page
- [ ] Event detail template page
- [ ] Contact page (phone, email, map embed, form)
- [ ] Press/Recognition page + downloadable fact sheet PDF
- [ ] Privacy Policy page
- [ ] Terms of Use page
- [ ] Meta tags (title/description) on every page
- [ ] Open Graph tags on every page
- [ ] `sitemap.xml` + `robots.txt`
- [ ] Organization/NGO structured data (JSON-LD)
- [ ] Responsive QA at 360px / 640px / 768px / 1024px / 1280px

## Phase 3 — Firebase Backend & Auth
- [ ] Write `firestore.rules` per `architecture.md` §5
- [ ] Write `storage.rules`
- [ ] Define `firestore.indexes.json` composite indexes
- [ ] Deploy rules/indexes to `selihom-dev`
- [ ] Set up Firebase Auth (email/password + Google sign-in for staff)
- [ ] Implement custom-claims role system (`editor` / `admin`)
- [ ] Write Firestore emulator rules-unit-test suite
- [ ] CI: run rules tests on every PR
- [ ] Scaffold `functions/` TypeScript project
- [ ] Deploy a trivial health-check Cloud Function to confirm the deploy pipeline

## Phase 4 — Admin CMS
- [ ] `/admin` login page (redirects if already authenticated)
- [ ] `RequireRole` route guard component
- [ ] `/admin/dashboard` overview
- [ ] `/admin/posts` — list, create, edit, publish/unpublish, delete
- [ ] `/admin/events` — list, create, edit, publish/unpublish, delete
- [ ] `/admin/gallery` — list, upload, caption (bilingual), publish/unpublish, delete
- [ ] `/admin/stories` — list, create, edit, **consent-flag UI** (FR-19), publish/unpublish
- [ ] `/admin/volunteers` — inbox, status filter, status update
- [ ] `/admin/donations` — read-only log view
- [ ] `/admin/settings` — impact numbers editor, staff invite/role assignment
- [ ] `setStaffRole` callable Cloud Function
- [ ] Image upload → Cloud Storage → resize/WebP-AVIF trigger function
- [ ] Record a short CMS walkthrough (video or written) for client's content owner

## Phase 5 — Donations (Chapa) & Conversion Flows
- [ ] `/donate` page UI (amount presets + custom, one-time/monthly toggle, donor info form)
- [ ] `initializeChapaTransaction` callable function
- [ ] `chapaWebhook` HTTPS function (server-side verify, never trust client redirect)
- [ ] `/donate/success` confirmation page
- [ ] Donation receipt email (transactional email provider)
- [ ] `/give-in-kind` page
- [ ] `/volunteer` multi-step form + Firestore write
- [ ] `onVolunteerApplication` trigger function → staff email + applicant confirmation
- [ ] Contact form → Firestore write
- [ ] `onContactMessage` trigger function → staff email
- [ ] Newsletter signup form + double opt-in flow
- [ ] Enable Firebase App Check on Firestore, Storage, callable functions
- [ ] Sandbox end-to-end donation test
- [ ] Switch Chapa keys to live (near Phase 8)

## Phase 6 — Bilingual Content & i18n Polish
- [ ] Translate all static UI strings to Amharic
- [ ] Enter/translate Amharic content for every CMS-created post/event/gallery item/story
- [ ] Verify no layout breakage from Amharic text-length differences (buttons, nav, forms)
- [ ] Implement/confirm default-locale behavior (client decision from `research.md` §4 Q5)
- [ ] Confirm language preference persists across visits

## Phase 7 — QA, Accessibility, Performance
- [ ] Lighthouse mobile audit: Home
- [ ] Lighthouse mobile audit: Donate
- [ ] Lighthouse mobile audit: Blog post
- [ ] Lighthouse mobile audit: Admin dashboard
- [ ] Keyboard-only navigation pass, full site
- [ ] Screen reader spot-check: Home, Donate, Contact
- [ ] Color-contrast audit against `design.md` §3 tokens
- [ ] Cross-browser check: Chrome, Safari, Firefox, Edge (latest 2 versions)
- [ ] Mobile device check: Android + iOS
- [ ] Confirm rules-unit-tests cover every acceptance criterion in `specification.md` §10
- [ ] Confirm `donations.paid` cannot be set from client (manual attempt in dev)
- [ ] Basic spam/rate-limit sanity check on public forms

## Phase 8 — Launch
- [ ] Final content freeze + client sign-off
- [ ] DNS cutover to production Hosting
- [ ] Deploy `selihom-prod`
- [ ] Confirm live Chapa keys active and verified with a real small live donation
- [ ] Submit sitemap to Google Search Console
- [ ] Verify structured data with a rich-results test
- [ ] Announce launch

## Phase 9 — Post-Launch
- [ ] 30-day: review donation funnel + volunteer form analytics
- [ ] 30-day: confirm receipt/notification emails aren't landing in spam
- [ ] 60-day: confirm staff have independently published content without developer help
- [ ] 60-day: review actual Firebase usage/cost vs. `architecture.md` §8 estimate
- [ ] 90-day: revisit deferred items in `architecture.md` §9 based on real data
