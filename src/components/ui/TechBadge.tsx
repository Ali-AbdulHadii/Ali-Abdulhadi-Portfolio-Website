interface TechBadgeProps {
  name: string;
  size?: 'sm' | 'md';
  variant?: 'default' | 'outline' | 'glow';
}

export default function TechBadge({ name, size = 'md', variant = 'default' }: TechBadgeProps) {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs';

  const variantClass = {
    default: 'bg-cyan-500/10 text-cyan-300/80 border border-cyan-500/20',
    outline: 'border border-cyan-500/30 text-cyan-400/70 hover:border-cyan-400/50 hover:text-cyan-300',
    glow: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-cyan-sm',
  }[variant];

  return (
    <span
      className={`inline-flex items-center rounded-md font-mono font-medium tracking-wide transition-colors duration-200 ${sizeClass} ${variantClass}`}
    >
      {name}
    </span>
  );
}
