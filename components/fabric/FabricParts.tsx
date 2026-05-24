"use client";

import { useState } from "react";
import AnimateOnScroll from "../AnimateOnScroll";
import { FiServer, FiCode, FiUsers } from "react-icons/fi";

const parts = [
  {
    id: "hpc",
    icon: FiServer,
    label: "HPC Fabric",
    title: "A nationwide high-performance computing fabric",
    content:
      "Hosting the largest open pretrained machine learning models for transparent deep inference. This National Deep Inference Fabric is a unique combination of GPU hardware and deep network AI inference software that provides a remotely-accessible computing resource for scientists to perform detailed and reproducible experiments on large AI systems on the fabric. The fabric is designed for many scientists to efficiently and simultaneously share the same AI computing capacity to make efficient use of resources.",
    details:
      "NDIF is powered by NCSA's Delta — including H200 and A40 GPU nodes — providing free remote access to run experiments on large-scale AI models. Delta is part of the NSF high-performance computing portfolio at the University of Illinois Urbana-Champaign.",
    externalHref: "https://www.ncsa.illinois.edu/resources-and-services/compute-resources/delta/",
    externalLabel: "Go to NCSA Delta",
  },
  {
    id: "nnsight",
    icon: FiCode,
    label: "NNsight Library",
    title: "A novel open-source research software library",
    content:
      "Enables scientists to develop and deploy new research methods on AI models by creating intervention code that inspects, modifies and customizes AI model computations. NNsight enables reproducible scientific experiments to be defined and executed on both the shared large-scale fabric and on a scientist's own smaller-scale computers.",
    details:
      "Building on the popular PyTorch ecosystem, NNsight allows researchers to create code that inspects, modifies, and customizes AI model computations, complete with remote access to large-scale models via NDIF.",
    externalHref: "https://nnsight.net/",
    externalLabel: "Go to NNsight",
  },
  {
    id: "training",
    icon: FiUsers,
    label: "Training Program",
    title: "A nationwide training program",
    content:
      "To equip researchers and students in every part of the country to utilize NDIF to unlock critical research problems in every field impacted by large-scale AI. Developed together with the Public Interest Technology University Network, a consortium of 63 universities and colleges, the NDIF training program will consist of online modules, course materials, and in-person workshops hosted at multiple sites throughout the United States. It will create a network of experts in a range of fields impacted by AI, provide embedded expertise within their own institutions, and help create a next-generation workforce equipped to understand and harness the mechanisms and capabilities of the systems at the forefront of artificial intelligence.",
    details:
      "NDIF has partnered with PIT-UN, a consortium of 63 universities and colleges, to conduct needs-gathering workshops and tutorials open to all fields affected by AI — not only computer scientists, but all researchers who wish to investigate large-scale AI within their fields.",
    externalHref: "https://pit-un.org/",
    externalLabel: "Go to PIT-UN",
  },
];

export default function FabricParts() {
  const [active, setActive] = useState(0);
  const current = parts[active];

  return (
    <section className="py-20 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-slate-900 dark:text-white">
            The Three Parts of NDIF
          </h2>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Tabs */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="flex lg:flex-col gap-2">
                {parts.map((part, i) => {
                  const Icon = part.icon;
                  return (
                    <button
                      key={part.id}
                      onClick={() => setActive(i)}
                      className={`flex items-center gap-3 px-5 py-4 rounded-xl text-left transition-all w-full ${active === i
                          ? "bg-brand-50 dark:bg-brand-950/40 border-brand-500 text-brand-700 dark:text-brand-300 shadow-sm border"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent text-slate-600 dark:text-slate-400"
                        }`}
                      aria-selected={active === i}
                      role="tab"
                    >
                      <Icon
                        size={22}
                        className={
                          active === i
                            ? "text-brand-600 dark:text-brand-400"
                            : ""
                        }
                      />
                      <span className="font-semibold text-sm md:text-base">
                        {part.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="bg-white dark:bg-slate-800/30 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-8 md:p-10">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  {current.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg mb-4">
                  {current.content}
                </p>
                <p className="text-slate-500 dark:text-slate-500 leading-relaxed text-sm mb-6 border-t border-slate-100 dark:border-slate-700/40 pt-4">
                  {current.details}
                </p>
                <a
                  href={current.externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium transition-colors"
                >
                  {current.externalLabel}
                  <span className="text-xs opacity-80">↗</span>
                </a>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
