import { useStore } from '../store/useStore';
import { ExternalLink, Star, TrendingUp, DollarSign } from 'lucide-react';

export function DataTable() {
  const { products, loading } = useStore();

  if (loading) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 flex justify-center items-center h-64">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-8 rounded-full border-2 border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
          <span className="text-zinc-400 text-sm">Processing data...</span>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 flex flex-col items-center justify-center text-zinc-500">
        <TrendingUp className="h-12 w-12 mb-4 opacity-50" />
        <p>No data available. Run a search or initialize sample data.</p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-xl">
      <div className="p-5 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
        <h2 className="text-lg font-bold text-white">Price Comparison List</h2>
        <span className="text-xs text-zinc-400 bg-zinc-800 px-3 py-1 rounded-full">{products.length} Items Found</span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-zinc-800">
          <thead className="bg-zinc-900/80">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Price (Low to High)</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Platform</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Sales / Rating</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Recommendation</th>
            </tr>
          </thead>
          <tbody className="bg-zinc-900 divide-y divide-zinc-800/50">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-zinc-200 flex items-center gap-2 truncate max-w-xs">
                      <a href={p.url} target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1">
                        {p.name.substring(0, 30)}{p.name.length > 30 ? '...' : ''}
                        <ExternalLink className="h-3 w-3 opacity-50" />
                      </a>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-emerald-400 flex items-center">
                    <DollarSign className="h-3 w-3" />
                    {p.price.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                    {p.platform}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-400">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1 text-xs"><TrendingUp className="h-3 w-3" /> {p.salesVolume}</span>
                    <span className="flex items-center gap-1 text-xs text-yellow-500/80"><Star className="h-3 w-3 fill-current" /> {p.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-zinc-500">
                  {p.recommendationLabel && (
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      p.recommendationLabel === 'Best Value' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]' :
                      p.recommendationLabel === 'Trending' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-[0_0_10px_rgba(249,115,22,0.2)]' :
                      'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    }`}>
                      {p.recommendationLabel}
                    </span>
                  )}
                  {!p.recommendationLabel && <span className="opacity-30">-</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
