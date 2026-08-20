import { Navbar } from "@/components/Layout";
import { DynamicPageHero } from "@/components/DynamicPageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export default function Awareness() {
  const { lang } = useLanguage();
  const { page } = usePageContent("awareness");
  const localize = (value?: { en?: string; am?: string }) => value?.[lang] || value?.en || value?.am || "";
  const stats = page.sections.filter((section) => section.id !== "stigma").sort((a, b) => a.order - b.order);
  const guidance = page.sections.find((section) => section.id === "stigma");

  return (
    <Navbar>
      <DynamicPageHero pageId="awareness" />
      <section className="bg-white py-12 sm:py-16"><div className="container space-y-10">
        <div className="grid gap-6 md:grid-cols-3">{stats.map((item) => <Card key={item.id} className="rounded-[1.5rem] border-border bg-white shadow-sm"><CardContent className="space-y-3 p-6 sm:p-7"><div className={`text-4xl font-black ${item.accent === "amber" ? "text-amber-600" : "text-teal-700"}`}>{localize(item.title)}</div><h2 className="text-lg font-bold text-teal-950">{localize(item.subtitle)}</h2><p className="text-sm leading-relaxed text-muted-foreground">{localize(item.body)}</p></CardContent></Card>)}</div>
        {guidance ? <div className="rounded-[1.5rem] border border-border bg-slate-50 p-8 sm:p-10"><h2 className="editorial-display text-3xl font-normal text-teal-950 sm:text-4xl">{localize(guidance.title)}</h2><p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">{localize(guidance.body)}</p><div className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2"><div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />{lang === "en" ? "Persistent sadness, anxiety, or emotional numbness" : "የማያቋርጥ ሀዘን፣ ጭንቀት ወይም የስሜት ድንዛዜ"}</div><div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />{lang === "en" ? "Withdrawal from family, friends, or activities" : "ከቤተሰብ፣ ከጓደኞች ወይም ከእንቅስቃሴዎች መራቅ"}</div><div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />{lang === "en" ? "Significant changes in sleep or eating" : "በእንቅልፍ ወይም በአመጋገብ ላይ ከፍተኛ ለውጦች"}</div><div className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />{lang === "en" ? "Feelings of hopelessness or self-harm" : "የተስፋ መቁረጥ ወይም ራስን የመጉዳት ስሜቶች"}</div></div></div> : null}
      </div></section>
    </Navbar>
  );
}
