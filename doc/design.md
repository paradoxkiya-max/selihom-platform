# Design System — Selihom Mental Health Patients Resource Center Website

> Status: Draft v1.0 · Last updated: 2026-08-11
> Depends on: `research.md`, `specification.md`. Feeds: the Tailwind config and component library in the actual codebase.

---

## 1. Design Principles

1. **Dignity over drama.** This site represents real people who have experienced acute vulnerability. Nothing about the visual design should sensationalize illness or poverty for emotional effect. Warmth and hope, not pity.
2. **Calm, not clinical, not cold.** The palette and type system should read as reassuring — closer to a community/wellness brand than a hospital brochure or a bureaucratic NGO template.
3. **Clarity beats cleverness.** The "family member in crisis" persona from `research.md` §3.2 may be visiting this site at a hard moment. Navigation, contrast, and the phone number must never be a scavenger hunt.
4. **Two languages, one quality bar.** Amharic content and layout get the same design care as English — not a shrunken afterthought translation.
5. **Design for a mid-range Android phone on 4G first.** Every visual decision is checked against "does this still feel fast and legible on a small, slower device," per the performance NFRs in `specification.md`.

---

## 2. Brand Identity

- **Name presentation:** "Selihom" as the primary wordmark, with "Mental Health Patients Resource Center" as a consistent subordinate tagline/lockup — the org name is short and distinctive enough to lead.
- **Tone of voice:** compassionate, plain-spoken, hopeful, factual. Avoid clinical jargon and avoid charity-appeal clichés ("save," "suffering," "victims"); prefer active, dignity-centered language ("supports," "rebuilds," "returns home").
- **Logo (recommendation, pending client asset):** a simple mark suggesting shelter/return/growth — e.g., an abstracted house or open-hands motif combined with a rising path or leaf — rendered in the primary palette below. If the client has an existing logo, it supersedes this recommendation; only the surrounding system (color/type) should adapt to it.

## 3. Color Palette

A calming teal-blue as primary (associated with trust, stability, healthcare-adjacent-but-not-sterile), a warm terracotta/ochre as the human, hopeful accent (echoes Ethiopian textile and earth tones without literally reproducing the flag), and a restrained neutral scale.

| Token | Hex | Usage |
|---|---|---|
| `primary-50` … `primary-900` | `#F0FAFA` → `#0B3A3E` | Primary teal scale. `primary-600` (`#0F7A80`) is the main brand/CTA color for non-donation actions, links, header. |
| `accent-50` … `accent-900` | `#FDF3EC` → `#7A3B1E` | Warm ochre/terracotta. `accent-600` (`#C1652E`) reserved for the **Donate** CTA specifically, so it stands apart from all other buttons site-wide. |
| `neutral-50` … `neutral-900` | `#FAFAF9` → `#1C1917` | Warm-grey neutral scale for text/backgrounds/borders — avoid pure black/white for a softer feel. |
| `success` | `#1E8E5A` | Confirmation states (donation success, form submitted) |
| `warning` | `#B8860B` | Non-blocking notices |
| `danger` | `#B3261E` | Form errors — kept desaturated relative to typical red so error states don't feel alarming |
| `focus-ring` | `#0F7A80` at 40% opacity | Visible focus outline for keyboard navigation (accessibility) |

Contrast rule: every text/background pairing used in the UI must meet WCAG 2.2 AA (4.5:1 body text, 3:1 large text/UI components) — verified in the component library, not just spot-checked.

## 4. Typography

| Role | Typeface | Notes |
|---|---|---|
| Latin headings | **Fraunces** or **Lora** (serif, warm, not corporate) | Used for H1/H2 to give the brand a human, editorial warmth distinct from generic sans-serif NGO templates |
| Latin body/UI | **Inter** or **Public Sans** | High legibility at small sizes, wide language support, good on low-end screens |
| Ethiopic (Amharic) | **Noto Sans Ethiopic** | Required — most default web font stacks silently fall back to "tofu" boxes for Ge'ez script without an explicit Ethiopic-inclusive font; this is a hard requirement, not a nice-to-have (see `research.md` §3.3) |
| Font loading strategy | Self-hosted via `public/fonts/`, `font-display: swap`, subset where possible | Keeps typography fast on 3G/4G rather than relying on external font-CDN round trips |

Type scale (Tailwind v4 `@theme` tokens, rem-based, mobile-first with responsive up-scaling at `md:`/`lg:`):

```
--text-xs:   0.75rem
--text-sm:   0.875rem
--text-base: 1rem
--text-lg:   1.125rem
--text-xl:   1.25rem
--text-2xl:  1.5rem
--text-3xl:  1.875rem
--text-4xl:  2.25rem
--text-5xl:  3rem
```

## 5. Spacing, Grid & Breakpoints

- Base spacing unit: **4px**, using Tailwind's default spacing scale (no custom override needed) — keeps rhythm predictable across components.
- Max content width: `max-w-7xl` (1280px) for page containers, `max-w-3xl` for long-form reading content (blog posts, story pages) to keep line length comfortable.
- Breakpoints (Tailwind defaults, used mobile-first):

| Breakpoint | Width | Primary target |
|---|---|---|
| (default) | 0–639px | Phones — the primary design target per `research.md` §3.3 |
| `sm` | 640px | Large phones / small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |

## 6. Component System

Core components live in `src/components/ui/` and are built as small, composable, Tailwind-styled React components (not a third-party UI kit dependency, to keep bundle size controlled per the performance NFR):

- **Button** — variants: `primary` (teal), `donate` (ochre accent — reserved exclusively for giving-money actions so it stays visually distinct sitewide), `secondary` (outline), `ghost` (text-only for tertiary actions).
- **Card** — used for blog/event/gallery listing items; consistent image-aspect-ratio, title, meta line, optional tag.
- **Input / Textarea / Select** — consistent label, helper-text, and error-message slots wired to React Hook Form + Zod error states, ARIA-described-by for accessibility.
- **Badge** — status indicators in the admin CMS (`draft`/`published`, `new`/`contacted`).
- **Alert / Toast** — success/error/info feedback for form submissions.
- **Modal / Drawer** — used sparingly (e.g., gallery lightbox, mobile nav drawer) — avoided for anything that could instead be a normal page, since modals are harder to make accessible and don't deep-link well.
- **LanguageSwitcher** — persistent EN/አማ toggle in the header, always visible, never buried in a menu.
- **StickyDonateBar** (mobile) — a slim, dismissible sticky footer bar with a Donate CTA on scroll, so the primary conversion action from `research.md` §2.6 stays reachable without a full sticky header eating screen space on small phones.

## 7. Page-Level Layout Notes

- **Home:** hero with a single clear headline + one primary CTA (Donate) and one secondary CTA (Learn more/Volunteer) — impact-numbers strip (from `siteSettings/impactNumbers`) directly beneath the fold, then a short services overview, a founder/recognition teaser linking to `/press`, a story teaser linking to `/stories`, and a closing CTA band before the footer.
- **Donate:** the shortest possible path — amount → donor info → Chapa checkout — kept to a single page with progressive disclosure rather than a multi-page wizard, since donation abandonment rises with every added step.
- **Volunteer:** a short two-step form (type of volunteering → details) rather than one long form, using a visible step indicator so mobile users know how much is left.
- **Awareness / Mental Health in Ethiopia:** statistic cards up top (clearly captioned with their source, per the credibility note in `research.md` §2.5), followed by plain-language explainer content — designed to be the most shareable page on the site for the stigma-reduction goal (O3 in `specification.md`).
- **Stories/Gallery:** grid layout, every patient-linked item visually indistinguishable from consented/anonymized ones (i.e., consent status is a backend/editorial gate, never a visible "approved" badge on the public page, to avoid implying the reverse about unlabeled content).
- **Admin dashboard:** utilitarian, information-dense, not held to the same "warm/editorial" brand treatment as the public site — clarity and speed for staff matter more than brand polish here; can reuse a simpler subset of the same design tokens (primary color, neutral scale, base type) without the serif display type or decorative imagery.

## 8. Imagery & Photography Guidelines

- No identifiable photo of a patient may be used anywhere on the public site without a confirmed consent record (enforced technically via FR-19 / the `consentConfirmed` field in `architecture.md` §4 and §5 — this section is the editorial policy that field exists to support).
- Preferred imagery: facility/environment shots, hands-on activity photos where individuals aren't the focal, staff and volunteers (with their own consent), and any patient photography that is close-up/identifiable only with documented, revocable consent and ideally the subject's own choice to participate.
- Avoid: stock "poverty tourism" imagery, downward-looking or pitying compositions, anything that frames patients as spectacle rather than people mid-recovery.
- All images ship as responsive, compressed WebP/AVIF (per `architecture.md` §8) with descriptive alt text in both languages for accessibility and SEO.

## 9. Motion & Interaction

- Motion is subtle and functional: fades/slide-ins on scroll-into-view for section reveals, standard easing (`ease-out`, ~200–300ms), no auto-playing carousels or attention-grabbing animation loops — appropriate restraint given the mental-health context and consistent with the performance budget.
- Respect `prefers-reduced-motion`: all non-essential animation is disabled for users who request it at the OS level.
- Loading states use simple skeleton placeholders rather than spinners for content lists, to reduce perceived wait time on slower connections.

## 10. Accessibility Checklist (design-level)

- [ ] All interactive elements have a visible focus state using `focus-ring` (see §3).
- [ ] Color is never the only signal for form errors or status (icon + text label always accompanies color).
- [ ] Touch targets ≥ 44×44px on mobile.
- [ ] Heading hierarchy (`h1`→`h2`→`h3`) is structurally correct on every page, not just visually styled to look like a hierarchy.
- [ ] All images have meaningful alt text (or empty `alt=""` for purely decorative images).
- [ ] Forms have associated `<label>`s, not placeholder-only fields.
- [ ] The site is fully operable by keyboard alone, including the admin CMS.

## 11. Dark Mode

Not required for v1 (deferred, per `specification.md` §9-adjacent scoping) — the palette and component tokens are structured (via Tailwind v4 CSS variables) so a `dark:` variant could be layered on later without a redesign, but it is not a launch requirement.
