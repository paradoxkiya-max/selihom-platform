import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface SiteSettings {
  hotlineLabel: { en: string; am: string };
  hotlineNumber: string;
  secondaryPhone: string;
  email: string;
  address: { en: string; am: string };
  registrationLabel: { en: string; am: string };
  footerTagline: { en: string; am: string };
  updatedAt: number;
  updatedBy?: string;
}

export const defaultSiteSettings: SiteSettings = {
  hotlineLabel: { en: "Ethiopian Mental Health Helpline & Crisis Support", am: "የኢትዮጵያ የአዕምሮ ጤና የእርዳታ እና የችግር ድጋፍ መስመር" },
  hotlineNumber: "9505 / +251 11 555 0192",
  secondaryPhone: "+251 11 662 9012",
  email: "contact@selihom.org",
  address: { en: "Bole Sub City, Woreda 03, House #892\nAddis Ababa, Ethiopia", am: "ቦሌ ክፍለ ከተማ፣ ወረዳ 03፣ ቤት #892\nአዲስ አበባ፣ ኢትዮጵያ" },
  registrationLabel: { en: "Registered Ethiopian Civil Society Organization (CSO) #4421", am: "የተመዘገበ የኢትዮጵያ የፍትህ ማህበረሰብ ድርጅት (CSO) #4421" },
  footerTagline: { en: "Healing minds. Empowering communities. Building a kinder Ethiopia.", am: "አዕምሮን መፈወስ። ማህበረሰቦችን ማብቃት። ደግ ኢትዮጵያን መገንባት።" },
  updatedAt: Date.now(),
};

export function subscribeToSiteSettings(onChange: (settings: SiteSettings) => void) {
  return onSnapshot(doc(db, "settings", "site"), (snapshot) => {
    onChange(snapshot.exists() ? { ...defaultSiteSettings, ...snapshot.data() } as SiteSettings : defaultSiteSettings);
  }, () => onChange(defaultSiteSettings));
}

export async function saveSiteSettings(settings: SiteSettings) {
  await setDoc(doc(db, "settings", "site"), { ...settings, updatedAt: Date.now() }, { merge: true });
}
