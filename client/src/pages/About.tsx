import { Navbar } from "@/components/Layout";
import { DynamicPageHero } from "@/components/DynamicPageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShieldCheck, Target } from "lucide-react";

export default function About() {
  const { lang } = useLanguage();
  const { page } = usePageContent("about");
  const localize = (value?: { en?: string; am?: string }) => value?.[lang] || value?.en || value?.am || "";

  return (
    <Navbar>
      <DynamicPageHero pageId="about" />
      <section className="bg-white py-14 sm:py-20">
        <div className="container space-y-12">
          <div className="grid gap-6 md:grid-cols-3">
            {page.sections.slice().sort((a, b) => a.order - b.order).map((section, index) => (
              <Card key={section.id} className="rounded-[1.5rem] border-border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="space-y-5 p-7 sm:p-8">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${index % 2 ? "bg-amber-100 text-amber-800" : "bg-teal-100 text-teal-800"}`}>
                    {index === 0 ? <ShieldCheck className="h-6 w-6" /> : index === 1 ? <Target className="h-6 w-6" /> : <Heart className="h-6 w-6" />}
                  </div>
                  <h2 className="editorial-display text-2xl font-normal leading-tight text-teal-950">{localize(section.title)}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground">{localize(section.body)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-8 rounded-[1.5rem] border border-teal-100 bg-teal-50 p-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center sm:p-10">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">{lang === "en" ? "A living organization" : "ሕያው ድርጅት"}</span>
              <h2 className="editorial-display text-3xl font-normal leading-tight text-teal-950 sm:text-4xl">{lang === "en" ? "Care is stronger when it is shared." : "እንክብካቤ ሲጋራ ይጠነክራል።"}</h2>
            </div>
            <p className="text-base leading-relaxed text-teal-950/75">{lang === "en" ? "Selihom connects clinical care, community knowledge, and accountable partnership so mental health support can remain close, culturally resonant, and practical." : "ሰሊሆም የህክምና እንክብካቤን፣ የማህበረሰብ እውቀትን እና ተጠያቂ አጋርነትን በማገናኘት የአዕምሮ ጤና ድጋፍ ቅርብ፣ ከባህል ጋር የሚስማማ እና ተግባራዊ እንዲሆን ያደርጋል።"}</p>
          </div>
        </div>
      </section>
    </Navbar>
  );
}
