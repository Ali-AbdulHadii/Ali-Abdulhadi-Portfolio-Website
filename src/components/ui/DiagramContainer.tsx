import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid once
mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  themeVariables: {
    background: '#040c1a',
    primaryColor: '#071428',
    primaryTextColor: '#e2e8f0',
    primaryBorderColor: '#06b6d4',
    lineColor: '#06b6d4',
    secondaryColor: '#0a1c38',
    tertiaryColor: '#0d2448',
    nodeBorder: 'rgba(6,182,212,0.4)',
    clusterBkg: '#071428',
    titleColor: '#22d3ee',
    edgeLabelBackground: '#040c1a',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  flowchart: { curve: 'basis', htmlLabels: true },
  securityLevel: 'loose',
});

let diagramCounter = 0;

interface DiagramContainerProps {
  title: string;
  code: string;
}

export default function DiagramContainer({ title, code }: DiagramContainerProps) {
  const [svg, setSvg] = useState('');
  const [error, setError] = useState<string | null>(null);
  const idRef = useRef(`mermaid-${++diagramCounter}`);

  useEffect(() => {
    const source = code.trim();

    if (!source) {
      setSvg('');
      setError('No diagram source available.');
      return;
    }

    let isCancelled = false;

    const renderDiagram = async () => {
      setError(null);
      setSvg('');

      try {
        await mermaid.parse(source);
        const { svg: renderedSvg } = await mermaid.render(idRef.current, source);

        if (!isCancelled) {
          setSvg(renderedSvg);
        }
      } catch (err) {
        console.error('Mermaid render failed:', err);
        if (!isCancelled) {
          setError('Diagram failed to render.');
        }
      }
    };

    renderDiagram();

    return () => {
      isCancelled = true;
    };
  }, [code]);

  return (
    <div className="rounded-xl overflow-hidden border border-cyan-500/15 bg-[#040c1a]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-cyan-500/10 bg-[#071428]">
        <svg className="w-4 h-4 text-cyan-400/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3m0 0l3 3m-3-3v8m-4-5l-2 2m0 0l2 2m-2-2h8m4-5l2-2m0 0l-2-2m2 2H9" />
        </svg>
        <span className="text-slate-400 text-xs font-mono">{title}</span>
        <span className="ml-auto text-cyan-500/40 text-xs font-mono">diagram</span>
      </div>

      {/* Diagram */}
      <div className="p-6 overflow-x-auto">
        {error ? (
          <div className="min-h-[100px] flex items-center justify-center text-rose-300/80 text-sm">
            {error}
          </div>
        ) : svg ? (
          <div
            className="mermaid flex justify-center min-h-[100px]"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          <div className="min-h-[100px] flex items-center justify-center text-slate-600 text-sm animate-pulse">
            Rendering diagram…
          </div>
        )}
      </div>
    </div>
  );
}
