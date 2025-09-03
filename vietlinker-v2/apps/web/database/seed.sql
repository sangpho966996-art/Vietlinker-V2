-- VietLinker Database Seed Data
-- Sample data for development and testing

-- Sample profiles (these will be created through auth, but we can reference them)
-- Note: In production, these profiles will be created through the Supabase auth system

-- Sample listings for demonstration
-- First, let's get the category IDs we'll need
DO $$
DECLARE
    electronics_id UUID;
    vehicles_id UUID;
    real_estate_id UUID;
    jobs_id UUID;
    services_id UUID;
    food_id UUID;
    smartphones_id UUID;
BEGIN
    -- Get category IDs
    SELECT id INTO electronics_id FROM public.categories WHERE slug = 'electronics';
    SELECT id INTO vehicles_id FROM public.categories WHERE slug = 'vehicles';
    SELECT id INTO real_estate_id FROM public.categories WHERE slug = 'real-estate';
    SELECT id INTO jobs_id FROM public.categories WHERE slug = 'jobs';
    SELECT id INTO services_id FROM public.categories WHERE slug = 'services';
    SELECT id INTO food_id FROM public.categories WHERE slug = 'food-restaurant';
    SELECT id INTO smartphones_id FROM public.categories WHERE slug = 'smartphones';

    -- Sample marketplace listings
    INSERT INTO public.listings (id, user_id, category_id, type, title, description, price, price_type, currency, location, condition, contact_phone, contact_email) VALUES
    (uuid_generate_v4(), uuid_generate_v4(), smartphones_id, 'marketplace', 'iPhone 14 Pro Max - Like New', 'Excellent condition iPhone 14 Pro Max, 256GB, Space Black. Used for only 3 months. Includes original box, charger, and screen protector already applied.', 950.00, 'negotiable', 'USD', 'San Jose, CA', 'like_new', '+1-408-555-0123', 'seller1@example.com'),
    (uuid_generate_v4(), uuid_generate_v4(), electronics_id, 'marketplace', 'Gaming Laptop - ASUS ROG', 'High-performance gaming laptop perfect for gaming and work. RTX 3070, Intel i7, 16GB RAM, 1TB SSD. Great condition, rarely used.', 1200.00, 'fixed', 'USD', 'San Francisco, CA', 'good', '+1-415-555-0456', 'gamer@example.com'),
    (uuid_generate_v4(), uuid_generate_v4(), vehicles_id, 'marketplace', '2020 Honda Civic - Clean Title', 'Well-maintained 2020 Honda Civic with low mileage. Regular maintenance, non-smoker, garage kept. Perfect for first-time buyers or daily commuting.', 18500.00, 'negotiable', 'USD', 'San Diego, CA', 'good', '+1-619-555-0789', 'carseller@example.com');
    
    -- Sample service listings
    INSERT INTO public.listings (id, user_id, category_id, type, title, description, price, price_type, currency, location, contact_phone, contact_email) VALUES
    (uuid_generate_v4(), uuid_generate_v4(), services_id, 'service', 'Professional House Cleaning', 'Experienced house cleaning service. Deep cleaning, regular maintenance, move-in/move-out cleaning. Eco-friendly products available. Licensed and insured.', 80.00, 'fixed', 'USD', 'San Jose, CA', '+1-408-555-1234', 'cleaning@example.com'),
    (uuid_generate_v4(), uuid_generate_v4(), services_id, 'service', 'Vietnamese Tutoring - All Levels', 'Native Vietnamese speaker offering tutoring for all levels. Conversational practice, business Vietnamese, cultural context. Online or in-person sessions available.', 45.00, 'hourly', 'USD', 'San Francisco, CA', '+1-415-555-5678', 'tutor@example.com'),
    (uuid_generate_v4(), uuid_generate_v4(), services_id, 'service', 'Wedding Photography', 'Professional wedding photographer with 8+ years experience. Specializing in Vietnamese and multicultural weddings. Package includes engagement session.', 2500.00, 'negotiable', 'USD', 'Orange County, CA', '+1-714-555-9012', 'photo@example.com');

    -- Sample job listings  
    INSERT INTO public.listings (id, user_id, category_id, type, title, description, price, price_type, currency, location, contact_email) VALUES
    (uuid_generate_v4(), uuid_generate_v4(), jobs_id, 'job', 'Software Engineer - Vietnamese Speaking', 'Looking for a Vietnamese-speaking software engineer to join our growing team. Full-stack development with React, Node.js, and PostgreSQL. Competitive salary and benefits.', 120000.00, 'fixed', 'USD', 'San Jose, CA', 'hr@techcompany.com'),
    (uuid_generate_v4(), uuid_generate_v4(), jobs_id, 'job', 'Vietnamese Restaurant Server', 'Busy Vietnamese restaurant seeking friendly servers. Vietnamese language skills required. Evening and weekend shifts available. Tips and meal benefits included.', 18.00, 'hourly', 'USD', 'San Francisco, CA', 'manager@phorestaurant.com'),
    (uuid_generate_v4(), uuid_generate_v4(), jobs_id, 'job', 'Marketing Coordinator - Bilingual', 'Marketing coordinator position for Vietnamese community outreach. Social media management, event planning, content creation. Bilingual Vietnamese/English required.', 55000.00, 'fixed', 'USD', 'Los Angeles, CA', 'jobs@marketingagency.com');

    -- Sample real estate listings
    INSERT INTO public.listings (id, user_id, category_id, type, title, description, price, price_type, currency, location, contact_phone, contact_email) VALUES
    (uuid_generate_v4(), uuid_generate_v4(), real_estate_id, 'real_estate', '2BR/2BA Apartment in Little Saigon', 'Beautiful 2-bedroom, 2-bathroom apartment in the heart of Little Saigon. Walking distance to Vietnamese restaurants and shops. Parking included.', 2800.00, 'monthly', 'USD', 'Westminster, CA', '+1-714-555-3456', 'landlord@example.com'),
    (uuid_generate_v4(), uuid_generate_v4(), real_estate_id, 'real_estate', 'Single Family Home - Vietnamese Community', 'Spacious 3BR/2BA home in established Vietnamese community. Large backyard, 2-car garage, updated kitchen. Great schools nearby.', 750000.00, 'fixed', 'USD', 'San Jose, CA', '+1-408-555-7890', 'realtor@example.com');

    -- Sample food/restaurant listings
    INSERT INTO public.listings (id, user_id, category_id, type, title, description, price, price_type, location, contact_phone, contact_email) VALUES
    (uuid_generate_v4(), uuid_generate_v4(), food_id, 'food', 'Pho Saigon - Authentic Vietnamese', 'Family-owned Vietnamese restaurant serving authentic pho, banh mi, and traditional dishes. Fresh ingredients daily. Delivery and takeout available.', NULL, 'free', 'San Jose, CA', '+1-408-555-PHO1', 'info@phosaigon.com'),
    (uuid_generate_v4(), uuid_generate_v4(), food_id, 'food', 'Vietnamese Home Catering', 'Authentic Vietnamese home cooking for your events. Specializing in traditional dishes for weddings, parties, and celebrations. Custom menus available.', 25.00, 'fixed', 'Orange County, CA', '+1-714-555-FOOD', 'catering@homeviet.com');

END $$;

-- Sample menu items for the restaurant
INSERT INTO public.menu_items (listing_id, name, description, price, category, dietary_tags) VALUES
((SELECT id FROM public.listings WHERE title LIKE 'Pho Saigon%' LIMIT 1), 'Pho Tai', 'Traditional beef noodle soup with rare beef slices', 12.95, 'Noodle Soups', ARRAY['gluten_free_option']),
((SELECT id FROM public.listings WHERE title LIKE 'Pho Saigon%' LIMIT 1), 'Pho Ga', 'Chicken noodle soup with tender chicken breast', 11.95, 'Noodle Soups', ARRAY['gluten_free_option']),
((SELECT id FROM public.listings WHERE title LIKE 'Pho Saigon%' LIMIT 1), 'Banh Mi Thit', 'Vietnamese sandwich with pork, pate, and vegetables', 8.50, 'Sandwiches', ARRAY[]),
((SELECT id FROM public.listings WHERE title LIKE 'Pho Saigon%' LIMIT 1), 'Bun Bo Hue', 'Spicy beef and pork noodle soup from Hue', 13.95, 'Noodle Soups', ARRAY['spicy']),
((SELECT id FROM public.listings WHERE title LIKE 'Pho Saigon%' LIMIT 1), 'Com Tam', 'Broken rice with grilled pork chop', 14.50, 'Rice Dishes', ARRAY['gluten_free']),
((SELECT id FROM public.listings WHERE title LIKE 'Pho Saigon%' LIMIT 1), 'Vietnamese Iced Coffee', 'Traditional Vietnamese coffee with condensed milk', 4.50, 'Beverages', ARRAY['vegetarian']);

-- Sample job details
INSERT INTO public.job_details (listing_id, job_type, experience_level, salary_min, salary_max, salary_period, remote_ok, benefits, requirements, company_name, company_size) VALUES
((SELECT id FROM public.listings WHERE title LIKE 'Software Engineer%' LIMIT 1), 'full_time', 'mid', 110000.00, 130000.00, 'year', true, 
 ARRAY['Health Insurance', 'Dental', 'Vision', '401k', 'PTO', 'Remote Work'], 
 ARRAY['React.js experience', 'Node.js proficiency', 'PostgreSQL knowledge', 'Vietnamese language skills', '3+ years experience'], 
 'TechViet Solutions', 'medium'),

((SELECT id FROM public.listings WHERE title LIKE 'Vietnamese Restaurant Server%' LIMIT 1), 'part_time', 'entry', 16.00, 20.00, 'hour', false,
 ARRAY['Meal discounts', 'Tips', 'Flexible hours'],
 ARRAY['Vietnamese language fluency', 'Customer service experience preferred', 'Weekend availability'],
 'Pho Golden Dragon', 'small'),

((SELECT id FROM public.listings WHERE title LIKE 'Marketing Coordinator%' LIMIT 1), 'full_time', 'junior', 50000.00, 60000.00, 'year', false,
 ARRAY['Health Insurance', 'PTO', 'Professional Development'],
 ARRAY['Bilingual Vietnamese/English', 'Social media experience', 'Marketing degree preferred', 'Community outreach experience'],
 'Vietnamese Business Association', 'small');

-- Sample real estate details
INSERT INTO public.real_estate_details (listing_id, property_type, listing_type, bedrooms, bathrooms, square_feet, parking_spaces, amenities, pet_friendly, furnished, utilities_included, available_date) VALUES
((SELECT id FROM public.listings WHERE title LIKE '%Little Saigon%' LIMIT 1), 'apartment', 'rent', 2, 2, 1200, 1,
 ARRAY['Pool', 'Gym', 'Laundry', 'Air Conditioning', 'Balcony'],
 true, false, ARRAY['Water', 'Trash'], '2024-02-01'),

((SELECT id FROM public.listings WHERE title LIKE 'Single Family Home%' LIMIT 1), 'house', 'sale', 3, 2, 1800, 2,
 ARRAY['Garage', 'Yard', 'Updated Kitchen', 'Hardwood Floors', 'Central AC'],
 true, false, ARRAY[], '2024-01-15');

-- Sample service details
INSERT INTO public.service_details (listing_id, service_type, duration_minutes, service_area_miles, online_service, languages, booking_notice_hours) VALUES
((SELECT id FROM public.listings WHERE title LIKE 'Professional House Cleaning%' LIMIT 1), 'cleaning', 180, 25, false,
 ARRAY['English', 'Vietnamese'], 48),

((SELECT id FROM public.listings WHERE title LIKE 'Vietnamese Tutoring%' LIMIT 1), 'education', 60, 30, true,
 ARRAY['Vietnamese', 'English'], 24),

((SELECT id FROM public.listings WHERE title LIKE 'Wedding Photography%' LIMIT 1), 'photography', 480, 50, false,
 ARRAY['English', 'Vietnamese'], 168);

-- Sample food details
INSERT INTO public.food_details (listing_id, restaurant_type, cuisine_types, delivery_available, pickup_available, delivery_radius_miles, min_order_amount, delivery_fee, payment_methods, dietary_options) VALUES
((SELECT id FROM public.listings WHERE title LIKE 'Pho Saigon%' LIMIT 1), 'restaurant', 
 ARRAY['Vietnamese', 'Asian'], true, true, 15, 25.00, 3.99,
 ARRAY['Cash', 'Credit Card', 'Venmo', 'Zelle'],
 ARRAY['Vegetarian Options', 'Gluten-Free Options', 'Halal']),

((SELECT id FROM public.listings WHERE title LIKE 'Vietnamese Home Catering%' LIMIT 1), 'catering',
 ARRAY['Vietnamese', 'Traditional'], false, true, 30, 200.00, 0.00,
 ARRAY['Cash', 'Check', 'Zelle', 'PayPal'],
 ARRAY['Vegetarian', 'Vegan Options', 'Custom Dietary Needs']);

-- Update listings view counts with random values
UPDATE public.listings SET views_count = floor(random() * 500 + 50);