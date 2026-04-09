import { Router } from 'express';
import { crawlAndAnalyze } from '../scraper/index.js';
import { getSampleData } from '../scraper/sampleData.js';
import { processData } from '../scraper/processor.js';

const router = Router();

router.post('/', async (req, res) => {
  const { keyword, platforms } = req.body;
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  try {
    const result = await crawlAndAnalyze({ keyword, platforms });
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
