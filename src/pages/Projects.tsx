import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, categories, type Category } from '../data/projects';
import SectionHeader from '../components/ui/SectionHeader';
import ProjectCard from '../components/ui/ProjectCard';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-28 pb-24">
      {/* Background */}
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-40" />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <SectionHeader
            label="Case Studies"
            title="All Projects"
            subtitle="Detailed case studies covering the full lifecycle, from problem definition through technical architecture to shipped outcomes."
          />
        </div>

        {/* Category filter */}
        <div className="mb-10 flex flex-wrap gap-2">
          {(['All', ...categories] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-cyan-sm'
                  : 'text-slate-500 border border-transparent hover:text-slate-300 hover:border-slate-700/50'
              }`}
            >
              {cat}
              <span className="ml-2 text-xs opacity-50">
                {cat === 'All' ? projects.length : projects.filter((p) => p.category === cat).length}
              </span>
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </motion.div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-500">
            No projects found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
