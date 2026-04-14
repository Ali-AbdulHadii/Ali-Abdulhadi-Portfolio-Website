import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../components/ui/SectionHeader';

const contactLinks = [
  {
    label: 'Email',
    value: 'ali.abdulhadii@outlook.com',
    href: 'mailto:ali.abdulhadii@outlook.com',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+971 50 313 5616',
    href: 'tel:+971503135616',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
];

const availability = [
  'Freelance & contract work',
  'Full-time engineering roles',
  'Technical consulting',
  'Product & startup collaboration',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sent'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link as fallback since no backend is connected
    const subject = encodeURIComponent(form.subject || 'Portfolio Enquiry');
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:ali.abdulhadii@outlook.com?subject=${subject}&body=${body}`;
    setStatus('sent');
  };

  return (
    <div className="min-h-screen pt-28 pb-0">
      <div className="fixed inset-0 grid-bg pointer-events-none opacity-30" />
      <div className="fixed top-0 left-0 right-0 h-64 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <SectionHeader
            label="Contact"
            title="Let's Work Together"
            subtitle="Have a project in mind, need engineering support, or want to explore opportunities? I'd love to hear from you."
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* ── LEFT: Info ──────────────────────────────── */}
          <div className="lg:col-span-2 space-y-8">
            {/* Availability */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[#071428] border border-cyan-500/10 rounded-xl p-6 space-y-4"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="glow-dot" />
                <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase font-mono">
                  Open For
                </span>
              </div>
              {availability.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <svg className="w-4 h-4 text-cyan-400/60 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
                    <circle cx="12" cy="12" r="9" />
                  </svg>
                  <span className="text-slate-400 text-sm">{item}</span>
                </div>
              ))}
            </motion.div>

            {/* Contact links */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-3"
            >
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="flex items-center gap-4 bg-[#071428] border border-cyan-500/10 rounded-xl p-4 hover:border-cyan-500/30 hover:shadow-cyan-sm transition-all duration-200 group"
                >
                  <span className="text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-200">
                    {link.icon}
                  </span>
                  <div>
                    <div className="text-xs text-slate-500 mb-0.5">{link.label}</div>
                    <div className="text-slate-300 text-sm group-hover:text-cyan-400 transition-colors duration-200">
                      {link.value}
                    </div>
                  </div>
                </a>
              ))}
            </motion.div>

            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="bg-[#071428] border border-cyan-500/10 rounded-xl p-4 flex items-center gap-4"
            >
              <svg className="w-5 h-5 text-cyan-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <div>
                <div className="text-xs text-slate-500 mb-0.5">Based in</div>
                <div className="text-slate-300 text-sm">Dubai, UAE</div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: Form ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-3"
          >
            {status === 'sent' ? (
              <div className="bg-[#071428] border border-cyan-500/20 rounded-xl p-10 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-slate-200 font-semibold text-lg">Opening your email client...</h3>
                <p className="text-slate-500 text-sm">Your default mail app should have opened with the message pre-filled.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-cyan-400 text-sm underline underline-offset-4 hover:text-cyan-300"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-[#071428] border border-cyan-500/10 rounded-xl p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-xs font-mono uppercase tracking-wider">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-[#040c1a] border border-slate-800/60 rounded-lg px-4 py-3 text-slate-200 text-sm placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-colors duration-200"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-xs font-mono uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                      className="w-full bg-[#040c1a] border border-slate-800/60 rounded-lg px-4 py-3 text-slate-200 text-sm placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-colors duration-200"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 text-xs font-mono uppercase tracking-wider">Subject</label>
                  <select
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    className="w-full bg-[#040c1a] border border-slate-800/60 rounded-lg px-4 py-3 text-slate-200 text-sm focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-colors duration-200 appearance-none"
                  >
                    <option value="" className="text-slate-600">Select a subject</option>
                    <option value="Freelance Project">Freelance Project</option>
                    <option value="Full-Time Opportunity">Full-Time Opportunity</option>
                    <option value="Technical Consulting">Technical Consulting</option>
                    <option value="General Enquiry">General Enquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 text-xs font-mono uppercase tracking-wider">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project or opportunity..."
                    className="w-full bg-[#040c1a] border border-slate-800/60 rounded-lg px-4 py-3 text-slate-200 text-sm placeholder:text-slate-700 focus:outline-none focus:border-cyan-500/40 focus:ring-1 focus:ring-cyan-500/20 transition-colors duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-cyan-500 text-[#020510] font-semibold rounded-lg hover:bg-cyan-400 transition-colors duration-200 text-sm tracking-wide shadow-cyan-md"
                >
                  Send Message →
                </button>

                <p className="text-slate-600 text-xs text-center">
                  This will open your email client with the message pre-filled.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
