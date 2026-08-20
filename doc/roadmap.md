# Roadmap — Selihom Mental Health Patients Resource Center Website

> Status: Draft v1.0 · Last updated: 2026-08-11
> Depends on: `research.md`, `specification.md`, `architecture.md`, `design.md`. Companion doc: `todo.md` (granular checklist per phase).
> Timeline estimates assume roughly one focused developer (or a small 2-person team); adjust proportionally for a different team size.

---

## Phase Overview

| Phase | Name | Estimate | Depends on |
|---|---|---|---|
| 0 | Discovery & Foundations | 3–5 days | Client answers to `research.md` §4 |
| 1 | Project Setup & Design System | 4–6 days | Phase 0 |
| 2 | Core Public Pages (static content) | 6–9 days | Phase 1 |
| 3 | Firebase Backend & Auth | 4–6 days | Phase 1 |
| 4 | Admin CMS | 6–8 days | Phase 3 |
| 5 | Donations (Chapa) & Conversion Flows | 6–8 days | Phase 3 |
| 6 | Bilingual Content & i18n Polish | 3–5 days | Phase 2, 4 |
| 7 | QA, Accessibility, Performance | 4–6 days | Phases 2–6 |
| 8 | Launch | 1–2 days | Phase 7 |
| 9 | Post-Launch (30/60/90) | ongoing | Phase 8 |

**Total to launch, rough estimate: ~6–9 weeks** at a sustainable pace for one focused builder; compressible with more hands, especially by running Phase 2 (content pages) and Phase 3 (backend) in parallel since they're largely independent.

---

## Phase 0 — Discovery & Foundations

**Goal:** resolve every open question that would otherwise block downstream decisions, and get real accounts/access provisioned.

- Resolve the five open questions in `research.md` §4 (NGO registration/merchant eligibility, existing brand assets, content ownership, consent process, domain/locale default).
- Create Firebase project(s): `selihom-dev`, `selihom-staging`, `selihom-prod`.
- Register/confirm domain name and DNS access.
- Create a Chapa merchant account (or confirm blocked pending client's registration status) and obtain sandbox API keys.
- Confirm who the 2–4 initial CMS users (staff) will be.

**Exit criteria:** client sign-off on `specification.md` scope; Firebase projects exist; Chapa sandbox keys in hand (or explicit decision to defer donations to a later phase if merchant setup is delayed — this should not block launching the informational site).

## Phase 1 — Project Setup & Design System

**Goal:** a working, empty-but-styled shell that reflects `design.md`.

- Scaffold Vite + React 19 + TypeScript project; install Tailwind v4, React Router, TanStack Query, Zustand, React Hook Form + Zod, react-i18next.
- Implement design tokens from `design.md` §3–5 as Tailwind `@theme` variables.
- Build the base UI component library (`Button`, `Card`, `Input`, `Alert`, `Modal`, `Badge`) per `design.md` §6.
- Build global layout: `Header`, `Footer`, `LanguageSwitcher`, mobile nav drawer, `StickyDonateBar`.
- Set up GitHub repo, branch protections, GitHub Actions skeleton (lint/typecheck/build on PR).
- Self-host and wire up the font stack, including Noto Sans Ethiopic (`design.md` §4).

**Exit criteria:** a deployed (preview-channel) shell site with header/footer/language switcher working and Lighthouse baseline already healthy before content is added.

## Phase 2 — Core Public Pages

**Goal:** every FR-1 through FR-10 page (`specification.md` §4.1) live with real content, in English first, Amharic placeholder-safe.

- Home, About, Services, Awareness, Stories (static/no-CMS placeholder content acceptable at this stage), Gallery, Blog listing + post template, Events listing + detail template, Contact (with map embed + phone number treatment per persona needs), Press/Recognition (+ downloadable fact sheet PDF).
- SEO basics: meta tags, sitemap, robots.txt, Organization schema (FR-25).
- Responsive QA pass across breakpoints in `design.md` §5.

**Exit criteria:** a content stakeholder can review the full public site (English) end to end.

## Phase 3 — Firebase Backend & Auth

**Goal:** the data layer and staff authentication exist and are secured.

- Implement Firestore collections per `architecture.md` §4; deploy `firestore.rules`, `storage.rules`, indexes.
- Implement Firebase Auth staff sign-in + custom-claims role system (`architecture.md` §3).
- Write a rules-unit-test suite (Firestore emulator) covering the acceptance criteria in `specification.md` §10 ("public cannot read personal data," etc.).
- Stand up Cloud Functions project skeleton (`functions/`), deploy a trivial health-check function to confirm the pipeline works end-to-end.

**Exit criteria:** an admin can log in; rules tests pass in CI.

## Phase 4 — Admin CMS

**Goal:** FR-16 through FR-22 (`specification.md` §4.3) fully working.

- Build `/admin/dashboard`, `/admin/posts`, `/admin/events`, `/admin/gallery`, `/admin/stories` (with the mandatory consent-flag UI/UX per FR-19), `/admin/volunteers`, `/admin/donations` (read-only), `/admin/settings`.
- Wire Home page's impact-numbers strip to `siteSettings/impactNumbers`, editable from `/admin/settings`.
- Staff invitation / role-assignment flow (`setStaffRole` callable function).
- Internal walkthrough/training doc or short recorded Loom for the client's content owner (ties back to `research.md` §4 Q3).

**Exit criteria:** staff can publish a real blog post and see it live without a developer touching code.

## Phase 5 — Donations (Chapa) & Conversion Flows

**Goal:** FR-11 through FR-15 working end-to-end against Chapa's sandbox, then live keys.

- Build `/donate` flow UI (amount, donor info, one-time/recurring toggle).
- Implement `initializeChapaTransaction` callable function + `chapaWebhook` HTTPS function per the sequence in `architecture.md` §6.
- Implement `/donate/success` confirmation page + automated receipt email.
- Build `/give-in-kind`, `/volunteer` (multi-step form), newsletter signup, and contact form, each wired to their Firestore trigger notification functions.
- App Check enabled on all public-write surfaces.
- End-to-end test: a real small sandbox donation, confirmed correctly recorded and reflected in `/admin/donations`.

**Exit criteria:** acceptance criteria items 2–3 in `specification.md` §10 pass.

## Phase 6 — Bilingual Content & i18n Polish

**Goal:** full Amharic parity, not just English with a language toggle that mostly shows English.

- Translate all static UI strings (`en.json` → `am.json`).
- Translate/enter Amharic content for every bilingual CMS field created in Phases 2 & 4.
- Verify Ge'ez script rendering across every component, especially form inputs and buttons where text length changes can break layout.
- Confirm locale persistence behavior (§FR-23) and decide/implement the default-locale approach from the open question in `research.md` §4 Q5.

**Exit criteria:** a native Amharic-speaking reviewer can navigate and understand the entire site without switching to English.

## Phase 7 — QA, Accessibility, Performance

**Goal:** meet every NFR in `specification.md` §5 before launch.

- Lighthouse mobile audits on all key templates (Home, Donate, Blog post, Admin) — fix until Performance ≥ 90, Accessibility ≥ 95.
- Manual accessibility pass: keyboard-only navigation, screen reader spot-check (Home, Donate, Contact), color-contrast audit against `design.md` §3.
- Cross-browser/device QA (per the browser-support NFR).
- Security review: confirm rules tests, App Check coverage, secret handling in CI, and that the donation "paid" status truly cannot be set from the client.
- Load-test the donation and volunteer form paths lightly to confirm no obvious spam/rate-limit gaps.

**Exit criteria:** all `specification.md` §10 acceptance criteria checked off.

## Phase 8 — Launch

- Final content freeze and client sign-off.
- DNS cutover to production Firebase Hosting.
- Deploy `selihom-prod`, switch Chapa keys from sandbox to live.
- Submit sitemap to Google Search Console; verify Organization schema renders correctly.
- Announce launch (press/social, tying back to the founder/presidential-visit trust signals in `research.md` §3.1).

## Phase 9 — Post-Launch (30 / 60 / 90 Days)

- **30 days:** monitor donation funnel and volunteer form completion analytics (FR-27); fix any real-world drop-off points found; confirm email deliverability (receipts/notifications not landing in spam).
- **60 days:** first content-freshness pass (new blog posts/events published by staff independently — validates Phase 4's "no developer needed" goal); review Firebase usage/cost against the estimate in `architecture.md` §8.
- **90 days:** revisit the explicitly deferred items in `architecture.md` §9 (direct telebirr/CBE Birr integration, SSR/App Hosting migration, search) based on real usage data rather than speculation.

---

## Risk Register

| Risk | Impact | Mitigation |
|---|---|---|
| Chapa merchant eligibility/registration delays | Blocks Phase 5 | Decouple: launch the informational site (Phases 0–4, 6–8) without waiting on donations; add Phase 5 as a fast-follow |
| No existing brand assets, client wants heavy design iteration | Slows Phase 1 | Timebox brand exploration in Phase 0/1; use `design.md` as a strong default direction to react to rather than starting from a blank page |
| Consent process for patient stories doesn't exist yet organizationally | Blocks real content in Phase 2/4 (Stories/Gallery) | Ship those pages with anonymized/composite placeholder content first; swap in real consented content once the client's process (a non-technical, organizational task) is in place |
| Amharic translation quality/availability | Slows Phase 6 | Identify a translator/reviewer as early as Phase 0, not Phase 6, so translation happens in parallel with development rather than after it |
| Low-bandwidth performance regressions creep in during Phases 2–5 | Fails Phase 7 exit criteria | Run Lighthouse in CI on every PR (not just at the end) so regressions are caught immediately, not discovered in Phase 7 |
