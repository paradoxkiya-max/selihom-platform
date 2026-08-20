import { describe, expect, it } from "vitest";
import { buildContentPayload, buildInboxUpdate, canAccessCmsModule, canManage, canManageCmsModule, cmsModules, type CmsCollection } from "../client/src/lib/cmsWorkflows";

describe("connected CMS workflows", () => {
  it("sanitizes content payload metadata while preserving bilingual fields", () => {
    const payload = buildContentPayload("events", {
      id: "event-1",
      title: { en: "Workshop", am: "ስልጠና" },
      location: { en: "Addis Ababa", am: "አዲስ አበባ" },
      createdAt: "server-value",
      status: "published",
    });

    expect(payload).toEqual({
      title: { en: "Workshop", am: "ስልጠና" },
      location: { en: "Addis Ababa", am: "አዲስ አበባ" },
      status: "published",
    });
  });

  it("blocks publishing a story without recorded consent", () => {
    expect(() => buildContentPayload("stories", { status: "published", consentGranted: false })).toThrow(/consent/i);
    expect(buildContentPayload("stories", { status: "published", consentGranted: true })).toMatchObject({ consentGranted: true });
  });

  it("normalizes inbox status, notes, and archive actions", () => {
    expect(buildInboxUpdate({ status: "reviewing", notes: "  Call applicant tomorrow  ", archived: 1 })).toEqual({
      status: "reviewing",
      notes: "Call applicant tomorrow",
      archived: true,
    });
  });

  it("covers content payload creation across every content sidebar collection", () => {
    const collections = ["posts", "events", "gallery"] as const;
    for (const collection of collections) {
      expect(buildContentPayload(collection, { id: `${collection}-1`, status: "published", title: { en: "English", am: "አማርኛ" } })).toMatchObject({ status: "published", title: { en: "English", am: "አማርኛ" } });
    }
    expect(buildContentPayload("stories", { id: "story-1", status: "draft", consentGranted: false })).toMatchObject({ status: "draft", consentGranted: false });
  });

  it("covers inbox status, notes, and archive updates for both operational inboxes", () => {
    for (const collection of ["volunteers", "donations"] as const) {
      expect(buildInboxUpdate({ collection, status: "reviewing", notes: ` ${collection} follow-up `, archived: false })).toEqual({ status: "reviewing", notes: `${collection} follow-up`, archived: false });
    }
  });

  it("enforces admin-only destructive and donation publication actions", () => {
    expect(canManage("editor", "create", "events")).toBe(true);
    expect(canManage("editor", "edit", "volunteers")).toBe(true);
    expect(canManage("editor", "delete", "events")).toBe(false);
    expect(canManage("editor", "publish", "donations")).toBe(false);
    expect(canManage("admin", "delete", "events")).toBe(true);
    expect(canManage("admin", "publish", "donations")).toBe(true);
  });

  it("covers every sidebar module for authenticated staff access", () => {
    expect(cmsModules).toEqual(["insights", "pages", "posts", "events", "gallery", "stories", "volunteers", "donations", "assistant", "settings"]);
    for (const module of cmsModules) {
      expect(canAccessCmsModule("admin", module)).toBe(true);
      expect(canAccessCmsModule("editor", module)).toBe(true);
      expect(canAccessCmsModule(undefined, module)).toBe(false);
    }
  });

  it("covers admin and editor actions for every Firestore collection", () => {
    const collections: readonly CmsCollection[] = ["posts", "events", "gallery", "stories", "volunteers", "donations"];
    for (const collection of collections) {
      expect(canManage("admin", "edit", collection)).toBe(true);
      expect(canManage("admin", "delete", collection)).toBe(true);
      expect(canManage("editor", "edit", collection)).toBe(true);
      expect(canManage("editor", "delete", collection)).toBe(false);
      expect(canManage(undefined, "edit", collection)).toBe(false);
    }
    for (const collection of ["posts", "events", "gallery", "stories"] as const) {
      expect(canManage("admin", "create", collection)).toBe(true);
      expect(canManage("editor", "create", collection)).toBe(true);
    }
    for (const collection of ["volunteers", "donations"] as const) {
      expect(canManage("admin", "create", collection)).toBe(false);
      expect(canManage("editor", "create", collection)).toBe(false);
    }
  });

  it("covers role behavior for Pages, Settings, Writing Assistant, and Insights", () => {
    for (const role of ["admin", "editor"] as const) {
      expect(canManageCmsModule(role, "pages", "view")).toBe(true);
      expect(canManageCmsModule(role, "pages", "edit")).toBe(true);
      expect(canManageCmsModule(role, "settings", "view")).toBe(true);
      expect(canManageCmsModule(role, "settings", "edit")).toBe(true);
      expect(canManageCmsModule(role, "assistant", "view")).toBe(true);
      expect(canManageCmsModule(role, "assistant", "generate")).toBe(true);
      expect(canManageCmsModule(role, "insights", "view")).toBe(true);
      expect(canManageCmsModule(role, "insights", "edit")).toBe(false);
    }
    expect(canManageCmsModule(undefined, "pages", "view")).toBe(false);
    expect(canManageCmsModule(undefined, "settings", "edit")).toBe(false);
    expect(canManageCmsModule(undefined, "assistant", "generate")).toBe(false);
  });
});
