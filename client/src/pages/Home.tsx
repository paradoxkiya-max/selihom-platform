import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Activity, ArrowRight, Compass, Heart, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Layout";
import { DynamicPageHero, DynamicPageSections } from "@/components/DynamicPageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { listCollection } from "@/lib/firestore";
import type { PageSection } from "@/lib/pageContentStore";

const impactLabels = {
  beneficiaries: { en: "People reached", am: "የደረስንባቸው ሰዎች" },
  counseling: { en: "Counseling sessions", am: "የምክር ክፍለ ጊዜዎች" },
  workshops: { en: "Community workshops", am: "የማህበረሰብ አውደ ጥናቶች" },
  volunteers: { en: "Active volunteers", am: "ንቁ ፈቃደኞች" },
} as const;

const sectionLinks: Record<string, string> = {
  "clinical-care": "/services",
  "community-awareness": "/awareness",
  "volunteer-outreach": "/volunteer",
};

export default function Home() {
  const { lang } = useLanguage();
  const { page } = usePageContent("home");
  const [impact, setImpact] = useState({ beneficiaries: "45,000+", counseling: "12,400+", workshops: "320+", volunteers: "1,150+" });

  useEffect(() => {
    let cancelled = false;
    listCollection<Record<string, unknown>>("settings").then((items) => {
      const source = items.find((item) => item.key === "impact") || items[0];
      if (!cancelled && source) {
        setImpact((current) => ({
          beneficiaries: String(source.beneficiaries ?? current.beneficiaries),
          counseling: String(source.counseling ?? current.counseling),
          workshops: String(source.workshops ?? current.workshops),
          volunteers: String(source.volunteers ?? current.volunteers),
        }));
      }
    }).catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  const programSections = useMemo(
    () => page.sections.filter((section) => section.id !== "mission-overview").sort((a, b) => a.order - b.order),
    [page.sections],
  );

  const localize = (value?: { en?: string; am?: string }) => value?.[lang] || value?.en || value?.am || "";

  return (
    <Navbar>
      <DynamicPageHero pageId="home" />

      <div className="border-b border-teal-800 bg-teal-900 px-4 py-4 text-xs font-medium uppercase tracking-wider text-teal-100 sm:text-sm">
        <div className="container flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <span className="flex items-center gap-2 whitespace-nowrap"><Compass className="h-4 w-4 text-amber-400" /> Addis Ababa Headquarters</span>
          <span className="hidden md:inline">•</span>
          <span className="flex items-center gap-2 whitespace-nowrap"><Activity className="h-4 w-4 text-emerald-400" /> 24/7 Toll-Free Support: 9505</span>
          <span className="hidden md:inline">•</span>
          <span className="flex items-center gap-2 whitespace-nowrap"><ShieldCheck className="h-4 w-4 text-teal-300" /> Verified Ethiopian CSO #4421</span>
        </div>
      </div>

      <section className="border-b border-border bg-white py-14 sm:py-20">
        <div className="container grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-8">
          {(Object.keys(impactLabels) as Array<keyof typeof impactLabels>).map((key) => (
            <div key={key} className="space-y-2 rounded-2xl border border-border/60 bg-slate-50 p-5 text-center shadow-xs sm:p-6">
              <div className="text-3xl font-black text-teal-800 sm:text-5xl">{impact[key]}</div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground sm:text-sm">{impactLabels[key][lang]}</div>
            </div>
          ))}
        </div>
      </section>

      <DynamicPageSections pageId="home" />

      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="container space-y-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">{lang === "en" ? "Managed programmes" : "የሚተዳደሩ መርሃ ግብሮች"}</span>
            <h2 className="editorial-display text-4xl font-normal leading-tight text-teal-950 sm:text-5xl">{lang === "en" ? "Care that moves with the community." : "ከማህበረሰቡ ጋር የሚንቀሳቀስ እንክብካቤ።"}</h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{lang === "en" ? "Programme copy, images, and calls to action are managed from the Selihom CMS and published in both languages." : "የመርሃ ግብር ጽሁፎች፣ ምስሎች እና የእርምጃ ጥሪዎች ከሰሊሆም CMS በሁለቱም ቋንቋዎች ይተዳደራሉ።"}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {programSections.map((section: PageSection) => (
              <article key={section.id} className="group overflow-hidden rounded-[1.5rem] border border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                <div className={`h-2 ${section.accent === "amber" ? "bg-amber-500" : "bg-teal-700"}`} />
                <div className="space-y-5 p-7 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">{localize(section.subtitle)}</span>
                    <Sparkles className="h-4 w-4 text-amber-500" />
                  </div>
                  <h3 className="editorial-display text-2xl font-normal leading-tight text-teal-950">{localize(section.title)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{localize(section.body)}</p>
                  <Link href={sectionLinks[section.id] || "/contact"} className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 transition group-hover:translate-x-1 hover:text-teal-900">
                    {lang === "en" ? "Explore programme" : "መርሃ ግብሩን ይመልከቱ"}<ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-teal-950 py-16 text-white sm:py-20">
        <div className="container relative z-10 max-w-3xl space-y-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-500 text-teal-950 shadow-2xl"><PhoneCall className="h-10 w-10" /></div>
          <h2 className="editorial-display text-4xl font-normal sm:text-5xl">{lang === "en" ? "Need immediate psychological support?" : "አስቸኳይ የስነ-ልቦና ድጋፍ ያስፈልግዎታል?"}</h2>
          <p className="text-lg leading-relaxed text-teal-200">{lang === "en" ? "Our helpline is ready to connect you with a trained support person." : "የእርዳታ መስመራችን ከሰለጠነ የድጋፍ ሰጪ ጋር ሊያገናኝዎት ዝግጁ ነው።"}</p>
          <a href="tel:9505" className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-amber-500 px-8 text-xl font-black text-teal-950 shadow-2xl transition hover:bg-amber-400">{lang === "en" ? "Call Helpline: 9505" : "የእርዳታ መስመር: 9505"}</a>
        </div>
      </section>
    </Navbar>
  );
}
