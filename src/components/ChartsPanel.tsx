import { useStore } from '../store/useStore';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend
} from 'recharts';

export function ChartsPanel() {
  const { products, loading } = useStore();

  if (loading || products.length === 0) return null;

  // Prepare data for the chart
  const chartData = products.map((p, index) => ({
    name: `Item ${index + 1}`,
    price: p.price,
    sales: p.salesVolume,
    platform: p.platform
  }));

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-xl mb-8 relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-600/10 blur-3xl rounded-full"></div>
      
      <h2 className="text-xl font-bold text-white mb-6 relative z-10">Price Trend & Sales Analysis</h2>
      <div className="h-80 w-full relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={chartData}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <CartesianGrid stroke="#27272a" strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Bar yAxisId="right" dataKey="sales" name="Sales Volume" fill="#3b82f6" opacity={0.8} radius={[4, 4, 0, 0]} />
            <Line yAxisId="left" type="monotone" dataKey="price" name="Price ($)" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#059669' }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
