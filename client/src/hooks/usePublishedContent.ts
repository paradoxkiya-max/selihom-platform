import { useEffect, useState } from "react";
import { subscribeToPublished } from "@/lib/firestore";
import type { DocumentData, QueryConstraint } from "firebase/firestore";

export function usePublishedContent<T extends DocumentData>(collectionName: string, constraints: QueryConstraint[] = []) {
  const [items, setItems] = useState<Array<T & { id: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToPublished<T>(collectionName, (nextItems) => {
      setItems(nextItems);
      setLoading(false);
    }, constraints);
    return unsubscribe;
  }, [collectionName]);

  return { items, loading };
}
