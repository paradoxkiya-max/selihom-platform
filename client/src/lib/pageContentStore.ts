import { db } from "./firebase";
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";

export interface BilingualField {
  en: string;
  am: string;
}

export interface PageSection {
  id: string;
  title: BilingualField;
  subtitle?: BilingualField;
  body?: BilingualField;
  imageUrl?: string;
  accent?: string;
  order: number;
}

export interface PageDocument {
  id: string; // e.g., "home", "about", "services", "awareness", "stories", "gallery", "blog", "events", "contact", "press", "privacy", "terms"
  title: BilingualField;
  slug: string;
  hero: {
    badge: { en: string; am: string };
    heading: { en: string; am: string };
    description: { en: string; am: string };
    primaryCtaText: { en: string; am: string };
    primaryCtaUrl: string;
    secondaryCtaText: { en: string; am: string };
    secondaryCtaUrl: string;
    backgroundImageUrl: string;
  };
  seo?: {
    metaTitle: { en: string; am: string };
    metaDescription: { en: string; am: string };
  };
  sections: PageSection[];
  status: "draft" | "published";
  updatedAt: number;
  updatedBy?: string;
}

export const defaultPagesContent: Record<string, PageDocument> = {
  home: {
    id: "home",
    title: { en: "Home", am: "መነሻ ገጽ" },
    slug: "/",
    hero: {
      badge: { en: "Stories with a Pulse • Healing with Care", am: "የህይወት ትርጉም • በፍቅር መፈወስ" },
      heading: { en: "Healing Minds, Empowering Communities in Ethiopia", am: "አዕምሮን መፈወስ፣ ማህበረሰቦችን በኢትዮጵያ ማብቃት" },
      description: {
        en: "Selihom provides compassionate mental health support, professional counseling, and community-driven social services across Ethiopia.",
        am: "ሰሊሆም በኢትዮጵያ ውስጥ አዘኔታ የተሞላበት የአዕምሮ ጤና ድጋፍ፣ ባለሙያዊ የምክር አገልግሎት እና ማህበራዊ አገልግሎቶችን ይሰጣል።"
      },
      primaryCtaText: { en: "Support Our Mission", am: "ተልእኳችንን ይደግፉ" },
      primaryCtaUrl: "/donate",
      secondaryCtaText: { en: "Explore Our Services", am: "አገልግሎቶቻችንን ይጎብኙ" },
      secondaryCtaUrl: "/services",
      backgroundImageUrl: "/manus-storage/selihom_ethiopia_outreach_retry_72292185.jpg"
    },
    sections: [
      {
        id: "mission-overview",
        title: { en: "Rooted in dignity and shared resilience", am: "በሰብአዊ ክብር እና በጋራ መቋቋም ላይ የተመሰረተ" },
        subtitle: { en: "Our Approach", am: "የአሰራር ስልታችን" },
        body: {
          en: "We bridge clinical expertise with grassroots community support, ensuring that psychological first aid and mental health advocacy reach every region.",
          am: "የህክምና ባለሙያዎችን ከህብረተሰቡ ድጋፍ ጋር በማገናኘት የስነ-ልቦና እርዳታ እና የአዕምሮ ጤና ግንዛቤ ለእያንዳንዱ ክልል እንዲደርስ እናደርጋለን።"
        },
        imageUrl: "/manus-storage/selihom_ethiopia_workshop_retry_fa5db5f5.jpg",
        order: 1
      },
      {
        id: "clinical-care",
        title: { en: "Clinical & Peer Counseling", am: "የህክምና እና የእኩዮች ምክር" },
        subtitle: { en: "Programme 01", am: "መርሃ ግብር 01" },
        body: { en: "Confidential individual and group psychological support led by certified therapists and trained peer counselors.", am: "በተመሰከረላቸው ቴራፒስቶች እና በሰለጠኑ የእኩዮች አማካሪዎች የሚመራ ሚስጥራዊ የግል እና የቡድን የስነ-ልቦና ድጋፍ።" },
        accent: "teal",
        order: 2
      },
      {
        id: "community-awareness",
        title: { en: "Community Awareness", am: "የማህበረሰብ ግንዛቤ" },
        subtitle: { en: "Programme 02", am: "መርሃ ግብር 02" },
        body: { en: "School workshops, youth town halls, and bilingual campaigns that make mental health conversations safer.", am: "የአዕምሮ ጤና ውይይቶችን ደህንነት ያለው ለማድረግ የትምህርት ቤት አውደ ጥናቶች፣ የወጣቶች የከተማ አዳራሽ ውይይቶች እና የሁለት ቋንቋ ዘመቻዎች።" },
        accent: "amber",
        order: 3
      },
      {
        id: "volunteer-outreach",
        title: { en: "Volunteer & Outreach", am: "ፈቃደኝነት እና ተደራሽነት" },
        subtitle: { en: "Programme 03", am: "መርሃ ግብር 03" },
        body: { en: "We train passionate advocates and community leaders to bring psychological first aid where it is needed most.", am: "ለህብረተሰብ መሪዎች እና ተሟጋቾች የስነ-ልቦና እርዳታ በሚያስፈልግበት ቦታ እንዲደርስ ስልጠና እንሰጣለን።" },
        accent: "teal",
        order: 4
      }
    ],
    status: "published",
    updatedAt: Date.now()
  },
  about: {
    id: "about",
    title: { en: "About Us", am: "ስለ እኛ" },
    slug: "/about",
    hero: {
      badge: { en: "Registered Ethiopian Civil Society Organization", am: "የተመዘገበ የኢትዮጵያ የፍትህ ማህበረሰብ ድርጅት" },
      heading: { en: "Dedicated to Holistic Well-being", am: "ለሁለንተናዊ ደህንነት የቆመ" },
      description: {
        en: "Founded in Addis Ababa, Selihom operates at the intersection of public mental health advocacy, trauma recovery, and community social services.",
        am: "አዲስ አበባ ውስጥ የተመሰረተው ሰሊሆም በአዕምሮ ጤና ግንዛቤ፣ በጉዳት ማገገሚያ እና በማህበራዊ አገልግሎቶች ላይ ይሰራል።"
      },
      primaryCtaText: { en: "Our Services", am: "አገልግሎቶቻችን" },
      primaryCtaUrl: "/services",
      secondaryCtaText: { en: "Join as Volunteer", am: "ፈቃደኛ ይሁኑ" },
      secondaryCtaUrl: "/volunteer",
      backgroundImageUrl: "/manus-storage/selihom_ethiopia_counselor_retry_31298412.jpg"
    },
    sections: [
      {
        id: "values",
        title: { en: "Core Principles", am: "ዋና ዋና መርሆች" },
        body: {
          en: "Confidentiality, cultural resonance, and unconditional dignity guide every program we deliver.",
          am: "ምስጢራዊነት፣ የባህል ተስማሚነት እና የማይናወጥ ክብር እያንዳንዱን ፕሮግራማችንን ይመራሉ።"
        },
        order: 1
      },
      {
        id: "mission",
        title: { en: "Our Core Mission", am: "ዋና ተልእኳችን" },
        body: { en: "To democratize access to mental healthcare and foster a compassionate society where seeking help is viewed as strength.", am: "የአዕምሮ ጤና እንክብካቤን ተደራሽ ማድረግ እና እርዳታ መፈለግ እንደ ጥንካሬ የሚታይበትን አዘኔታ የተሞላ ማህበረሰብ መፍጠር።" },
        accent: "teal",
        order: 2
      },
      {
        id: "leadership",
        title: { en: "Leadership & Governance", am: "አመራር እና አስተዳደር" },
        body: { en: "Our leadership combines clinical expertise, community organizing, and accountable governance. Staff can maintain the current approved leadership copy from the CMS.", am: "አመራራችን የህክምና ባለሙያነትን፣ የማህበረሰብ አደረጃጀትን እና ተጠያቂ አስተዳደርን ያጣምራል። ሰራተኞች የተፈቀደውን የአመራር ጽሁፍ ከCMS ማስተዳደር ይችላሉ።" },
        accent: "amber",
        order: 3
      }
    ],
    status: "published",
    updatedAt: Date.now()
  },
  services: {
    id: "services",
    title: { en: "Services", am: "አገልግሎቶች" },
    slug: "/services",
    hero: {
      badge: { en: "Professional Care & Community Outreach", am: "ባለሙያዊ እንክብካቤ እና የማህበረሰብ ተደራሽነት" },
      heading: { en: "Comprehensive Mental Health Programmes", am: "አጠቃላይ የአዕምሮ ጤና መርሃ ግብሮች" },
      description: {
        en: "From our 24/7 toll-free helpline (9505) to university workshops and peer support circles, we meet individuals where they are.",
        am: "ከክፍያ ነጻ ከሆነው የስልክ መስመር (9505) እስከ ዩኒቨርሲቲ አውደ ጥናቶች እና የድጋፍ ቡድኖች፣ ግለሰቦች ባሉበት ቦታ እናገለግላለን።"
      },
      primaryCtaText: { en: "Call Helpline 9505", am: "የእርዳታ መስመር 9505 ይደውሉ" },
      primaryCtaUrl: "tel:9505",
      secondaryCtaText: { en: "Contact Us", am: "ያግኙን" },
      secondaryCtaUrl: "/contact",
      backgroundImageUrl: "/manus-storage/selihom_ethiopia_youth_retry_0bfdc68b.jpg"
    },
    sections: [
      { id: "helpline", title: { en: "24/7 Crisis Helpline & Telephone Counseling", am: "የ24/7 የአስቸኳይ እርዳታ መስመር እና የስልክ ምክር" }, body: { en: "Immediate psychological first aid via 9505, operated by trained psychiatric nurses and clinical psychologists.", am: "በሰለጠኑ የስነ-አእምሮ ነርሶች እና የህክምና ስነ-ልቦና ባለሙያዎች የሚሰጥ በ9505 የሚገኝ ፈጣን የስነ-ልቦና እርዳታ።" }, accent: "teal", order: 1 },
      { id: "psychotherapy", title: { en: "Individual & Family Psychotherapy", am: "የግል እና የቤተሰብ ሳይኮቴራፒ" }, body: { en: "Confidential in-person and telehealth counseling for anxiety, trauma recovery, depression, and family support.", am: "ለጭንቀት፣ ለጉዳት ማገገሚያ፣ ለድብርት እና ለቤተሰብ ድጋፍ ሚስጥራዊ የግል እና የቴሌ ምክር።" }, accent: "amber", order: 2 },
      { id: "youth-clubs", title: { en: "School & Youth Mental Health Clubs", am: "የትምህርት ቤት እና የወጣቶች የአዕምሮ ጤና ክለቦች" }, body: { en: "Mental health advocacy and peer support networks in high schools and universities across Ethiopia.", am: "በኢትዮጵያ ውስጥ ባሉ ሁለተኛ ደረጃ ትምህርት ቤቶች እና ዩኒቨርሲቲዎች የአዕምሮ ጤና ተሟጋችነት እና የእኩዮች ድጋፍ አውታሮች።" }, accent: "teal", order: 3 },
      { id: "training", title: { en: "Professional Training & Certification", am: "የባለሙያ ስልጠና እና ማረጋገጫ" }, body: { en: "Workshops for teachers, community leaders, and healthcare workers on psychological first aid and trauma identification.", am: "ለመምህራን፣ ለማህበረሰብ መሪዎች እና ለጤና ሰራተኞች በስነ-ልቦና እርዳታ እና በጉዳት ምልክት መለየት ላይ የሚሰጥ ስልጠና።" }, accent: "amber", order: 4 },
      { id: "reintegration", title: { en: "Rehabilitation & Social Reintegration", am: "መልሶ ማቋቋም እና ማህበራዊ መልሶ ማቀናጀት" }, body: { en: "Holistic support for people recovering from severe distress to rebuild livelihoods and community ties.", am: "ከከባድ የስነ-ልቦና ጭንቀት ለሚያገግሙ ሰዎች ኑሮን እና የማህበረሰብ ግንኙነቶችን እንደገና ለመገንባት ሁለገብ ድጋፍ።" }, accent: "teal", order: 5 },
      { id: "policy", title: { en: "Research & Policy Advocacy", am: "ምርምር እና የፖሊሲ ተሟጋችነት" }, body: { en: "Evidence-led studies on mental health in Ethiopia to support better national healthcare policy.", am: "የተሻለ ብሔራዊ የጤና ፖሊሲ ለመደገፍ በኢትዮጵያ የአዕምሮ ጤና ላይ በማስረጃ የተመሰረቱ ጥናቶች።" }, accent: "amber", order: 6 }
    ],
    status: "published",
    updatedAt: Date.now()
  },
  awareness: {
    id: "awareness",
    title: { en: "Mental Health Awareness", am: "የአዕምሮ ጤና ግንዛቤ" },
    slug: "/awareness",
    hero: {
      badge: { en: "Breaking Stigma, Fostering Dialogue", am: "ውግዝትን መስበር፣ ውይይትን ማበረታታት" },
      heading: { en: "Understanding Psychological Well-being", am: "የስነ-ልቦና ጤናን መረዳት" },
      description: {
        en: "Mental health is an essential pillar of human dignity. Learn about early signs of emotional distress and how to offer supportive first aid.",
        am: "የአዕምሮ ጤና የሰዎች ክብር መሠረት ነው። የስነ-ልቦና ጭንቀት የመጀመሪያ ምልክቶችን እና እርዳታ እንዴት መስጠት እንደሚቻል ይወቁ።"
      },
      primaryCtaText: { en: "Read Stories", am: "ታሪኮችን አንብብ" },
      primaryCtaUrl: "/stories",
      secondaryCtaText: { en: "View Events", am: "ክስተቶችን ይመልከቱ" },
      secondaryCtaUrl: "/events",
      backgroundImageUrl: "/manus-storage/selihom_ethiopia_outreach_retry_72292185.jpg"
    },
    sections: [
      { id: "prevalence", title: { en: "1 in 4", am: "ከ4 አንዱ" }, subtitle: { en: "Global & national prevalence", am: "ዓለም አቀፍ እና ብሔራዊ ስርጭት" }, body: { en: "Many people experience a mental health condition in their lifetime, while stigma and access barriers keep care out of reach.", am: "ብዙ ሰዎች በህይወታቸው የአዕምሮ ጤና ችግር ያጋጥማቸዋል፣ ነገር ግን ውግዝት እና የተደራሽነት እንቅፋቶች እርዳታን ከሰዎች ያርቃሉ።" }, accent: "teal", order: 1 },
      { id: "helpline", title: { en: "9505", am: "9505" }, subtitle: { en: "Accessible helpline", am: "ተደራሽ የእርዳታ መስመር" }, body: { en: "A toll-free short code for immediate, confidential psychological first aid across Ethiopia.", am: "በኢትዮጵያ ውስጥ ፈጣን እና ሚስጥራዊ የስነ-ልቦና እርዳታ ለማግኘት የሚያገለግል ከክፍያ ነጻ አጭር ቁጥር።" }, accent: "amber", order: 2 },
      { id: "school-clubs", title: { en: "45+", am: "45+" }, subtitle: { en: "School clubs", am: "የትምህርት ቤት ክለቦች" }, body: { en: "Youth-led mental health advocacy and peer support clubs in schools and universities.", am: "በትምህርት ቤቶች እና በዩኒቨርሲቲዎች የወጣቶች የአዕምሮ ጤና ተሟጋችነት እና የእኩዮች ድጋፍ ክለቦች።" }, accent: "teal", order: 3 },
      { id: "stigma", title: { en: "Breaking the Stigma", am: "ውግዝትን መስበር" }, subtitle: { en: "What you need to know", am: "ማወቅ ያለብዎት" }, body: { en: "Depression, anxiety, and post-traumatic stress are medical realities, not weaknesses. Seeking support is an act of courage.", am: "ድብርት፣ ጭንቀት እና የድህረ-ጉዳት ጭንቀት የህክምና እውነታዎች ናቸው እንጂ ድክመቶች አይደሉም። እርዳታ መፈለግ የድፍረት ተግባር ነው።" }, accent: "amber", order: 4 }
    ],
    status: "published",
    updatedAt: Date.now()
  },
  stories: {
    id: "stories",
    title: { en: "Stories", am: "ታሪኮች" },
    slug: "/stories",
    hero: {
      badge: { en: "Voices of Resilience", am: "የመቋቋም ድምፆች" },
      heading: { en: "Real Journeys of Healing and Hope", am: "እውነተኛ የመፈወስ እና የተስፋ ጉዞዎች" },
      description: {
        en: "Every story published here adheres to strict ethical standards and verified subject consent. Names and identifying details may be protected.",
        am: "እዚህ የታተመ እያንዳንዱ ታሪክ ከሥነ-ምግባር ደረጃዎች እና ከተረጋገጠ የተሳታፊ ፈቃድ ጋር የተጣጣመ ነው።"
      },
      primaryCtaText: { en: "Share Your Story", am: "ታሪክዎን ያጋሩ" },
      primaryCtaUrl: "/contact",
      secondaryCtaText: { en: "Explore Gallery", am: "ጋለሪውን ይጎብኙ" },
      secondaryCtaUrl: "/gallery",
      backgroundImageUrl: "/manus-storage/selihom_ethiopia_counselor_retry_31298412.jpg"
    },
    sections: [],
    status: "published",
    updatedAt: Date.now()
  },
  gallery: {
    id: "gallery",
    title: { en: "Gallery", am: "ጋለሪ" },
    slug: "/gallery",
    hero: {
      badge: { en: "Field Work & Community Moments", am: "የሜዳ ስራዎች እና የማህበረሰብ ጊዜያት" },
      heading: { en: "Captured Moments Across Ethiopia", am: "በኢትዮጵያ የተነሱ ማስታወሻዎች" },
      description: {
        en: "Visual glimpses from our regional workshops, counseling centers, and community dialogues.",
        am: "ከክልል አውደ ጥናቶቻችን፣ የምክር ማዕከሎቻችን እና የማህበረሰብ ውይይቶች የተወሰዱ ምስሎች።"
      },
      primaryCtaText: { en: "View Events", am: "ክስተቶችን ይመልከቱ" },
      primaryCtaUrl: "/events",
      secondaryCtaText: { en: "Support Us", am: "ይደግፉን" },
      secondaryCtaUrl: "/donate",
      backgroundImageUrl: "/manus-storage/selihom_ethiopia_workshop_retry_fa5db5f5.jpg"
    },
    sections: [],
    status: "published",
    updatedAt: Date.now()
  },
  blog: {
    id: "blog",
    title: { en: "Blog & News", am: "ብሎግ እና ዜና" },
    slug: "/blog",
    hero: {
      badge: { en: "Journal & Field Notes", am: "መጽሔት እና የሜዳ ማስታወሻዎች" },
      heading: { en: "Insights from the Ground", am: "ከመሬት ላይ የተገኙ ግንዛቤዎች" },
      description: {
        en: "Articles on mental health advocacy, programme updates, and psychological first aid in action.",
        am: "ስለ አዕምሮ ጤና ግንዛቤ፣ የፕሮግራም ዝመናዎች እና የስነ-ልቦና እርዳታ ጽሁፎች።"
      },
      primaryCtaText: { en: "Upcoming Events", am: "መጪ ክስተቶች" },
      primaryCtaUrl: "/events",
      secondaryCtaText: { en: "Contact Desk", am: "የእውቂያ ዴስክ" },
      secondaryCtaUrl: "/contact",
      backgroundImageUrl: "/manus-storage/selihom_ethiopia_youth_retry_0bfdc68b.jpg"
    },
    sections: [],
    status: "published",
    updatedAt: Date.now()
  },
  events: {
    id: "events",
    title: { en: "Events", am: "ክስተቶች" },
    slug: "/events",
    hero: {
      badge: { en: "Town Halls & Workshops", am: "የከተማ አዳራሾች እና አውደ ጥናቶች" },
      heading: { en: "Join Our Upcoming Gatherings", am: "መጪ ስብሰባዎቻችንን ይቀላቀሉ" },
      description: {
        en: "Participate in public seminars, student workshops, and mental health awareness town halls.",
        am: "በህዝብ ሴሚናሮች፣ የተማሪ አውደ ጥናቶች እና የአዕምሮ ጤና ግንዛቤ ውይይቶች ላይ ይሳተፉ።"
      },
      primaryCtaText: { en: "Volunteer", am: "ፈቃደኛ ይሁኑ" },
      primaryCtaUrl: "/volunteer",
      secondaryCtaText: { en: "Contact Us", am: "ያግኙን" },
      secondaryCtaUrl: "/contact",
      backgroundImageUrl: "/manus-storage/selihom_ethiopia_outreach_retry_72292185.jpg"
    },
    sections: [],
    status: "published",
    updatedAt: Date.now()
  },
  contact: {
    id: "contact",
    title: { en: "Contact Us", am: "ያግኙን" },
    slug: "/contact",
    hero: {
      badge: { en: "We Are Here for You", am: "ለእርስዎ እዚህ አለን" },
      heading: { en: "Connect with the Selihom Team", am: "ከሰሊሆም ቡድን ጋር ይገናኙ" },
      description: {
        en: "Reach out for support inquiries, partnerships, media requests, or general information.",
        am: "ለድጋፍ ጥያቄዎች፣ አጋርነቶች፣ የሚዲያ ጥያቄዎች ወይም አጠቃላይ መረጃ ያግኙን።"
      },
      primaryCtaText: { en: "Helpline 9505", am: "የእርዳታ መስመር 9505" },
      primaryCtaUrl: "tel:9505",
      secondaryCtaText: { en: "Our Services", am: "አገልግሎቶቻችን" },
      secondaryCtaUrl: "/services",
      backgroundImageUrl: "/manus-storage/selihom_ethiopia_counselor_retry_31298412.jpg"
    },
    sections: [],
    status: "published",
    updatedAt: Date.now()
  },
  press: {
    id: "press",
    title: { en: "Press & Fact Sheet", am: "ፕሬስ እና ፋክት ሺት" },
    slug: "/press",
    hero: {
      badge: { en: "Media Center", am: "የሚዲያ ማዕከል" },
      heading: { en: "Press Releases & Verified Resources", am: "የፕሬስ መግለጫዎች እና የተረጋገጡ መርጃዎች" },
      description: {
        en: "Official fact sheets, organizational summaries, and verified media assets for journalists and partners.",
        am: "ለጋዜጠኞች እና አጋሮች ኦፊሴላዊ የፋክት ሺቶች፣ የድርጅት ማጠቃለያዎች እና የተረጋገጡ የሚዲያ ንብረቶች።"
      },
      primaryCtaText: { en: "Contact Desk", am: "የእውቂያ ዴስክ" },
      primaryCtaUrl: "/contact",
      secondaryCtaText: { en: "About Us", am: "ስለ እኛ" },
      secondaryCtaUrl: "/about",
      backgroundImageUrl: "/manus-storage/selihom_ethiopia_workshop_retry_fa5db5f5.jpg"
    },
    sections: [],
    status: "published",
    updatedAt: Date.now()
  },
  volunteer: {
    id: "volunteer",
    title: { en: "Volunteer Application", am: "የበጎ ፈቃደኛ ማመልከቻ" },
    slug: "/volunteer",
    hero: {
      badge: { en: "Join the Care Network", am: "የእንክብካቤ አውታርን ይቀላቀሉ" },
      heading: { en: "Bring Your Time, Skills, and Care", am: "ጊዜዎን፣ ችሎታዎን እና እንክብካቤዎን ያበርክቱ" },
      description: { en: "Join a nationwide network of mental health advocates and peer supporters.", am: "በአገር አቀፍ የአዕምሮ ጤና ተሟጋቾች እና የአቻ ድጋፍ ሰጪዎች አውታር ይሳተፉ።" },
      primaryCtaText: { en: "Start Application", am: "ማመልከቻ ይጀምሩ" }, primaryCtaUrl: "#volunteer-form",
      secondaryCtaText: { en: "Our Services", am: "አገልግሎቶቻችን" }, secondaryCtaUrl: "/services",
      backgroundImageUrl: "/manus-storage/selihom_ethiopia_youth_retry_0bfdc68b.jpg"
    },
    sections: [], status: "published", updatedAt: Date.now()
  },
  donate: {
    id: "donate",
    title: { en: "Support Our Mission", am: "ልግሳ ያድርጉ" },
    slug: "/donate",
    hero: {
      badge: { en: "Fund Community Care", am: "የማህበረሰብ እንክብካቤን ይደግፉ" },
      heading: { en: "Make Mental Health Support Reach Further", am: "የአዕምሮ ጤና ድጋፍ የበለጠ እንዲደርስ ያድርጉ" },
      description: { en: "Your contribution helps fund counseling, crisis support, and rural mental health workshops.", am: "ልገሳዎ የምክር አገልግሎትን፣ የአስቸኳይ ድጋፍን እና የገጠር የአዕምሮ ጤና አውደ ጥናቶችን ለመደገፍ ይረዳል።" },
      primaryCtaText: { en: "Choose an Amount", am: "መጠን ይምረጡ" }, primaryCtaUrl: "#donation-form",
      secondaryCtaText: { en: "See Our Impact", am: "ተፅእኖአችንን ይመልከቱ" }, secondaryCtaUrl: "/",
      backgroundImageUrl: "/manus-storage/selihom_ethiopia_workshop_retry_fa5db5f5.jpg"
    },
    sections: [], status: "published", updatedAt: Date.now()
  },
  "donate-success": {
    id: "donate-success",
    title: { en: "Donation Received", am: "ልገሳዎ ደርሷል" },
    slug: "/donate/success",
    hero: {
      badge: { en: "Thank You", am: "እናመሰግናለን" },
      heading: { en: "Your Care Is Now in Motion", am: "እንክብካቤዎ አሁን በተግባር ላይ ነው" },
      description: { en: "Your contribution will help Selihom keep support close to communities across Ethiopia.", am: "አስተዋጽኦዎ ሰሊሆም በኢትዮጵያ ላሉ ማህበረሰቦች ድጋፍን ቅርብ እንዲያደርግ ይረዳል።" },
      primaryCtaText: { en: "Return Home", am: "ወደ መነሻ ገጽ ይመለሱ" }, primaryCtaUrl: "/",
      secondaryCtaText: { en: "Read Our Stories", am: "ታሪኮቻችንን ያንብቡ" }, secondaryCtaUrl: "/stories",
      backgroundImageUrl: "/manus-storage/selihom_ethiopia_outreach_retry_72292185.jpg"
    },
    sections: [], status: "published", updatedAt: Date.now()
  },
  privacy: {
    id: "privacy",
    title: { en: "Privacy Policy", am: "የግላዊነት መመሪያ" },
    slug: "/privacy",
    hero: {
      badge: { en: "Trust & Ethics", am: "እምነት እና ስነ-ምግባር" },
      heading: { en: "Our Commitment to Your Privacy", am: "ለግላዊነትዎ ያለን ቁርጠኝነት" },
      description: {
        en: "How we protect information collected through our website, helpline, and community programmes.",
        am: "በድረ-ገፃችን፣ በእርዳታ መስመራችን እና በማህበረሰብ መርሃ ግብሮቻችን የተሰበሰቡ መረጃዎችን እንዴት እንደምንጠብቅ።"
      },
      primaryCtaText: { en: "Contact Us", am: "ያግኙን" },
      primaryCtaUrl: "/contact",
      secondaryCtaText: { en: "Home", am: "መነሻ ገጽ" },
      secondaryCtaUrl: "/",
      backgroundImageUrl: "/manus-storage/selihom_ethiopia_outreach_retry_72292185.jpg"
    },
    sections: [
      { id: "information-use", title: { en: "Information use", am: "የመረጃ አጠቃቀም" }, body: { en: "Selihom collects only the information needed to respond to contact requests, process volunteer applications, coordinate donations, and send requested updates. We do not publish a person’s story or image without a recorded consent decision.", am: "ሰሊሆም ለእውቂያ ጥያቄዎች መልስ ለመስጠት፣ የፈቃደኞችን ማመልከቻ ለማስተናገድ፣ ልገሳዎችን ለማስተባበር እና የተጠየቁ ዝመናዎችን ለመላክ የሚያስፈልገውን መረጃ ብቻ ይሰበስባል። የተመዘገበ የፈቃድ ውሳኔ ሳይኖር የሰውን ታሪክ ወይም ምስል አናትም።" }, order: 1 },
      { id: "contact", title: { en: "Contact", am: "እውቂያ" }, body: { en: "For questions about a submission or a correction request, contact contact@selihom.org.", am: "ስለ ማቅረቢያ ወይም የማስተካከያ ጥያቄ ለመጠየቅ contact@selihom.org ያግኙ።" }, order: 2 }
    ],
    status: "published",
    updatedAt: Date.now()
  },
  terms: {
    id: "terms",
    title: { en: "Terms of Use", am: "የአጠቃቀም ደንቦች" },
    slug: "/terms",
    hero: {
      badge: { en: "Platform Guidelines", am: "የመድረክ መመሪያዎች" },
      heading: { en: "Website Terms and Conditions", am: "የድረ-ገጽ አጠቃቀም ውል እና ደንቦች" },
      description: {
        en: "Guidelines governing the use of Selihom's digital platform, educational content, and community resources.",
        am: "የሰሊሆምን ዲጂታል መድረክ፣ የትምህርት ይዘቶች እና የማህበረሰብ መርጃዎች አጠቃቀም የሚመሩ መመሪያዎች።"
      },
      primaryCtaText: { en: "Contact Us", am: "ያግኙን" },
      primaryCtaUrl: "/contact",
      secondaryCtaText: { en: "Home", am: "መነሻ ገጽ" },
      secondaryCtaUrl: "/",
      backgroundImageUrl: "/manus-storage/selihom_ethiopia_youth_retry_0bfdc68b.jpg"
    },
    sections: [
      { id: "platform", title: { en: "Platform use", am: "የመድረክ አጠቃቀም" }, body: { en: "This website provides information about Selihom programmes, mental health resources, community events, and ways to contact the organization. Content is educational and does not replace emergency care or a clinical assessment.", am: "ይህ ድረ-ገጽ ስለ ሰሊሆም መርሃ ግብሮች፣ ስለ አዕምሮ ጤና መርጃዎች፣ ስለ ማህበረሰብ ክስተቶች እና ድርጅቱን ለማግኘት መንገዶች መረጃ ይሰጣል። ይዘቱ የትምህርት ነው እንጂ የአስቸኳይ እንክብካቤ ወይም የህክምና ምርመራ አይተካም።" }, order: 1 },
      { id: "urgent-support", title: { en: "Urgent support", am: "አስቸኳይ ድጋፍ" }, body: { en: "If you or someone else may be in immediate danger, contact local emergency services. The Selihom helpline is presented as 9505 where available; service availability may change.", am: "እርስዎ ወይም ሌላ ሰው በአስቸኳይ አደጋ ላይ ከሆነ የአካባቢዎን የአስቸኳይ አገልግሎት ያግኙ። የሰሊሆም የእርዳታ መስመር በሚገኝበት ቦታ 9505 ነው፤ አገልግሎቱ ሊቀየር ይችላል።" }, order: 2 },
      { id: "content-consent", title: { en: "Content and consent", am: "ይዘት እና ፈቃድ" }, body: { en: "Published stories and media are reviewed through the Selihom consent workflow. Please do not copy or republish them without written permission.", am: "የታተሙ ታሪኮች እና ሚዲያዎች በሰሊሆም የፈቃድ ሂደት ይገመገማሉ። ያለ የጽሁፍ ፈቃድ እንደገና አይቅዱ ወይም አያትሙ።" }, order: 3 }
    ],
    status: "published",
    updatedAt: Date.now()
  }
};

export async function getPageContent(pageId: string): Promise<PageDocument> {
  try {
    const docRef = doc(db, "pages", pageId);
    const snap = await getDoc(docRef);
    if (snap.exists()) {
      return snap.data() as PageDocument;
    }
  } catch (err) {
    console.warn("[PageContent] Failed to fetch from Firestore, falling back to default:", err);
  }
  return defaultPagesContent[pageId] || defaultPagesContent["home"];
}

export async function getAllPagesContent(): Promise<Record<string, PageDocument>> {
  try {
    const snapshot = await getDocs(collection(db, "pages"));
    if (!snapshot.empty) {
      const map: Record<string, PageDocument> = { ...defaultPagesContent };
      snapshot.forEach((d) => {
        map[d.id] = d.data() as PageDocument;
      });
      return map;
    }
  } catch (err) {
    console.warn("[PageContent] Failed to fetch all pages from Firestore, using defaults:", err);
  }
  return defaultPagesContent;
}

export async function savePageContent(page: PageDocument): Promise<void> {
  const docRef = doc(db, "pages", page.id);
  await setDoc(docRef, {
    ...page,
    updatedAt: Date.now(),
  }, { merge: true });
}

export async function seedDefaultPages(options: { overwritePublished?: boolean; updatedBy?: string } = {}) {
  const writes = Object.values(defaultPagesContent).map((page) => {
    const nextPage: PageDocument = {
      ...page,
      updatedAt: Date.now(),
      updatedBy: options.updatedBy,
      status: options.overwritePublished ? "published" : page.status,
    };
    return setDoc(doc(db, "pages", page.id), nextPage, { merge: true });
  });
  await Promise.all(writes);
}
