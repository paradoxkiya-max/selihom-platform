# Specification — Selihom Mental Health Patients Resource Center Website

> Status: Draft v1.0 · Last updated: 2026-08-11
> Depends on: `research.md`. Feeds: `architecture.md`, `design.md`, `roadmap.md`.

---

## 1. Project Goal

Design and build a bilingual (Amharic/English), mobile-first, donation-enabled website for Selihom Mental Health Patients Resource Center that (1) builds public trust and awareness of the center's work, (2) converts visitors into donors, volunteers, and in-kind supporters, and (3) is safely and easily maintainable by non-technical center staff after launch — all while protecting patient privacy and dignity as a hard constraint, not an afterthought.

## 2. Objectives

| # | Objective | Success signal |
|---|---|---|
| O1 | Enable online donations via a payment method that works for both local (mobile money) and diaspora/international donors | Live, verified end-to-end donation flow with server-side payment verification |
| O2 | Convert visitors into volunteer applicants | Working volunteer application form → stored + emailed to staff |
| O3 | Raise public awareness and reduce stigma | Published bilingual awareness/blog content, shareable pages |
| O4 | Let non-technical staff update content without a developer | Admin CMS for posts, events, gallery, impact numbers, donation total |
| O5 | Be usable on a low-end phone over a 3G/4G connection | Lighthouse mobile performance score ≥ 90; total initial JS payload budget enforced (see §5) |
| O6 | Never expose an identifiable patient without documented consent | CMS enforces a consent flag before any patient-linked story/photo can publish |

## 3. Stakeholders & User Roles

| Role | Description | Access |
|---|---|---|
| **Visitor (public)** | Any unauthenticated user — donor, volunteer prospect, family member, press, general public | Read-only public site; can submit donation, volunteer application, contact form, newsletter signup |
| **Content Editor** | Center staff who publish blog/news posts, events, gallery updates | Firebase-authenticated; CMS access scoped to content collections only |
| **Admin** | Center director / designated super-user | Full CMS access + volunteer application review + donation record view + user management |
| **Developer/Maintainer** | Whoever maintains the codebase post-launch | Firebase project owner access, CI/CD, environment secrets |

Roles are implemented as **Firebase custom claims** (`editor`, `admin`) on top of Firebase Authentication — see `architecture.md` §4.

## 4. Functional Requirements

### 4.1 Public Site — Core Pages

| ID | Requirement |
|---|---|
| FR-1 | Home page summarizing mission, impact snapshot, primary donate CTA, and secondary volunteer/learn-more CTAs, in both languages |
| FR-2 | About page: founder story (Mikiyas Legesse, 2014 Person of the Year), presidential visit, vision & mission, history |
| FR-3 | Services page detailing all six service areas from `research.md` §2.3, in plain, non-clinical language |
| FR-4 | Mental Health in Ethiopia / Awareness page presenting context statistics with clear source attribution, framed to reduce stigma, not sensationalize it |
| FR-5 | Impact/Stories page presenting anonymized or consented outcome stories — no identifiable patient content without a verified consent flag (see FR-19) |
| FR-6 | Gallery page (photos of facility, activities, events — never close-up identifiable patient photos without consent) |
| FR-7 | Blog/News listing + individual post pages, filterable by category and language |
| FR-8 | Events page listing upcoming/past awareness events, volunteer days, fundraisers |
| FR-9 | Contact page with phone, email, physical address/map embed, and a contact form; phone number visible above the fold sitewide in the header/footer for the "family member in distress" persona from `research.md` §3.2 |
| FR-10 | Press/Recognition page: founder award, presidential visit, media mentions, downloadable one-page fact sheet (PDF) |

### 4.2 Conversion Flows

| ID | Requirement |
|---|---|
| FR-11 | **Donation flow:** amount selector (preset + custom), one-time vs. recurring toggle, donor info form, payment via Chapa hosted checkout (supports local mobile money + international cards), success/failure confirmation page, automated email receipt |
| FR-12 | **In-kind giving:** a static/CMS-editable page listing currently needed materials (clothes, food, bedding, cleaning supplies) with drop-off logistics — no payment integration required |
| FR-13 | **Volunteer application:** short multi-step form (skills-based vs. general volunteer), stored in Firestore, triggers an email notification to staff, applicant receives a confirmation email |
| FR-14 | **Newsletter signup:** email capture, stored in Firestore/synced to an email tool, double opt-in |
| FR-15 | **Contact form submission:** stored in Firestore, triggers staff email notification, spam-protected (Firebase App Check + honeypot field, no CAPTCHA friction unless abuse is observed) |

### 4.3 Admin / CMS

| ID | Requirement |
|---|---|
| FR-16 | Authenticated admin area (`/admin`) — Firebase Auth email/password or Google sign-in, restricted to invited staff accounts only (no public self-registration) |
| FR-17 | CRUD for blog/news posts, events, gallery items, in both languages, with draft/published states |
| FR-18 | CRUD for the "impact numbers" shown on the home page (patients supported, meals served, etc.) so staff can update figures without a deploy |
| FR-19 | **Consent flag requirement:** any story or photo record tagged as patient-linked must have a `consentConfirmed: true` field, set explicitly by an Admin, before the publish action is enabled in the UI |
| FR-20 | Volunteer application inbox: list, filter by status (new/contacted/scheduled/archived), mark status, view submitted details |
| FR-21 | Donation log view (read-only from the client; source of truth is the Chapa-verified Cloud Function write) — amount, donor name (or "Anonymous"), date, status |
| FR-22 | Basic role management: Admin can invite a new staff member and assign `editor` or `admin` claim |

### 4.4 Cross-Cutting Functional Requirements

| ID | Requirement |
|---|---|
| FR-23 | Full bilingual support (Amharic/English) with a persistent language switcher; language preference stored client-side and reused on return visits |
| FR-24 | Responsive design across mobile (360px+), tablet, and desktop breakpoints, mobile-first |
| FR-25 | SEO essentials: per-page meta titles/descriptions, Open Graph tags, sitemap.xml, robots.txt, structured data (Organization/NGO schema) |
| FR-26 | Social sharing on blog/story/event pages |
| FR-27 | Analytics: pageviews, donation funnel drop-off, volunteer form completion rate |

## 5. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | Lighthouse mobile Performance ≥ 90, Accessibility ≥ 95; initial route JS ≤ ~150KB gzipped; images served as responsive, next-gen formats (AVIF/WebP) with lazy loading below the fold — directly driven by the low-bandwidth findings in `research.md` §3.3 |
| **Accessibility** | WCAG 2.2 AA minimum across color contrast, keyboard navigation, screen-reader labeling, focus states; form errors announced via ARIA live regions |
| **Security** | Firestore/Storage security rules default-deny; no personal data (donor, volunteer applicant) readable without authentication; payment verification happens server-side only (client never marks a donation as "paid"); Firebase App Check enabled on all callable functions and Firestore access from web |
| **Privacy & data protection** | Collect the minimum personal data needed per flow; documented data retention approach for volunteer/donor records; patient-linked content gated by FR-19's consent flag; no third-party ad trackers |
| **Availability** | Static hosting via Firebase Hosting CDN — effectively 99.9%+ availability by default; Cloud Functions used only for payment webhook, email triggers, and privileged writes, keeping the core site available even if a function is degraded |
| **Localization** | All UI strings and CMS content fields exist in both `en` and `am`; Amharic (Ge'ez script) renders correctly via an Ethiopic-inclusive font stack (e.g., Noto Sans Ethiopic) |
| **Maintainability** | Non-technical staff can publish content through the admin CMS without touching code or redeploying; codebase uses TypeScript + linting/formatting to keep future contributions consistent |
| **Browser support** | Latest two versions of Chrome, Safari, Firefox, Edge; Android/iOS mobile browsers as the primary target given the mobile-first audience |
| **Cost** | Architecture must fit comfortably within Firebase's free/low-tier for a site of this traffic scale at launch, with a clear, documented cost-scaling path (see `architecture.md` §8) appropriate for an NGO budget |

## 6. Sitemap (Page Inventory)

```
/                          Home
/about                     About (founder, vision, mission, history)
/services                  Services
/awareness                 Mental Health in Ethiopia
/stories                   Impact & Stories
/gallery                   Gallery
/blog                      Blog/News listing
/blog/:slug                Blog/News post
/events                    Events listing
/events/:slug              Event detail
/donate                    Donation flow
/donate/success            Donation confirmation
/give-in-kind              In-kind giving info
/volunteer                 Volunteer application
/press                     Press & recognition
/contact                   Contact
/privacy-policy            Privacy Policy
/terms                     Terms of Use
/admin                     Admin login (redirects to dashboard if authenticated)
/admin/dashboard           Admin dashboard
/admin/posts               Blog/News CRUD
/admin/events              Events CRUD
/admin/gallery             Gallery CRUD
/admin/stories             Stories CRUD (with consent flag)
/admin/volunteers          Volunteer application inbox
/admin/donations           Donation log (read-only)
/admin/settings            Impact numbers, site settings, staff roles
```

## 7. Technology Stack Summary

| Layer | Choice | Why (see `research.md` §3.5 for detail) |
|---|---|---|
| Frontend framework | React 19 + TypeScript | Client-specified; standard for this project shape |
| Build tool | Vite 7 | Fast dev/build, first-party Tailwind v4 plugin |
| Styling | Tailwind CSS v4 | Client-specified; CSS-first config, fast engine |
| Routing | React Router v7 | SPA routing incl. admin section guards |
| Server state | TanStack Query | Firestore reads/writes, caching, retries |
| Client/UI state | Zustand | Language toggle, UI-only state |
| Forms & validation | React Hook Form + Zod | Donation/volunteer/contact forms |
| i18n | react-i18next | EN/AM string management |
| Backend (BaaS) | Firebase (Auth, Firestore, Storage, Cloud Functions, Hosting) | Client-specified; matches project shape, see `architecture.md` |
| Payments | Chapa | Only aggregator covering both Ethiopian mobile money and international cards behind one API |
| Email | Firebase Cloud Functions + a transactional email provider (e.g., Resend/SendGrid) | Receipts, staff notifications |
| Hosting/CDN | Firebase Hosting | Static SPA hosting, preview channels for PR review |
| CI/CD | GitHub Actions | Build + deploy to Firebase Hosting on merge |
| Monitoring | Firebase Performance Monitoring + Cloud Logging; optional Sentry for error tracking | Production visibility |
| Analytics | Google Analytics 4 (via Firebase) or Plausible if a cookie-light option is preferred | Funnel analytics per FR-27 |

## 8. Third-Party Integrations

- **Chapa** — donation payment initialization, hosted checkout redirect, server-side webhook verification.
- **Transactional email provider** (Resend, SendGrid, or Firebase Extension "Trigger Email") — donation receipts, volunteer confirmations, staff notifications.
- **Google Maps embed** — facility location on Contact page.
- **Google Analytics 4 / Plausible** — traffic and funnel analytics.
- **Firebase App Check + reCAPTCHA Enterprise (or hCaptcha)** — bot/spam protection on public forms and callable functions.

## 9. Out of Scope (v1)

- Native mobile apps (iOS/Android) — responsive web only.
- Patient case-management / EHR-style internal system — this project is a public-facing marketing/fundraising site, not clinical software.
- Direct telebirr/CBE Birr integrations outside of Chapa's aggregation (candidate for a later phase — see `roadmap.md`).
- E-commerce/merchandise store.
- Live chat support.
- Multi-currency donation display beyond ETB/USD.

## 10. Acceptance Criteria (v1 Launch)

- [ ] All pages in §6 are live in both languages.
- [ ] A test donation completes end-to-end and appears correctly in the admin donation log with server-verified status.
- [ ] A volunteer application submission is stored, staff receives an email, and applicant receives a confirmation.
- [ ] Admin can publish/unpublish a blog post and a gallery item without developer involvement.
- [ ] No patient-linked story/photo is publishable without the FR-19 consent flag being set.
- [ ] Lighthouse mobile scores meet the thresholds in §5.
- [ ] Firestore/Storage security rules pass a rules-unit-test suite covering "public cannot read personal data" and "unauthenticated user cannot write admin-only collections."
- [ ] Site passes a manual WCAG 2.2 AA spot-check (keyboard-only nav, screen reader pass on Home/Donate/Contact).
