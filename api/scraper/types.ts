export interface Product {
  id: string;
  name: string;
  price: number;
  salesVolume: number;
  rating: number; // 0-5
  url: string;
  platform: string;
  timestamp: number;
  // Computed fields
  valueScore?: number;
  recommendationLabel?: string;
}

export interface CrawlOptions {
  keyword: string;
  platforms?: string[];
  limitPerPlatform?: number;
}
