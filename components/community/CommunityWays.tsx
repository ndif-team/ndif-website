"use client";

import AnimateOnScroll from "../AnimateOnScroll";
import { FaDiscord, FaGithub } from "react-icons/fa6";
import { FiCode, FiBriefcase } from "react-icons/fi";

const ways = [
  {
    icon: FaDiscord,
    title: "Join our community of early adopters",
    description:
      "Our Discord server hosts students and researchers from many fields who are dissecting the behavior and mechanisms of large AI models.",
    href: "https://discord.com/invite/6uFJmCSwW7",
    cta: "Join the community",
    external: true,
  },
  {
    icon: FiCode,
    title: "Use our open-source library, NNsight",
    description:
      "NNsight can be used with NDIF and it can also be used with your own local computational power independently of the fabric. It works with PyTorch and can be easily installed via pip.",
    href: "https://nnsight.net/about",
    cta: "Learn about NNsight",
    external: true,
  },
  {
    icon: FiBriefcase,
    title: "Join our team",
    description:
      "We are looking for talented and motivated team members who are inspired to create a vibrant scientific community to crack the mysteries of large-scale AI.",
    href: "#jobs",
    cta: "See opportunities",
    external: false,
  },
  {
    icon: FaGithub,
    title: "Contribute to open source",
    description:
      "The NDIF project code is open-source. Contribute code, report issues, or improve the documentation.",
    href: "https://github.com/orgs/ndif-team/repositories",
    cta: "View on GitHub",
    external: true,
  },
];

export default function CommunityWays() {
  return (
    <section className="py-16 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-slate-900 dark:text-white">
            Ways to Get Involved
          </h2>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ways.map((item) => {
            const Icon = item.icon;
            return (
              <AnimateOnScroll key={item.title} delay={0.05}>
                <div className="card-glass rounded-2xl p-8 h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mb-5 text-brand-600 dark:text-brand-400">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-1">
                    {item.description}
                  </p>
                  {item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-semibold text-sm hover:underline underline-offset-4 self-start"
                    >
                      {item.cta} <span aria-hidden="true">↗</span>
                    </a>
                  ) : (
                    <a
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-semibold text-sm hover:underline underline-offset-4 self-start"
                    >
                      {item.cta} <span aria-hidden="true">&darr;</span>
                    </a>
                  )}
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
