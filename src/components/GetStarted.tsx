"use client";

import { useState } from "react";
import Link from "next/link";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import { FiCopy, FiCheck, FiArrowUpRight } from "react-icons/fi";

const steps = [
  {
    number: "01",
    title: "Install NNsight",
    description: "Install the open-source NNsight library with a single pip command.",
    code: "pip install nnsight",
  },
  {
    number: "02",
    title: "Sign Up for Access",
    description: "Create a free account to get remote access to large-scale models hosted on NDIF.",
    link: "https://login.ndif.us",
    linkText: "login.ndif.us",
  },
  {
    number: "03",
    title: "Start Experimenting",
    description: "Run transparent, reproducible experiments on model internals — no GPU required.",
    code: "model.trace(remote=True)",
  },
];

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="group/code relative rounded-lg bg-slate-200/70 dark:bg-slate-900/80 p-3 font-mono text-sm text-slate-700 dark:text-brand-400">
      <span className="text-slate-400 dark:text-slate-500 select-none">$ </span>
      {code}
      <button
        onClick={handleCopy}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 opacity-0 group-hover/code:opacity-100 transition-all"
        aria-label="Copy command"
      >
        {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
      </button>
    </div>
  );
}

export default function GetStarted() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white" style={{ textWrap: 'balance' }}>
            Get Started in Minutes
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full mb-6" aria-hidden="true" />
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Three simple steps to start running experiments on large-scale AI models.
          </p>
        </AnimateOnScroll>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.15}>
          {steps.map((step) => (
            <StaggerItem key={step.number}>
              <div className="card-spotlight relative p-8 rounded-2xl surface-glass border border-slate-200/80 dark:border-slate-600/50 h-full flex flex-col focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 focus-visible:outline-none">
                <span className="text-5xl font-bold font-display text-slate-200 dark:text-slate-700 select-none absolute top-4 right-6">
                  {step.number}
                </span>
                <div className="relative flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
                    {step.description}
                  </p>
                  <div className="mt-5">
                    {step.code ? (
                      <CodeBlock code={step.code} />
                    ) : step.link ? (
                      <a
                        href={step.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-between rounded-lg bg-slate-200/70 dark:bg-slate-900/80 p-3 font-mono text-sm text-slate-700 dark:text-brand-400 hover:bg-slate-300/70 dark:hover:bg-slate-800/80 transition-all"
                      >
                        <span>{step.linkText}</span>
                        <span className="text-slate-400 opacity-0 -translate-x-2 group-hover:translate-x-0 group-hover:opacity-100 group-hover:text-slate-600 dark:group-hover:text-brand-300 transition-all duration-300">
                          <FiArrowUpRight size={16} />
                        </span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimateOnScroll className="text-center mt-12" delay={0.3}>
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-semibold text-lg transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Full Setup Guide
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
