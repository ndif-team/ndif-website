export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export const mainNav: NavLink[] = [
  { label: "The Fabric", href: "/fabric" },
  { label: "About", href: "/about" },
  { label: "Research", href: "/research" },
  { label: "Community", href: "/community" },
  { label: "Status", href: "/status" },
  { label: "NNsight", href: "https://nnsight.net", external: true },
];

export const ctaNav: NavLink = {
  label: "Get Started",
  href: "/get-started",
};

export const footerNav = {
  navigation: [
    { label: "Home", href: "/" },
    { label: "The Fabric", href: "/fabric" },
    { label: "About", href: "/about" },
    { label: "Research", href: "/research" },
    { label: "Community", href: "/community" },
    { label: "Status", href: "/status" },
    { label: "Get Started", href: "/get-started" },
  ] as NavLink[],
  connect: [
    { label: "Discord", href: "https://discord.com/invite/6uFJmCSwW7", external: true },
    { label: "GitHub", href: "https://github.com/ndif-team", external: true },
    { label: "Twitter / X", href: "https://x.com/ndif_team", external: true },
    { label: "Bluesky", href: "https://bsky.app/profile/ndif-team.bsky.social", external: true },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/national-deep-inference-fabric", external: true },
  ] as NavLink[],
  partners: [
    { label: "NSF Project Page", href: "https://www.nsf.gov/awardsearch/showAward?AWD_ID=2408455", external: true },
    { label: "Northeastern University", href: "https://www.northeastern.edu/", external: true },
    { label: "NCSA Delta", href: "https://www.ncsa.illinois.edu/research/project-highlights/delta/", external: true },
    { label: "PIT-UN", href: "https://pitcases.org/", external: true },
  ] as NavLink[],
};

export const socialLinks = {
  github: "https://github.com/ndif-team",
  twitter: "https://x.com/ndif_team",
  bluesky: "https://bsky.app/profile/ndif-team.bsky.social",
  linkedin: "https://www.linkedin.com/company/national-deep-inference-fabric",
  discord: "https://discord.com/invite/6uFJmCSwW7",
  email: "info@ndif.us",
};
