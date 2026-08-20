import { Navbar } from "@/components/Layout";
import { DynamicPageHero } from "@/components/DynamicPageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";

function LegalPage({ pageId }: { pageId: "privacy" | "terms" }) {
  const { lang } = useLanguage();
  const { page } = usePageContent(pageId);
  const localize = (value?: { en?: string; am?: string }) => value?.[lang] || value?.en || value?.am || "";

  return (
    <Navbar>
      <DynamicPageHero pageId={pageId} />
      <article className="bg-white py-12 sm:py-16">
        <div className="container max-w-3xl space-y-8">
          {page.sections.slice().sort((a, b) => a.order - b.order).map((section) => (
            <section key={section.id} className="space-y-3 border-b border-border pb-8 last:border-0">
              <h2 className="editorial-display text-3xl font-normal text-teal-950">{localize(section.title)}</h2>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{localize(section.body)}</p>
            </section>
          ))}
        </div>
      </article>
    </Navbar>
  );
}

export function Privacy() { return <LegalPage pageId="privacy" />; }
export function Terms() { return <LegalPage pageId="terms" />; }
