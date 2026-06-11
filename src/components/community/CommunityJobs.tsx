"use client";

import { useState, useCallback } from "react";
import { FiChevronDown } from "react-icons/fi";
import AnimateOnScroll from "../AnimateOnScroll";

interface JobItem {
  title: string;
  content: string;
}

const jobs: JobItem[] = [
  {
    title: "Other roles",
    content:
      "We anticipate hiring for the following roles in the future: Student research assistants and Student co-ops. We also welcome research collaborators and unpaid open-source contributors; for open-source community opportunities, get in touch through our community Discord.",
  },
];

function JobAccordion({
  item,
  isOpen,
  onToggle,
}: {
  item: JobItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700/50">
      <h3>
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full py-5 text-left group"
          aria-expanded={isOpen}
        >
          <span className="font-semibold text-slate-900 dark:text-white pr-4 text-base">
            {item.title}
          </span>
          <FiChevronDown
            size={20}
            className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[600px] pb-5" : "max-h-0"
        }`}
      >
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed pr-8">
          {item.content}
        </p>
      </div>
    </div>
  );
}

export default function CommunityJobs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback(
    (i: number) => setOpenIndex((prev) => (prev === i ? null : i)),
    []
  );

  return (
    <section
      id="jobs"
      className="py-20 bg-slate-50 dark:bg-black/40 border-t border-slate-200 dark:border-slate-800 scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Jobs and Community Opportunities
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
            We don&apos;t currently have any open roles, but please check back
            later for future job openings.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div role="region" aria-label="Jobs and community opportunities">
            {jobs.map((item, i) => (
              <JobAccordion
                key={item.title}
                item={item}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            ))}
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
