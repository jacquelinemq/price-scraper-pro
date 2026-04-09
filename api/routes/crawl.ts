import { Router } from 'express';
import { crawlAndAnalyze } from '../scraper/index.js';
import { getSampleData } from '../scraper/sampleData.js';
import { processData } from '../scraper/processor.js';
import { supabase } from '../supabase.js';

const router = Router();

router.post('/', async (req, res) => {
  const { keyword, platforms } = req.body;
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    // If running in Vercel Serverless function, bypass playwright to avoid timeouts and size limits
    const isServerless = process.env.VERCEL === '1';
    let result;
    
    if (isServerless) {
      const sample = getSampleData(keyword);
      const processed = processData(sample);
      result = {
        data: processed,
        logs: ['[Serverless Mode] Detected Vercel environment. Used sample engine to avoid Playwright timeout.', ...processed.map(() => '')]
      };
      result.logs = result.logs.filter(l => l !== '');
    } else {
      result = await crawlAndAnalyze({ keyword, platforms });
    }

    // Save results to Supabase if connected
    if (supabase && result.data.length > 0) {
      try {
        const recordsToInsert = result.data.map((item: any) => ({
          keyword: keyword.toLowerCase(),
          product_name: item.name,
          price: item.price,
          sales_volume: item.salesVolume,
          rating: item.rating,
          url: item.url,
          platform: item.platform,
          recommendation_label: item.recommendationLabel || null
        }));

        const { error } = await supabase
          .from('scraped_products')
          .insert(recordsToInsert);
          
        if (error) {
          console.error('Supabase insert error:', error);
          result.logs.push(`[Supabase] Failed to save data: ${error.message}`);
        } else {
          result.logs.push(`[Supabase] Successfully saved ${recordsToInsert.length} records to the database.`);
        }
      } catch (dbErr: any) {
        result.logs.push(`[Supabase] Database error: ${dbErr.message}`);
      }
    } else if (!supabase) {
      result.logs.push('[Supabase] Database not connected. Data was not saved.');
    }

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/sample', (req, res) => {
  const keyword = req.query.keyword as string || 'Smartphone';
  const sample = getSampleData(keyword);
  const processed = processData(sample);
  res.json({
    data: processed,
    logs: ['[Sample Data] Loaded initialized dataset.']
  });
});

export default router;
