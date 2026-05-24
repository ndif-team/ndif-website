"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import AnimateOnScroll from "../AnimateOnScroll";
import {
  FiDownload,
  FiUserPlus,
  FiCpu,
  FiUsers,
  FiCopy,
  FiCheck,
  FiExternalLink,
} from "react-icons/fi";

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
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 opacity-0 group-hover/code:opacity-100 focus:opacity-100 transition-all"
        aria-label={copied ? "Copied" : "Copy command"}
      >
        {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
      </button>
    </div>
  );
}

function StepSection({
  number,
  icon,
  title,
  children,
  delay = 0,
  isFirst = false,
}: {
  number: number;
  icon: ReactNode;
  title: string;
  children: ReactNode;
  delay?: number;
  isFirst?: boolean;
}) {
  return (
    <AnimateOnScroll delay={delay}>
      <div className={`relative pl-16 md:pl-20 pb-16 last:pb-0 ${isFirst ? "mt-0" : "mt-12 md:mt-16"}`}>
        {/* Vertical connector line */}
        <div
          className="absolute left-6 md:left-8 top-14 bottom-0 w-px bg-slate-200 dark:bg-slate-700"
          aria-hidden="true"
        />

        {/* Step number badge */}
        <div className="absolute left-0 top-0 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center text-white shadow-lg shadow-brand-400/25">
          <span className="font-display font-bold text-lg md:text-xl">
            {number}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-brand-600 dark:text-brand-400">{icon}</span>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {title}
            </h2>
          </div>
          <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}

export default function GetStartedSteps() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step 1 */}
        <StepSection
          number={1}
          icon={<FiDownload size={22} />}
          title="Install NNsight"
          delay={0}
          isFirst
        >
          <p>
            To start using NNsight, install it via pip:
          </p>
          <CodeBlock code="pip install nnsight" />
          <p>
            For a deeper exploration of NNsight, run through the full{" "}
            <a
              href="https://nnsight.net/notebooks/tutorials/walkthrough/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 dark:text-brand-400 hover:underline underline-offset-4 font-medium"
            >
              NNsight walkthrough
              <FiExternalLink className="inline ml-1 mb-0.5" size={14} />
            </a>
            .
          </p>
          <p>
            We welcome open-source contributions and suggested improvements on{" "}
            <a
              href="https://github.com/ndif-team/nnsight"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 dark:text-brand-400 hover:underline underline-offset-4 font-medium"
            >
              GitHub
              <FiExternalLink className="inline ml-1 mb-0.5" size={14} />
            </a>
            .
          </p>
        </StepSection>

        {/* Step 2 */}
        <StepSection
          number={2}
          icon={<FiUserPlus size={22} />}
          title="Sign up for NDIF remote model access"
          delay={0.05}
        >
          <p>
            To remotely access LLMs through NDIF, sign up for an NDIF API key.
          </p>
          <a
            href="https://login.ndif.us/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-medium transition-colors"
          >
            Register for your free API key
            <FiExternalLink size={16} />
          </a>
          <p>
            NDIF hosts multiple LLMs, including various sizes of the Llama 3.1
            models and DeepSeek-R1 models. All models are open for public use.
            View the full list of hosted models on the{" "}
            <Link
              href="/status"
              className="text-brand-600 dark:text-brand-400 hover:underline underline-offset-4 font-medium"
            >
              status page
            </Link>
            .
          </p>
        </StepSection>

        {/* Step 3 */}
        <StepSection
          number={3}
          icon={<FiCpu size={22} />}
          title="Access LLM internals"
          delay={0.1}
        >
          <p>
            Now that you have your NDIF API key, you&apos;re ready to start
            exploring LLM internals. We&apos;ve put together a Colab notebook to
            help you get started.
          </p>
          <a
            href="https://colab.research.google.com/github/ndif-team/ndif-website/blob/onboarding-fixes/public/notebooks/NDIFGetStarted.ipynb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 dark:bg-white/10 border border-slate-700 dark:border-slate-600 hover:border-brand-500 text-white font-medium transition-all hover:bg-slate-800 dark:hover:bg-white/20"
          >
            Open in Google Colab
            <FiExternalLink size={16} />
          </a>
          <div>
            <p className="font-semibold text-slate-900 dark:text-white mb-2">
              The notebook covers:
            </p>
            <ul className="list-none space-y-2">
              {[
                "Installing NNsight",
                "Setting up your NDIF API key",
                "Loading a LLM in NNsight",
                "Accessing and altering LLM internals remotely",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </StepSection>

        {/* Step 4 */}
        <StepSection
          number={4}
          icon={<FiUsers size={22} />}
          title="Get involved"
          delay={0.15}
        >
          <p>
            This has been a quick overview to get started with NDIF&apos;s
            remote models. To learn more, dive into these resources:
          </p>
          <ul className="list-none space-y-2">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
              <span>
                Get a comprehensive overview with the{" "}
                <a
                  href="https://nnsight.net/notebooks/tutorials/walkthrough/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 dark:text-brand-400 hover:underline underline-offset-4 font-medium"
                >
                  NNsight Walkthrough
                  <FiExternalLink
                    className="inline ml-1 mb-0.5"
                    size={14}
                  />
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
              <span>
                Explore NNsight implementations of common{" "}
                <a
                  href="https://nnsight.net/tutorials/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 dark:text-brand-400 hover:underline underline-offset-4 font-medium"
                >
                  LLM interpretability techniques
                  <FiExternalLink
                    className="inline ml-1 mb-0.5"
                    size={14}
                  />
                </a>
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
              <span>
                Join the conversation in the NDIF{" "}
                <a
                  href="https://discord.com/invite/6uFJmCSwW7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 dark:text-brand-400 hover:underline underline-offset-4 font-medium"
                >
                  Discord community
                  <FiExternalLink
                    className="inline ml-1 mb-0.5"
                    size={14}
                  />
                </a>
              </span>
            </li>
          </ul>
        </StepSection>
      </div>
    </section>
  );
}
