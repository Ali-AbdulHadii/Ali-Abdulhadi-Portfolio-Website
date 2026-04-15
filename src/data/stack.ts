// Tech stack data for display in UI

export interface StackItem {
  name: string;
  category: string;
  icon?: string; // SVG path or emoji fallback
}

export const techStack: StackItem[] = [
  // Languages
  { name: 'C#', category: 'Backend' },
  { name: 'C++', category: 'Backend' },
  { name: '.NET / ASP.NET Core', category: 'Backend' },
  { name: 'PHP', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Slim Framework', category: 'Backend' },
  { name: 'Ruby on Rails', category: 'Backend' },
  { name: 'Dart', category: 'Mobile' },
  { name: 'JavaScript', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'HTML', category: 'Frontend' },
  { name: 'CSS', category: 'Frontend' },
  // Mobile
  { name: 'Flutter', category: 'Mobile' },
  { name: 'FlutterFlow', category: 'Mobile' },
  // Frontend / Frameworks
  { name: 'React', category: 'Frontend' },
  { name: 'Vite', category: 'Frontend' },
  // CMS / E-Commerce
  { name: 'WordPress', category: 'CMS' },
  { name: 'WooCommerce', category: 'CMS' },
  { name: 'Elementor', category: 'CMS' },
  { name: 'Odoo', category: 'CRM' },
  // Databases
  { name: 'MySQL', category: 'Database' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Supabase', category: 'Database' },
  { name: 'Firebase', category: 'Database' },
  // Infrastructure
  { name: 'Cloudflare Enterprise', category: 'Infrastructure' },
  { name: 'Cloudflare Zero Trust', category: 'Infrastructure' },
  // APIs & Services
  { name: 'Stripe', category: 'Payments' },
  { name: 'Twilio', category: 'Messaging' },
  { name: 'OpenAI API', category: 'AI' },
  { name: 'Meta Pixel', category: 'Marketing' },
];

export const stackCategories = [...new Set(techStack.map((s) => s.category))];
