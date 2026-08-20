import { Navbar } from "@/components/Layout";
import { DynamicPageHero } from "@/components/DynamicPageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { usePublishedContent } from "@/hooks/usePublishedContent";
import type { GalleryRecord } from "@/lib/firestore";
import { Card, CardContent } from "@/components/ui/card";

const fallbackItems = [
  { title: { en: "Community mental health workshop in Hawassa", am: "በሀዋሳ የማህበረሰብ የአዕምሮ ጤና ስልጠና" }, imageUrl: "/manus-storage/selihom_ethiopia_workshop_retry_fa5db5f5.jpg", caption: { en: "Field note / Community care", am: "የማህበረሰብ እንክብካቤ" } },
  { title: { en: "A calm room for difficult conversations", am: "ለአስቸጋሪ ውይይቶች የተረጋጋ ክፍል" }, imageUrl: "/manus-storage/selihom_ethiopia_counselor_retry_fb86f894.jpg", caption: { en: "Portrait / Clinical care", am: "የሙያ እንክብካቤ" } },
  { title: { en: "Youth peer support in Addis Ababa", am: "በአዲስ አበባ የወጣቶች የአቻ ድጋፍ" }, imageUrl: "/manus-storage/selihom_ethiopia_youth_retry_0bfdc68b.jpg", caption: { en: "Open room / Youth wellbeing", am: "የወጣቶች ደህንነት" } },
  { title: { en: "Care moving across the highlands", am: "በደጋማ አካባቢዎች የሚደርስ እንክብካቤ" }, imageUrl: "/manus-storage/selihom_ethiopia_outreach_retry_72292185.jpg", caption: { en: "Field note / Outreach", am: "የተደራሽነት ስራ" } },
];

function localized(value: { en?: string; am?: string } | string | undefined, lang: "en" | "am") { return typeof value === "string" ? value : value?.[lang] || value?.en || ""; }

export default function Gallery() {
  const { lang } = useLanguage();
  const { items } = usePublishedContent<GalleryRecord>("gallery");
  const galleryItems = items.length > 0 ? items : fallbackItems;

  return (
    <Navbar>
      <DynamicPageHero pageId="gallery" />
      <section className="bg-white py-12 sm:py-16">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 sm:gap-8">
            {galleryItems.map((item, idx) => (
              <Card key={idx} className="group overflow-hidden rounded-[1.5rem] border-border bg-white shadow-sm">
                <div className="image-reveal aspect-[4/3] overflow-hidden bg-slate-100"><img src={item.imageUrl} alt={localized(item.title, lang)} className="h-full w-full object-cover" /></div>
                <CardContent className="space-y-2 p-5 sm:p-6"><div className="text-[11px] font-bold uppercase tracking-widest text-teal-700">{localized(item.caption, lang)}</div><h2 className="editorial-display text-2xl font-normal leading-tight text-teal-950">{localized(item.title, lang)}</h2></CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Navbar>
  );
}
