export interface Partner {
  name: string;
  shortName: string;
  logo: string;
  url: string;
  description: string;
}

export const partners: Partner[] = [
  {
    name: "National Center for Supercomputing Applications",
    shortName: "NCSA",
    logo: "/images/ncsa.png",
    url: "https://www.ncsa.illinois.edu/research/project-highlights/delta/",
    description:
      "NCSA at the University of Illinois Urbana-Champaign operates the largest GPU computing resource in the NSF HPC portfolio. NDIF's computing capacity is provided by the Delta cluster.",
  },
  {
    name: "Public Interest Technology University Network (New Venture Fund)",
    shortName: "PIT-UN",
    logo: "/images/New_Venture_Fund.png",
    url: "https://pitcases.org/",
    description:
      "A consortium of 63 universities and colleges that study and apply technology expertise to advance the public interest. PIT-UN works with NDIF to build and support a broad community of users across geographies, institutions, and fields of study.",
  },
];

export interface Supporter {
  name: string;
  logo: string;
  url: string;
}

export const supporters: Supporter[] = [
  {
    name: "National Science Foundation",
    logo: "/images/nsf.png",
    url: "https://www.nsf.gov/awardsearch/showAward?AWD_ID=2408455",
  },
  {
    name: "NAIRR",
    logo: "/images/nairr-pilot-logo.svg",
    url: "https://nairrpilot.org/",
  },
  {
    name: "Northeastern University",
    logo: "/images/northeastern-red-square.png",
    url: "https://www.northeastern.edu/",
  },
  {
    name: "NCSA",
    logo: "/images/ncsa.png",
    url: "https://www.ncsa.illinois.edu/",
  },
  {
    name: "PIT-UN",
    logo: "/images/pitun.png",
    url: "https://pitcases.org/",
  },
];
