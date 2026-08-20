import { Navbar } from "@/components/Layout";
import { DynamicPageHero } from "@/components/DynamicPageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import type { StoryRecord } from "@/lib/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck } from "lucide-react";

const fallbackStories = [
  { title: { en: "Finding light after grief", am: "ከሀዘን በኋላ ብርሃንን ማግኘት" }, excerpt: { en: "A story of peer support, recovery, and the courage to ask for help.", am: "የአቻ ድጋፍ፣ የፈውስ እና እርዳታን የመጠየቅ ድፍረት ታሪክ።" }, consentGranted: true },
  { title: { en: "A safer conversation for new mothers", am: "ለአዳዲስ እናቶች የተሻለ ውይይት" }, excerpt: { en: "How local peer connections can help make postpartum support easier to reach.", am: "የአካባቢ የአቻ ግንኙነቶች የእናቶችን ድጋፍ በቀላሉ እንዲደርስ የሚያግዙበት።" }, consentGranted: true },
];

function localized(value: { en?: string; am?: string } | string | undefined, lang: "en" | "am") { return typeof value === "string" ? value : value?.[lang] || value?.en || ""; }

export default function Stories() {
  const { lang } = useLanguage();
  const { items } = usePublishedContent<StoryRecord>("stories");
  const stories = (items.length > 0 ? items : fallbackStories).filter((story) => story.consentGranted);

  return (
    <Navbar>
      <DynamicPageHero pageId="stories" />
      <section className="bg-white py-12 sm:py-16">
        <div className="container max-w-5xl space-y-8">
          <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900"><ShieldCheck className="h-5 w-5 shrink-0 text-amber-600" /><span>{lang === "en" ? "Only stories with a verified consent flag are eligible for publication." : "የተረጋገጠ የፈቃድ ምልክት ያላቸው ታሪኮች ብቻ ለህትመት ብቁ ናቸው።"}</span></div>
          <div className="space-y-6">
            {stories.map((story, idx) => (
              <Card key={idx} className="rounded-[1.5rem] border-border bg-white p-6 shadow-sm sm:p-8">
                <CardContent className="space-y-4 p-0">
                  <div className="flex flex-wrap items-center justify-between gap-2"><span className="text-xs font-semibold text-teal-700">{lang === "en" ? "Selihom community story" : "የሰሊሆም ማህበረሰብ ታሪክ"}</span><Badge variant="outline" className="flex items-center gap-1 border-emerald-300 bg-emerald-50 text-emerald-800"><ShieldCheck className="h-3.5 w-3.5" /> {lang === "en" ? "Consent Verified" : "ፈቃድ ተረጋግጧል"}</Badge></div>
                  <h2 className="editorial-display text-2xl font-normal text-teal-950 sm:text-3xl">{localized(story.title, lang)}</h2>
                  <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">{localized(story.excerpt, lang)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Navbar>
  );
}
