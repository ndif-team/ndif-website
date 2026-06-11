"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { FiChevronDown } from "react-icons/fi";
import AnimateOnScroll from "../AnimateOnScroll";
import { faq, type FAQItem, type FAQSegment } from "data/faq";

function isInternalHref(href: string | undefined): boolean {
  return !!href && href.startsWith("/") && !href.startsWith("//");
}

function renderAnswer(segments: FAQSegment[]) {
  return segments.map((seg, i) => {
    if (seg.type === "link") {
      const href = seg.href ?? "#";
      const className =
        "text-brand-600 dark:text-brand-400 hover:underline underline-offset-4 font-medium";

      if (isInternalHref(href)) {
        return (
          <Link key={i} href={href} className={className}>
            {seg.content}
          </Link>
        );
      }

      const isMailto = href.startsWith("mailto:");
      return (
        <a
          key={i}
          href={href}
          target={isMailto ? undefined : "_blank"}
          rel={isMailto ? undefined : "noopener noreferrer"}
          className={className}
        >
          {seg.content}
        </a>
      );
    }
    return <span key={i}>{seg.content}</span>;
  });
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
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
            {item.question}
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
          {renderAnswer(item.answer)}
        </p>
      </div>
    </div>
  );
}

export default function FabricFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = useCallback(
    (i: number) => setOpenIndex((prev) => (prev === i ? null : i)),
    []
  );

  return (
    <section className="py-20 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="relative">
            <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm rounded-3xl border border-white/20 dark:border-slate-800/20" />
            <div className="relative z-10 p-8 md:p-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-slate-900 dark:text-white">
              FAQ
            </h2>
            <div role="region" aria-label="Frequently Asked Questions">
              {faq.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  item={item}
                  isOpen={openIndex === i}
                  onToggle={() => toggle(i)}
                />
              ))}
            </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
