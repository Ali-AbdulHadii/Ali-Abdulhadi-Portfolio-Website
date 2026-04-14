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
  const isVideoCover =
    !!project.coverImage && /\.(mp4|webm|ogg)(\?.*)?$/i.test(project.coverImage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Link to={`/projects/${project.slug}`} className="group block h-full">
        <div className="h-full bg-[#071428] border border-cyan-500/10 rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_24px_rgba(6,182,212,0.1)] hover:-translate-y-1">

          {/* Cover image — only shown if the project has one */}
          {project.coverImage && (
            <div className="relative w-full h-44 overflow-hidden bg-[#040c1a] border-b border-cyan-500/10">
              {isVideoCover ? (
                <video
                  src={project.coverImage}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              ) : (
                <img
                  src={project.coverImage}
                  alt={`${project.title} preview`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              )}
              {/* Subtle overlay so the image doesn't overpower */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#071428]/70 via-transparent to-transparent" />
            </div>
          )}

          <div className="flex flex-col gap-5 p-6 flex-1">
            {/* Header row */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-cyan-400/60 text-lg">{categorySymbols[project.category] || '◇'}</span>
                <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-md border border-slate-700/50">
                  {project.category}
                </span>
              </div>
              {project.currentWork ? (
                <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-400/50 px-2 py-0.5 rounded-full shadow-[0_0_14px_rgba(52,211,153,0.35)] flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Current Work
                </span>
              ) : project.listTag ? (
                <span className="text-[10px] font-semibold text-cyan-200 bg-cyan-500/15 border border-cyan-400/60 px-2 py-0.5 rounded-full shadow-[0_0_14px_rgba(34,211,238,0.35)]">
                  {project.listTag}
                </span>
              ) : (
                project.featured && (
                  <span className="text-[10px] font-semibold tracking-widest uppercase text-cyan-200 bg-cyan-500/15 border border-cyan-400/60 px-2 py-0.5 rounded-full shadow-[0_0_14px_rgba(34,211,238,0.35)]">
                    Featured
                  </span>
                )
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
                <TechBadge key={tech} name={tech} size="sm" variant="glow" />
              ))}
              {project.stack.length > 4 && (
                <span className="text-[11px] font-mono text-slate-600 px-2 py-0.5">
                  +{project.stack.length - 4}
                </span>
              )}
            </div>

            {/* Arrow */}
            <div className="flex items-center gap-1.5 text-slate-600 text-xs group-hover:text-cyan-400 transition-colors duration-200 font-mono mt-auto">
              View case study
              <svg className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}