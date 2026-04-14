import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-cyan-500/10 bg-[#040c1a]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-8 h-8">
                <div className="w-8 h-8 border border-cyan-500/50 rounded rotate-45" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-cyan-400 font-bold text-sm font-mono">A</span>
                </div>
              </div>
              <span className="text-slate-100 font-semibold tracking-wide text-sm">
                Ali<span className="text-cyan-400">.</span>dev
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
              Full Stack Developer and Digital Operations Manager building real products across web, mobile, and automation.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-slate-300 text-xs font-semibold tracking-widest uppercase">Navigation</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'Projects', path: '/projects' },
                { label: 'About', path: '/about' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-slate-300 text-xs font-semibold tracking-widest uppercase">Contact</h4>
            <div className="space-y-2 text-sm">
              <p className="text-slate-500">
                <span className="text-slate-400">Email: </span>
                <a
                  href="mailto:ali.abdulhadii@outlook.com"
                  className="text-cyan-400/80 hover:text-cyan-400 transition-colors duration-200"
                >
                  ali.abdulhadii@outlook.com
                </a>
              </p>
              <p className="text-slate-500">
                <span className="text-slate-400">Phone: </span>
                <a href="tel:+971503135616" className="text-cyan-400/80 hover:text-cyan-400 transition-colors duration-200">
                  +971 50 313 5616
                </a>
              </p>
              <p className="text-slate-500">
                <span className="text-slate-400">Based in: </span>
                Dubai, UAE
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-cyan-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-xs">
            © {year} Ali Thari Abdulhadi. Built with React + Vite + TypeScript.
          </p>
          <div className="flex items-center gap-2">
            <div className="glow-dot" />
            <span className="text-slate-600 text-xs">Available for opportunities</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
