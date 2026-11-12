/**
 * Open roles, rendered by components/community/CommunityJobs.tsx.
 *
 * Content is condensed from the approved Northeastern job descriptions. Two of
 * the five (Lab Manager, Site Reliability Engineer) are existing positions whose
 * descriptions predate the current template and state no reporting line, so
 * `reportsTo` is omitted for those rather than inferred from the org chart.
 *
 * Each role's `applyUrl` is its Google Form. A role without one falls back to
 * the careers email, so new roles can go up before their form exists.
 */

export interface JobRole {
  title: string;
  /** Omitted when the approved description does not state one. */
  reportsTo?: string;
  summary: string;
  responsibilities: string[];
  qualifications: string[];
  /** Application form. Falls back to CAREERS_EMAIL when absent. */
  applyUrl?: string;
}

export const CAREERS_EMAIL = "info@ndif.us";

export const openRoles: JobRole[] = [
  {
    title: "Scientific Engagement Lead",
    reportsTo: "Scientific Program Director",
    summary:
      "Builds and sustains the scientific community around the study of large-scale AI model internals, and owns the process by which researchers gain access to — and succeed on — NDIF's shared research infrastructure. This is a scientific position requiring independent judgment: evaluating research proposals on their merits, identifying early-stage work worth investing in, and engaging as a peer with researchers doing technical interpretability work.",
    responsibilities: [
      "Design and deliver the platform's workshop, hackathon, and competition programming, including hands-on NNsight instruction",
      "Create and manage the scientific review and allocation process governing how shared compute is awarded",
      "Identify, recruit, and cultivate the research groups whose work the platform should support",
      "Direct the platform's annual scientific impact record and represent NDIF at conferences and workshops",
      "Supervise the Research Advocate and Scientific Communicator and the Outreach Coordinator",
    ],
    qualifications: [
      "A record of peer-reviewed publication in machine learning, computer science, neuroscience, or a related field",
      "Ability to read, evaluate, and explain research on large-scale AI models and engage credibly as a peer with PhD-level researchers",
      "Experience designing and delivering technical programming, including running hands-on sessions and supporting participants' code",
      "Experience with scientific review or resource-allocation processes",
      "Exceptional written and visual science communication, with a portfolio for both expert and non-expert audiences",
      "PhD and familiarity with mechanistic interpretability preferred",
    ],
    applyUrl: "https://forms.gle/oHFoCzQXAxKghFoZA",
  },
  {
    title: "Research Software Engineer II",
    reportsTo: "Chief Engineer",
    summary:
      "Leads the design and delivery of major software platforms supporting open-source machine learning interpretability research. Beyond NDIF's internal systems, this role is the responsible technical lead for several cross-institution research platforms, coordinating design, integration, release, and support across partner universities, an open-source contributor community, and a nonprofit research organization.",
    responsibilities: [
      "Serve as technical lead for cross-institution platforms including the Mechanistic Interpretability Benchmark, NNterp, Causal Lab, and the Neuronpedia research backend",
      "Lead design and development of NDIF's internal software, including the interactive Workbench tools and their backend services",
      "Develop and maintain full-stack applications, distributed services, APIs, and the CI/CD and monitoring around them",
      "Work directly with researchers at NDIF and partner institutions to translate research needs into software",
      "Provide technical direction and mentorship to junior engineers, interns, and external contributors",
    ],
    qualifications: [
      "Bachelor's degree or higher in computer science, AI, software engineering, or a related field, or equivalent experience",
      "Three or more years of professional software engineering experience, including technical ownership of production systems",
      "Strong skills in Python, PyTorch, and Linux-based development environments",
      "Experience designing complex software systems and full-stack web applications",
      "Knowledge of machine learning methods, including transformer language models",
      "Demonstrated experience leading multi-organization, open-source, or externally facing projects",
    ],
    applyUrl: "https://forms.gle/P2wt7h1XADqkyHzM6",
  },
  {
    title: "Research Advocate and Scientific Communicator",
    reportsTo: "Scientific Engagement Lead",
    summary:
      "Owns the external communication of research conducted on NDIF — research summaries and project pages, the blog and social channels, and the video channel — working directly with the research teams using the facility. This role requires enough machine learning literacy to read an interpretability paper, summarize it accurately, and correspond with its authors as a peer; a generalist communications background is not sufficient for this scope.",
    responsibilities: [
      "Write and publish research summaries, project pages, and long-form explanations of work conducted on the platform",
      "Work directly with research groups to identify work worth featuring and review drafts with authors before publication",
      "Produce and direct the platform's video channel, and commission and direct video, design, and web production contractors",
      "Own the public-facing website's research content and produce conference and outreach materials",
      "Track reach and engagement across channels, and refine editorial strategy accordingly",
    ],
    qualifications: [
      "Bachelor's degree or higher in a technical or scientific field, in science writing, or equivalent professional experience",
      "Technical research experience, with strong familiarity with machine learning",
      "A portfolio of published technical writing for both expert and non-expert audiences",
      "Three or more years of relevant professional experience, such as technical science writing or developer relations",
      "Experience producing and publishing across web, long-form written content, social media, and video",
      "Familiarity with mechanistic interpretability and experience directing creative contractors preferred",
    ],
    applyUrl: "https://forms.gle/txnSFCPPqpFbezRc9",
  },
  {
    title: "Site Reliability Engineer",
    summary:
      "Advances the reliability and coordinates the day-to-day operations of NDIF's growing research platform: keeping distributed services healthy and available, making clusters easier to debug and operate, and building tooling that lets the platform scale as demand grows. A hands-on role with significant latitude to assess complex problems, set priorities, and deliver with minimal oversight. A research background is not required.",
    responsibilities: [
      "Measure and improve the reliability, availability, and performance of the platform used by research teams",
      "Build and maintain observability systems so issues are detected early and debugging is proactive",
      "Improve operational tooling and automation, including CI/CD, automated testing, and infrastructure as code",
      "Create workflows for debugging across the distributed stack, including Ray connectivity, GPU and resource allocation, and scheduling",
      "Establish and advocate for operational best practices as the platform grows",
    ],
    qualifications: [
      "Bachelor's degree in computer science, engineering, or a related field, or equivalent practical experience",
      "At least one year of experience in site reliability engineering or a closely related role",
      "Experience operating distributed systems in production, owning complex systems end to end",
      "Strong Python skills and comfort working with backend services",
      "Experience with observability tooling such as Prometheus and Grafana, and with CI/CD, automated testing, and infrastructure as code",
      "Genuine interest in AI safety, interpretability, and supporting interdisciplinary research; knowledge of MLOps preferred",
    ],
    applyUrl: "https://forms.gle/mLYNH6Xh3AwDoKmg6",
  },
  {
    title: "Lab Manager",
    summary:
      "Keeps the operations of David Bau's fast-moving interpretability research lab at Northeastern University's Khoury College of Computer Sciences running smoothly while supporting NDIF. A generalist operations role at the intersection of academic research and large-scale infrastructure, spanning budgets and reimbursements, workshop planning, hiring coordination, and grant proposal support.",
    responsibilities: [
      "Manage budgets across multiple grants, process purchasing and reimbursements, and maintain organized spending records",
      "Plan and execute events end to end, including the New England Mechanistic Interpretability (NEMI) Workshop — venues, travel, catering, and on-site logistics",
      "Coordinate recruitment for staff, students, and research roles in partnership with Northeastern Human Resources",
      "Manage the grant proposal process, tracking deadlines and coordinating with collaborators and research administrators",
    ],
    qualifications: [
      "Bachelor's degree or equivalent practical experience",
      "Experience in research administration, operations, event planning, or office management",
      "Comfort working with budgets, purchasing, and basic financial tracking",
      "Strong organizational and project management skills, with the ability to manage multiple priorities at once",
      "Ability to work independently, take ownership, and follow through with minimal oversight",
    ],
    applyUrl: "https://forms.gle/dneHwCDhRgsKUCKa7",
  },
];
