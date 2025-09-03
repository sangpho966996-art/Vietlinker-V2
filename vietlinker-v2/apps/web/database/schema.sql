-- VietLinker Database Schema
-- Created: 2025-01-12
-- Version: 1.0

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  bio TEXT,
  location TEXT,
  website TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_business BOOLEAN DEFAULT FALSE,
  business_name TEXT,
  business_license TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Categories table
CREATE TABLE public.categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  parent_id UUID REFERENCES public.categories(id),
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Listings table (main marketplace items)
CREATE TABLE public.listings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  category_id UUID REFERENCES public.categories(id) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('marketplace', 'service', 'job', 'real_estate', 'food', 'classified')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(12,2),
  price_type TEXT CHECK (price_type IN ('fixed', 'negotiable', 'hourly', 'daily', 'monthly', 'free')),
  currency TEXT DEFAULT 'USD',
  location TEXT,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  condition TEXT CHECK (condition IN ('new', 'like_new', 'good', 'fair', 'poor')),
  is_featured BOOLEAN DEFAULT FALSE,
  is_urgent BOOLEAN DEFAULT FALSE,
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'sold', 'expired', 'suspended')),
  views_count INTEGER DEFAULT 0,
  contact_phone TEXT,
  contact_email TEXT,
  contact_whatsapp TEXT,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Listing images table
CREATE TABLE public.listing_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Job specific details
CREATE TABLE public.job_details (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  job_type TEXT CHECK (job_type IN ('full_time', 'part_time', 'contract', 'freelance', 'internship')),
  experience_level TEXT CHECK (experience_level IN ('entry', 'junior', 'mid', 'senior', 'executive')),
  salary_min DECIMAL(12,2),
  salary_max DECIMAL(12,2),
  salary_period TEXT CHECK (salary_period IN ('hour', 'day', 'month', 'year')),
  remote_ok BOOLEAN DEFAULT FALSE,
  visa_sponsorship BOOLEAN DEFAULT FALSE,
  benefits TEXT[],
  requirements TEXT[],
  company_name TEXT,
  company_size TEXT,
  application_deadline TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Real estate specific details
CREATE TABLE public.real_estate_details (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  property_type TEXT CHECK (property_type IN ('apartment', 'house', 'condo', 'townhouse', 'commercial', 'land')),
  listing_type TEXT CHECK (listing_type IN ('rent', 'sale')),
  bedrooms INTEGER,
  bathrooms INTEGER,
  square_feet INTEGER,
  square_meters INTEGER,
  lot_size INTEGER,
  year_built INTEGER,
  parking_spaces INTEGER,
  amenities TEXT[],
  pet_friendly BOOLEAN DEFAULT FALSE,
  furnished BOOLEAN DEFAULT FALSE,
  utilities_included TEXT[],
  lease_term TEXT,
  deposit_amount DECIMAL(12,2),
  available_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Service specific details
CREATE TABLE public.service_details (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  service_type TEXT,
  duration_minutes INTEGER,
  service_area_miles INTEGER,
  online_service BOOLEAN DEFAULT FALSE,
  certifications TEXT[],
  languages TEXT[],
  availability_schedule JSONB,
  booking_notice_hours INTEGER DEFAULT 24,
  cancellation_policy TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Food/Restaurant specific details
CREATE TABLE public.food_details (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  restaurant_type TEXT,
  cuisine_types TEXT[],
  delivery_available BOOLEAN DEFAULT FALSE,
  pickup_available BOOLEAN DEFAULT TRUE,
  delivery_radius_miles INTEGER,
  min_order_amount DECIMAL(12,2),
  delivery_fee DECIMAL(12,2),
  operating_hours JSONB,
  payment_methods TEXT[],
  dietary_options TEXT[], -- vegetarian, vegan, gluten_free, halal, etc.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW') NOT NULL
);

-- Menu items for restaurants
CREATE TABLE public.menu_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(8,2) NOT NULL,
  category TEXT,
  image_url TEXT,
  is_available BOOLEAN DEFAULT TRUE,
  dietary_tags TEXT[],
  spice_level INTEGER CHECK (spice_level >= 0 AND spice_level <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Reviews and ratings
CREATE TABLE public.reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES public.profiles(id) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  title TEXT,
  comment TEXT,
  is_verified_purchase BOOLEAN DEFAULT FALSE,
  helpful_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(listing_id, reviewer_id)
);

-- Messages between users
CREATE TABLE public.messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) NOT NULL,
  recipient_id UUID REFERENCES public.profiles(id) NOT NULL,
  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file')),
  attachment_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Favorites/Wishlist
CREATE TABLE public.favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  UNIQUE(user_id, listing_id)
);

-- Search history
CREATE TABLE public.search_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  search_query TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  location TEXT,
  filters JSONB,
  results_count INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Notifications
CREATE TABLE public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for performance
CREATE INDEX idx_listings_user_id ON public.listings(user_id);
CREATE INDEX idx_listings_category_id ON public.listings(category_id);
CREATE INDEX idx_listings_type ON public.listings(type);
CREATE INDEX idx_listings_status ON public.listings(status);
CREATE INDEX idx_listings_location ON public.listings(location);
CREATE INDEX idx_listings_created_at ON public.listings(created_at DESC);
CREATE INDEX idx_listings_price ON public.listings(price);
CREATE INDEX idx_listing_images_listing_id ON public.listing_images(listing_id);
CREATE INDEX idx_reviews_listing_id ON public.reviews(listing_id);
CREATE INDEX idx_reviews_reviewer_id ON public.reviews(reviewer_id);
CREATE INDEX idx_messages_listing_id ON public.messages(listing_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON public.messages(recipient_id);
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_listing_id ON public.favorites(listing_id);

-- Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Listings policies
CREATE POLICY "Listings are viewable by everyone" ON public.listings FOR SELECT USING (status = 'active');
CREATE POLICY "Users can insert their own listings" ON public.listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own listings" ON public.listings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own listings" ON public.listings FOR DELETE USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can insert their own reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);
CREATE POLICY "Users can update own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = reviewer_id);

-- Messages policies
CREATE POLICY "Users can view their own messages" ON public.messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users can insert messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- Favorites policies
CREATE POLICY "Users can view their own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Insert default categories
INSERT INTO public.categories (name, slug, description, icon, sort_order) VALUES
('Electronics', 'electronics', 'Phones, laptops, gadgets and electronic devices', '📱', 1),
('Vehicles', 'vehicles', 'Cars, motorcycles, bikes and transportation', '🚗', 2),
('Real Estate', 'real-estate', 'Houses, apartments, land and commercial properties', '🏠', 3),
('Jobs', 'jobs', 'Employment opportunities and career positions', '💼', 4),
('Services', 'services', 'Professional services and business solutions', '🔧', 5),
('Food & Restaurant', 'food-restaurant', 'Restaurants, food delivery and catering', '🍜', 6),
('Fashion & Beauty', 'fashion-beauty', 'Clothing, accessories, cosmetics and style', '👗', 7),
('Home & Garden', 'home-garden', 'Furniture, appliances and home improvement', '🏡', 8),
('Education', 'education', 'Courses, tutoring and educational services', '📚', 9),
('Health & Wellness', 'health-wellness', 'Healthcare, fitness and wellness services', '⚕️', 10),
('Entertainment', 'entertainment', 'Events, music, movies and entertainment', '🎭', 11),
('Classifieds', 'classifieds', 'General classified advertisements', '📋', 12);

-- Insert subcategories for Electronics
INSERT INTO public.categories (name, slug, description, parent_id, sort_order) VALUES
('Smartphones', 'smartphones', 'Mobile phones and accessories', (SELECT id FROM public.categories WHERE slug = 'electronics'), 1),
('Laptops', 'laptops', 'Laptops and notebooks', (SELECT id FROM public.categories WHERE slug = 'electronics'), 2),
('Gaming', 'gaming', 'Gaming consoles, PC games and accessories', (SELECT id FROM public.categories WHERE slug = 'electronics'), 3),
('Cameras', 'cameras', 'Digital cameras and photography equipment', (SELECT id FROM public.categories WHERE slug = 'electronics'), 4);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON public.listings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();