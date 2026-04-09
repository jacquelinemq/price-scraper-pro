import { Product } from './types.js';

export function processData(rawData: Product[]): Product[] {
  if (!rawData || rawData.length === 0) return [];

  // 1. Data Cleaning
  const cleanedData = rawData
    .filter(p => p.price > 0 && p.name.trim().length > 0)
    .map(p => ({
      ...p,
      name: p.name.trim().replace(/\s+/g, ' '),
      price: Number(p.price.toFixed(2)),
      rating: Number(p.rating.toFixed(1))
    }));

  // 2. Deduplication (by url or combination of name & platform)
  const uniqueMap = new Map<string, Product>();
  for (const item of cleanedData) {
    const key = item.url; // Use URL as unique identifier
    if (!uniqueMap.has(key)) {
      uniqueMap.set(key, item);
    } else {
      // If duplicate exists, keep the one with higher sales or newer timestamp
      const existing = uniqueMap.get(key)!;
      if (item.timestamp > existing.timestamp) {
        uniqueMap.set(key, item);
      }
    }
  }
  let finalData = Array.from(uniqueMap.values());

  // 3. Sort by price (Low to High)
  finalData.sort((a, b) => a.price - b.price);

  // 4. Calculate average price to help determine 'Best Value'
  const totalPrice = finalData.reduce((sum, p) => sum + p.price, 0);
  const avgPrice = totalPrice / finalData.length;

  // 5. Value Score and Labels
  // valueScore formula: rating * 20 + (avgPrice / price) * 50 + log10(salesVolume) * 10
  // the higher the better
  finalData = finalData.map(p => {
    const priceRatio = Math.min(avgPrice / p.price, 3); // cap ratio
    const score = p.rating * 15 + priceRatio * 40 + Math.log10(p.salesVolume || 1) * 10;
    
    let label = '';
    if (p.price < avgPrice * 0.8 && p.rating >= 4.0) {
      label = 'Best Value';
    } else if (p.salesVolume > 3000 && p.rating >= 4.5) {
      label = 'Trending';
    } else if (p.price > avgPrice * 1.5) {
      label = 'Premium';
    }

    return {
      ...p,
      valueScore: Number(score.toFixed(1)),
      recommendationLabel: label
    };
  });

  return finalData;
}
