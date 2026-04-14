import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryLabel?: string;
  primaryTo?: string;
  secondaryLabel?: string;
  secondaryTo?: string;
}

export default function CTASection({
  title = "Let's build something together",
  subtitle = "I'm open to new opportunities, collaborations, and interesting engineering challenges.",
  primaryLabel = 'Get in Touch',
  primaryTo = '/contact',
  secondaryLabel = 'View Projects',
  secondaryTo = '/projects',
}: CTASectionProps) {
  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="glow-dot" />
            <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase font-mono">
              Available for Work
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-100 leading-tight">
            {title}
          </h2>
          <p className="text-slate-400 text-lg">{subtitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to={primaryTo}
              className="px-8 py-3.5 bg-cyan-500 text-navy-950 font-semibold rounded-lg hover:bg-cyan-400 transition-colors duration-200 shadow-cyan-md text-sm tracking-wide"
            >
              {primaryLabel}
            </Link>
            <Link
              to={secondaryTo}
              className="px-8 py-3.5 border border-cyan-500/30 text-cyan-400 font-medium rounded-lg hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-200 text-sm tracking-wide"
            >
              {secondaryLabel}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
