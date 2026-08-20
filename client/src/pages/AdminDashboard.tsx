import React, { useEffect, useMemo, useState } from "react";
import { Navbar } from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { ActionDialog } from "@/components/ActionDialog";
import { PageContentManager } from "@/components/PageContentManager";
import { seedCollections } from "@/lib/collectionSeeder";
import { CollectionEditor } from "@/components/CollectionEditor";
import { CmsSidebar } from "@/components/CmsSidebar";
import { SiteSettingsManager } from "@/components/SiteSettingsManager";
import { MetricsAndSeoManager } from "@/components/MetricsAndSeoManager";
import { useFirebaseStaffAuth } from "@/hooks/useFirebaseStaffAuth";
import { createRecord, listCollection, removeRecord, updateRecord } from "@/lib/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ShieldCheck, BarChart3, FileText, Calendar, Users, Heart, Settings, Sparkles, Plus, Trash2, Loader2, LogIn, AlertCircle, Image as ImageIcon, BookOpen } from "lucide-react";

type CmsRecord = { id: string; title?: { en?: string; am?: string } | string; status?: string; consentGranted?: boolean; fullName?: string; email?: string; amount?: number; createdAt?: unknown };

export default function AdminDashboard() {
  const { lang } = useLanguage();
  const { user, role, loading: authLoading, isStaff, signInEmail, signInGoogle, logout } = useFirebaseStaffAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("insights");
  const [records, setRecords] = useState<Record<string, CmsRecord[]>>({ posts: [], events: [], gallery: [], stories: [], volunteers: [], donations: [] });
  const [loadingData, setLoadingData] = useState(false);
  const [dialog, setDialog] = useState<{ open: boolean; title: string; description: string }>({ open: false, title: "", description: "" });
  const [draftTitle, setDraftTitle] = useState("");
  const [draftAmharic, setDraftAmharic] = useState("");
  const [writingPrompt, setWritingPrompt] = useState("");
  const [writingTone, setWritingTone] = useState("compassionate");
  const [writingLength, setWritingLength] = useState("medium");
  const [writingResult, setWritingResult] = useState("");

  const loadData = async () => {
    setLoadingData(true);
    const collections = ["posts", "events", "gallery", "stories", "volunteers", "donations"];
    const next: Record<string, CmsRecord[]> = {};
    await Promise.all(collections.map(async (collectionName) => {
      try { next[collectionName] = await listCollection<CmsRecord>(collectionName); } catch { next[collectionName] = []; }
    }));
    setRecords((current) => ({ ...current, ...next }));
    setLoadingData(false);
  };

  useEffect(() => { if (isStaff) void loadData(); }, [isStaff]);

  const metrics = useMemo(() => ({
    posts: records.posts.length,
    events: records.events.length,
    volunteers: records.volunteers.length,
    donations: records.donations.reduce((sum, item) => sum + (Number(item.amount) || 0), 0),
    published: records.posts.filter((item) => item.status === "published").length,
    consentedStories: records.stories.filter((item) => item.consentGranted).length,
  }), [records]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try { await signInEmail(email, password); } catch { setAuthError("Sign-in failed. Use a Firebase staff account with an editor or admin custom claim."); }
  };

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draftTitle.trim()) return;
    try {
      await createRecord("posts", { title: { en: draftTitle, am: draftAmharic || draftTitle }, excerpt: { en: "", am: "" }, body: { en: "", am: "" }, status: "draft" });
      setDraftTitle(""); setDraftAmharic(""); setDialog({ open: true, title: "Draft created", description: "The new post is now stored in Firestore as a draft." }); await loadData();
    } catch { setDialog({ open: true, title: "Could not create draft", description: "Check your Firestore rules and try again." }); }
  };

  const removeItem = async (collectionName: string, id: string) => {
    try { await removeRecord(collectionName, id); await loadData(); } catch { setDialog({ open: true, title: "Could not delete item", description: "Your Firestore rules prevented this action or the record no longer exists." }); }
  };

  const generateDraft = () => {
    const locale = lang === "am" ? "Amharic" : "English and Amharic";
    setWritingResult(`Draft brief (${writingTone} tone, ${writingLength} length, ${locale})\n\n${writingPrompt || "Write a community mental health field note."}\n\nThis draft is ready for staff review. Edit all clinical claims, names, numbers, and consent-sensitive details before publishing.`);
  };

  if (authLoading) return <div className="min-h-screen grid place-items-center"><Loader2 className="h-8 w-8 animate-spin text-teal-700" /></div>;

  if (!user) return (
    <Navbar>
      <div className="container mx-auto px-4 py-16 sm:py-24 max-w-md"><Card className="border-border bg-white p-6 sm:p-8 shadow-xl rounded-[1.5rem]"><div className="text-center space-y-3 mb-6"><div className="w-12 h-12 bg-teal-900 text-white rounded-xl flex items-center justify-center mx-auto"><ShieldCheck className="w-6 h-6" /></div><h1 className="editorial-display text-3xl font-normal text-teal-950">Staff & Admin CMS</h1><p className="text-sm text-muted-foreground">Sign in with Firebase staff credentials.</p></div><form onSubmit={handleLogin} className="space-y-4"><div className="space-y-2"><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="staff@selihom.org" /></div><div className="space-y-2"><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" /></div>{authError && <p className="text-sm text-red-600">{authError}</p>}<Button type="submit" className="w-full bg-teal-700 text-white font-bold"><LogIn className="mr-2 h-4 w-4" /> Sign in</Button><Button type="button" onClick={() => signInGoogle().catch(() => setAuthError("Google sign-in failed or is not enabled in Firebase."))} variant="outline" className="w-full">Continue with Google</Button></form></Card></div>
    </Navbar>
  );

  if (!isStaff) return <Navbar><div className="container mx-auto px-4 py-24 max-w-lg"><Card className="p-8 text-center rounded-[1.5rem]"><AlertCircle className="mx-auto h-10 w-10 text-amber-600" /><h1 className="editorial-display mt-4 text-3xl font-normal text-teal-950">Staff access required</h1><p className="mt-3 text-sm text-muted-foreground">Your account is authenticated, but it does not have the editor or admin custom claim.</p><Button onClick={logout} className="mt-6 bg-teal-700 text-white">Sign out</Button></Card></div></Navbar>;

  const renderCollection = (collectionName: string, icon: React.ReactNode) => {
    const items = records[collectionName] || [];
    return <Card className="border-border bg-white rounded-[1.5rem]"><CardContent className="p-6 space-y-4"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 font-bold text-teal-950">{icon} {collectionName[0].toUpperCase() + collectionName.slice(1)}</h3><Badge variant="outline">{items.length} records</Badge></div>{items.length === 0 ? <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">No Firestore records yet. Create content from this CMS or submit a public form.</div> : <div className="space-y-3">{items.map((item) => <div key={item.id} className="flex items-center justify-between gap-3 rounded-xl border border-border p-4"><div className="min-w-0"><p className="truncate font-semibold text-teal-950">{typeof item.title === "object" ? item.title?.en || item.title?.am || "Untitled" : item.title || item.fullName || item.email || item.id}</p><p className="text-xs text-muted-foreground">{item.status || "record"}{item.consentGranted ? " • consent verified" : ""}{item.amount ? ` • ${item.amount} ETB` : ""}</p></div><Button variant="ghost" size="sm" onClick={() => removeItem(collectionName, item.id)} className="text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button></div>)}</div>}</CardContent></Card>;
  };

  const handleSeedAll = async () => {
    try {
      await seedCollections(user.email || undefined);
      setDialog({ open: true, title: "Collections seeded", description: "Events, gallery items, stories, and posts have been initialized in Firestore." });
      window.location.reload();
    } catch {
      setDialog({ open: true, title: "Could not seed collections", description: "Check Firebase staff permissions and Firestore rules." });
    }
  };

  return <Navbar><div className="bg-teal-950 text-white py-10 sm:py-12"><div className="container mx-auto px-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"><div><span className="text-xs font-bold uppercase tracking-widest text-teal-300">Protected workspace</span><h1 className="editorial-display mt-2 text-3xl sm:text-4xl font-normal">Selihom Admin CMS</h1><p className="text-sm text-teal-300">{user.email} • {role}</p></div><div className="flex gap-3"><Button onClick={handleSeedAll} className="bg-amber-500 font-bold text-teal-950 hover:bg-amber-400">Initialize CMS content</Button><Button variant="outline" onClick={logout} className="border-teal-700 bg-teal-900 text-teal-100">Sign out</Button></div></div></div><div className="container mx-auto px-4 py-8 sm:py-10"><Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8"><div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start"><CmsSidebar activeTab={activeTab as any} onChange={(tab) => setActiveTab(tab)} /><div className="min-w-0">
    <TabsContent value="insights" className="space-y-6"><div className="grid grid-cols-2 lg:grid-cols-4 gap-4"><Card className="p-5 rounded-xl"><div className="text-2xl font-black text-teal-800">{metrics.posts}</div><div className="text-xs text-muted-foreground">Posts in Firestore</div></Card><Card className="p-5 rounded-xl"><div className="text-2xl font-black text-teal-800">{metrics.published}</div><div className="text-xs text-muted-foreground">Published posts</div></Card><Card className="p-5 rounded-xl"><div className="text-2xl font-black text-teal-800">{metrics.volunteers}</div><div className="text-xs text-muted-foreground">Volunteer records</div></Card><Card className="p-5 rounded-xl"><div className="text-2xl font-black text-teal-800">{metrics.donations.toLocaleString()} ETB</div><div className="text-xs text-muted-foreground">Donation records total</div></Card></div><Card className="rounded-[1.5rem] p-6 sm:p-8"><h2 className="editorial-display text-3xl font-normal text-teal-950">Live impact signals</h2><p className="mt-2 text-sm text-muted-foreground">These counts are computed from Firestore records available to your staff account; no demo numbers are substituted.</p><div className="mt-6 h-40 rounded-xl border border-dashed border-border grid place-items-center text-sm text-muted-foreground">Connect analytics events to populate time-series charts.</div></Card></TabsContent>
    <TabsContent value="pages" className="space-y-6"><PageContentManager userEmail={user.email} /></TabsContent>
    <TabsContent value="posts" className="space-y-6"><CollectionEditor collection="posts" items={records.posts as any} onRefresh={loadData} role={role as "admin" | "editor"} /></TabsContent>
    <TabsContent value="events"><CollectionEditor collection="events" items={records.events as any} onRefresh={loadData} role={role as "admin" | "editor"} /></TabsContent><TabsContent value="gallery"><CollectionEditor collection="gallery" items={records.gallery as any} onRefresh={loadData} role={role as "admin" | "editor"} /></TabsContent><TabsContent value="stories"><CollectionEditor collection="stories" items={records.stories as any} onRefresh={loadData} role={role as "admin" | "editor"} /></TabsContent><TabsContent value="volunteers"><CollectionEditor collection="volunteers" items={records.volunteers as any} onRefresh={loadData} role={role as "admin" | "editor"} /></TabsContent><TabsContent value="donations"><CollectionEditor collection="donations" items={records.donations as any} onRefresh={loadData} role={role as "admin" | "editor"} /></TabsContent>
    <TabsContent value="assistant"><Card className="rounded-[1.5rem] p-6 sm:p-8 space-y-5"><div><h2 className="editorial-display text-3xl font-normal text-teal-950">Bilingual writing assistant</h2><p className="mt-2 text-sm text-muted-foreground">Prepare a reviewable draft brief. Staff must verify clinical, consent, and impact claims before publishing.</p></div><Textarea value={writingPrompt} onChange={(e) => setWritingPrompt(e.target.value)} rows={4} placeholder="What should the draft cover?" /><div className="grid sm:grid-cols-2 gap-4"><div className="space-y-2"><Label>Tone</Label><select value={writingTone} onChange={(e) => setWritingTone(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="compassionate">Compassionate</option><option value="professional">Professional</option><option value="urgent">Urgent and clear</option></select></div><div className="space-y-2"><Label>Length</Label><select value={writingLength} onChange={(e) => setWritingLength(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="short">Short</option><option value="medium">Medium</option><option value="long">Long</option></select></div></div><Button onClick={generateDraft} className="bg-amber-500 text-teal-950 font-bold"><Sparkles className="mr-2 h-4 w-4" /> Generate draft brief</Button>{writingResult && <pre className="whitespace-pre-wrap rounded-xl bg-slate-50 p-5 text-sm leading-relaxed">{writingResult}</pre>}</Card></TabsContent>
    <TabsContent value="settings" className="space-y-6"><SiteSettingsManager userEmail={user.email} /><MetricsAndSeoManager userEmail={user.email} /></TabsContent>
  </div></div></Tabs></div><ActionDialog open={dialog.open} onOpenChange={(open) => setDialog((current) => ({ ...current, open }))} title={dialog.title} description={dialog.description}><div className="text-sm text-muted-foreground">The action completed through the current Firebase-backed workflow.</div></ActionDialog></Navbar>;
}
