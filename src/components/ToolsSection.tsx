"use client";

import Link from "next/link";
import AnimateOnScroll, { StaggerContainer, StaggerItem } from "./AnimateOnScroll";
import {
  FiArrowRight,
  FiExternalLink,
  FiGithub,
  FiBookOpen,
  FiZap,
  FiBarChart2,
} from "react-icons/fi";
import type { IconType } from "react-icons";

// Logos are hotlinked from the public ndif-team/design-assets repo via the
// jsDelivr CDN (serves SVG with the correct content-type, cached), so the
// site never carries its own copies.
const LOGO = "https://cdn.jsdelivr.net/gh/ndif-team/design-assets@main";

interface ToolLink {
  label: string;
  href: string;
  external: boolean;
  icon: IconType;
  primary?: boolean;
}

interface Tool {
  name: string;
  tagline: string;
  description: string;
  logo?: string;
  // Trim the tile padding for logos that carry their own internal whitespace.
  tightLogo?: boolean;
  // Fallback mark when a project has no logo yet.
  icon?: IconType;
  install?: string;
  links: ToolLink[];
}

const coreTools: Tool[] = [
  {
    name: "NDIF Server",
    tagline: "Remote white-box inference",
    description:
      "Free remote access to run interventions on the frontier open models. Register and run reproducible experiments with no local hardware required.",
    logo: `${LOGO}/brand/logos/ndif-logo-color.svg`,
    links: [
      { label: "View on GitHub", href: "https://github.com/ndif-team/ndif", external: true, icon: FiGithub },
      { label: "Get access", href: "/get-started", external: false, icon: FiArrowRight, primary: true },
    ],
  },
  {
    name: "NNsight",
    tagline: "Model introspection library",
    description:
      "Write intervention code once to inspect, modify, and customize any Pytorch model's internal computations — locally or on NDIF.",
    logo: `${LOGO}/projects/nnsight/nnsight-logo-color.svg`,
    install: "pip install nnsight",
    links: [
      { label: "Documentation", href: "https://nnsight.net", external: true, icon: FiBookOpen, primary: true },
      { label: "View on GitHub", href: "https://github.com/ndif-team/nnsight", external: true, icon: FiGithub },
    ],
  },
  {
    name: "NNterp",
    tagline: "Standardized transformer interface",
    description:
      "A unified interface for mechanistic interpretability, extending NNsight with efficient built-in methods and standardized naming.",
    logo: `${LOGO}/projects/nnterp/nnterp-logo-color.svg`,
    install: "pip install nnterp",
    links: [
      { label: "Documentation", href: "https://ndif-team.github.io/nnterp/", external: true, icon: FiBookOpen, primary: true },
      { label: "View on GitHub", href: "https://github.com/ndif-team/nnterp", external: true, icon: FiGithub },
    ],
  },
  {
    name: "NDIF Workbench",
    tagline: "Interactive research UI",
    description:
      "Explore prompts and steer model behavior in our web interface for interactive interpretability backed by NDIF remote execution.",
    logo: `${LOGO}/projects/workbench/workbench-logo-color.svg`,
    links: [
      { label: "View on GitHub", href: "https://github.com/ndif-team/workbench", external: true, icon: FiGithub },
      { label: "Open NDIF Workbench", href: "https://workbench.ndif.us", external: true, icon: FiExternalLink, primary: true },
    ],
  },
  // {
  //   name: "INIF",
  //   tagline: "Interpretability interchange format",
  //   description:
  //     "A JSON format for tokenized LLM traces with token annotations — the interchange layer between generation, evaluation, and interpretability tools.",
  //   logo: `${LOGO}/projects/inif/inif-logo-color.svg`,
  //   install: "pip install inif",
  //   links: [
  //     { label: "View on GitHub", href: "https://github.com/ndif-team/inif", external: true, icon: FiGithub, primary: true },
  //   ],
  // },
];

// Experimental / supporting tools. Not part of the core stack yet.
const otherProjects: Tool[] = [
  {
    name: "NDIF Skills",
    tagline: "Agent skills for the NDIF ecosystem",
    description:
      "Ready-to-use skills that teach AI assistants core interpretability techniques and efficient implementation strategies.",
    icon: FiZap,
    links: [
      { label: "View on GitHub", href: "https://github.com/ndif-team/skills", external: true, icon: FiGithub, primary: true },
    ],
  },
  {
    name: "Aletheia's Quest",
    tagline: "Deception detection competition",
    description:
      "Build a deception detector with NNsight and run it remotely on NDIF to climb our live leaderboard.",
    logo: "https://github.com/ndif-team/Aletheias-Quest-Competition/raw/master/assets/aletheia-logo.png",
    tightLogo: true,
    links: [
      { label: "Materials", href: "https://github.com/ndif-team/Aletheias-Quest-Competition", external: true, icon: FiGithub },
      { label: "Open website", href: "https://aletheias-quest.github.io/", external: true, icon: FiExternalLink },
      { label: "Leaderboard", href: "https://huggingface.co/spaces/NDIF/aletheias-leaderboard", external: true, icon: FiBarChart2, primary: true },
    ],
  },
  // {
  //   name: "NNbench",
  //   tagline: "Backend coverage & performance benchmark",
  //   description:
  //     "A performance and coverage benchmark measuring where NNsight interventions run correctly and fast across HuggingFace and vLLM backends.",
  //   logo: `${LOGO}/projects/nnbench/nnbench-logo-color.svg`,
  //   links: [
  //     { label: "View on GitHub", href: "https://github.com/ndif-team/nnbench", external: true, icon: FiGithub, primary: true },
  //   ],
  // },
];

function ToolLinkButton({ link }: { link: ToolLink }) {
  const Icon = link.icon;
  const base =
    "inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all";
  const style = link.primary
    ? "bg-brand-600 hover:bg-brand-700 text-white hover:-translate-y-0.5 hover:shadow-md"
    : "border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-brand-500 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-900/20";
  const className = `${base} ${style}`;

  const content = (
    <>
      <Icon size={14} />
      {link.label}
    </>
  );

  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <Link href={link.href} className={className}>
      {content}
    </Link>
  );
}

function ToolCard({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <div className="group flex flex-col h-full p-8 rounded-2xl surface-glass border border-slate-200 dark:border-slate-700/50 hover:border-brand-400 dark:hover:border-brand-500/50 transition-all hover:shadow-lg">
      <div className="flex items-center gap-4 mb-5">
        <div
          className={`w-16 h-16 rounded-xl bg-white ring-1 ring-slate-200 dark:ring-white/10 flex items-center justify-center shrink-0 ${
            tool.tightLogo ? "p-0" : "p-1.5"
          }`}
        >
          {tool.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={tool.logo}
              alt={`${tool.name} logo`}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
            />
          ) : Icon ? (
            <Icon className="text-brand-600" size={30} aria-hidden="true" />
          ) : null}
        </div>
        <div className="min-w-0">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {tool.name}
          </h2>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {tool.tagline}
          </p>
        </div>
      </div>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-5 flex-1">
        {tool.description}
      </p>
      {tool.install && (
        <code className="block w-full font-mono text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-lg px-4 py-2.5 mb-5">
          <span className="text-slate-400 dark:text-slate-500 select-none">$ </span>
          {tool.install}
        </code>
      )}
      <div className="flex flex-wrap gap-2.5">
        {/* Primary (turquoise) link always renders first; stable otherwise. */}
        {[...tool.links]
          .sort((a, b) => Number(!!b.primary) - Number(!!a.primary))
          .map((link) => (
            <ToolLinkButton key={link.label} link={link} />
          ))}
      </div>
    </div>
  );
}

export default function ToolsSection() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 lg:pt-36 lg:pb-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <AnimateOnScroll>
              <div className="mb-6">
                <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-slate-900 dark:text-white">
                  The NDIF <span className="text-gradient">Ecosystem</span>
                </h1>
                <div className="w-24 h-1 bg-gradient-brand mx-auto rounded-full" />
              </div>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <div className="relative max-w-3xl mx-auto">
                <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm rounded-2xl -mx-4 -my-2 border border-white/20 dark:border-slate-800/20" />
                <p className="relative z-10 text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed px-2 py-2">
                  A open-source tools ecosystem for transparent and reproducible experimentation on
                  model internals.
                </p>
              </div>
            </AnimateOnScroll>
          </div>
        </div>
      </section>

      {/* Tool grid */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Core Tools */}
          <div>
            <AnimateOnScroll>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-slate-900 dark:text-white">
                Core Tools
              </h2>
            </AnimateOnScroll>
            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              staggerDelay={0.1}
            >
              {coreTools.map((tool) => (
                <StaggerItem key={tool.name}>
                  <ToolCard tool={tool} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Other Projects */}
          <div>
            <AnimateOnScroll>
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-2 text-slate-900 dark:text-white">
                Other Projects
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Experimental and supporting tools in the ecosystem.
              </p>
            </AnimateOnScroll>
            <StaggerContainer
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              staggerDelay={0.1}
            >
              {otherProjects.map((tool) => (
                <StaggerItem key={tool.name}>
                  <ToolCard tool={tool} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </>
  );
}
