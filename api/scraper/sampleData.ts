import { Product } from './types.js';

export function getSampleData(keyword: string): Product[] {
  const platforms = ['t.me', 'instagram.com', 'linkedin.com', 'x.com'];
  const data: Product[] = [];
  
  const basePrice = Math.random() * 50 + 20; // 20 - 70

  for (let i = 0; i < 20; i++) {
    const platform = platforms[i % platforms.length];
    const priceVariance = (Math.random() - 0.5) * 15;
    let price = Math.max(5, basePrice + priceVariance);
    price = parseFloat(price.toFixed(2));
    
    const salesVolume = Math.floor(Math.random() * 5000) + 50;
    const rating = parseFloat((Math.random() * 2 + 3).toFixed(1)); // 3.0 - 5.0
    
    // Add some noise to test cleaning
    const rawName = `[${platform.toUpperCase()}] ${keyword} - Model ${i + 1} ` + (Math.random() > 0.8 ? '  ' : '');
    
    data.push({
      id: `sample-${platform}-${i}`,
      name: rawName,
      price: price,
      salesVolume,
      rating,
      url: `https://${platform}/search?q=${encodeURIComponent(keyword)}&item=${i}`,
      platform,
      timestamp: Date.now() - Math.floor(Math.random() * 100000)
    });
  }

  // Add a duplicate to test deduplication
  if (data.length > 0) {
    const dup = { ...data[0], id: 'sample-dup-0' };
    data.push(dup);
  }

  return data;
}
