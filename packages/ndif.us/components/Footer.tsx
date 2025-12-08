import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-black pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-brand-500 to-accent-600 flex items-center justify-center">
                <span className="font-bold text-white text-xs">N</span>
              </div>
              <span className="font-display font-bold text-xl text-white">
                NDIF
              </span>
            </div>
            <p className="text-slate-500 max-w-sm">
              The National Deep Inference Fabric is supported by the National
              Science Foundation. Enabling the next generation of AI
              interpretability research.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#mission"
                  className="hover:text-brand-400 transition-colors"
                >
                  Mission
                </Link>
              </li>
              <li>
                <Link
                  href="#research"
                  className="hover:text-brand-400 transition-colors"
                >
                  Research
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-400 transition-colors"
                >
                  Team
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Connect</h4>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-400 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-400 transition-colors"
                >
                  Twitter / X
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-400 transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-brand-400 transition-colors"
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
