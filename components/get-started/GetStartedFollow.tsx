"use client";

import AnimateOnScroll from "../AnimateOnScroll";
import { socialLinks } from "data/navigation";
import {
  FaGithub,
  FaXTwitter,
  FaBluesky,
  FaLinkedinIn,
} from "react-icons/fa6";

const socials = [
  {
    Icon: FaGithub,
    href: socialLinks.github,
    label: "GitHub",
    handle: "ndif-team",
  },
  {
    Icon: FaBluesky,
    href: socialLinks.bluesky,
    label: "Bluesky",
    handle: "@ndif-team.bsky.social",
  },
  {
    Icon: FaXTwitter,
    href: socialLinks.twitter,
    label: "X (Twitter)",
    handle: "@ndif_team",
  },
  {
    Icon: FaLinkedinIn,
    href: socialLinks.linkedin,
    label: "LinkedIn",
    handle: "National Deep Inference Fabric",
  },
];

export default function GetStartedFollow() {
  return (
    <section className="py-16 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-slate-900 dark:text-white">
            Follow Us
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socials.map(({ Icon, href, label, handle }) => (
            <AnimateOnScroll key={label} delay={0.05}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="card-glass rounded-xl p-5 flex items-center gap-4 group"
                aria-label={`Follow NDIF on ${label}`}
              >
                <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  <Icon size={22} />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">
                    {label}
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    {handle}
                  </p>
                </div>
              </a>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
