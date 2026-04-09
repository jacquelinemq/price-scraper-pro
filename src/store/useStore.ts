import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  salesVolume: number;
  rating: number;
  url: string;
  platform: string;
  timestamp: number;
  valueScore?: number;
  recommendationLabel?: string;
}

interface StoreState {
  keyword: string;
  platforms: string[];
  products: Product[];
  logs: string[];
  loading: boolean;
  setKeyword: (keyword: string) => void;
  togglePlatform: (platform: string) => void;
  setLoading: (loading: boolean) => void;
  setResults: (products: Product[], logs: string[]) => void;
  fetchSample: () => Promise<void>;
  crawlData: () => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  keyword: '',
  platforms: ['t.me', 'instagram.com', 'linkedin.com', 'x.com'],
  products: [],
  logs: [],
  loading: false,

  setKeyword: (keyword) => set({ keyword }),
  
  togglePlatform: (platform) => set((state) => {
    const { platforms } = state;
    if (platforms.includes(platform)) {
      return { platforms: platforms.filter(p => p !== platform) };
    } else {
      return { platforms: [...platforms, platform] };
    }
  }),

  setLoading: (loading) => set({ loading }),
  
  setResults: (products, logs) => set({ products, logs, loading: false }),

  fetchSample: async () => {
    set({ loading: true, logs: ['Loading sample data...'] });
    try {
      const res = await fetch('/api/crawl/sample?keyword=Smartphone');
      const data = await res.json();
      set({ products: data.data, logs: data.logs, loading: false });
    } catch (err: any) {
      set({ logs: ['Failed to load sample: ' + err.message], loading: false });
    }
  },

  crawlData: async () => {
    const { keyword, platforms } = get();
    if (!keyword) return;
    set({ loading: true, logs: ['Initializing crawler...'] });
    try {
      const res = await fetch('/api/crawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, platforms })
      });
      const data = await res.json();
      set({ products: data.data || [], logs: data.logs || [], loading: false });
    } catch (err: any) {
      set({ logs: ['Failed to crawl data: ' + err.message], loading: false });
    }
  }
}));
