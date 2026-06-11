"use client";

import Link from "next/link";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import { FaDiscord, FaGithub } from "react-icons/fa6";
import { FiCalendar } from "react-icons/fi";

const channels = [
  {
    icon: FaDiscord,
    title: "Join the Conversation",
    description: "Got a question? Stuck on an experiment? Our Discord is where researchers share ideas, get unstuck, and geek out about model internals.",
    href: "https://nnsight.net/signup",
    cta: "Join Discord",
    valueProp: "1,200+ members",
    external: true,
  },
  {
    icon: FiCalendar,
    title: "Hands-On Workshops",
    description: "Learn by doing. We run regular workshops that take you from zero to running your first remote experiment on large-scale models.",
    href: "/community",
    cta: "See Upcoming Events",
    valueProp: "Free for researchers",
    external: false,
  },
  {
    icon: FaGithub,
    title: "Contribute to NNsight",
    description: "NNsight is open source and built by researchers like you. Whether it's code, documentation, or a bug report—every contribution helps.",
    href: "https://github.com/ndif-team",
    cta: "Explore on GitHub",
    valueProp: "850+ stars",
    external: true,
  },
];

export default function CommunityCTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 to-white dark:from-black dark:to-surface-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white" style={{ textWrap: 'balance' }}>
            Join the NDIF Community
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full mb-6" aria-hidden="true" />
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            We'd love to have you. Whether you're debugging your first experiment or
            contributing to the codebase, there's a place for you here.
          </p>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
          {channels.map((ch) => {
            const Icon = ch.icon;
            return (
              <StaggerItem key={ch.title}>
                <div className="group card-glass p-8 rounded-2xl h-full flex flex-col focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 focus-visible:outline-none">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mb-5 text-brand-600 dark:text-brand-400 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                    {ch.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3 flex-1">
                    {ch.description}
                  </p>
                  <p className="text-xs font-medium text-brand-600 dark:text-brand-400 mb-4">
                    {ch.valueProp}
                  </p>
                  {ch.external ? (
                    <a
                      href={ch.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-semibold text-sm hover:underline underline-offset-4"
                    >
                      {ch.cta}{" "}
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <Link
                      href={ch.href}
                      className="group/link inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-semibold text-sm hover:underline underline-offset-4"
                    >
                      {ch.cta}{" "}
                      <span aria-hidden="true" className="transition-transform duration-200 group-hover/link:translate-x-0.5">
                        &rarr;
                      </span>
                    </Link>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
