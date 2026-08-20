export type StaffRole = "admin" | "editor";
export type CmsCollection = "posts" | "events" | "gallery" | "stories" | "volunteers" | "donations";
export type CmsModule = "insights" | "pages" | CmsCollection | "assistant" | "settings";
export type CmsModuleAction = "view" | "edit" | "generate";

export const cmsModules: readonly CmsModule[] = ["insights", "pages", "posts", "events", "gallery", "stories", "volunteers", "donations", "assistant", "settings"];

export function canAccessCmsModule(role: StaffRole | undefined, module: CmsModule) {
  return Boolean(role && cmsModules.includes(module));
}

export function canManageCmsModule(role: StaffRole | undefined, module: Exclude<CmsModule, CmsCollection>, action: CmsModuleAction) {
  if (!canAccessCmsModule(role, module)) return false;
  if (module === "insights") return action === "view";
  if (module === "assistant") return action === "view" || action === "generate";
  return action === "view" || action === "edit";
}

export function canManage(role: StaffRole | undefined, action: "create" | "edit" | "publish" | "delete", collection: CmsCollection) {
  if (!role) return false;
  if (action === "create" && (collection === "volunteers" || collection === "donations")) return false;
  if (action === "delete") return role === "admin";
  if (collection === "donations" && action === "publish") return role === "admin";
  return role === "admin" || role === "editor";
}

export function buildContentPayload(collection: CmsCollection, draft: Record<string, any>) {
  const payload = { ...draft };
  delete payload.id;
  delete payload.createdAt;
  delete payload.updatedAt;
  if (collection === "stories" && payload.status === "published" && payload.consentGranted !== true) {
    throw new Error("A story must have recorded consent before publication.");
  }
  return payload;
}

export function buildInboxUpdate(draft: Record<string, any>) {
  return {
    status: draft.status,
    notes: typeof draft.notes === "string" ? draft.notes.trim() : "",
    archived: Boolean(draft.archived),
  };
}
