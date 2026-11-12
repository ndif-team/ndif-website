"use client";

import { useState, useCallback } from "react";
import { FiChevronDown, FiExternalLink, FiMail } from "react-icons/fi";
import AnimateOnScroll from "../AnimateOnScroll";
import { openRoles, CAREERS_EMAIL, type JobRole } from "data/jobs";

const OTHER_ROLES =
  "We anticipate hiring for the following roles in the future: Student research assistants and Student co-ops. We also welcome research collaborators and unpaid open-source contributors; for open-source community opportunities, get in touch through our community Discord.";

function Accordion({
  title,
  subtitle,
  isOpen,
  onToggle,
  children,
}: {
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700/50">
      <h3>
        <button
          onClick={onToggle}
          className="flex items-center justify-between w-full py-5 text-left group"
          aria-expanded={isOpen}
        >
          <span className="pr-4">
            <span className="block font-semibold text-slate-900 dark:text-white text-base">
              {title}
            </span>
            {subtitle && (
              <span className="block text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                {subtitle}
              </span>
            )}
          </span>
          <FiChevronDown
            size={20}
            className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>
      {/* grid-rows 0fr->1fr animates to the content's real height, so long
          postings are never clipped the way a fixed max-height would.
          `invisible` keeps a collapsed posting out of the tab order and the
          accessibility tree; visibility animates discretely, so it still flips
          to visible at the start of the expand and to hidden at the end of the
          collapse. */}
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 pb-6"
            : "grid-rows-[0fr] opacity-0 invisible"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

function RoleBody({ role }: { role: JobRole }) {
  return (
    <div className="pr-0 sm:pr-8">
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5">
        {role.summary}
      </p>

      <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
        What you will do
      </h4>
      <ul className="list-disc pl-5 mb-5 space-y-1.5 text-slate-600 dark:text-slate-400 leading-relaxed">
        {role.responsibilities.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-2">
        What we are looking for
      </h4>
      <ul className="list-disc pl-5 mb-6 space-y-1.5 text-slate-600 dark:text-slate-400 leading-relaxed">
        {role.qualifications.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {role.applyUrl ? (
        <a
          href={role.applyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-slate-900 dark:bg-white/10 border border-slate-700 dark:border-slate-600 hover:border-brand-500 text-sm font-medium text-white transition-all hover:bg-slate-800 dark:hover:bg-white/20"
        >
          Apply for this role
          <FiExternalLink size={14} aria-hidden="true" />
        </a>
      ) : (
        <a
          href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
            `Application: ${role.title}`
          )}`}
          className="inline-flex items-center gap-1.5 text-brand-600 dark:text-brand-400 font-semibold text-sm hover:underline underline-offset-4"
        >
          <FiMail size={14} aria-hidden="true" />
          Express interest by email
        </a>
      )}
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
            We are hiring across science, engineering, communication, and
            operations. All positions are at Northeastern University&apos;s
            Khoury College of Computer Sciences and support NDIF, an NSF-funded
            open research platform for AI.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div role="region" aria-label="Jobs and community opportunities">
            {openRoles.map((role, i) => (
              <Accordion
                key={role.title}
                title={role.title}
                subtitle={role.reportsTo ? `Reports to ${role.reportsTo}` : undefined}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              >
                <RoleBody role={role} />
              </Accordion>
            ))}

            <Accordion
              title="Other roles"
              isOpen={openIndex === openRoles.length}
              onToggle={() => toggle(openRoles.length)}
            >
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed pr-0 sm:pr-8">
                {OTHER_ROLES}
              </p>
            </Accordion>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
