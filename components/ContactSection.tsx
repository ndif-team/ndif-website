"use client";

import AnimateOnScroll from "./AnimateOnScroll";
import { socialLinks } from "data/navigation";
import {
  FaGithub,
  FaXTwitter,
  FaBluesky,
  FaLinkedinIn,
  FaDiscord,
} from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

const links = [
  { icon: FiMail, label: "Email", href: `mailto:${socialLinks.email}`, text: socialLinks.email },
  { icon: FaDiscord, label: "Discord", href: socialLinks.discord, text: "Join our community" },
  { icon: FaGithub, label: "GitHub", href: socialLinks.github, text: "ndif-team" },
  { icon: FaXTwitter, label: "Twitter / X", href: socialLinks.twitter, text: "@ndif_team" },
  { icon: FaBluesky, label: "Bluesky", href: socialLinks.bluesky, text: "ndif-team" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: socialLinks.linkedin, text: "NDIF on LinkedIn" },
];

export default function ContactSection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Get in Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full mb-6" />
          <p className="max-w-xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            Interested in using NDIF, collaborating, or learning more? Reach out
            through any of the channels below.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:border-brand-400 dark:hover:border-brand-500/50 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 flex-shrink-0">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {link.label}
                    </div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                      {link.text}
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
