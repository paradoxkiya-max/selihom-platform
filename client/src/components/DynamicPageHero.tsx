import type { ReactNode } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";

function LocalizedText({ value }: { value?: { en?: string; am?: string } }) {
  const { lang } = useLanguage();
  return <>{value?.[lang] || value?.en || value?.am || ""}</>;
}

function CmsCta({ href, children, primary }: { href: string; children: ReactNode; primary?: boolean }) {
  const className = primary
    ? "inline-flex min-h-12 items-center justify-center gap-3 rounded-md bg-amber-500 px-6 py-3 text-sm font-bold text-teal-950 shadow-xl transition hover:bg-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
    : "inline-flex min-h-12 items-center justify-center gap-3 rounded-md border border-teal-300 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-900/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200";

  if (href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return <a href={href} className={className}>{children}</a>;
  }
  return <Link href={href} className={className}>{children}</Link>;
}

import { useEffect } from "react";

export function DynamicPageHero({ pageId }: { pageId: string }) {
  const { lang } = useLanguage();
  const { page, loading, source } = usePageContent(pageId);

  useEffect(() => {
    const metaTitle = page.seo?.metaTitle?.[lang] || page.title?.[lang] || "Selihom • Mental Health & Social Services NGO";
    const metaDesc = page.seo?.metaDescription?.[lang] || page.hero.description?.[lang] || "";
    document.title = metaTitle;
    let tag = document.querySelector("meta[name='description']");
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", "description");
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", metaDesc);
  }, [page, lang]);

  return (
    <section
      className="relative overflow-hidden border-b border-teal-900 bg-teal-950 text-white"
      aria-busy={loading}
    >
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity"
        style={{ backgroundImage: `url('${page.hero.backgroundImageUrl}')` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/85 to-teal-900/40" aria-hidden="true" />
      <div className="container relative z-10 py-20 sm:py-24 lg:py-32">
        <div className="max-w-4xl space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-700 bg-teal-900/80 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-300 backdrop-blur-md">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <LocalizedText value={page.hero.badge} />
          </div>
          <h1 className="editorial-display text-5xl font-normal leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            <LocalizedText value={page.hero.heading} />
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-teal-100/90 sm:text-xl">
            <LocalizedText value={page.hero.description} />
          </p>
          <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">
            <CmsCta href={page.hero.primaryCtaUrl} primary>
              <LocalizedText value={page.hero.primaryCtaText} />
              <ArrowRight className="h-4 w-4" />
            </CmsCta>
            <CmsCta href={page.hero.secondaryCtaUrl}>
              <LocalizedText value={page.hero.secondaryCtaText} />
              <ArrowRight className="h-4 w-4" />
            </CmsCta>
          </div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-teal-300/80">
            {source === "firestore" ? "Live CMS content" : "Selihom editorial fallback"}
          </p>
        </div>
      </div>
    </section>
  );
}

export function DynamicPageSections({ pageId }: { pageId: string }) {
  const { page } = usePageContent(pageId);
  const { lang } = useLanguage();

  if (!page.sections?.length) return null;

  return (
    <section className="border-b border-border bg-white py-16 sm:py-20">
      <div className="container space-y-10">
        {page.sections.slice().sort((a, b) => a.order - b.order).map((section) => (
          <article key={section.id} className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            {section.imageUrl ? (
              <img src={section.imageUrl} alt="" className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" />
            ) : null}
            <div className="space-y-4">
              {section.subtitle ? <p className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700"><LocalizedText value={section.subtitle} /></p> : null}
              <h2 className="editorial-display text-3xl font-normal leading-tight text-teal-950 sm:text-5xl"><LocalizedText value={section.title} /></h2>
              {section.body ? <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{section.body[lang] || section.body.en || section.body.am}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
