import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { User } from '@supabase/supabase-js';

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
  user: User | null;
  role: string;
  
  setKeyword: (keyword: string) => void;
  togglePlatform: (platform: string) => void;
  setLoading: (loading: boolean) => void;
  setResults: (products: Product[], logs: string[]) => void;
  fetchSample: () => Promise<void>;
  crawlData: () => Promise<void>;
  
  // Auth and History
  checkUser: () => Promise<void>;
  signIn: (e: string, p: string) => Promise<void>;
  signUp: (e: string, p: string) => Promise<void>;
  signOut: () => Promise<void>;
  fetchHistory: () => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  keyword: '',
  platforms: ['t.me', 'instagram.com', 'linkedin.com', 'x.com'],
  products: [],
  logs: [],
  loading: false,
  user: null,
  role: 'user',

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
    const { keyword, platforms, user } = get();
    if (!keyword) return;
    set({ loading: true, logs: ['Initializing crawler...'] });
    try {
      const res = await fetch('/api/crawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword, platforms, user_id: user?.id })
      });
      const data = await res.json();
      set({ products: data.data || [], logs: data.logs || [], loading: false });
    } catch (err: any) {
      set({ logs: ['Failed to crawl data: ' + err.message], loading: false });
    }
  },

  checkUser: async () => {
    if (!supabase) return;
    const { data: { session } } = await supabase.auth.getSession();
    set({ user: session?.user || null });
    
    if (session?.user) {
      const { data } = await supabase.from('profiles').select('role').eq('id', session.user.id).single();
      set({ role: data?.role || 'user' });
    }
  },

  signIn: async (email, password) => {
    if (!supabase) return;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      set({ logs: [...get().logs, 'Login error: ' + error.message] });
    } else {
      set({ user: data.user, logs: [...get().logs, 'Logged in successfully.'] });
      get().checkUser();
    }
  },

  signUp: async (email, password) => {
    if (!supabase) return;
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      set({ logs: [...get().logs, 'Signup error: ' + error.message] });
    } else {
      set({ logs: [...get().logs, 'Signup successful! Please check your email or log in directly if email confirmation is disabled.'] });
    }
  },

  signOut: async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    set({ user: null, role: 'user', products: [], logs: [...get().logs, 'Logged out successfully.'] });
  },

  fetchHistory: async () => {
    if (!supabase) {
      set({ logs: [...get().logs, 'Supabase client not connected.'] });
      return;
    }
    
    const { user, role, logs } = get();
    if (!user) {
      set({ logs: [...logs, 'You must be logged in to view history.'] });
      return;
    }
    
    set({ loading: true, logs: [...logs, 'Fetching history from database...'] });
    
    let query = supabase.from('scraped_products').select('*').order('created_at', { ascending: false });
    
    // Si no es admin, filtra por su propio user_id
    if (role !== 'admin') {
      query = query.eq('user_id', user.id);
    }
    
    const { data, error } = await query;
    if (error) {
      set({ logs: [...get().logs, 'History fetch error: ' + error.message], loading: false });
    } else {
      const mappedProducts = data.map((d: any) => ({
        id: d.id,
        name: d.product_name,
        price: d.price,
        salesVolume: d.sales_volume,
        rating: d.rating,
        url: d.url,
        platform: d.platform,
        recommendationLabel: d.recommendation_label,
        timestamp: new Date(d.created_at).getTime()
      }));
      set({ products: mappedProducts, logs: [...get().logs, `Loaded ${mappedProducts.length} records from history.`], loading: false });
    }
  }
}));
