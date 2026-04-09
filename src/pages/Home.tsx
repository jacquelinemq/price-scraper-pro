import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import { SearchPanel } from '../components/SearchPanel';
import { DataTable } from '../components/DataTable';
import { ChartsPanel } from '../components/ChartsPanel';
import { TerminalLogs } from '../components/TerminalLogs';
import { Activity, Database } from 'lucide-react';
import { Banner } from '../components/Banner';
import { AuthHeader } from '../components/AuthHeader';

export default function Home() {
  const { fetchSample, checkUser } = useStore();

  useEffect(() => {
    // Check auth state on load
    checkUser();
    // Load initial sample dataset as requested
    fetchSample();
  }, [fetchSample, checkUser]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-emerald-500/30 font-sans relative overflow-hidden pb-20">
      {/* Abstract background blobs */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-600/20 blur-3xl rounded-full pointer-events-none mix-blend-screen opacity-50"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 blur-3xl rounded-full pointer-events-none mix-blend-screen opacity-50"></div>

      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-emerald-500 to-blue-500 p-2 rounded-lg shadow-lg shadow-emerald-500/20">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
              Price Scraper <span className="text-emerald-400 font-light">Pro</span>
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <AuthHeader />
            <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 shadow-[0_0_15px_rgba(52,211,153,0.15)]">
              Live Connection
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Config & Logs */}
          <div className="lg:col-span-1 space-y-8">
            <Banner />
            <SearchPanel />
            
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Database className="h-24 w-24" />
              </div>
              <h2 className="text-lg font-bold text-white mb-4 relative z-10 flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-500" />
                Execution Dashboard
              </h2>
              <TerminalLogs />
            </div>
          </div>

          {/* Right Column: Charts & Data */}
          <div className="lg:col-span-2 space-y-8">
            <ChartsPanel />
            <DataTable />
          </div>
        </div>
      </main>
    </div>
  );
}
