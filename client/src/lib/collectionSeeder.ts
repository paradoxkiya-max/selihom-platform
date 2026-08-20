import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const defaultEvents = [
  { id: "event-1", title: { en: "National Mental Health Town Hall 2026", am: "ብሔራዊ የአዕምሮ ጤና ውይይት 2026" }, description: { en: "An annual convening of clinicians, policymakers, and community advocates.", am: "የጤና ባለሙያዎችን፣ ፖሊሲ አውጪዎችን እና የማህበረሰብ ተሟጋቾችን የሚያሰባስብ ዓመታዊ ውይይት።" }, date: "2026-03-15", location: { en: "Addis Ababa & online", am: "አዲስ አበባ እና በመስመር ላይ" }, status: "published", updatedAt: Date.now() },
  { id: "event-2", title: { en: "Youth Psychological First Aid Workshop", am: "የወጣቶች የስነ-ልቦና የመጀመሪያ ድጋፍ ስልጠና" }, description: { en: "A practical workshop for student leaders on active listening and peer support.", am: "ለተማሪ መሪዎች በንቁ ማዳመጥ እና በአቻ ድጋፍ ላይ የተዘጋጀ ስልጠና።" }, date: "2026-03-28", location: { en: "Hawassa University", am: "ሀዋሳ ዩኒቨርሲቲ" }, status: "published", updatedAt: Date.now() },
];

export const defaultGallery = [
  { id: "gal-1", title: { en: "Community mental health workshop in Hawassa", am: "በሀዋሳ የማህበረሰብ የአዕምሮ ጤና ስልጠና" }, imageUrl: "/manus-storage/selihom_ethiopia_workshop_retry_fa5db5f5.jpg", caption: { en: "Field note / Community care", am: "የማህበረሰብ እንክብካቤ" }, status: "published", updatedAt: Date.now() },
  { id: "gal-2", title: { en: "A calm room for difficult conversations", am: "ለአስቸጋሪ ውይይቶች የተረጋጋ ክፍል" }, imageUrl: "/manus-storage/selihom_ethiopia_counselor_retry_fb86f894.jpg", caption: { en: "Portrait / Clinical care", am: "የሙያ እንክብካቤ" }, status: "published", updatedAt: Date.now() },
  { id: "gal-3", title: { en: "Youth peer support in Addis Ababa", am: "በአዲስ አበባ የወጣቶች የአቻ ድጋፍ" }, imageUrl: "/manus-storage/selihom_ethiopia_youth_retry_0bfdc68b.jpg", caption: { en: "Open room / Youth wellbeing", am: "የወጣቶች ደህንነት" }, status: "published", updatedAt: Date.now() },
  { id: "gal-4", title: { en: "Care moving across the highlands", am: "በደጋማ አካባቢዎች የሚደርስ እንክብካቤ" }, imageUrl: "/manus-storage/selihom_ethiopia_outreach_retry_72292185.jpg", caption: { en: "Field note / Outreach", am: "የተደራሽነት ስራ" }, status: "published", updatedAt: Date.now() },
];

export const defaultStories = [
  { id: "story-1", title: { en: "Finding light after grief", am: "ከሀዘን በኋላ ብርሃንን ማግኘት" }, excerpt: { en: "A story of peer support, recovery, and the courage to ask for help.", am: "የአቻ ድጋፍ፣ የፈውስ እና እርዳታን የመጠየቅ ድፍረት ታሪክ።" }, consentGranted: true, status: "published", updatedAt: Date.now() },
  { id: "story-2", title: { en: "A safer conversation for new mothers", am: "ለአዳዲስ እናቶች የተሻለ ውይይት" }, excerpt: { en: "How local peer connections can help make postpartum support easier to reach.", am: "የአካባቢ የአቻ ግንኙነቶች የእናቶችን ድጋፍ በቀላሉ እንዲደርስ የሚያግዙበት።" }, consentGranted: true, status: "published", updatedAt: Date.now() },
];

export const defaultPosts = [
  { id: "post-1", title: { en: "Understanding anxiety in post-conflict communities", am: "በግጭት በኋላ ባሉ ማህበረሰቦች ጭንቀትን መረዳት" }, excerpt: { en: "An exploration of trauma-informed care and how community networks can rebuild emotional security.", am: "በማህበረሰብ ድጋፍ የስነ-ልቦና ደህንነት እንዴት እንደሚገነባ።" }, imageUrl: "/manus-storage/selihom_ethiopia_outreach_retry_72292185.jpg", label: "Field note / 07", date: "2026-02-02", status: "published", updatedAt: Date.now() },
  { id: "post-2", title: { en: "Expanding toll-free helpline 9505 to regional towns", am: "ነጻ የስልክ መስመር 9505ን ወደ ክልሎች ማስፋት" }, excerpt: { en: "A programme update on improving access to psychological first aid.", am: "የስነ-ልቦና የመጀመሪያ ድጋፍን ማሻሻል ላይ የተመሰረተ የፕሮግራም ዝመና።" }, imageUrl: "/manus-storage/selihom_ethiopia_workshop_retry_fa5db5f5.jpg", label: "Programme / 04", date: "2026-01-19", status: "published", updatedAt: Date.now() },
];

export async function seedCollections(userEmail?: string) {
  const collections = [
    { name: "events", items: defaultEvents },
    { name: "gallery", items: defaultGallery },
    { name: "posts", items: defaultPosts },
  ];

  for (const col of collections) {
    for (const item of col.items) {
      const ref = doc(db, col.name, item.id);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        await setDoc(ref, { ...item, updatedBy: userEmail || undefined });
      }
    }
  }
}
