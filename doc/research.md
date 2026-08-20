# Research Dossier — Selihom Mental Health Patients Resource Center Website

> Status: Draft v1.0 · Last updated: 2026-08-11
> Purpose: Ground the website project in verified organizational facts, the Ethiopian mental-health context, the audience the site must serve, and the technical landscape it will be built on.

---

## 1. Executive Summary

Selihom Mental Health Patients Resource Center is a community-based facility in the Entoto area of Addis Ababa, Ethiopia, that rescues, shelters, treats, and reintegrates people living with untreated mental illness — many of whom come directly off the street. It was founded by **Mikiyas Legesse**, named Ethiopia's Person of the Year in 2014, and has been visited by former President **Sahle-Work Zewde**. It currently supports roughly **200 patients**.

The organization has no existing digital presence beyond the source materials supplied for this project (a one-page overview document and a nine-slide awareness deck). The website's job is to do three things at once: **build public trust and awareness**, **convert that trust into donations, volunteers, and material support**, and **protect the dignity and privacy of an extremely vulnerable patient population** while doing so. Every downstream document in this bundle (specification, architecture, design, roadmap) is written to serve those three goals together — none of them can be optimized in isolation.

---

## 2. Primary Research — What We Know About Selihom

Source: `SELIHOM.docx` (organizational overview) and `New_Microsoft_PowerPoint_Presentation__3_.pptx` (9-slide awareness deck), both supplied by the client. Cross-referenced against each other; where the two disagree in spelling only, the more complete version is used.

### 2.1 Organizational Facts

| Fact | Detail |
|---|---|
| Name | Selihom Mental Health Patients Resource Center |
| Type | Community-based, charitable / non-profit facility |
| Location | Entoto area, Addis Ababa, Ethiopia |
| Capacity | ~200 patients |
| Founder | Mikiyas Legesse — named Ethiopia's Person of the Year, 2014 |
| Notable recognition | Visited by former President Sahle-Work Zewde |
| Core model | Street rescue → treatment/shelter → rehabilitation → reintegration into family/community |

### 2.2 Vision & Mission (as stated in source deck)

- **Vision:** Patients fully recover, return to society with dignity and confidence, and become self-sufficient, productive citizens.
- **Mission:**
  1. Provide quality medical, rehabilitation, and social support services.
  2. Rescue and protect patients from the street and dangerous situations.
  3. Improve community attitudes toward mental health.
  4. Teach life and vocational skills so patients can support themselves.

### 2.3 Services Offered

1. **Psychiatric treatment** — medication, follow-up, individual counselling.
2. **Shelter and care** — safe housing, food, clothing, daily care.
3. **Rehabilitation programs** — physical activity, group therapy, social-skills building.
4. **Vocational skills training** — sewing, farming, handicrafts — a path to self-reliance.
5. **Community reintegration** — reconnecting patients with family, ongoing follow-up.
6. **Awareness raising** — public education about mental health.

### 2.4 Challenges (directly informs site priorities)

- Limited, unstable funding for medicine, food, and staff salaries; heavy reliance on donations.
- Strong social stigma — mental illness in parts of Ethiopian society is still linked to evil spirits or curses, leading to isolation and rejection of patients and families.
- Severe shortage of trained mental-health professionals nationally.
- Difficulty securing long-term support and follow-up after a patient leaves the center.

**Implication for the website:** funding and stigma are the two challenges a website can directly move the needle on — everything else (staffing shortages, clinical capacity) is outside what a marketing/informational site can fix. Donations, volunteering, and awareness content should therefore be first-class, not buried features.

### 2.5 Mental Health in Ethiopia — Context Cited in Source Material

- Roughly 1 in 6 people will experience a mental illness in their lifetime.
- Severe illness (e.g., schizophrenia) affects an estimated 1–2% of the population.
- Depression affects an estimated 5% of people at any given time.
- The treatment gap exceeds 60% — most people who need care never receive it.
- Specialized psychiatric care is heavily concentrated in Addis Ababa, leaving most of the country underserved.
- Many people first seek traditional or religious healing before (or instead of) formal treatment.
- Centers like Selihom fill a gap that the formal healthcare system does not currently cover.

**Source limitation, stated honestly:** these figures come from the client-supplied deck, not an independently verified epidemiological source, and the center's own operational statistics (annual budget, outcomes data, patient-reported results) were not available in the source material. The website's Impact/Statistics section should therefore either (a) cite Ministry of Health / WHO Ethiopia figures directly with attribution once available, or (b) present Selihom's own figures explicitly as "as reported by the center," and avoid asserting precision the source data doesn't support. This is a credibility issue, not just a legal one — an NGO site with unverifiable stats undermines the trust it's trying to build.

### 2.6 How the Deck Frames "How You Can Help" (existing calls to action)

1. **Money** — medicine, food, shelter, staff salaries.
2. **Materials** — clothes, food, cleaning supplies, bedding.
3. **Volunteering** — time and skills.
4. **Family/neighbors** — don't isolate people with mental illness; offer support; help them access treatment.

These four map almost one-to-one onto the site's primary conversion paths: **Donate (money)**, **Give in-kind (materials)**, **Volunteer**, and **Learn/Awareness** (for the community-attitude piece, which isn't a transaction but is still a core goal).

---

## 3. Secondary Research — Landscape & Comparables

### 3.1 The competitive/comparable landscape

Ethiopian mental-health and social-care organizations currently have thin, inconsistent digital presences — most rely on Facebook pages, occasional press coverage, or nothing at all. This is actually a strategic opening: a well-built, bilingual, mobile-first, donation-enabled site would put Selihom ahead of most domestic peers on credibility signals alone (professional design, transparent reporting, working payment integration, verifiable contact information). International mental-health and street-rescue NGOs (comparable in mission, not geography) consistently structure their sites around a small number of proven patterns worth borrowing:

- A single, prominent, low-friction donation path reachable from every page (not buried in a menu).
- Story-driven impact content that shows outcomes without exploiting identifiable individuals.
- A clear, separate volunteer/get-involved funnel with its own short application form.
- Transparent "where your money goes" breakdowns — this matters even more for a donation-dependent NGO than for a commercial brand, because trust is the entire product.
- A press/recognition section — Selihom already has two strong trust signals (Person of the Year founder, a presidential visit) that most peer organizations don't have, and the site should surface these prominently rather than mention them once.

### 3.2 Audience & Personas

The four calls-to-action in §2.6 map to four primary audience segments, plus two secondary ones:

| Persona | Primary goal on the site | Notes |
|---|---|---|
| **Local & diaspora donor** | Give money quickly and trust where it goes | Diaspora donors need international card/PayPal-style rails; local donors need Ethiopian mobile-money rails (telebirr, CBE Birr, bank transfer) — a single payment gateway that aggregates both is strongly preferred over building two integrations. |
| **Prospective volunteer** | Understand what's needed, apply in under 5 minutes | Skills-based (medical, counselling, vocational trainers) and general (materials drop-off, event help) volunteers are different funnels. |
| **Family member of someone struggling** | Find out if/how Selihom can help their relative, get a phone number or intake path fast | This user may be in crisis-adjacent distress themselves. Design must be calm, high-contrast, low-jargon, and put a phone number above the fold — not just a contact form. |
| **General public / community-attitude target** | Learn that mental illness isn't caused by evil spirits, reduce stigma | Awareness/blog content, plain-language explainers, possibly Amharic-first content since this audience is less likely to be diaspora/English-first. |
| **Press / partner organizations / government** | Verify legitimacy, find leadership contact, download a fact sheet | Supports the "About / Recognition" and a lightweight press kit. |
| **Center staff / admin (internal)** | Publish updates, manage donation records, respond to volunteer applications, without needing a developer | Drives the requirement for a lightweight CMS rather than hard-coded content. |

### 3.3 Language & Accessibility Constraints (Ethiopia-specific)

- Ethiopia's working languages include Amharic (Ge'ez script). The site's core audience spans English-fluent diaspora/international donors and Amharic-first local visitors — **the site must be genuinely bilingual (EN/AM), not just translated as an afterthought.** Ge'ez-script rendering requires a font stack that includes an Ethiopic-script typeface (e.g., Noto Sans Ethiopic) — most default web font stacks silently fall back to tofu boxes without it.
- Mobile data in Ethiopia is comparatively expensive and connections are frequently 3G/4G rather than reliable broadband/Wi-Fi. This pushes hard toward **mobile-first, low-payload design**: aggressive image compression/next-gen formats, minimal JS payload, and graceful behavior on slow connections — this is a performance requirement, not just an aesthetic one, and it's covered as such in `specification.md` and `architecture.md`.
- A meaningful share of the audience visits primarily via phone, so form-heavy flows (donation, volunteer signup) must be thumb-friendly and short.

### 3.4 Payments Research — Ethiopian Payment Rails

Ethiopia's card-payment penetration is low relative to mobile-money and bank-transfer usage, so a donation flow that only supports international cards will exclude most local donors. Three Ethiopia-specific options exist:

- **telebirr** — Ethio Telecom's mobile-money product; state-affiliated, huge local reach.
- **CBE Birr** — Commercial Bank of Ethiopia's mobile-money product; bank-affiliated.
- **Chapa** — a private, developer-first Ethiopian payment aggregator (positioned as "the Stripe of Ethiopia") that sits on top of telebirr, CBE Birr, other local bank rails, and international cards/PayPal-style methods behind a single modern REST API and hosted checkout, under National Bank of Ethiopia licensing.

**Recommendation carried into `specification.md`/`architecture.md`:** integrate **Chapa** as the primary gateway, since it is the only option that gives one integration surface for both local mobile-money donors and international card donors, with a standard "initialize → redirect to hosted checkout → server-side webhook verification" flow that's a clean fit for a Firebase Cloud Functions backend. Direct telebirr/CBE Birr integration can be a Phase 2+ addition if Chapa's aggregated rails prove insufficient — this is a build-vs-integrate tradeoff worth revisiting once the client confirms bank account/merchant eligibility, since payment-provider access and fee terms in Ethiopia change and must be reverified directly with Chapa before committing scope.

### 3.5 Technology Research — Why This Stack

The user specified Firebase, React, and Tailwind CSS. Current-state findings that shaped the specifics in `architecture.md`:

- **React 19 + Vite 7 + TypeScript** is the standard modern combination for a fast, type-safe single-page/static site in 2026 — Vite's dev server and build performance, paired with React's ecosystem, is the default choice for content-plus-interactivity sites of this size.
- **Tailwind CSS v4** rewired its own setup (CSS-first configuration via `@import "tailwindcss"`, a first-party Vite plugin, no required `tailwind.config.js`, and a much faster engine) — the architecture doc uses v4 conventions rather than the older v3 `@tailwind` directive approach.
- **Firebase** in its current form is a full serverless suite (Authentication, Firestore, Cloud Storage, Cloud Functions, Cloud Run, Hosting/App Hosting, Analytics, App Check) rather than "just a backend," which is precisely the shape this project needs: no server to manage, a generous free tier appropriate for an NGO's budget, and every service the site needs (auth for admins, a database for content/donations/volunteers, file storage for media, functions for the payment webhook, hosting for the built site) under one project and one bill.
- **Firebase Hosting** (static-site CDN hosting with rewrites) is the right fit here rather than the newer **Firebase App Hosting** (built for server-rendered frameworks like Next.js/Angular) — this project is a client-rendered Vite SPA with a small number of serverless functions behind it, which is exactly Hosting-plus-Functions' sweet spot, not App Hosting's.

### 3.6 Ethical & Data-Sensitivity Research

This is a mental-health organization serving people who were, in many cases, rescued from acute vulnerability. That changes the risk profile of an otherwise-ordinary NGO site:

- **No patient can be identifiable without explicit, informed, revocable consent** — no full names, no faces in photos without consent and context control, no diagnosis-specific stories tied to an identifiable person. This is carried into `specification.md` as a hard non-functional requirement and into `design.md` as an imagery guideline.
- Any "impact story" content should default to composite/anonymized narratives or first-person stories the subject has explicitly agreed to share, with a documented consent process the client owns (this is an organizational/process requirement, not something the website itself can enforce — but the CMS should have a "consent confirmed" flag before a story can be published).
- Donation and volunteer application data includes personal information (name, email, phone, possibly payment metadata) and must be handled under baseline data-protection practices (encryption in transit/at rest via Firebase defaults, least-privilege security rules, no public read access to any collection containing personal data) — detailed in `architecture.md` §Security.

---

## 4. Open Questions for the Client

These could not be answered from the supplied source material and should be resolved before or during Phase 0 of `roadmap.md`:

1. Does Selihom have a registered business/NGO number, bank account, and the eligibility to open a Chapa (or bank) merchant account for receiving donations?
2. Is there an existing brand identity (logo, colors) to preserve, or is this a green-field brand decision (see `design.md`)?
3. Who on the client side will own ongoing content updates (blog posts, event listings, donation-total updates) after launch — does that person need CMS training?
4. Is there a formal consent process today for photographing/interviewing patients for stories, or does one need to be created alongside the site?
5. Preferred domain name and whether Amharic content should be the default locale for Ethiopian visitors (geolocation-based) or user-selected only.

---

## 5. How This Document Feeds the Rest of the Bundle

- `specification.md` turns §2 (services, CTAs) and §3.2–3.6 (personas, payments, ethics) into concrete functional/non-functional requirements.
- `architecture.md` turns §3.4–3.5 into the actual system design (Chapa integration flow, Firestore data model, Firebase service choices).
- `design.md` turns §3.3 (language, low-bandwidth) and §3.6 (dignity/imagery) into the visual and content design system.
- `roadmap.md` / `todo.md` turn §4 (open questions) into Phase 0 discovery tasks that block later phases.
