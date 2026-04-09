-- This script configures proper Row Level Security (RLS) for the project.
-- It ensures that users can only see their own data, but admins can see everything.
-- The backend API (acting with SERVICE_ROLE_KEY or Anon Key) can insert data.

-- 1. Enable RLS on both tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scraped_products ENABLE ROW LEVEL SECURITY;

-- 2. Policies for PROFILES
-- Users can view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

-- 3. Policies for SCRAPED_PRODUCTS
-- Users can view their own scraped data
DROP POLICY IF EXISTS "Users can view own scraped data" ON public.scraped_products;
CREATE POLICY "Users can view own scraped data"
ON public.scraped_products FOR SELECT
USING (auth.uid() = user_id);

-- Admins can view ALL scraped data
DROP POLICY IF EXISTS "Admins can view all scraped data" ON public.scraped_products;
CREATE POLICY "Admins can view all scraped data"
ON public.scraped_products FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
  )
);

-- Allow anonymous or backend inserts
-- Note: The backend uses the Anon Key in local dev, or Service Role Key in prod.
-- Service Role bypasses RLS automatically. This policy ensures local dev doesn't break.
DROP POLICY IF EXISTS "Allow inserts from backend" ON public.scraped_products;
CREATE POLICY "Allow inserts from backend"
ON public.scraped_products FOR INSERT
WITH CHECK (true);
