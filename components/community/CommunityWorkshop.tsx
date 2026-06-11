"use client";

import Image from "next/image";
import AnimateOnScroll from "../AnimateOnScroll";
import { getAssetPath } from "../../lib/assetPath";

export default function CommunityWorkshop() {
  return (
    <section className="py-20 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-center">
          <AnimateOnScroll className="lg:col-span-2">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Workshops & Training
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              An NDIF workshop for undergraduate and graduate students, using
              NDIF to explore state-of-the-art methods for performing
              interventions on the internal computations of large language
              models. NDIF enables students and scientists to share GPU resources
              to learn, develop, and deploy scientific methods that crack open
              the internals of large neural networks.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll className="lg:col-span-3" delay={0.15}>
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={getAssetPath("/images/ndif-workshop-1.jpg")}
                alt="NDIF workshop for students and researchers"
                width={800}
                height={450}
                className="w-full h-auto"
                priority={false}
              />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
