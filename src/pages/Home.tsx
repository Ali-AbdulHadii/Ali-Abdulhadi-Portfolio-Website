import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { featuredProjects, projects } from '../data/projects';

const currentWorkProjects = projects.filter((p) => p.currentWork);
import { techStack } from '../data/stack';
import SectionHeader from '../components/ui/SectionHeader';
import ProjectCard from '../components/ui/ProjectCard';
import TechBadge from '../components/ui/TechBadge';
import CTASection from '../components/ui/CTASection';
import ParticleSphere from '../components/ui/ParticleSphere';
import farhoodGroupVideo from '../../Website Edited Video/Farhood-group.mp4';
import farhoodPerfumesVideo from '../../Website Edited Video/farhoodperfumes.mp4';
import farhoodRentalVideo from '../../Website Edited Video/farhoodrental.mp4';
import unicareCosmeticsVideo from '../../Website Edited Video/unicarecosmetics.mp4';

// Stats data
const stats = [
  { value: '25+', label: 'Corporate Websites' },
  { value: '7+', label: 'Years Experience' },
  { value: '6+', label: 'Companies Served' },
  { value: '2', label: 'Countries Served' },
];

// About highlights
const highlights = [
  { icon: '⬡', text: 'Full-stack development across web, mobile, and automation systems' },
  { icon: '⬡', text: 'CRM engineering with custom Odoo modules and automated lead pipelines' },
  { icon: '⬡', text: 'Digital operations management bridging engineering and business goals' },
  { icon: '⬡', text: 'Built and shipped real products for enterprises across the UAE and Turkey' },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20">
        {/* Hero-only sphere (global stars remain behind all pages) */}
        <ParticleSphere />

        {/* Grid background */}
        <div className="absolute inset-0 grid-bg" />
        {/* Subtle left-side ambient glow — keeps left column legible */}
        <div className="absolute top-1/3 left-0 w-[420px] h-[420px] bg-cyan-500/4 rounded-full blur-[110px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="space-y-8"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                <div className="glow-dot" />
                <span className="text-cyan-400 text-xs font-medium font-mono tracking-wide">
                  Available for opportunities
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                  <span className="text-slate-100">Ali Thari</span>
                  <br />
                  <span className="text-gradient-cyan">Abdulhadi</span>
                </h1>
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-cyan-500/40" />
                  <p className="text-slate-400 text-base md:text-lg font-light tracking-wide">
                    Full Stack Developer &amp; Digital Operations Manager
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-400 text-lg leading-relaxed max-w-lg">
                Versatile Full Stack Developer with hands-on experience across software engineering,
                CRM development, marketing management, and automation systems. Skilled in building
                web and mobile applications using C#, ASP.NET, Flutter, MySQL, and Supabase.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/projects"
                  className="px-7 py-3.5 bg-cyan-500 text-[#020510] font-semibold rounded-lg hover:bg-cyan-400 transition-colors duration-200 shadow-cyan-md text-sm tracking-wide"
                >
                  View My Work
                </Link>
                <Link
                  to="/contact"
                  className="px-7 py-3.5 border border-cyan-500/30 text-cyan-400 font-medium rounded-lg hover:bg-cyan-500/10 hover:border-cyan-400/50 transition-all duration-200 text-sm tracking-wide"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>

            {/* Right: Abstract panel grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="hidden lg:grid grid-cols-2 gap-4"
            >
              {/* Panel 1 */}
              <div className="col-span-2 bg-[#071428] border border-cyan-500/15 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="glow-dot" />
                  <span className="text-cyan-400 text-xs font-mono">system.status</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {['Web', 'Mobile', 'Backend', 'DevOps', 'AI', 'CRM'].map((t) => (
                    <div key={t} className="bg-[#040c1a] rounded-lg px-3 py-2 text-xs text-slate-400 font-mono border border-slate-800/60">
                      {t}
                    </div>
                  ))}
                </div>
              </div>
              {/* Panel 2 */}
              <div className="bg-[#071428] border border-cyan-500/15 rounded-xl p-5 space-y-3">
                <span className="text-xs text-slate-500 font-mono">projects.count</span>
                <div className="text-4xl font-bold text-gradient-cyan">10+</div>
                <span className="text-xs text-slate-600">Shipped products</span>
              </div>
              {/* Panel 3 */}
              <div className="bg-[#071428] border border-cyan-500/15 rounded-xl p-5 space-y-3">
                <span className="text-xs text-slate-500 font-mono">stack.size</span>
                <div className="text-4xl font-bold text-gradient-cyan">25+</div>
                <span className="text-xs text-slate-600">Technologies used</span>
              </div>
              {/* Panel 4: code fragment */}
              <div className="col-span-2 bg-[#040c1a] border border-cyan-500/10 rounded-xl p-4 font-mono text-xs space-y-1">
                <div className="text-slate-600">// core expertise</div>
                <div><span className="text-cyan-400">const</span> <span className="text-slate-300">stack</span> <span className="text-slate-500">=</span> <span className="text-slate-500">{'['}</span></div>
                <div className="pl-4 text-emerald-400">"Flutter", "ASP.NET", "PHP", "Ruby on Rails",</div>
                <div className="pl-4 text-emerald-400">"Python", "React", "Cloudflare", "C#"</div>
                <div><span className="text-slate-500">{']'}</span></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-slate-600 text-xs tracking-widest uppercase font-mono">scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-0.5 h-8 bg-gradient-to-b from-cyan-500/50 to-transparent rounded-full"
          />
        </motion.div>
      </section>

      {/* ── STATS STRIP ────────────────────────────────────────── */}
      <section className="border-y border-cyan-500/10 bg-[#040c1a]">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient-cyan mb-1">{stat.value}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORK GLIMPSE VIDEOS ─────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full">
        <SectionHeader
          label="Work Preview"
          title="A Glimpse of My Work"
          subtitle="A quick look at selected real-world projects delivered across different industries."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[farhoodGroupVideo, farhoodPerfumesVideo, farhoodRentalVideo, unicareCosmeticsVideo].map((videoSrc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="crt-tv-frame aspect-video"
            >
              <video
                src={videoSrc}
                preload="metadata"
                autoPlay
                muted
                loop
                playsInline
                className="crt-tv-video"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CURRENT WORK SPOTLIGHT ─────────────────────────────── */}
      <section className="py-24 bg-[#040c1a] border-y border-emerald-500/8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-mono tracking-widest uppercase">Live Projects</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-100 leading-tight">
                Current Work
              </h2>
              <p className="mt-3 text-slate-400 text-base max-w-xl">
                Two flagship platforms in active production, built from the ground up with custom code, enterprise-grade security, and premium design for the fragrance industry.
              </p>
            </div>
            <Link
              to="/projects"
              className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 border border-emerald-500/30 text-emerald-400 text-sm font-medium rounded-lg hover:bg-emerald-500/10 hover:border-emerald-400/50 transition-all duration-200"
            >
              View all projects
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {currentWorkProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
              >
                <Link to={`/projects/${project.slug}`} className="group block h-full">
                  <div className="h-full bg-[#071428] border border-emerald-500/15 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:border-emerald-500/35 hover:shadow-[0_0_32px_rgba(52,211,153,0.1)] hover:-translate-y-1">
                    {/* Top accent bar */}
                    <div className="h-0.5 w-full bg-gradient-to-r from-emerald-500/0 via-emerald-400/60 to-emerald-500/0" />

                    <div className="flex flex-col gap-6 p-7 flex-1">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-500/15 border border-emerald-400/40 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Current Work
                            </span>
                            <span className="text-xs font-mono text-slate-600 bg-slate-800/40 px-2 py-0.5 rounded border border-slate-700/40">
                              {project.category}
                            </span>
                          </div>
                          <h3 className="text-2xl font-bold text-slate-100 group-hover:text-emerald-300 transition-colors duration-200">
                            {project.title}
                          </h3>
                        </div>
                        <svg className="w-5 h-5 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-200 shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                      </div>

                      {/* Summary */}
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {project.summary}
                      </p>

                      {/* Key highlights — first 4 features */}
                      <ul className="space-y-2.5">
                        {project.features.slice(0, 4).map((feat, fi) => (
                          <li key={fi} className="flex items-start gap-3 text-sm">
                            <span className="text-emerald-400/60 mt-0.5 shrink-0">+</span>
                            <span className="text-slate-400">{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Stack */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {project.stack.slice(0, 6).map((tech) => (
                          <span key={tech} className="text-[11px] font-mono text-slate-500 bg-slate-800/50 border border-slate-700/40 px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                        {project.stack.length > 6 && (
                          <span className="text-[11px] font-mono text-slate-600 px-2 py-0.5">+{project.stack.length - 6} more</span>
                        )}
                      </div>

                      {/* CTA */}
                      <div className="pt-1 flex items-center gap-1.5 text-emerald-400 text-sm font-medium group-hover:gap-3 transition-all duration-200">
                        View Case Study
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ──────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full">
        <SectionHeader
          label="Selected Work"
          title="Featured Projects"
          subtitle="A selection of projects spanning enterprise platforms, mobile apps, and intelligent automation."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 border border-cyan-500/20 text-cyan-400 text-sm font-medium rounded-lg hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all duration-200"
          >
            View all projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      {/* ── ABOUT SNIPPET ──────────────────────────────────────── */}
      <section className="py-24 bg-[#040c1a] border-y border-cyan-500/8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <SectionHeader
              label="About Me"
              title="Engineer. Builder. Problem Solver."
              subtitle="I've spent years shipping real products across diverse domains, from large-scale web infrastructure to custom mobile apps and AI integrations."
            />
            <div className="space-y-4">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-4 bg-[#071428] border border-cyan-500/10 rounded-xl p-4"
                >
                  <span className="text-cyan-400/60 text-lg mt-0.5">{h.icon}</span>
                  <span className="text-slate-400 text-sm leading-relaxed">{h.text}</span>
                </motion.div>
              ))}
              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-cyan-400 text-sm font-medium hover:text-cyan-300 transition-colors duration-200"
                >
                  Learn more about me
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECH STACK ─────────────────────────────────────────── */}
      <section className="py-24 max-w-7xl mx-auto px-6 w-full">
        <SectionHeader
          label="Technology"
          title="Core Stack"
          subtitle="Technologies I work with across the full development lifecycle."
          className="mb-12"
        />
        <div className="space-y-8">
          {Array.from(new Set(techStack.map((t) => t.category))).map((cat) => (
            <div key={cat}>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-px flex-1 bg-cyan-500/10" />
                <span className="text-xs font-mono text-slate-500 tracking-widest uppercase">{cat}</span>
                <div className="h-px flex-1 bg-cyan-500/10" />
              </div>
              <div className="flex flex-wrap gap-2">
                {techStack.filter((t) => t.category === cat).map((item) => (
                  <TechBadge key={item.name} name={item.name} size="md" variant="glow" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────── */}
      <CTASection />
    </div>
  );
}