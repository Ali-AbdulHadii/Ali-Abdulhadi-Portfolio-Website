import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-csharp';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-php';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-dart';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';

interface CodeBlockProps {
  code: string;
  language: string;
  label?: string;
}

export default function CodeBlock({ code, language, label }: CodeBlockProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const grammar = Prism.languages[language];
    if (ref.current && grammar) {
      Prism.highlightElement(ref.current);
    }
  }, [code, language]);

  return (
    <div className="rounded-xl overflow-hidden border border-cyan-500/15 bg-[#040c1a]">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-cyan-500/10 bg-[#071428]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
          </div>
          {label && (
            <span className="ml-2 text-slate-500 text-xs font-mono">{label}</span>
          )}
        </div>
        <span className="text-cyan-500/50 text-xs font-mono uppercase">{language}</span>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className={`language-${language} !m-0 !rounded-none !border-0 !bg-transparent p-4 text-[0.78rem] leading-relaxed`}>
          <code ref={ref} className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );
}