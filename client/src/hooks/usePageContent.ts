import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { defaultPagesContent, type PageDocument } from "@/lib/pageContentStore";

export function usePageContent(pageId: string) {
  const [page, setPage] = useState<PageDocument>(defaultPagesContent[pageId] || defaultPagesContent.home);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"firestore" | "fallback">("fallback");

  useEffect(() => {
    const fallback = defaultPagesContent[pageId] || defaultPagesContent.home;
    setPage(fallback);
    setLoading(true);
    setSource("fallback");

    const unsubscribe = onSnapshot(
      doc(db, "pages", pageId),
      (snapshot) => {
        const nextPage = snapshot.exists() ? (snapshot.data() as PageDocument) : fallback;
        setPage(nextPage.status === "published" ? nextPage : fallback);
        setSource(snapshot.exists() && nextPage.status === "published" ? "firestore" : "fallback");
        setLoading(false);
      },
      (error) => {
        console.warn(`[PageContent] ${pageId} subscription unavailable:`, error.message);
        setPage(fallback);
        setSource("fallback");
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [pageId]);

  return { page, loading, source };
}
