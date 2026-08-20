import { useEffect, useState } from "react";
import { Check, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ImpactMetrics {
  counselingSessions: number;
  helplineCalls: number;
  ruralWorkshops: number;
  activeVolunteers: number;
  updatedAt: number;
}

const defaultMetrics: ImpactMetrics = {
  counselingSessions: 14500,
  helplineCalls: 38200,
  ruralWorkshops: 240,
  activeVolunteers: 1850,
  updatedAt: Date.now(),
};

export function MetricsAndSeoManager({ userEmail }: { userEmail?: string | null }) {
  const [metrics, setMetrics] = useState<ImpactMetrics>(defaultMetrics);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(doc(db, "settings", "impactMetrics"));
        if (snap.exists()) setMetrics({ ...defaultMetrics, ...(snap.data() as ImpactMetrics) });
      } catch {
        // Fallback
      } finally {
        setLoading(false);
      }
    }
    void load();
  }, []);

  const save = async () => {
    setSaving(true);
    setMessage("");
    try {
      const payload = { ...metrics, updatedAt: Date.now(), updatedBy: userEmail || undefined };
      await setDoc(doc(db, "settings", "impactMetrics"), payload, { merge: true });
      setMessage("Impact metrics updated in Firestore successfully.");
    } catch {
      setMessage("Could not save metrics. Check Firebase staff claims.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Card className="rounded-[1.5rem] p-8"><div className="flex items-center gap-3 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading metrics…</div></Card>;

  return (
    <Card className="rounded-[1.5rem] border-border bg-white">
      <CardContent className="space-y-6 p-6 sm:p-8">
        <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Impact data</p><h2 className="editorial-display mt-2 text-3xl font-normal text-teal-950">Impact metrics editor</h2><p className="mt-2 text-sm text-muted-foreground">Manage the headline numbers shown across Selihom public awareness summaries and impact cards.</p></div>
        {message ? <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-800"><Check className="h-4 w-4" />{message}</div> : null}
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2"><Label>Counseling sessions delivered</Label><Input type="number" value={metrics.counselingSessions} onChange={(e) => setMetrics({ ...metrics, counselingSessions: Number(e.target.value) || 0 })} /></div>
          <div className="space-y-2"><Label>Helpline calls answered</Label><Input type="number" value={metrics.helplineCalls} onChange={(e) => setMetrics({ ...metrics, helplineCalls: Number(e.target.value) || 0 })} /></div>
          <div className="space-y-2"><Label>Rural workshops conducted</Label><Input type="number" value={metrics.ruralWorkshops} onChange={(e) => setMetrics({ ...metrics, ruralWorkshops: Number(e.target.value) || 0 })} /></div>
          <div className="space-y-2"><Label>Active volunteers onboarded</Label><Input type="number" value={metrics.activeVolunteers} onChange={(e) => setMetrics({ ...metrics, activeVolunteers: Number(e.target.value) || 0 })} /></div>
        </div>
        <Button type="button" onClick={save} disabled={saving} className="bg-teal-700 text-white">{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}Save impact metrics</Button>
      </CardContent>
    </Card>
  );
}
