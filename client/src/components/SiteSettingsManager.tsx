import { useEffect, useState } from "react";
import { Check, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { defaultSiteSettings, saveSiteSettings, subscribeToSiteSettings, type SiteSettings } from "@/lib/siteSettings";

export function SiteSettingsManager({ userEmail }: { userEmail?: string | null }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultSiteSettings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => subscribeToSiteSettings(setSettings), []);

  const update = (field: keyof SiteSettings, value: string, language?: "en" | "am") => {
    setSettings((current) => {
      const existing = current[field];
      if (language && typeof existing === "object" && existing !== null) return { ...current, [field]: { ...(existing as Record<string, string>), [language]: value } } as SiteSettings;
      return { ...current, [field]: value } as SiteSettings;
    });
  };

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      await saveSiteSettings({ ...settings, updatedBy: userEmail || undefined });
      setMessage("Global site settings saved to Firestore.");
    } catch {
      setMessage("Settings could not be saved. Check Firebase staff claims and Firestore rules.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="rounded-[1.5rem] border-border bg-white">
      <CardContent className="space-y-6 p-6 sm:p-8">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Global content</p><h2 className="editorial-display mt-2 text-3xl font-normal text-teal-950">Site settings</h2><p className="mt-2 text-sm text-muted-foreground">Manage the persistent contact, crisis-support, and footer content shown across every public route.</p></div>
        {message ? <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800"><Check className="h-4 w-4" />{message}</div> : null}
        <div className="grid gap-5 md:grid-cols-2"><div className="space-y-2"><Label>Hotline label — English</Label><Input value={settings.hotlineLabel.en} onChange={(e) => update("hotlineLabel", e.target.value, "en")} /></div><div className="space-y-2"><Label>Hotline label — Amharic</Label><Input value={settings.hotlineLabel.am} onChange={(e) => update("hotlineLabel", e.target.value, "am")} /></div><div className="space-y-2"><Label>Hotline numbers</Label><Input value={settings.hotlineNumber} onChange={(e) => update("hotlineNumber", e.target.value)} /></div><div className="space-y-2"><Label>Secondary phone</Label><Input value={settings.secondaryPhone} onChange={(e) => update("secondaryPhone", e.target.value)} /></div><div className="space-y-2"><Label>Public email</Label><Input type="email" value={settings.email} onChange={(e) => update("email", e.target.value)} /></div><div className="space-y-2"><Label>Registration — English</Label><Input value={settings.registrationLabel.en} onChange={(e) => update("registrationLabel", e.target.value, "en")} /></div><div className="space-y-2"><Label>Registration — Amharic</Label><Input value={settings.registrationLabel.am} onChange={(e) => update("registrationLabel", e.target.value, "am")} /></div><div className="space-y-2"><Label>Address — English</Label><Textarea value={settings.address.en} onChange={(e) => update("address", e.target.value, "en")} rows={3} /></div><div className="space-y-2"><Label>Address — Amharic</Label><Textarea value={settings.address.am} onChange={(e) => update("address", e.target.value, "am")} rows={3} /></div><div className="space-y-2 md:col-span-2"><Label>Footer tagline — English</Label><Textarea value={settings.footerTagline.en} onChange={(e) => update("footerTagline", e.target.value, "en")} rows={2} /></div><div className="space-y-2 md:col-span-2"><Label>Footer tagline — Amharic</Label><Textarea value={settings.footerTagline.am} onChange={(e) => update("footerTagline", e.target.value, "am")} rows={2} /></div></div>
        <Button type="button" onClick={save} disabled={saving} className="bg-teal-700 text-white">{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Save site settings</Button>
      </CardContent>
    </Card>
  );
}
