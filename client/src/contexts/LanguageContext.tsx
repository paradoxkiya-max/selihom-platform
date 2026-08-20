import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "am";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    "nav.home": "Home",
    "nav.about": "About Us",
    "nav.services": "Services",
    "nav.awareness": "Mental Health",
    "nav.stories": "Stories",
    "nav.gallery": "Gallery",
    "nav.blog": "Blog & News",
    "nav.events": "Events",
    "nav.contact": "Contact",
    "nav.press": "Press & Fact Sheet",
    "nav.donate": "Donate",
    "nav.volunteer": "Volunteer",
    "nav.admin": "Admin CMS",
    "hero.title": "Healing Minds, Empowering Communities in Ethiopia",
    "hero.subtitle": "Selihom provides compassionate mental health support, professional counseling, and community-driven social services across Ethiopia.",
    "hero.cta.donate": "Support Our Mission",
    "hero.cta.services": "Explore Our Services",
    "stats.beneficiaries": "Beneficiaries Reached",
    "stats.counseling": "Counseling Sessions",
    "stats.workshops": "Community Workshops",
    "stats.volunteers": "Active Volunteers",
    "footer.rights": "© 2026 Selihom NGO Platform. All rights reserved.",
    "footer.tagline": "Dedicated to mental health advocacy, psychological first aid, and holistic community well-being in Ethiopia."
  },
  am: {
    "nav.home": "መነሻ",
    "nav.about": "ስለ እኛ",
    "nav.services": " አገልግሎቶች",
    "nav.awareness": "የአዕምሮ ጤና",
    "nav.stories": "የህይወት ታሪኮች",
    "nav.gallery": "ጋለሪ",
    "nav.blog": "ብሎግ እና ዜና",
    "nav.events": "ዝግጅቶች",
    "nav.contact": "ያግኙን",
    "nav.press": "ፕሬስ እና መረጃ",
    "nav.donate": "ይለግሱ",
    "nav.volunteer": "በፈቃደኝነት ያግዙን",
    "nav.admin": "አስተዳዳሪ",
    "hero.title": "አዕምሮን መፈወስ፣ ማህበረሰቦችን ማብቃት",
    "selihom.subtitle": "ሰሊሆም በኢትዮጵያ ውስጥ አዘኔታ የተሞላበት የአዕምሮ ጤና ድጋፍ፣ ሙያዊ የምክር አገልግሎት እና ማህበረሰባዊ አገልግሎቶችን ይሰጣል።",
    "hero.cta.donate": "ልግስና ያድርጉ",
    "hero.cta.services": "አገልግሎቶቻችንን ይመልከቱ",
    "stats.beneficiaries": "የደረስንላቸው ሰዎች",
    "stats.counseling": "የምክር ክፍለ ጊዜዎች",
    "stats.workshops": "የማህበረሰብ ስልጠናዎች",
    "stats.volunteers": "ንቁ በፈቃደኞች",
    "footer.rights": "© 2026 ሰሊሆም ኤንጂኦ. መብቱ በህግ የተጠበቀ ነው።",
    "footer.tagline": "በኢትዮጵያ ውስጥ ለአዕምሮ ጤና ግንዛቤ፣ ለስነ-ልቦና ድጋፍ እና ለህብረተሰብ ደህንነት የቆመ።"
  }
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem("selihom_lang") as Language) || "en";
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("selihom_lang", newLang);
  };

  const t = (key: string): string => {
    return translations[lang][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
