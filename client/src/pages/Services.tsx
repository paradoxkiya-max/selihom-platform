import { Link } from "wouter";
import { ArrowRight, Calendar, HeartHandshake, PhoneCall, Shield, Users } from "lucide-react";
import { Navbar } from "@/components/Layout";
import { DynamicPageHero } from "@/components/DynamicPageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePageContent } from "@/hooks/usePageContent";
import { Card, CardContent } from "@/components/ui/card";

const icons = [PhoneCall, HeartHandshake, Users, Calendar, Shield, HeartHandshake];

export default function Services() {
  const { lang } = useLanguage();
  const { page } = usePageContent("services");
  const localize = (value?: { en?: string; am?: string }) => value?.[lang] || value?.en || value?.am || "";

  return (
    <Navbar>
      <DynamicPageHero pageId="services" />
      <section className="bg-white py-14 sm:py-20">
        <div className="container space-y-10">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.22em] text-teal-700">{lang === "en" ? "Managed service catalogue" : "የሚተዳደር የአገልግሎት ዝርዝር"}</span>
            <h2 className="editorial-display text-4xl font-normal leading-tight text-teal-950 sm:text-5xl">{lang === "en" ? "One network. Many ways in." : "አንድ አውታር። ብዙ መግቢያዎች።"}</h2>
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{lang === "en" ? "Staff can update service names, descriptions, ordering, and bilingual copy in the CMS without changing the website code." : "ሰራተኞች ኮዱን ሳይቀይሩ የአገልግሎት ስሞችን፣ ገለጻዎችን እና የትዕዛዝ ቅደም ተከተልን በCMS ማዘመን ይችላሉ።"}</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {page.sections.slice().sort((a, b) => a.order - b.order).map((service, index) => {
              const Icon = icons[index % icons.length];
              return (
                <Card key={service.id} className="group flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] border-border bg-white transition hover:-translate-y-1 hover:shadow-xl">
                  <div className={`h-2 ${service.accent === "amber" ? "bg-amber-500" : "bg-teal-700"}`} />
                  <CardContent className="space-y-5 p-7 sm:p-8">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-teal-700"><Icon className="h-7 w-7" /></div>
                    {service.subtitle ? <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">{localize(service.subtitle)}</p> : null}
                    <h3 className="editorial-display text-2xl font-normal leading-tight text-teal-950">{localize(service.title)}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{localize(service.body)}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 p-8 text-center sm:p-10">
            <h3 className="editorial-display text-3xl font-normal text-teal-950">{lang === "en" ? "Need assistance or want to book a counseling session?" : "እርዳታ ያስፈልግዎታል ወይም የምክር ክፍለ ጊዜ መያዝ ይፈልጋሉ?"}</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{lang === "en" ? "Our team is ready to help you or someone you know." : "ቡድናችን እርስዎን ወይም የሚያውቁትን ሰው ለመርዳት ዝግጁ ነው።"}</p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-teal-700 px-5 py-3 text-sm font-bold text-white transition hover:bg-teal-800">{lang === "en" ? "Contact Our Desk" : "የእውቂያ ዴስካችንን ያግኙ"}<ArrowRight className="h-4 w-4" /></Link>
              <a href="tel:9505" className="inline-flex min-h-11 items-center justify-center rounded-md border border-teal-700 px-5 py-3 text-sm font-bold text-teal-800 transition hover:bg-teal-100">{lang === "en" ? "Call Helpline 9505" : "የእርዳታ መስመር 9505"}</a>
            </div>
          </div>
        </div>
      </section>
    </Navbar>
  );
}
