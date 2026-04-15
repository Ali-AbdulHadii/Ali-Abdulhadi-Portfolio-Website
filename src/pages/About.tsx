import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { techStack, stackCategories } from '../data/stack';
import SectionHeader from '../components/ui/SectionHeader';
import TechBadge from '../components/ui/TechBadge';
import CTASection from '../components/ui/CTASection';

const timeline = [
  {
    period: 'Dec 2024 - Jan 2026',
    role: 'Full Stack Developer & Digital Operations Manager',
    org: 'Farhood Group, Dubai, UAE',
    description:
      'Led digital transformation across multiple departments by integrating automation, marketing, and CRM systems. Developed 10 full corporate websites with custom design from scratch. Built custom Odoo CRM modules for sales and production management. Improved operational efficiency by 15% and reduced production costs by 10% through automation and process redesign.',
  },
  {
    period: 'Jun 2024 - Oct 2024',
    role: 'Full Stack Developer / Marketing Executive (Freelance)',
    org: 'Anwar Makaah Perfumes, Ajman, UAE',
    description:
      'Created and launched a fully functional e-commerce website with SEO optimization. Designed digital marketing campaigns targeting the Gulf market, resulting in strong online engagement. Developed lead-tracking tools and automated reporting systems to optimize advertising performance.',
  },
  {
    period: 'May 2023 - Jun 2024',
    role: 'Full Stack Developer',
    org: 'Emirati Digital, Dubai, UAE',
    description:
      'Developed full-stack websites and cross-platform applications using C#, ASP.NET, HTML, MySQL, SQLite, Supabase, and Flutter. Integrated backend APIs and optimized databases for scalability and security. Designed digital tools for client automation, CRM integration, and internal data tracking.',
  },
  {
    period: 'Aug 2022 - Mar 2023',
    role: 'Sales Representative',
    org: 'Think Technology, Istanbul, Turkey',
    description:
      'Promoted financial technology products and trading platforms to retail and institutional clients. Managed client acquisition and onboarding, resulting in a 20% growth in active accounts. Collaborated with the development team to provide user feedback for trading software improvements.',
  },
  {
    period: 'May 2017 - Aug 2022',
    role: 'Full Stack Developer',
    org: 'ML Build, Istanbul, Turkey',
    description:
      'Designed and developed relational databases for internal construction management systems. Co-created mobile and web applications to streamline project coordination and reporting. Automated data collection and analysis processes to support management decision-making.',
  },
];

const values = [
  {
    icon: '◈',
    title: 'Engineering Discipline',
    description: 'Clean code, proper architecture, and systems that scale. I take pride in building things right, not just fast.',
  },
  {
    icon: '◎',
    title: 'Product Thinking',
    description: "I think about the product, not just the code. Every feature I build is considered from the user's perspective.",
  },
  {
    icon: '◆',
    title: 'Real-World Impact',
    description: 'I have shipped systems used by real businesses, from enterprise CRM platforms to billing engines handling real transactions.',
  },
  {
    icon: '◐',
    title: 'Broad Stack Depth',
    description: 'Comfortable across web, mobile, backend, and infrastructure. I bridge gaps between disciplines rather than stay siloed.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen pt-28">
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-30" />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* INTRO */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="glow-dot" />
              <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase font-mono">
                About Me
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-100 leading-tight">
              Ali Thari Abdulhadi
            </h1>
            <p className="text-slate-400 text-sm font-medium tracking-wider uppercase text-cyan-400/70">
              Full Stack Developer &amp; Digital Operations Manager
            </p>
            <div className="h-px w-16 bg-gradient-to-r from-cyan-500/50 to-transparent" />
            <p className="text-slate-400 text-lg leading-relaxed">
              Versatile Full Stack Developer and Digital Operations Manager based in Dubai, UAE,
              with hands-on experience across software engineering, CRM development, marketing
              management, and automation systems.
            </p>
            <p className="text-slate-500 text-base leading-relaxed">
              Skilled in building full-stack web and mobile applications using C#, ASP.NET,
              Flutter, MySQL, and Supabase. I bridge technical development and business
              operations to deliver scalable, data-driven solutions.
            </p>
            <div className="flex gap-4">
              <Link
                to="/projects"
                className="px-6 py-3 bg-cyan-500/15 text-cyan-400 border border-cyan-500/25 rounded-lg text-sm font-medium hover:bg-cyan-500/20 transition-colors duration-200"
              >
                View Projects
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 border border-slate-700/50 text-slate-400 rounded-lg text-sm font-medium hover:text-slate-300 hover:border-slate-600/50 transition-all duration-200"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Info panel */}
          <div className="space-y-4">
            {[
              { label: 'Location', value: 'Dubai, UAE' },
              { label: 'Email', value: 'ali.abdulhadii@outlook.com', link: 'mailto:ali.abdulhadii@outlook.com' },
              { label: 'Phone', value: '+971 50 313 5616', link: 'tel:+971503135616' },
              { label: 'Focus', value: 'Web, Mobile, CRM, Automation' },
              { label: 'Education', value: 'BSc Software Engineering, Kadir Has University' },
              { label: 'Languages', value: 'English, Arabic, Turkish' },
              { label: 'Status', value: 'Available for opportunities' },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 bg-[#071428] border border-cyan-500/10 rounded-xl px-5 py-4">
                <span className="text-slate-500 text-sm w-24 flex-shrink-0 font-mono">{item.label}</span>
                <div className="w-px h-4 bg-cyan-500/20 mt-0.5" />
                {item.link ? (
                  <a href={item.link} className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors duration-200">{item.value}</a>
                ) : (
                  <span className="text-slate-300 text-sm">{item.value}</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent mb-20" />

        {/* VALUES */}
        <section className="mb-20">
          <SectionHeader label="Principles" title="How I Work" className="mb-10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-[#071428] border border-cyan-500/10 rounded-xl p-6 space-y-3 hover:border-cyan-500/25 transition-colors duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="text-cyan-400/60 text-xl">{v.icon}</span>
                  <h3 className="text-slate-200 font-semibold text-base">{v.title}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TIMELINE */}
        <section className="mb-20">
          <SectionHeader label="Experience" title="Career Timeline" className="mb-10" />
          <div className="relative space-y-0">
            {/* Vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/30 via-cyan-500/15 to-transparent" />
            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative pl-12 pb-10"
              >
                {/* Dot */}
                <div
                  className="absolute left-[13px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan-400 border-2 border-[#020510]"
                  style={{ boxShadow: '0 0 8px rgba(6,182,212,0.6)' }}
                />
                <div className="bg-[#071428] border border-cyan-500/10 rounded-xl p-5 space-y-3">
                  <span className="inline-block text-xs font-mono text-cyan-400/70 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                    {item.period}
                  </span>
                  <div>
                    <h3 className="text-slate-200 font-semibold">{item.role}</h3>
                    <p className="text-cyan-400/70 text-sm">{item.org}</p>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section className="mb-20">
          <SectionHeader label="Education" title="Academic Background" className="mb-10" />
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-[#071428] border border-cyan-500/10 rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex-1 space-y-1">
              <h3 className="text-slate-200 font-semibold text-base">Bachelor of Software Engineering</h3>
              <p className="text-cyan-400/70 text-sm">Kadir Has University, Istanbul, Turkey</p>
              <p className="text-slate-500 text-xs mt-1">Relevant coursework in Process Design and Project Management</p>
            </div>
            <span className="text-xs font-mono text-cyan-400/70 bg-cyan-500/10 px-3 py-1.5 rounded-md border border-cyan-500/20 self-start sm:self-center whitespace-nowrap">
              2016 - 2020
            </span>
          </motion.div>
        </section>

        {/* TECH STACK */}
        <section className="mb-20">
          <SectionHeader label="Toolkit" title="Full Tech Stack" className="mb-10" />
          <div className="space-y-8">
            {stackCategories.map((cat) => {
              const items = techStack.filter((t) => t.category === cat);
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <span className="text-xs font-mono text-slate-600 w-24 flex-shrink-0 text-right pr-4 border-r border-slate-800">
                    {cat}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                      <TechBadge key={item.name} name={item.name} variant="outline" />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>

      {/* CTA */}
      <CTASection />
    </div>
  );
}
