import { useStore } from '../store/useStore';
import { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

export function TerminalLogs() {
  const { logs } = useStore();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <div className="bg-black border border-zinc-800 rounded-xl overflow-hidden font-mono shadow-2xl relative group">
      {/* Neon border effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      
      <div className="bg-zinc-900/80 border-b border-zinc-800 p-3 flex items-center gap-2">
        <Terminal className="h-4 w-4 text-zinc-400" />
        <span className="text-xs text-zinc-400 font-semibold tracking-wider uppercase">Scraper Execution Logs</span>
      </div>
      <div className="p-4 h-48 overflow-y-auto text-xs text-green-400 space-y-1 relative z-10">
        {logs.length === 0 && <span className="text-zinc-600 opacity-50 italic">Waiting for execution...</span>}
        {logs.map((log, i) => (
          <div key={i} className="opacity-90 hover:opacity-100 hover:text-white transition-colors">{log}</div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}
