#!/usr/bin/env tsx
import { Command } from 'commander';
import Table from 'cli-table3';
import { crawlAndAnalyze } from './api/scraper/index.js';

const program = new Command();

program
  .name('price-scraper')
  .description('CLI to scrape and compare e-commerce product prices')
  .version('1.0.0');

program
  .command('search')
  .description('Search for a keyword across platforms')
  .argument('<keyword>', 'Keyword to search')
  .option('-p, --platforms <platforms>', 'Comma separated list of platforms (e.g. t.me,x.com)', 't.me,instagram.com,linkedin.com,x.com')
  .action(async (keyword, options) => {
    const platforms = options.platforms.split(',');
    
    console.log(`\n🔍 Searching for: "${keyword}"`);
    console.log(`🌐 Platforms: ${platforms.join(', ')}\n`);

    try {
      const { data, logs } = await crawlAndAnalyze({ keyword, platforms });
      
      console.log('\n--- Execution Logs ---');
      logs.forEach(l => console.log(l));
      console.log('----------------------\n');

      if (data.length === 0) {
        console.log('No products found.');
        return;
      }

      // Render table
      const table = new Table({
        head: ['Name', 'Price', 'Platform', 'Sales', 'Rating', 'Label'],
        colWidths: [40, 10, 15, 10, 10, 15],
        wordWrap: true
      });

      data.forEach(item => {
        table.push([
          item.name.substring(0, 37) + (item.name.length > 37 ? '...' : ''),
          `$${item.price.toFixed(2)}`,
          item.platform,
          item.salesVolume.toString(),
          item.rating.toString(),
          item.recommendationLabel || '-'
        ]);
      });

      console.log(table.toString());
      console.log(`\n✅ Finished analysis. Found ${data.length} unique products.\n`);
    } catch (err: any) {
      console.error(`\n❌ Error during scraping: ${err.message}\n`);
    }
  });

program.parse();
