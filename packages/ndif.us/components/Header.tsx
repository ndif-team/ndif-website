"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useSettings } from "./SettingsProvider";
import { FiSun, FiMoon, FiPlay, FiPause } from "react-icons/fi";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { isAnimationEnabled, toggleAnimation } = useSettings();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "shadow-lg bg-white/85 dark:bg-[#0f172a]/85"
          : "glass bg-white/50 dark:bg-[#0f172a]/50"
      }`}
      id="navbar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo(0, 0)}
          >
            <img
              src="https://ndif.us/images/NSF_NDIF_color.png"
              height={45}
              width={80}
              alt="NDIF Logo"
              className="h-10 w-auto"
            />
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white hidden md:inline">
              National Deep Inference Fabric
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#about"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white transition-colors"
            >
              About
            </Link>
            <Link
              href="#research"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white transition-colors"
            >
              Research
            </Link>
            <Link
              href="#team"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white transition-colors"
            >
              Team
            </Link>
            <Link
              href="#status"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white transition-colors"
            >
              Status
            </Link>
            <Link
              href="#nnsight"
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white transition-colors"
            >
              NNsight
            </Link>

            <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-6">
               {mounted && (
                <>
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-full text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-white transition-colors"
                    aria-label="Toggle Theme"
                  >
                    {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
                  </button>
                  <button
                    onClick={toggleAnimation}
                    className="p-2 rounded-full text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-white transition-colors"
                    aria-label="Toggle Animation"
                  >
                    {isAnimationEnabled ? <FiPause size={20} /> : <FiPlay size={20} />}
                  </button>
                </>
              )}
            </div>

            <a
              href="#start"
              className="px-5 py-2.5 rounded-full bg-slate-900 dark:bg-slate-800 border border-slate-700 hover:border-brand-500 text-sm font-medium text-white transition-all hover:bg-slate-700"
            >
              Get Started
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
             {mounted && (
                <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="p-2 rounded-full text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-white transition-colors"
                    aria-label="Toggle Theme"
                  >
                    {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
                  </button>
             )}
            <button
              id="mobile-menu-btn"
              className="text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden glass border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="#mission"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Mission
          </Link>
          <Link
            href="#research"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Research
          </Link>
          <Link
            href="#community"
            className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Community
          </Link>
           <div className="px-3 py-2">
              <button
                onClick={toggleAnimation}
                className="flex items-center gap-2 text-base font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-white"
              >
                {isAnimationEnabled ? <FiPause /> : <FiPlay />}
                {isAnimationEnabled ? "Pause Animation" : "Play Animation"}
              </button>
           </div>
        </div>
      </div>
    </nav>
  );
}
