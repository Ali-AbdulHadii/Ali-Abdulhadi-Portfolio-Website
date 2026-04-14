import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { type Project } from '../../data/projects';
import TechBadge from './TechBadge';

// Category to accent symbol mapping
const categorySymbols: Record<string, string> = {
  'Business Websites': '◈',
  'Internal Tools & Automation': '⚙',
  'E-Commerce & Billing': '◎',
  'Mobile & Real-Time Apps': '◐',
  'Data & AI Products': '◆',
};

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link
        to={`/projects/${project.slug}`}
        className="group block h-full"
      >
        <div className="h-full bg-[#071428] border border-cyan-500/10 rounded-xl p-6 flex flex-col gap-5 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_24px_rgba(6,182,212,0.1)] hover:-translate-y-1">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="text-cyan-400/60 text-lg">{categorySymbols[project.category] || '◇'}</span>
              <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-md border border-slate-700/50">
                {project.category}
              </span>
            </div>
            {project.featured && (
              <span className="text-[10px] font-semibold tracking-widest uppercase text-cyan-400/60 border border-cyan-500/20 px-2 py-0.5 rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Title & summary */}
          <div className="flex-1 space-y-2">
            <h3 className="text-slate-100 font-semibold text-lg leading-snug group-hover:text-cyan-400 transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
              {project.summary}
            </p>
          </div>

          {/* Stack badges */}
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 4).map((tech) => (
              <TechBadge key={tech} name={tech} size="sm" />
            ))}
            {project.stack.length > 4 && (
              <span className="px-2 py-0.5 text-xs text-slate-500 font-mono">
                +{project.stack.length - 4}
              </span>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-cyan-500/8">
            <span className="text-slate-600 text-xs font-mono">{project.role}</span>
            <span className="text-cyan-400 text-xs font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-200">
              View case study
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
