import Link from "next/link";
import { footerNav, socialLinks } from "data/navigation";
import {
  FaGithub,
  FaXTwitter,
  FaBluesky,
  FaLinkedinIn,
  FaDiscord,
} from "react-icons/fa6";

const socialIcons = [
  { Icon: FaGithub, href: socialLinks.github, label: "GitHub" },
  { Icon: FaXTwitter, href: socialLinks.twitter, label: "Twitter / X" },
  { Icon: FaBluesky, href: socialLinks.bluesky, label: "Bluesky" },
  { Icon: FaLinkedinIn, href: socialLinks.linkedin, label: "LinkedIn" },
  { Icon: FaDiscord, href: socialLinks.discord, label: "Discord" },
];

function FooterLinkList({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <h4 className="text-slate-900 dark:text-white font-semibold text-sm uppercase tracking-wider mb-4">
        {title}
      </h4>
      <ul className="space-y-2.5 text-sm">
        {links.map((link) => {
          const className =
            "text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 transition-colors";
          return (
            <li key={link.href}>
              {link.external ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {link.label}
                </a>
              ) : (
                <Link href={link.href} className={className}>
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-black pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display font-bold text-xl text-slate-900 dark:text-white">
                NDIF
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-md mb-4">
              The National Deep Inference Fabric (NDIF) is supported by a
              generous grant from the U.S. National Science Foundation. It is
              developed by a team at Northeastern University in Boston,
              Massachusetts.
            </p>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-md mb-6">
              Computing capacity comes from{" "}
              <a
                href="https://www.ncsa.illinois.edu/research/project-highlights/delta/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 dark:text-brand-400 hover:underline"
              >
                Delta
              </a>{" "}
              at NCSA, UIUC. The NDIF community is supported in partnership
              with{" "}
              <a
                href="https://pitcases.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 dark:text-brand-400 hover:underline"
              >
                PIT-UN
              </a>
              , a consortium of 63 universities and colleges.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socialIcons.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <FooterLinkList title="Navigation" links={footerNav.navigation} />
          <FooterLinkList title="Connect" links={footerNav.connect} />
          <FooterLinkList title="Partners" links={footerNav.partners} />
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
          <p>
            &copy; {currentYear} National Deep Inference Fabric. All rights
            reserved.
          </p>
          <p className="text-xs">
            Supported by{" "}
            <a
              href="https://www.nsf.gov/awardsearch/showAward?AWD_ID=2408455"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              NSF Award #2408455
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
