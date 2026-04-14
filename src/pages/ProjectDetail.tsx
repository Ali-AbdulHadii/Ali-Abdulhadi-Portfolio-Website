import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getProjectBySlug } from '../data/projects';
import TechBadge from '../components/ui/TechBadge';
import CodeBlock from '../components/ui/CodeBlock';
import DiagramContainer from '../components/ui/DiagramContainer';
import CTASection from '../components/ui/CTASection';

// Fade-in section wrapper
function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// Labelled block
function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div className="glow-dot" />
        <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase font-mono">{label}</span>
      </div>
      {children}
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <div className="min-h-screen pt-24">
      {/* Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-30" />
      <div className="fixed top-0 left-0 right-0 h-64 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 pb-0">

        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 mb-10 text-sm"
        >
          <Link to="/projects" className="text-slate-500 hover:text-cyan-400 transition-colors duration-200">
            Projects
          </Link>
          <span className="text-slate-700">/</span>
          <span className="text-slate-400">{project.title}</span>
        </motion.nav>

        {/* ── HERO ─────────────────────────────────────────── */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 space-y-6"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-2.5 py-1 rounded-md border border-slate-700/50">
              {project.category}
            </span>
            {project.featured && (
              <span className="text-[10px] font-semibold tracking-widest uppercase text-cyan-400/70 border border-cyan-500/25 px-2.5 py-1 rounded-full">
                Featured
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 leading-tight">
            {project.title}
          </h1>

          <p className="text-slate-400 text-xl leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          {/* Meta row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#071428] border border-cyan-500/10 rounded-xl p-4">
              <div className="text-xs text-slate-500 font-mono mb-1">Role</div>
              <div className="text-slate-300 text-sm font-medium">{project.role}</div>
            </div>
            <div className="bg-[#071428] border border-cyan-500/10 rounded-xl p-4">
              <div className="text-xs text-slate-500 font-mono mb-2">Stack</div>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <TechBadge key={tech} name={tech} size="sm" variant="glow" />
                ))}
              </div>
            </div>
          </div>
        </motion.header>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mb-14" />

        {/* ── PROBLEM / SOLUTION ───────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <Section>
            <Block label="The Problem">
              <div className="bg-[#071428] border border-cyan-500/10 rounded-xl p-5">
                <p className="text-slate-400 text-sm leading-relaxed">{project.problem}</p>
              </div>
            </Block>
          </Section>
          <Section>
            <Block label="The Solution">
              <div className="bg-[#071428] border border-cyan-500/10 rounded-xl p-5">
                <p className="text-slate-400 text-sm leading-relaxed">{project.solution}</p>
              </div>
            </Block>
          </Section>
        </div>

        {/* ── CORE FEATURES ────────────────────────────────── */}
        <Section className="mb-14">
          <Block label="Core Features">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="flex items-start gap-3 bg-[#071428] border border-cyan-500/8 rounded-lg p-4"
                >
                  <svg className="w-4 h-4 text-cyan-400/60 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                  <span className="text-slate-400 text-sm leading-relaxed">{feature}</span>
                </motion.div>
              ))}
            </div>
          </Block>
        </Section>

        {/* ── ARCHITECTURE DIAGRAM ─────────────────────────── */}
        {project.diagram && (
          <Section className="mb-14">
            <Block label="Architecture / Workflow">
              <DiagramContainer title={project.diagram.title} code={project.diagram.code} />
            </Block>
          </Section>
        )}

        {/* ── TECHNICAL DETAILS ────────────────────────────── */}
        <Section className="mb-14">
          <Block label="Technical Details">
            <div className="bg-[#071428] border border-cyan-500/10 rounded-xl p-6">
              <p className="text-slate-400 text-sm leading-relaxed">{project.technicalDetails}</p>
            </div>
          </Block>
        </Section>

        {/* ── CODE SNIPPET ─────────────────────────────────── */}
        {project.codeSnippet && (
          <Section className="mb-14">
            <Block label="Code Snippet">
              <CodeBlock
                code={project.codeSnippet.code}
                language={project.codeSnippet.language}
                label={project.codeSnippet.label}
              />
            </Block>
          </Section>
        )}

        {/* ── OUTCOME ──────────────────────────────────────── */}
        <Section className="mb-14">
          <Block label="Outcome & Impact">
            <div className="bg-gradient-to-br from-cyan-500/8 via-[#071428] to-[#071428] border border-cyan-500/20 rounded-xl p-6 shadow-cyan-sm">
              <p className="text-slate-300 text-base leading-relaxed">{project.outcome}</p>
            </div>
          </Block>
        </Section>

        {/* ── NAVIGATION ───────────────────────────────────── */}
        <div className="mb-0 pb-0 border-t border-cyan-500/10 pt-8">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-slate-500 hover:text-cyan-400 text-sm transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to all projects
          </Link>
        </div>
      </div>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <CTASection />
    </div>
  );
}
