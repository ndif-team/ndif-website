"use client";

import { useState } from "react";
import Image from "next/image";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import { advisoryBoard } from "data/advisory-board";
import { FiExternalLink, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { getAssetPath } from "../lib/assetPath";

function AdvisoryCard({ member }: { member: (typeof advisoryBoard)[number] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex gap-4 p-5 rounded-xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 hover:border-brand-400 dark:hover:border-brand-500/50 transition-all hover:shadow-md">
      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 flex-shrink-0">
        <Image
          src={getAssetPath(member.image)}
          alt={member.name}
          fill
          className="object-cover"
          sizes="64px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
              {member.name}
            </h3>
            <p className="text-xs text-brand-600 dark:text-brand-400 font-medium mt-0.5">
              {member.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {member.institution}
            </p>
          </div>
          <a
            href={member.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 rounded text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex-shrink-0"
            aria-label={`Visit ${member.name}'s page`}
          >
            <FiExternalLink size={14} />
          </a>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          {expanded ? "Less" : "Bio"}
          {expanded ? <FiChevronUp size={12} /> : <FiChevronDown size={12} />}
        </button>

        {expanded && (
          <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed animate-fade-in">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
}

export default function AdvisoryBoardGrid() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            External Advisory Board
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            The ESAB 2025 advises NDIF on strategic direction, community needs,
            and impact across disciplines.
          </p>
        </AnimateOnScroll>

        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          staggerDelay={0.05}
        >
          {advisoryBoard.map((member) => (
            <StaggerItem key={member.name}>
              <AdvisoryCard member={member} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
