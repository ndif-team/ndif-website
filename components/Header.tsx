"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useSettings } from "./SettingsProvider";
import { FiSun, FiMoon, FiPlay, FiPause, FiX } from "react-icons/fi";
import ndifLogo from "assets/NSF_NDIF_Lockup.png";
import Image from "next/image";
import { mainNav, ctaNav } from "data/navigation";

function AnnouncementBanner({
  onDismiss,
}: {
  onDismiss: () => void;
}) {
  return (
    <div className="relative bg-gradient-to-r from-brand-600 to-accent-600 text-white text-sm text-center py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <span className="font-medium">
          NDIF is now available — free remote access to large-scale AI models for research.
        </span>
        <Link
          href="/get-started"
          className="underline underline-offset-2 font-semibold hover:text-white/90 transition-colors whitespace-nowrap"
        >
          Get started →
        </Link>
      </div>
      <button
        onClick={onDismiss}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/20 transition-colors"
        aria-label="Dismiss announcement"
      >
        <FiX size={14} />
      </button>
    </div>
  );
}

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { isAnimationEnabled, toggleAnimation } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;

  const navLinkClass = (href: string) => {
    const base = "text-sm font-medium transition-colors pb-1";
    if (isActive(href)) {
      return `${base} text-brand-600 dark:text-brand-400 border-b-2 border-brand-600 dark:border-brand-400`;
    }
    return `${base} text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white`;
  };

  const mobileLinkClass = (href: string) => {
    const base =
      "block px-3 py-2 rounded-md text-base font-medium transition-colors";
    if (isActive(href)) {
      return `${base} text-brand-600 dark:text-brand-400 bg-slate-100 dark:bg-slate-800/70`;
    }
    return `${base} text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800`;
  };

  return (
    <>
      {showBanner && (
        <AnnouncementBanner onDismiss={() => setShowBanner(false)} />
      )}

      <nav
        className={`sticky top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "shadow-lg bg-white/85 dark:bg-surface-900/85 backdrop-blur-md"
            : "bg-white/50 dark:bg-surface-900/50 backdrop-blur-sm"
        }`}
        id="navbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
              <Image
                src={ndifLogo}
                height={40}
                width={72}
                alt="NDIF Logo"
                priority
              />
              <span className="font-display font-bold text-lg tracking-tight text-slate-900 dark:text-white hidden lg:inline">
                NSF National Deep Inference Fabric
              </span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              {mainNav.map((link) =>
                link.external ? (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={navLinkClass(link.href)}
                  >
                    {link.label}
                    <span className="text-[10px] ml-0.5 opacity-50">↗</span>
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={navLinkClass(link.href)}
                  >
                    {link.label}
                  </Link>
                )
              )}

              <div className="flex items-center gap-1 border-l border-slate-200 dark:border-slate-700 pl-4">
                {mounted && (
                  <>
                    <button
                      onClick={() =>
                        setTheme(theme === "dark" ? "light" : "dark")
                      }
                      className="p-2 rounded-full text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-white transition-colors"
                      aria-label="Toggle Theme"
                    >
                      {theme === "dark" ? (
                        <FiSun size={18} />
                      ) : (
                        <FiMoon size={18} />
                      )}
                    </button>
                    <button
                      onClick={toggleAnimation}
                      className="p-2 rounded-full text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-white transition-colors"
                      aria-label="Toggle Animation"
                    >
                      {isAnimationEnabled ? (
                        <FiPause size={18} />
                      ) : (
                        <FiPlay size={18} />
                      )}
                    </button>
                  </>
                )}
              </div>

              <Link
                href={ctaNav.href}
                className="px-5 py-2 rounded-full bg-slate-900 dark:bg-white/10 border border-slate-700 dark:border-slate-600 hover:border-brand-500 text-sm font-medium text-white transition-all hover:bg-slate-800 dark:hover:bg-white/20"
              >
                {ctaNav.label}
              </Link>
            </div>

            {/* Mobile controls */}
            <div className="md:hidden flex items-center gap-2">
              {mounted && (
                <button
                  onClick={() =>
                    setTheme(theme === "dark" ? "light" : "dark")
                  }
                  className="p-2 rounded-full text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-white transition-colors"
                  aria-label="Toggle Theme"
                >
                  {theme === "dark" ? (
                    <FiSun size={20} />
                  ) : (
                    <FiMoon size={20} />
                  )}
                </button>
              )}
              <button
                className="p-2 text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMobileMenuOpen ? "block animate-slide-down" : "hidden"
          } md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-surface-900/95 backdrop-blur-md`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {mainNav.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={mobileLinkClass(link.href)}
                >
                  {link.label}{" "}
                  <span className="text-xs opacity-50">↗</span>
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={mobileLinkClass(link.href)}
                >
                  {link.label}
                </Link>
              )
            )}

            <div className="px-3 py-2 flex items-center gap-4">
              <button
                onClick={toggleAnimation}
                className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white"
              >
                {isAnimationEnabled ? <FiPause /> : <FiPlay />}
                {isAnimationEnabled ? "Pause Animation" : "Play Animation"}
              </button>
            </div>

            <div className="px-3 pt-2">
              <Link
                href={ctaNav.href}
                className="block w-full text-center px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white/10 border border-slate-700 dark:border-slate-600 text-sm font-medium text-white transition-all hover:bg-slate-800"
              >
                {ctaNav.label}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
