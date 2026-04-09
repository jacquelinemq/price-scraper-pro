import { useStore } from '../store/useStore';
import { Search, Loader2 } from 'lucide-react';

export function SearchPanel() {
  const { keyword, setKeyword, platforms, togglePlatform, loading, crawlData } = useStore();
  
  const allPlatforms = ['t.me', 'instagram.com', 'linkedin.com', 'x.com'];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl relative overflow-hidden group">
      {/* Neon glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500 rounded-xl"></div>
      
      <div className="relative z-10 flex flex-col gap-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Configure Search</h2>
          <p className="text-zinc-400 text-sm">Enter keywords to trigger the live scraping script.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-zinc-500" />
            </div>
            <input 
              type="text" 
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && crawlData()}
              className="block w-full pl-10 pr-3 py-3 border border-zinc-700 rounded-lg leading-5 bg-zinc-800/50 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all"
              placeholder="e.g. Smartphone, Headphones, Laptop..."
            />
          </div>
          <button 
            onClick={crawlData}
            disabled={loading || !keyword}
            className="flex items-center gap-2 px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:shadow-[0_0_25px_rgba(16,185,129,0.7)]"
          >
            {loading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Run Script'}
          </button>
        </div>

        <div>
          <h3 className="text-sm font-medium text-zinc-300 mb-3">Target Platforms</h3>
          <div className="flex flex-wrap gap-3">
            {allPlatforms.map(platform => (
              <button
                key={platform}
                onClick={() => togglePlatform(platform)}
                className={`px-4 py-2 rounded-full text-xs font-medium border transition-all ${
                  platforms.includes(platform) 
                    ? 'bg-blue-500/20 border-blue-500/50 text-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]' 
                    : 'bg-zinc-800 border-zinc-700 text-zinc-500 hover:bg-zinc-700 hover:text-zinc-300'
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
