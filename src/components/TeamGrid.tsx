"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import { team } from "data/team";
import { FiExternalLink, FiX } from "react-icons/fi";
import { getAssetPath } from "../lib/assetPath";

function TeamCard({ member }: { member: (typeof team)[number] }) {
  const [open, setOpen] = useState(false);

  // Escape to close + lock background scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="w-full max-w-[240px] mx-auto rounded-2xl surface-glass border border-slate-200 dark:border-slate-700/50 overflow-hidden hover:border-brand-400 dark:hover:border-brand-500/50 transition-all hover:shadow-lg group">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-inset"
          aria-label={`Read ${member.name}'s bio`}
        >
          <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-800">
            <Image
              src={getAssetPath(member.image)}
              alt={member.name}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
              sizes="160px"
            />
          </div>
        </button>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">{member.name}</h3>
              <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">
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
            onClick={() => setOpen(true)}
            className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Read bio <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label={`${member.name} — ${member.role}`}
          >
            <div
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
              onClick={() => setOpen(false)}
            />
            <div className="relative z-10 w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-2xl bg-white dark:bg-surface-900 border border-slate-200 dark:border-slate-700 shadow-2xl animate-slide-up">
              <button
                onClick={() => setOpen(false)}
                autoFocus
                className="absolute right-3 top-3 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close"
              >
                <FiX size={18} />
              </button>
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-5 mb-5">
                  <div className="relative w-24 aspect-[4/5] shrink-0 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <Image
                      src={getAssetPath(member.image)}
                      alt={member.name}
                      fill
                      className="object-cover object-center"
                      sizes="96px"
                    />
                  </div>
                  <div className="min-w-0 pr-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-sm text-brand-600 dark:text-brand-400 font-medium mb-2">
                      {member.role}
                    </p>
                    {member.url && (
                      <a
                        href={member.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      >
                        Visit page <FiExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
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
          <div className="w-24 h-1 bg-gradient-brand mx-auto rounded-full mb-6" />
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400">
            NDIF is developed by a team at Northeastern University&apos;s Khoury School
            of Computer Sciences, with contributors from all over the world.
          </p>
        </AnimateOnScroll>

        <StaggerContainer
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
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
