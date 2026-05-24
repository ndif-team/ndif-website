"use client";

import { useState } from "react";
import Image from "next/image";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import { team } from "data/team";
import { FiExternalLink, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { getAssetPath } from "../lib/assetPath";

function TeamCard({ member }: { member: (typeof team)[number] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/50 overflow-hidden hover:border-brand-400 dark:hover:border-brand-500/50 transition-all hover:shadow-lg group">
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={getAssetPath(member.image)}
          alt={member.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
        />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white">{member.name}</h3>
            <p className="text-sm text-brand-600 dark:text-brand-400 font-medium">
              {member.role}
            </p>
          </div>
          {member.url && (
            <a
              href={member.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors flex-shrink-0"
              aria-label={`Visit ${member.name}'s page`}
            >
              <FiExternalLink size={16} />
            </a>
          )}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          {expanded ? "Show less" : "Read bio"}
          {expanded ? <FiChevronUp size={14} /> : <FiChevronDown size={14} />}
        </button>

        {expanded && (
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed animate-fade-in">
            {member.bio}
          </p>
        )}
      </div>
    </div>
  );
}

export default function TeamGrid() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimateOnScroll className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
            Our Team
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-500 to-accent-500 mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            NDIF is developed by a team at Northeastern University&apos;s Khoury School
            of Computer Sciences.
          </p>
        </AnimateOnScroll>

        <StaggerContainer
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          staggerDelay={0.06}
        >
          {team.map((member) => (
            <StaggerItem key={member.name}>
              <TeamCard member={member} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
