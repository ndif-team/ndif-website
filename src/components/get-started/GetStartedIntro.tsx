"use client";

import Image from "next/image";
import AnimateOnScroll from "../AnimateOnScroll";
import { getAssetPath } from "../../lib/assetPath";

export default function GetStartedIntro() {
  return (
    <section className="pb-16 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* NDIF card */}
            <div className="card-glass rounded-2xl p-8 flex flex-col relative">
              <div className="absolute top-6 right-6 w-12 h-12">
                <Image
                  src={getAssetPath("/images/ndif-png.png")}
                  alt="NDIF logo"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white pr-14">
                NDIF
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                An inference service hosting large open-weight LLMs for use by
                researchers — free of charge.
              </p>
            </div>

            {/* NNsight card */}
            <div className="card-glass rounded-2xl p-8 flex flex-col relative">
              <div className="absolute top-5 right-5 w-14 h-14 overflow-hidden rounded-lg">
                <Image
                  src={getAssetPath("/images/nnsight-png.png")}
                  alt="NNsight logo"
                  width={56}
                  height={56}
                  className="object-contain w-full h-full"
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white pr-16">
                <a
                  href="https://nnsight.net/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  NNsight
                  <span className="text-xs ml-1 opacity-50">↗</span>
                </a>
              </h3>
              <p className="text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                A Python package for interpreting and manipulating internals of
                deep learning models.
              </p>
            </div>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed text-center mb-8">
            Together, NDIF and NNsight enable researchers to run complex
            experiments on huge open AI models easily, with full transparent
            access.{" "}
            <strong className="text-slate-900 dark:text-white">
              Follow the steps below to get started.
            </strong>
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
