"use client";

import Link from "next/link";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import { FiCpu, FiCode, FiUsers } from "react-icons/fi";

const pillars = [
  {
    icon: FiCpu,
    title: "HPC Fabric",
    description:
      "A nationwide high-performance computing fabric powered by NCSA's Delta — utilizing one 8xH200 node and six 4xA40 nodes — providing free remote access to run experiments on large-scale AI models.",
  },
  {
    icon: FiCode,
    title: "NNsight Library",
    description:
      "An open-source PyTorch-based toolkit (850+ GitHub stars) that lets researchers inspect, modify, and customize internal computations of AI models, complete with remote access to large scale models.",
  },
  {
    icon: FiUsers,
    title: "Training Program",
    description:
      "A nationwide training program developed with PIT-UN, a consortium of 63 universities and colleges, providing workshops, tutorials, and resources to build a broad community of AI researchers.",
  },
] as const;

export default function WhatIsNDIF() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white" style={{ textWrap: 'balance' }}>
            What is NDIF?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full mb-6" aria-hidden="true" />
          <p className="max-w-3xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            The National Deep Inference Fabric is a unique nationwide research computing
            fabric that enables scientists to perform transparent and reproducible
            experiments on the largest-scale open AI systems. NDIF has three parts:
          </p>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <StaggerItem key={pillar.title}>
                <div className="group card-glass p-8 rounded-2xl h-full focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 focus-visible:outline-none">
                  <div
                    className="w-14 h-14 rounded-xl bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center mb-6 text-brand-600 dark:text-brand-400 transition-transform duration-300 group-hover:scale-110"
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        <AnimateOnScroll className="text-center mt-12" delay={0.3}>
          <Link
            href="/fabric"
            className="group/link inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold hover:underline underline-offset-4 transition-colors"
          >
            Learn more about the Fabric
            <span aria-hidden="true" className="transition-transform duration-200 group-hover/link:translate-x-0.5">&rarr;</span>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
