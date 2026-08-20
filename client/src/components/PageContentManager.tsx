import { useEffect, useMemo, useState } from "react";
import { Check, Eye, Loader2, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { getAllPagesContent, savePageContent, seedDefaultPages, type PageDocument, type PageSection } from "@/lib/pageContentStore";

const pageOrder = ["home", "about", "services", "awareness", "stories", "gallery", "blog", "events", "contact", "press", "volunteer", "donate", "donate-success", "privacy", "terms"];

function clonePage(page: PageDocument): PageDocument {
  return JSON.parse(JSON.stringify(page)) as PageDocument;
}

export function PageContentManager({ userEmail }: { userEmail?: string | null }) {
  const { lang } = useLanguage();
  const [pages, setPages] = useState<Record<string, PageDocument>>({});
  const [selectedId, setSelectedId] = useState("home");
  const [draft, setDraft] = useState<PageDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const loadPages = async () => {
    setLoading(true);
    try {
      const nextPages = await getAllPagesContent();
      setPages(nextPages);
      setDraft(clonePage(nextPages[selectedId] || nextPages.home));
      setMessage(null);
    } catch {
      setMessage({ type: "error", text: "Page content could not be loaded. The public site will continue using safe fallback content." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { void loadPages(); }, []);

  const availablePages = useMemo(() => pageOrder.filter((id) => pages[id]).concat(Object.keys(pages).filter((id) => !pageOrder.includes(id))), [pages]);

  const selectPage = (id: string) => {
    setSelectedId(id);
    if (pages[id]) setDraft(clonePage(pages[id]));
    setMessage(null);
  };

  const updateDraft = (update: (current: PageDocument) => PageDocument) => {
    setDraft((current) => current ? update(current) : current);
  };

  const updateHeroField = (field: keyof PageDocument["hero"], value: string, language?: "en" | "am") => {
    updateDraft((current) => {
      if (language) {
        const currentField = current.hero[field];
        if (typeof currentField === "object") {
          return { ...current, hero: { ...current.hero, [field]: { ...currentField, [language]: value } } };
        }
      }
      return { ...current, hero: { ...current.hero, [field]: value } };
    });
  };

  const updateSection = (sectionId: string, update: (section: PageSection) => PageSection) => {
    updateDraft((current) => ({ ...current, sections: current.sections.map((section) => section.id === sectionId ? update(section) : section) }));
  };

  const updateSectionField = (sectionId: string, field: "title" | "subtitle" | "body", language: "en" | "am", value: string) => {
    updateSection(sectionId, (section) => ({ ...section, [field]: { ...(section[field] || { en: "", am: "" }), [language]: value } }));
  };

  const addSection = () => {
    updateDraft((current) => ({
      ...current,
      sections: [...current.sections, {
        id: `section-${Date.now()}`,
        title: { en: "New section", am: "አዲስ ክፍል" },
        subtitle: { en: "", am: "" },
        body: { en: "", am: "" },
        order: current.sections.length + 1,
      }],
    }));
  };

  const removeSection = (sectionId: string) => {
    updateDraft((current) => ({ ...current, sections: current.sections.filter((section) => section.id !== sectionId) }));
  };

  const handleSave = async () => {
    if (!draft) return;
    setSaving(true);
    setMessage(null);
    try {
      const nextDraft = { ...draft, updatedAt: Date.now(), updatedBy: userEmail || undefined };
      await savePageContent(nextDraft);
      setPages((current) => ({ ...current, [nextDraft.id]: nextDraft }));
      setDraft(clonePage(nextDraft));
      setMessage({ type: "success", text: nextDraft.status === "published" ? "Published changes are now live on the public route." : "Draft saved to Firestore. It is not visible publicly until published." });
    } catch {
      setMessage({ type: "error", text: "The page could not be saved. Check Firebase Authentication claims and Firestore security rules." });
    } finally {
      setSaving(false);
    }
  };

  const handleSeed = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await seedDefaultPages({ overwritePublished: false, updatedBy: userEmail || undefined });
      await loadPages();
      setMessage({ type: "success", text: "The bilingual page library is initialized in Firestore. Existing records were preserved." });
    } catch {
      setMessage({ type: "error", text: "The page library could not be initialized. Check Firestore rules for staff writes." });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !draft) return <Card className="rounded-[1.5rem] p-8"><div className="flex items-center gap-3 text-sm text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Loading page library…</div></Card>;

  return (
    <div className="grid gap-6 xl:grid-cols-[16rem_minmax(0,1fr)]">
      <Card className="h-fit rounded-[1.5rem] border-border bg-white xl:sticky xl:top-6">
        <CardContent className="space-y-4 p-5">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">{lang === "en" ? "Page library" : "የገጽ ቤተ-መጽሐፍት"}</p><h2 className="editorial-display mt-2 text-2xl font-normal text-teal-950">{availablePages.length} routes</h2></div>
          <div className="space-y-1">{availablePages.map((id) => <button key={id} type="button" onClick={() => selectPage(id)} className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${selectedId === id ? "bg-teal-700 font-semibold text-white" : "text-teal-950 hover:bg-teal-50"}`}><span className="truncate">{id}</span><span className={`ml-2 h-2 w-2 rounded-full ${pages[id]?.status === "published" ? "bg-emerald-400" : "bg-amber-400"}`} /></button>)}</div>
          <Button type="button" variant="outline" onClick={handleSeed} disabled={saving} className="w-full"><RefreshCw className="mr-2 h-4 w-4" /> Initialize library</Button>
        </CardContent>
      </Card>

      <Card className="rounded-[1.5rem] border-border bg-white">
        <CardContent className="space-y-8 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-start"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">{draft.slug}</p><h2 className="editorial-display mt-2 text-3xl font-normal text-teal-950">{lang === "en" ? "Edit page content" : "የገጽ ይዘት ያርትዑ"}</h2><p className="mt-2 text-sm text-muted-foreground">Every field below is stored in Firestore and rendered bilingually on the public route.</p></div><div className="flex flex-wrap gap-2"><Button type="button" variant="outline" onClick={() => window.open(draft.slug, "_blank", "noopener,noreferrer")}><Eye className="mr-2 h-4 w-4" /> Preview</Button><Button type="button" onClick={handleSave} disabled={saving} className="bg-teal-700 text-white">{saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}{draft.status === "published" ? "Publish changes" : "Save draft"}</Button></div></div>

          {message ? <div className={`flex items-start gap-2 rounded-xl p-4 text-sm ${message.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-700"}`}><Check className="mt-0.5 h-4 w-4 shrink-0" />{message.text}</div> : null}

          <div className="grid gap-5 md:grid-cols-2"><div className="space-y-2"><Label>English page title</Label><Input value={draft.title.en} onChange={(e) => updateDraft((current) => ({ ...current, title: { ...current.title, en: e.target.value } }))} /></div><div className="space-y-2"><Label>Amharic page title</Label><Input value={draft.title.am} onChange={(e) => updateDraft((current) => ({ ...current, title: { ...current.title, am: e.target.value } }))} /></div><div className="space-y-2"><Label>Route slug</Label><Input value={draft.slug} onChange={(e) => updateDraft((current) => ({ ...current, slug: e.target.value }))} /></div><div className="space-y-2"><Label>Publishing status</Label><select value={draft.status} onChange={(e) => updateDraft((current) => ({ ...current, status: e.target.value as PageDocument["status"] }))} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="draft">Draft</option><option value="published">Published</option></select></div></div>

          <div className="space-y-5 rounded-2xl border border-teal-100 bg-teal-50/60 p-5 sm:p-6"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Hero</p><h3 className="editorial-display mt-2 text-2xl font-normal text-teal-950">Primary public entry point</h3></div><div className="grid gap-5 md:grid-cols-2"><div className="space-y-2"><Label>Badge — English</Label><Input value={draft.hero.badge.en} onChange={(e) => updateHeroField("badge", e.target.value, "en")} /></div><div className="space-y-2"><Label>Badge — Amharic</Label><Input value={draft.hero.badge.am} onChange={(e) => updateHeroField("badge", e.target.value, "am")} /></div><div className="space-y-2"><Label>Heading — English</Label><Textarea value={draft.hero.heading.en} onChange={(e) => updateHeroField("heading", e.target.value, "en")} rows={3} /></div><div className="space-y-2"><Label>Heading — Amharic</Label><Textarea value={draft.hero.heading.am} onChange={(e) => updateHeroField("heading", e.target.value, "am")} rows={3} /></div><div className="space-y-2"><Label>Description — English</Label><Textarea value={draft.hero.description.en} onChange={(e) => updateHeroField("description", e.target.value, "en")} rows={4} /></div><div className="space-y-2"><Label>Description — Amharic</Label><Textarea value={draft.hero.description.am} onChange={(e) => updateHeroField("description", e.target.value, "am")} rows={4} /></div><div className="space-y-2"><Label>Primary CTA — English</Label><Input value={draft.hero.primaryCtaText.en} onChange={(e) => updateHeroField("primaryCtaText", e.target.value, "en")} /></div><div className="space-y-2"><Label>Primary CTA — Amharic</Label><Input value={draft.hero.primaryCtaText.am} onChange={(e) => updateHeroField("primaryCtaText", e.target.value, "am")} /></div><div className="space-y-2"><Label>Primary CTA URL</Label><Input value={draft.hero.primaryCtaUrl} onChange={(e) => updateHeroField("primaryCtaUrl", e.target.value)} /></div><div className="space-y-2"><Label>Secondary CTA URL</Label><Input value={draft.hero.secondaryCtaUrl} onChange={(e) => updateHeroField("secondaryCtaUrl", e.target.value)} /></div><div className="space-y-2"><Label>Background image or online URL</Label><Input value={draft.hero.backgroundImageUrl} onChange={(e) => updateHeroField("backgroundImageUrl", e.target.value)} placeholder="https://…" /></div></div></div>

          <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50/60 p-5 sm:p-6"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">SEO & Meta</p><h3 className="editorial-display mt-2 text-2xl font-normal text-teal-950">Search engine optimization</h3></div><div className="grid gap-5 md:grid-cols-2"><div className="space-y-2"><Label>Meta Title — English</Label><Input value={draft.seo?.metaTitle?.en || ""} onChange={(e) => updateDraft((c) => ({ ...c, seo: { ...c.seo, metaTitle: { en: e.target.value, am: c.seo?.metaTitle?.am || "" }, metaDescription: c.seo?.metaDescription || { en: "", am: "" } } }))} /></div><div className="space-y-2"><Label>Meta Title — Amharic</Label><Input value={draft.seo?.metaTitle?.am || ""} onChange={(e) => updateDraft((c) => ({ ...c, seo: { ...c.seo, metaTitle: { en: c.seo?.metaTitle?.en || "", am: e.target.value }, metaDescription: c.seo?.metaDescription || { en: "", am: "" } } }))} /></div><div className="space-y-2"><Label>Meta Description — English</Label><Textarea value={draft.seo?.metaDescription?.en || ""} onChange={(e) => updateDraft((c) => ({ ...c, seo: { ...c.seo, metaTitle: c.seo?.metaTitle || { en: "", am: "" }, metaDescription: { en: e.target.value, am: c.seo?.metaDescription?.am || "" } } }))} rows={2} /></div><div className="space-y-2"><Label>Meta Description — Amharic</Label><Textarea value={draft.seo?.metaDescription?.am || ""} onChange={(e) => updateDraft((c) => ({ ...c, seo: { ...c.seo, metaTitle: c.seo?.metaTitle || { en: "", am: "" }, metaDescription: { en: c.seo?.metaDescription?.en || "", am: e.target.value } } }))} rows={2} /></div></div></div>

          <div className="space-y-5"><div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">Sections</p><h3 className="editorial-display mt-2 text-2xl font-normal text-teal-950">Managed page blocks</h3></div><Button type="button" variant="outline" onClick={addSection}><Plus className="mr-2 h-4 w-4" /> Add section</Button></div>{draft.sections.slice().sort((a, b) => a.order - b.order).map((section) => <div key={section.id} className="space-y-4 rounded-2xl border border-border p-5"><div className="flex items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700">{section.id}</span><Button type="button" variant="ghost" size="sm" onClick={() => removeSection(section.id)} className="text-red-600 hover:bg-red-50"><Trash2 className="h-4 w-4" /></Button></div><div className="grid gap-4 md:grid-cols-2"><div className="space-y-2"><Label>Title — English</Label><Input value={section.title.en} onChange={(e) => updateSectionField(section.id, "title", "en", e.target.value)} /></div><div className="space-y-2"><Label>Title — Amharic</Label><Input value={section.title.am} onChange={(e) => updateSectionField(section.id, "title", "am", e.target.value)} /></div><div className="space-y-2"><Label>Body — English</Label><Textarea value={section.body?.en || ""} onChange={(e) => updateSectionField(section.id, "body", "en", e.target.value)} rows={4} /></div><div className="space-y-2"><Label>Body — Amharic</Label><Textarea value={section.body?.am || ""} onChange={(e) => updateSectionField(section.id, "body", "am", e.target.value)} rows={4} /></div><div className="space-y-2"><Label>Image or online URL</Label><Input value={section.imageUrl || ""} onChange={(e) => updateSection(section.id, (current) => ({ ...current, imageUrl: e.target.value }))} placeholder="https://…" /></div><div className="space-y-2"><Label>Order</Label><Input type="number" value={section.order} onChange={(e) => updateSection(section.id, (current) => ({ ...current, order: Number(e.target.value) || 1 }))} /></div></div></div>)}</div>
        </CardContent>
      </Card>
    </div>
  );
}
