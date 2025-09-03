# VietLinker Database Schema

## Overview
Complete database schema for the VietLinker Vietnamese marketplace platform using Supabase PostgreSQL.

## Schema Structure

### Core Tables
- **profiles** - User profiles extending Supabase auth
- **categories** - Hierarchical category system
- **listings** - Main marketplace listings (supports all types)
- **listing_images** - Image attachments for listings

### Specialized Detail Tables
- **job_details** - Job-specific information
- **real_estate_details** - Property-specific information  
- **service_details** - Service-specific information
- **food_details** - Restaurant/food-specific information
- **menu_items** - Restaurant menu items

### Interaction Tables
- **reviews** - User reviews and ratings
- **messages** - User-to-user messaging
- **favorites** - User wishlists/favorites
- **notifications** - System notifications
- **search_history** - User search tracking

## Features

### Multi-Type Listings
Single `listings` table supports:
- 🛒 **Marketplace** - Buy/sell items
- 🔧 **Services** - Professional services  
- 💼 **Jobs** - Employment opportunities
- 🏠 **Real Estate** - Properties for rent/sale
- 🍜 **Food** - Restaurants and catering
- 📋 **Classifieds** - General advertisements

### Security
- Row Level Security (RLS) enabled on all user-facing tables
- Policies for secure data access
- User-scoped data access

### Performance
- Strategic indexes on frequently queried columns
- Optimized for search and filtering operations

## Setup Instructions

### 1. Create Supabase Project
```bash
# Visit https://supabase.com and create new project
# Copy your project URL and anon key
```

### 2. Run Schema Migration
```sql
-- Copy and paste contents of schema.sql into Supabase SQL editor
-- Execute the entire schema
```

### 3. Seed Sample Data (Optional)
```sql
-- Copy and paste contents of seed.sql into Supabase SQL editor  
-- Execute to populate with sample listings
```

### 4. Configure Environment Variables
```bash
# Add to .env.local
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Sample Data Included

The seed script includes:
- 12 main categories with subcategories
- Sample listings for each type:
  - Electronics (iPhone, gaming laptop)
  - Services (cleaning, tutoring, photography)
  - Jobs (software engineer, restaurant server)
  - Real estate (apartment, house)
  - Food (restaurant, catering)
- Menu items for restaurant
- Detailed information for each listing type

## Database Relationships

```
profiles (1) -----> (*) listings
categories (1) ---> (*) listings
listings (1) -----> (*) listing_images
listings (1) -----> (0,1) job_details
listings (1) -----> (0,1) real_estate_details  
listings (1) -----> (0,1) service_details
listings (1) -----> (0,1) food_details
listings (1) -----> (*) menu_items
listings (1) -----> (*) reviews
listings (1) -----> (*) messages
profiles (*) -----> (*) favorites -----> (*) listings
```

## Usage Examples

### Query Active Listings
```sql
SELECT l.*, c.name as category_name, p.full_name as seller_name
FROM listings l
JOIN categories c ON l.category_id = c.id  
JOIN profiles p ON l.user_id = p.id
WHERE l.status = 'active'
ORDER BY l.created_at DESC;
```

### Get Restaurant with Menu
```sql
SELECT l.*, fd.*, 
       COALESCE(
         json_agg(
           json_build_object(
             'name', mi.name,
             'price', mi.price,
             'description', mi.description
           )
         ) FILTER (WHERE mi.id IS NOT NULL), '[]'
       ) as menu_items
FROM listings l
JOIN food_details fd ON l.id = fd.listing_id
LEFT JOIN menu_items mi ON l.id = mi.listing_id
WHERE l.type = 'food'
GROUP BY l.id, fd.id;
```

## Next Steps
1. Set up Supabase project
2. Run schema migration  
3. Configure authentication
4. Implement API routes
5. Build frontend components

## Support
For questions or issues with the database schema, please refer to the main project documentation.