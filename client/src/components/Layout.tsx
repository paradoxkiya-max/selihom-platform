import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Globe, Menu, X, Heart, Shield, PhoneCall } from "lucide-react";

export const Navbar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location] = useLocation();
  const { lang, setLang, t } = useLanguage();
  const settings = useSiteSettings();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/services", label: t("nav.services") },
    { href: "/awareness", label: t("nav.awareness") },
    { href: "/stories", label: t("nav.stories") },
    { href: "/gallery", label: t("nav.gallery") },
    { href: "/blog", label: t("nav.blog") },
    { href: "/events", label: t("nav.events") },
    { href: "/press", label: t("nav.press") },
    { href: "/contact", label: t("nav.contact") },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Banner for Crisis Support / Emergency */}
      <div className="bg-teal-900 text-teal-100 py-2 px-4 text-xs sm:text-sm font-medium flex justify-between items-center z-50">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-1 text-center sm:text-left">
          <span className="flex items-center gap-2 justify-center">
            <PhoneCall className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{settings.hotlineLabel[lang]}: <strong>{settings.hotlineNumber}</strong></span>
          </span>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="hover:underline flex items-center gap-1 text-teal-200">
              <Shield className="w-3.5 h-3.5" /> {t("nav.admin")}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 flex items-center justify-center text-white font-bold text-2xl shadow-md group-hover:scale-105 transition-transform">
              ሰ
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-teal-900">Selihom</span>
              <span className="block text-xs font-semibold text-teal-700 tracking-widest uppercase">ሰሊሆም • Mental Health NGO</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden 2xl:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`whitespace-nowrap text-xs 2xl:text-sm font-medium leading-none transition-colors hover:text-teal-600 ${
                  location === link.href ? "text-teal-700 font-bold border-b-2 border-teal-600 pb-1" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions & Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLang(lang === "en" ? "am" : "en")}
              className="flex items-center gap-2 border-teal-200 text-teal-800 hover:bg-teal-50"
            >
              <Globe className="w-4 h-4 text-teal-600" />
              <span>{lang === "en" ? "አማርኛ (Amharic)" : "English"}</span>
            </Button>

            <Link href="/volunteer" className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md border border-teal-600 px-3 text-sm font-semibold text-teal-700 transition-colors hover:bg-teal-50">
              {t("nav.volunteer")}
            </Link>

            <Link href="/donate" className="inline-flex h-9 items-center justify-center gap-2 whitespace-nowrap rounded-md bg-teal-700 px-3 text-sm font-bold text-white shadow-md transition-colors hover:bg-teal-800">
              <Heart className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>{t("nav.donate")}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 2xl:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLang(lang === "en" ? "am" : "en")}
              className="text-teal-800 font-bold"
            >
              {lang === "en" ? "አማ" : "EN"}
            </Button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-teal-900 hover:bg-teal-50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="2xl:hidden bg-white border-b border-border px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
            <div className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-medium py-2 px-3 rounded-lg transition-colors ${
                    location === link.href ? "bg-teal-100 text-teal-900 font-bold" : "text-muted-foreground hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <Link href="/volunteer" onClick={() => setMobileMenuOpen(false)} className="inline-flex h-10 w-full items-center justify-center rounded-md border border-teal-600 text-sm font-semibold text-teal-700">
                {t("nav.volunteer")}
              </Link>
              <Link href="/donate" onClick={() => setMobileMenuOpen(false)} className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-teal-700 text-sm font-bold text-white">
                <Heart className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{t("nav.donate")}</span>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-teal-950 text-teal-100 pt-16 pb-12 border-t border-teal-900">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white font-bold text-xl">
                ሰ
              </div>
              <span className="text-2xl font-black text-white">Selihom</span>
            </div>
            <p className="text-sm text-teal-300 leading-relaxed">
              {settings.footerTagline[lang]}
            </p>
            <div className="text-xs text-teal-400">
              {settings.registrationLabel[lang]}
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 tracking-wider uppercase text-xs">Quick Links</h4>
            <ul className="space-y-2.5 text-sm text-teal-300">
              <li><Link href="/about" className="hover:text-white transition-colors">{t("nav.about")}</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">{t("nav.services")}</Link></li>
              <li><Link href="/awareness" className="hover:text-white transition-colors">{t("nav.awareness")}</Link></li>
              <li><Link href="/stories" className="hover:text-white transition-colors">{t("nav.stories")}</Link></li>
              <li><Link href="/press" className="hover:text-white transition-colors">{t("nav.press")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 tracking-wider uppercase text-xs">Engagement</h4>
            <ul className="space-y-2.5 text-sm text-teal-300">
              <li><Link href="/blog" className="hover:text-white transition-colors">{t("nav.blog")}</Link></li>
              <li><Link href="/events" className="hover:text-white transition-colors">{t("nav.events")}</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition-colors">{t("nav.gallery")}</Link></li>
              <li><Link href="/volunteer" className="hover:text-white transition-colors">{t("nav.volunteer")}</Link></li>
              <li><Link href="/donate" className="hover:text-white transition-colors">{t("nav.donate")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 tracking-wider uppercase text-xs">Headquarters & Contact</h4>
            <div className="space-y-3 text-sm text-teal-300">
              <p>{settings.address[lang].split("\n").map((line) => <React.Fragment key={line}>{line}<br /></React.Fragment>)}</p>
              <p>Email: {settings.email}<br />Phone: {settings.secondaryPhone}</p>
              <div className="pt-2">
                <Link href="/admin" className="inline-flex h-9 items-center justify-center rounded-md border border-teal-700 bg-teal-900/50 px-3 text-sm text-teal-200 hover:bg-teal-800">
                  <Shield className="w-3.5 h-3.5 mr-2" /> Staff / Admin Portal
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 pt-8 border-t border-teal-900/80 flex flex-col sm:flex-row justify-between items-center text-xs text-teal-400">
          <p>{t("footer.rights")}</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="hover:underline">Terms of Use</Link>
            <Link href="/contact" className="hover:underline">Support Desk</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
