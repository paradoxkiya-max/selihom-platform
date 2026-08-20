import { BarChart3, BookOpen, Calendar, FileText, Heart, Image, LayoutPanelTop, Menu, Settings, Sparkles, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export type CmsTab = "insights" | "pages" | "posts" | "events" | "gallery" | "stories" | "volunteers" | "donations" | "assistant" | "settings";

const nav: Array<{ id: CmsTab; label: string; icon: typeof BarChart3; group: "workspace" | "content" | "operations" }> = [
  { id: "insights", label: "Insights", icon: BarChart3, group: "workspace" },
  { id: "pages", label: "Pages", icon: LayoutPanelTop, group: "workspace" },
  { id: "posts", label: "Posts", icon: FileText, group: "content" },
  { id: "events", label: "Events", icon: Calendar, group: "content" },
  { id: "gallery", label: "Gallery", icon: Image, group: "content" },
  { id: "stories", label: "Stories", icon: BookOpen, group: "content" },
  { id: "volunteers", label: "Volunteers", icon: Users, group: "operations" },
  { id: "donations", label: "Donations", icon: Heart, group: "operations" },
  { id: "assistant", label: "Writing assistant", icon: Sparkles, group: "operations" },
  { id: "settings", label: "Settings", icon: Settings, group: "operations" },
];

function NavigationItems({ activeTab, onChange }: { activeTab: CmsTab; onChange: (tab: CmsTab) => void }) {
  return <>{(["workspace", "content", "operations"] as const).map((group) => {
    const groupLabel = group === "workspace" ? "Workspace" : group === "content" ? "Publish content" : "Operations";
    return <div key={group} className="space-y-1">
      <p className="px-3 pt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-300 first:pt-0">{groupLabel}</p>
      {nav.filter((item) => item.group === group).map(({ id, label, icon: Icon }) => <button key={id} type="button" onClick={() => onChange(id)} aria-current={activeTab === id ? "page" : undefined} className={cn("flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition duration-150 active:scale-[0.97]", activeTab === id ? "bg-amber-500 text-teal-950 shadow-[0_8px_20px_rgba(245,158,11,0.22)]" : "text-teal-100 hover:bg-teal-900 hover:text-white")}><Icon className="h-4 w-4 shrink-0" /><span className="truncate">{label}</span></button>)}
    </div>;
  })}</>;
}

export function CmsSidebar({ activeTab, onChange }: { activeTab: CmsTab; onChange: (tab: CmsTab) => void }) {
  const activeLabel = nav.find((item) => item.id === activeTab)?.label ?? "CMS section";

  return <>
    <aside className="hidden h-fit self-start rounded-[1.5rem] border border-teal-900/10 bg-teal-950 p-3 text-teal-50 shadow-xl lg:sticky lg:top-6 lg:flex lg:w-full lg:flex-col">
      <div className="border-b border-teal-800/70 px-3 pb-4"><p className="text-[10px] font-bold uppercase tracking-[0.24em] text-teal-300">Selihom CMS</p><p className="mt-1 text-sm font-semibold text-white">Content operations</p><p className="mt-1 text-xs leading-relaxed text-teal-300">Manage bilingual public content and operational inboxes.</p></div>
      <nav aria-label="CMS sections" className="mt-3 space-y-2"><NavigationItems activeTab={activeTab} onChange={onChange} /></nav>
    </aside>

    <details className="rounded-2xl border border-teal-900/10 bg-white shadow-sm lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-bold text-teal-950"><span className="flex items-center gap-2"><Menu className="h-4 w-4 text-teal-700" /> CMS menu</span><span className="rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-700">{activeLabel}</span></summary>
      <nav aria-label="CMS sections" className="grid gap-1 border-t border-teal-900/10 p-3"><NavigationItems activeTab={activeTab} onChange={onChange} /></nav>
    </details>
  </>;
}
