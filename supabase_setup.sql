-- Go to your Supabase project dashboard -> SQL Editor -> New Query
-- Paste and run the following script to create the necessary table

CREATE TABLE IF NOT EXISTS scraped_products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  keyword text NOT NULL,
  product_name text NOT NULL,
  price numeric NOT NULL,
  sales_volume integer,
  rating numeric,
  url text,
  platform text,
  recommendation_label text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add some indexes for faster queries later
CREATE INDEX IF NOT EXISTS idx_scraped_products_keyword ON scraped_products(keyword);
CREATE INDEX IF NOT EXISTS idx_scraped_products_created_at ON scraped_products(created_at);
