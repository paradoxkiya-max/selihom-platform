import { useState } from "react";
import { Navbar } from "@/components/Layout";
import { DynamicPageHero } from "@/components/DynamicPageHero";
import { ActionDialog } from "@/components/ActionDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import type { EventRecord, PostRecord } from "@/lib/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

function localized(value: { en?: string; am?: string } | string | undefined, lang: "en" | "am") { return typeof value === "string" ? value : value?.[lang] || value?.en || ""; }

const fallbackPosts = [
  { title: { en: "Understanding anxiety in post-conflict communities", am: "በግጭት በኋላ ባሉ ማህበረሰቦች ጭንቀትን መረዳት" }, excerpt: { en: "An exploration of trauma-informed care and how community networks can rebuild emotional security.", am: "በማህበረሰብ ድጋፍ የስነ-ልቦና ደህንነት እንዴት እንደሚገነባ።" }, imageUrl: "/manus-storage/selihom_ethiopia_outreach_retry_72292185.jpg", label: "Field note / 07", date: "2026-02-02" },
  { title: { en: "Expanding toll-free helpline 9505 to regional towns", am: "ነጻ የስልክ መስመር 9505ን ወደ ክልሎች ማስፋት" }, excerpt: { en: "A programme update on improving access to psychological first aid.", am: "የስነ-ልቦና የመጀመሪያ ድጋፍን ማሻሻል ላይ የተመሰረተ የፕሮግራም ዝመና።" }, imageUrl: "/manus-storage/selihom_ethiopia_workshop_retry_fa5db5f5.jpg", label: "Programme / 04", date: "2026-01-19" },
];

const fallbackEvents = [
  { title: { en: "National Mental Health Town Hall 2026", am: "ብሔራዊ የአዕምሮ ጤና ውይይት 2026" }, description: { en: "An annual convening of clinicians, policymakers, and community advocates.", am: "የጤና ባለሙያዎችን፣ ፖሊሲ አውጪዎችን እና የማህበረሰብ ተሟጋቾችን የሚያሰባስብ ዓመታዊ ውይይት።" }, date: "2026-03-15", location: { en: "Addis Ababa & online", am: "አዲስ አበባ እና በመስመር ላይ" } },
  { title: { en: "Youth Psychological First Aid Workshop", am: "የወጣቶች የስነ-ልቦና የመጀመሪያ ድጋፍ ስልጠና" }, description: { en: "A practical workshop for student leaders on active listening and peer support.", am: "ለተማሪ መሪዎች በንቁ ማዳመጥ እና በአቻ ድጋፍ ላይ የተዘጋጀ ስልጠና።" }, date: "2026-03-28", location: { en: "Hawassa University", am: "ሀዋሳ ዩኒቨርሲቲ" } },
];

export function Blog() {
  const { lang } = useLanguage();
  const { items } = usePublishedContent<PostRecord>("posts");
  const posts = items.length > 0 ? items : fallbackPosts;
  const [post, setPost] = useState<typeof posts[number] | null>(null);

  return (
    <Navbar>
      <DynamicPageHero pageId="blog" />
      <section className="bg-white py-12 sm:py-16"><div className="container max-w-5xl space-y-8"><div className="grid gap-6 md:grid-cols-2 sm:gap-8">{posts.map((item, idx) => <Card key={idx} className="group overflow-hidden rounded-[1.5rem] border-border bg-white shadow-sm"><div className="image-reveal aspect-[16/10] bg-teal-950"><img src={item.imageUrl || "/manus-storage/selihom_ethiopia_outreach_retry_72292185.jpg"} alt={localized(item.title, lang)} className="h-full w-full object-cover" /></div><CardContent className="space-y-4 p-6"><div className="text-[11px] font-bold uppercase tracking-widest text-teal-700">{"label" in item ? item.label : (lang === "en" ? "Field note" : "የሜዳ ማስታወሻ")}</div><div className="flex items-center gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {"date" in item ? item.date : (lang === "en" ? "Selihom update" : "የሰሊሆም ዝመና")}</span><span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> 4 min</span></div><h2 className="editorial-display text-2xl font-normal text-teal-950">{localized(item.title, lang)}</h2><p className="text-sm leading-relaxed text-muted-foreground">{localized(item.excerpt, lang)}</p><Button onClick={() => setPost(item)} variant="outline" size="sm" className="border-teal-600 text-teal-700">{lang === "en" ? "Read Article" : "ጽሁፉን ያንብቡ"}<ArrowRight className="ml-2 h-4 w-4" /></Button></CardContent></Card>)}</div></div></section>
      <ActionDialog open={Boolean(post)} onOpenChange={(open) => !open && setPost(null)} title={post ? localized(post.title, lang) : "Article"} description={post ? localized(post.excerpt, lang) : ""}><div className="flex items-start gap-3 text-sm text-muted-foreground"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-700" /> {lang === "en" ? "This article is ready for the full CMS post template and dynamic body content." : "ይህ ጽሁፍ ለሙሉ CMS ይዘት እና ተለዋዋጭ የጽሁፍ አካል ዝግጁ ነው።"}</div></ActionDialog>
    </Navbar>
  );
}

export function Events() {
  const { lang } = useLanguage();
  const { items } = usePublishedContent<EventRecord>("events");
  const events = items.length > 0 ? items : fallbackEvents;
  const [selected, setSelected] = useState<typeof events[number] | null>(null);

  return (
    <Navbar>
      <DynamicPageHero pageId="events" />
      <section className="bg-white py-12 sm:py-16"><div className="container max-w-5xl space-y-6">{events.map((item, idx) => <Card key={idx} className="space-y-4 rounded-[1.5rem] border-border bg-white p-6 shadow-sm sm:p-8"><div className="inline-block rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-800">{item.date}</div><h2 className="editorial-display text-2xl font-normal text-teal-950 sm:text-3xl">{localized(item.title, lang)}</h2><p className="text-xs font-semibold text-teal-700">{localized(item.location, lang)}</p><p className="text-sm leading-relaxed text-muted-foreground">{localized(item.description, lang)}</p><Button onClick={() => setSelected(item)} className="bg-teal-700 font-bold text-white hover:bg-teal-800">{lang === "en" ? "Register / Attend" : "ይመዝገቡ / ይሳተፉ"}</Button></Card>)}</div></section>
      <ActionDialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} title={lang === "en" ? "Event registration" : "የክስተት ምዝገባ"} description={selected ? localized(selected.title, lang) : ""}><div className="space-y-3 text-sm text-muted-foreground"><p>{lang === "en" ? "Registration is coordinated by the Selihom events desk. Use the contact form to reserve a place and include this event title." : "ምዝገባ በሰሊሆም የክስተት ዴስክ ይተዳደራል። ቦታ ለማስያዝ የእውቂያ ቅጹን ይጠቀሙ እና የክስተቱን ርዕስ ያካትቱ።"}</p><a href="/contact" className="inline-flex h-10 items-center justify-center rounded-md bg-teal-700 px-4 font-semibold text-white">{lang === "en" ? "Contact event desk" : "የክስተት ዴስክን ያግኙ"}<ArrowRight className="ml-2 h-4 w-4" /></a></div></ActionDialog>
    </Navbar>
  );
}
