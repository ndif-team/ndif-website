import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-black pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <span className="font-display font-bold text-xl text-slate-900 dark:text-white">
                NDIF
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-500 max-w-sm">
              The National Deep Inference Fabric (NDIF) is supported by a generous grant from the U.S. National Science Foundation. It is developed by a team at Northeastern University in Boston, Massachusetts, building upon many scientific contributions and collaborations from around the country and worldwide.
            </p>

            <p className="text-slate-500 dark:text-slate-500 max-w-sm">
              The computing capacity behind NDIF comes from Delta, an NSF computing infrastructure project developed by NCSA at the University of Illinois Urbana-Champaign. The community of NDIF users is being developed and supported in partnership with the Public Interest Technology University Network, a consortium of 63 universities and colleges.
            </p>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#mission"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Mission
                </Link>
              </li>
              <li>
                <Link
                  href="#research"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Team
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 dark:text-white font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Twitter / X
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  NSF Project Page
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600">
          <p>&copy; 2023 National Deep Inference Fabric. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-slate-400">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-slate-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
