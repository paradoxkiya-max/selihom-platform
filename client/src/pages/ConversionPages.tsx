import React, { useState } from "react";
import { Navbar } from "@/components/Layout";
import { DynamicPageHero } from "@/components/DynamicPageHero";
import { useLanguage } from "@/contexts/LanguageContext";
import { ActionDialog } from "@/components/ActionDialog";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";
import { Heart, Send, CheckCircle2, FileText, Download, ArrowRight, Loader2, Mail, AlertCircle } from "lucide-react";
import { initiateDonation, submitContact, submitNewsletter, submitVolunteer } from "@/lib/firestore";


export function Contact() {
  const { lang } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [dialog, setDialog] = useState<{ open: boolean; success: boolean; title: string; message: string }>({ open: false, success: true, title: "", message: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = new FormData(e.currentTarget);
    try {
      await submitContact({
        name: String(form.get("name") || ""),
        email: String(form.get("email") || ""),
        message: String(form.get("message") || ""),
        status: "new",
      });
      e.currentTarget.reset();
      setDialog({ open: true, success: true, title: "Message received", message: "Thank you for reaching out. Your message is now in the Selihom support inbox." });
    } catch {
      setDialog({ open: true, success: false, title: "Could not send message", message: "Please check your connection and try again. The form is ready to resubmit safely." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      await submitNewsletter(newsletterEmail);
      setNewsletterEmail("");
      setDialog({ open: true, success: true, title: "You are on the list", message: "We will send occasional Selihom field notes and community updates to your inbox." });
    } catch {
      setDialog({ open: true, success: false, title: "Could not subscribe", message: "Please try again in a moment." });
    }
  };

  return (
    <Navbar>
      <DynamicPageHero pageId="contact" />
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-5xl grid lg:grid-cols-[1.1fr_.9fr] gap-8 items-start">
        <Card className="border-border bg-white p-6 sm:p-8 shadow-sm rounded-[1.5rem]">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2"><Label htmlFor="name">Full Name</Label><Input id="name" name="name" required placeholder="Abebe Kebede" /></div>
            <div className="space-y-2"><Label htmlFor="email">Email Address</Label><Input id="email" name="email" type="email" required placeholder="abebe@example.com" /></div>
            <div className="space-y-2"><Label htmlFor="message">Message</Label><Textarea id="message" name="message" required rows={6} placeholder="How can we assist you today?" /></div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold">
              {isSubmitting ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />} Send Message
            </Button>
          </form>
        </Card>
        <div className="space-y-6">
          <div className="bg-teal-50 border border-teal-100 rounded-[1.5rem] p-6 sm:p-8 space-y-4">
            <span className="text-xs font-bold text-teal-700 tracking-widest uppercase">Start a conversation</span>
            <h2 className="editorial-display text-3xl sm:text-4xl font-normal text-teal-950">Bring us the question. We will take it from there.</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">For urgent emotional support, call <strong>9505</strong>. For partnerships, referrals, or programme questions, use the message form.</p>
            <div className="text-sm font-semibold text-teal-800">contact@selihom.org<br />+251 11 662 9012</div>
          </div>
          <div className="bg-slate-50 border border-border rounded-[1.5rem] p-6 space-y-4">
            <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-teal-700" /><h3 className="font-bold text-teal-950">Join the field notes</h3></div>
            <p className="text-sm text-muted-foreground">Occasional stories, resources, and community updates. No noisy inbox.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2"><Input type="email" required value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} placeholder="you@example.com" /><Button type="submit" className="bg-teal-700 text-white">Join</Button></form>
          </div>
        </div>
      </div>
      <ActionDialog open={dialog.open} onOpenChange={(open) => setDialog((current) => ({ ...current, open }))} title={dialog.title} description={dialog.message}>
        <div className="flex items-center gap-3 py-2 text-sm text-muted-foreground"><span className={`flex h-9 w-9 items-center justify-center rounded-full ${dialog.success ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{dialog.success ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}</span>{dialog.success ? "Your request has been recorded." : "No changes were saved."}</div>
      </ActionDialog>
    </Navbar>
  );
}

export function Press() {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  return (
    <Navbar>
      <DynamicPageHero pageId="press" />
      <div className="container mx-auto px-4 py-12 sm:py-16 max-w-3xl">
        <Card className="border-border bg-white p-6 sm:p-8 shadow-sm space-y-6 rounded-[1.5rem]">
          <div className="flex items-center gap-4"><div className="w-14 h-14 bg-teal-100 rounded-2xl flex items-center justify-center text-teal-800"><FileText className="w-7 h-7" /></div><div><h3 className="editorial-display text-2xl font-normal text-teal-950">Selihom Official Fact Sheet</h3><p className="text-xs text-muted-foreground">Media resource • Updated 2026</p></div></div>
          <p className="text-sm text-muted-foreground leading-relaxed">For a verified press copy or partnership briefing, contact the Selihom communications desk. The resource library is managed by staff through the CMS.</p>
          <Button onClick={() => setOpen(true)} className="bg-teal-700 hover:bg-teal-800 text-white font-bold flex items-center gap-2"><Download className="w-4 h-4" /> Request Fact Sheet</Button>
        </Card>
      </div>
      <ActionDialog open={open} onOpenChange={setOpen} title="Request the current fact sheet" description="Our communications desk will provide the current approved PDF and attribution guidance.">
        <div className="space-y-4"><p className="text-sm text-muted-foreground">Please use the contact form and mention “Press fact sheet” so the team can send the latest approved version.</p><a href="/contact" className="inline-flex h-10 items-center justify-center rounded-md bg-teal-700 px-4 text-sm font-semibold text-white">Go to contact desk <ArrowRight className="ml-2 h-4 w-4" /></a></div>
      </ActionDialog>
    </Navbar>
  );
}

export function Volunteer() {
  const { lang } = useLanguage();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [draft, setDraft] = useState({ fullName: "", email: "", phone: "", interests: "", availability: "" });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const submit = async () => {
    setIsSubmitting(true);
    setError("");
    try {
      await submitVolunteer({ ...draft, status: "new" });
      setOpen(true);
      setStep(1);
      setDraft({ fullName: "", email: "", phone: "", interests: "", availability: "" });
    } catch {
      setError("We could not save your application. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Navbar>
      <DynamicPageHero pageId="volunteer" />
      <div id="volunteer-form" className="container mx-auto px-4 py-12 sm:py-16 max-w-2xl">
        <Card className="border-border bg-white p-6 sm:p-8 shadow-sm rounded-[1.5rem]">
          <div className="flex items-center justify-between mb-8"><div><span className="text-xs font-bold uppercase tracking-widest text-teal-700">Volunteer intake</span><h2 className="editorial-display text-3xl font-normal text-teal-950 mt-2">Step {step} of 3</h2></div><div className="text-xs text-muted-foreground">{step === 1 ? "About you" : step === 2 ? "Your strengths" : "Review"}</div></div>
          <div className="mb-8 h-1.5 rounded-full bg-slate-100"><div className="h-1.5 rounded-full bg-teal-700 transition-all" style={{ width: `${(step / 3) * 100}%` }} /></div>
          {step === 1 && <div className="space-y-5"><div className="space-y-2"><Label>Full Name</Label><Input value={draft.fullName} onChange={(e) => setDraft({ ...draft, fullName: e.target.value })} placeholder="Tigist Bekele" /></div><div className="space-y-2"><Label>Email Address</Label><Input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="tigist@example.com" /></div><div className="space-y-2"><Label>Phone Number</Label><Input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} placeholder="+251 91 123 4567" /></div><Button disabled={!draft.fullName || !draft.email || !draft.phone} onClick={() => setStep(2)} className="w-full bg-teal-700 text-white">Continue <ArrowRight className="ml-2 h-4 w-4" /></Button></div>}
          {step === 2 && <div className="space-y-5"><div className="space-y-2"><Label>Area of Interest / Skills</Label><Textarea rows={5} value={draft.interests} onChange={(e) => setDraft({ ...draft, interests: e.target.value })} placeholder="Counseling, event organizing, translation, research..." /></div><div className="space-y-2"><Label>Availability</Label><Input value={draft.availability} onChange={(e) => setDraft({ ...draft, availability: e.target.value })} placeholder="Weekends, two evenings per month, etc." /></div><div className="flex gap-3"><Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button><Button disabled={!draft.interests} onClick={() => setStep(3)} className="flex-1 bg-teal-700 text-white">Review <ArrowRight className="ml-2 h-4 w-4" /></Button></div></div>}
          {step === 3 && <div className="space-y-5"><div className="rounded-xl bg-slate-50 p-5 text-sm leading-relaxed"><strong>{draft.fullName}</strong><br />{draft.email} • {draft.phone}<br /><br />{draft.interests}<br /><br />Availability: {draft.availability || "Not specified"}</div>{error && <p className="text-sm text-red-600">{error}</p>}<div className="flex gap-3"><Button variant="outline" onClick={() => setStep(2)} className="flex-1">Edit</Button><Button disabled={isSubmitting} onClick={submit} className="flex-1 bg-amber-500 text-teal-950 font-bold">{isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Submit application"}</Button></div></div>}
        </Card>
      </div>
      <ActionDialog open={open} onOpenChange={setOpen} title="Application received" description="Thank you for stepping forward. Your application is now in the volunteer inbox for review."><div className="flex items-center gap-3 text-sm text-muted-foreground"><CheckCircle2 className="h-6 w-6 text-emerald-600" /> A coordinator will follow up by email.</div></ActionDialog>
    </Navbar>
  );
}

export function Donate() {
  const { lang } = useLanguage();
  const [, setLocation] = useLocation();
  const [amount, setAmount] = useState("500");
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleDonate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsedAmount = Number(customAmount || amount);
    if (!parsedAmount || parsedAmount < 1) { setError("Enter a valid donation amount."); return; }
    setError("");
    setIsSubmitting(true);
    try {
      const record = await initiateDonation({ donorName: String(form.get("donorName") || ""), email: String(form.get("donorEmail") || ""), amount: parsedAmount, frequency, status: "initiated", provider: "chapa" });
      setLocation(`/donate/success?ref=${record.id}`);
    } catch {
      setError("We could not start the donation request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Navbar>
      <DynamicPageHero pageId="donate" />
      <div id="donation-form" className="container mx-auto px-4 py-12 sm:py-16 max-w-xl">
        <Card className="border-border bg-white p-6 sm:p-8 shadow-sm rounded-[1.5rem]"><form onSubmit={handleDonate} className="space-y-6">
          <div className="flex bg-slate-100 p-1 rounded-xl"><button type="button" onClick={() => setFrequency("once")} className={`flex-1 py-2 text-sm font-bold rounded-lg ${frequency === "once" ? "bg-teal-700 text-white" : "text-muted-foreground"}`}>One-Time</button><button type="button" onClick={() => setFrequency("monthly")} className={`flex-1 py-2 text-sm font-bold rounded-lg ${frequency === "monthly" ? "bg-teal-700 text-white" : "text-muted-foreground"}`}>Monthly Sustainer</button></div>
          <div className="space-y-3"><Label>Select Amount (ETB)</Label><div className="grid grid-cols-3 gap-3">{["200", "500", "1000", "2500", "5000", "10000"].map((preset) => <button key={preset} type="button" onClick={() => { setAmount(preset); setCustomAmount(""); }} className={`py-3 rounded-xl font-bold border text-sm ${amount === preset && !customAmount ? "border-teal-600 bg-teal-50 text-teal-900 ring-2 ring-teal-600/20" : "border-border hover:border-teal-400"}`}>{preset} ETB</button>)}</div></div>
          <div className="space-y-2"><Label htmlFor="custom">Or Custom Amount (ETB)</Label><Input id="custom" inputMode="decimal" placeholder="Enter amount" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setAmount(""); }} /></div>
          <div className="space-y-4 pt-4 border-t border-border"><div className="space-y-2"><Label htmlFor="donorName">Donor Full Name</Label><Input id="donorName" name="donorName" required placeholder="Dr. Abebe Bekele" /></div><div className="space-y-2"><Label htmlFor="donorEmail">Email Address</Label><Input id="donorEmail" name="donorEmail" type="email" required placeholder="abebe@example.com" /></div></div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={isSubmitting} className="w-full bg-amber-500 hover:bg-amber-600 text-teal-950 font-black text-lg py-6 shadow-lg">{isSubmitting ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Heart className="w-5 h-5 fill-teal-950 mr-2" /> Continue to secure payment</>}</Button>
        </form></Card>
      </div>
    </Navbar>
  );
}

export function DonateSuccess() {
  const { lang } = useLanguage();
  const [, setLocation] = useLocation();
  const ref = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("ref") : null;
  return <Navbar><DynamicPageHero pageId="donate-success" /><div className="container mx-auto px-4 py-12 sm:py-16 max-w-lg text-center space-y-6"><div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-inner"><CheckCircle2 className="w-10 h-10" /></div><p className="text-muted-foreground text-sm leading-relaxed">{lang === "en" ? `Your donation request has been recorded${ref ? ` with reference ${ref}` : ""}. The secure payment step will be connected to Chapa when the merchant credentials are configured.` : `የልገሳ ጥያቄዎ ተመዝግቧል${ref ? ` በመለያ ${ref}` : ""}። የደህንነት ክፍያ ሂደት የነጋዴ መረጃዎች ሲዋቀሩ ይገናኛል።`}</p><Button onClick={() => setLocation("/")} className="bg-teal-700 px-8 font-bold text-white hover:bg-teal-800">{lang === "en" ? "Return to homepage" : "ወደ መነሻ ገጽ ይመለሱ"}</Button></div></Navbar>;
}
