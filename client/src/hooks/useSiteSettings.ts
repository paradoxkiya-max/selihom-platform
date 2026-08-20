import { useEffect, useState } from "react";
import { defaultSiteSettings, subscribeToSiteSettings, type SiteSettings } from "@/lib/siteSettings";

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);

  useEffect(() => subscribeToSiteSettings(setSettings), []);

  return settings;
}
