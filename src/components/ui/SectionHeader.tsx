import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const centered = align === 'center';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`${centered ? 'text-center' : ''} ${className}`}
    >
      {label && (
        <div className={`flex items-center gap-3 mb-3 ${centered ? 'justify-center' : ''}`}>
          <div className="glow-dot" />
          <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase font-mono">
            {label}
          </span>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-slate-100 leading-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-slate-400 text-base leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
