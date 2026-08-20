import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type CollectionReference,
  type DocumentData,
  type QueryConstraint,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "./firebase";

export type ContentStatus = "draft" | "published";

export interface LocalizedText {
  en: string;
  am: string;
}

export interface PostRecord {
  id?: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  body: LocalizedText;
  imageUrl?: string;
  status: ContentStatus;
  createdAt?: unknown;
  publishedAt?: unknown;
}

export interface EventRecord {
  id?: string;
  title: LocalizedText;
  description: LocalizedText;
  date: string;
  location: LocalizedText;
  imageUrl?: string;
  status: ContentStatus;
}

export interface GalleryRecord {
  id?: string;
  title: LocalizedText;
  imageUrl: string;
  caption?: LocalizedText;
  status: ContentStatus;
}

export interface StoryRecord {
  id?: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  imageUrl?: string;
  consentGranted: boolean;
  status: ContentStatus;
}

export interface VolunteerApplication {
  fullName: string;
  email: string;
  phone: string;
  interests: string;
  availability?: string;
  status: "new" | "reviewing" | "accepted" | "declined";
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  status: "new" | "read" | "replied";
}

export interface DonationRecord {
  donorName: string;
  email: string;
  amount: number;
  frequency: "once" | "monthly";
  status: "initiated" | "pending" | "paid" | "failed";
  provider: "chapa" | "manual";
}

function collectionRef<T extends DocumentData>(name: string) {
  return collection(db, name) as CollectionReference<T>;
}

export function subscribeToPublished<T extends DocumentData>(
  collectionName: string,
  onChange: (items: Array<T & { id: string }>) => void,
  constraints: QueryConstraint[] = [],
): Unsubscribe {
  const constraintsWithStatus = [where("status", "==", "published"), orderBy("createdAt", "desc"), limit(50), ...constraints];
  return onSnapshot(
    query(collectionRef<T>(collectionName), ...constraintsWithStatus),
    (snapshot) => onChange(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))),
    (error) => {
      console.warn(`[Firestore] ${collectionName} subscription unavailable:`, error.message);
      onChange([]);
    },
  );
}

export async function listCollection<T extends DocumentData>(collectionName: string, constraints: QueryConstraint[] = []) {
  const snapshot = await getDocs(query(collectionRef<T>(collectionName), ...constraints));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}

export async function createRecord<T extends DocumentData>(collectionName: string, record: T) {
  return addDoc(collectionRef<T>(collectionName), {
    ...record,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateRecord<T extends DocumentData>(collectionName: string, id: string, record: Partial<T>) {
  return updateDoc(doc(db, collectionName, id), { ...record, updatedAt: serverTimestamp() });
}

export async function removeRecord(collectionName: string, id: string) {
  return deleteDoc(doc(db, collectionName, id));
}

export async function submitVolunteer(application: VolunteerApplication) {
  return createRecord("volunteers", application);
}

export async function submitContact(message: ContactMessage) {
  return createRecord("contactMessages", message);
}

export async function submitNewsletter(email: string) {
  return createRecord("newsletterSubscribers", { email, status: "pending", source: "website" });
}

export async function initiateDonation(donation: DonationRecord) {
  return createRecord("donations", donation);
}

export const firebaseCollections = {
  posts: "posts",
  events: "events",
  gallery: "gallery",
  stories: "stories",
  volunteers: "volunteers",
  donations: "donations",
  contactMessages: "contactMessages",
  newsletterSubscribers: "newsletterSubscribers",
  settings: "settings",
} as const;
