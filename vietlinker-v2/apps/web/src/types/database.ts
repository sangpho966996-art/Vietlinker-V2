// Database types for VietLinker
// Auto-generated from Supabase schema

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          bio: string | null
          location: string | null
          website: string | null
          is_verified: boolean
          is_business: boolean
          business_name: string | null
          business_license: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          is_verified?: boolean
          is_business?: boolean
          business_name?: string | null
          business_license?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          is_verified?: boolean
          is_business?: boolean
          business_name?: string | null
          business_license?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          parent_id: string | null
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          parent_id?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          parent_id?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      listings: {
        Row: {
          id: string
          user_id: string
          category_id: string
          type: 'marketplace' | 'service' | 'job' | 'real_estate' | 'food' | 'classified'
          title: string
          description: string
          price: number | null
          price_type: 'fixed' | 'negotiable' | 'hourly' | 'daily' | 'monthly' | 'free' | null
          currency: string
          location: string | null
          latitude: number | null
          longitude: number | null
          condition: 'new' | 'like_new' | 'good' | 'fair' | 'poor' | null
          is_featured: boolean
          is_urgent: boolean
          status: 'draft' | 'active' | 'sold' | 'expired' | 'suspended'
          views_count: number
          contact_phone: string | null
          contact_email: string | null
          contact_whatsapp: string | null
          expires_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id: string
          type: 'marketplace' | 'service' | 'job' | 'real_estate' | 'food' | 'classified'
          title: string
          description: string
          price?: number | null
          price_type?: 'fixed' | 'negotiable' | 'hourly' | 'daily' | 'monthly' | 'free' | null
          currency?: string
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          condition?: 'new' | 'like_new' | 'good' | 'fair' | 'poor' | null
          is_featured?: boolean
          is_urgent?: boolean
          status?: 'draft' | 'active' | 'sold' | 'expired' | 'suspended'
          views_count?: number
          contact_phone?: string | null
          contact_email?: string | null
          contact_whatsapp?: string | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string
          type?: 'marketplace' | 'service' | 'job' | 'real_estate' | 'food' | 'classified'
          title?: string
          description?: string
          price?: number | null
          price_type?: 'fixed' | 'negotiable' | 'hourly' | 'daily' | 'monthly' | 'free' | null
          currency?: string
          location?: string | null
          latitude?: number | null
          longitude?: number | null
          condition?: 'new' | 'like_new' | 'good' | 'fair' | 'poor' | null
          is_featured?: boolean
          is_urgent?: boolean
          status?: 'draft' | 'active' | 'sold' | 'expired' | 'suspended'
          views_count?: number
          contact_phone?: string | null
          contact_email?: string | null
          contact_whatsapp?: string | null
          expires_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      listing_images: {
        Row: {
          id: string
          listing_id: string
          image_url: string
          alt_text: string | null
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          image_url: string
          alt_text?: string | null
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          image_url?: string
          alt_text?: string | null
          sort_order?: number
          created_at?: string
        }
      }
      job_details: {
        Row: {
          id: string
          listing_id: string
          job_type: 'full_time' | 'part_time' | 'contract' | 'freelance' | 'internship' | null
          experience_level: 'entry' | 'junior' | 'mid' | 'senior' | 'executive' | null
          salary_min: number | null
          salary_max: number | null
          salary_period: 'hour' | 'day' | 'month' | 'year' | null
          remote_ok: boolean
          visa_sponsorship: boolean
          benefits: string[] | null
          requirements: string[] | null
          company_name: string | null
          company_size: string | null
          application_deadline: string | null
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          job_type?: 'full_time' | 'part_time' | 'contract' | 'freelance' | 'internship' | null
          experience_level?: 'entry' | 'junior' | 'mid' | 'senior' | 'executive' | null
          salary_min?: number | null
          salary_max?: number | null
          salary_period?: 'hour' | 'day' | 'month' | 'year' | null
          remote_ok?: boolean
          visa_sponsorship?: boolean
          benefits?: string[] | null
          requirements?: string[] | null
          company_name?: string | null
          company_size?: string | null
          application_deadline?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          job_type?: 'full_time' | 'part_time' | 'contract' | 'freelance' | 'internship' | null
          experience_level?: 'entry' | 'junior' | 'mid' | 'senior' | 'executive' | null
          salary_min?: number | null
          salary_max?: number | null
          salary_period?: 'hour' | 'day' | 'month' | 'year' | null
          remote_ok?: boolean
          visa_sponsorship?: boolean
          benefits?: string[] | null
          requirements?: string[] | null
          company_name?: string | null
          company_size?: string | null
          application_deadline?: string | null
          created_at?: string
        }
      }
      real_estate_details: {
        Row: {
          id: string
          listing_id: string
          property_type: 'apartment' | 'house' | 'condo' | 'townhouse' | 'commercial' | 'land' | null
          listing_type: 'rent' | 'sale' | null
          bedrooms: number | null
          bathrooms: number | null
          square_feet: number | null
          square_meters: number | null
          lot_size: number | null
          year_built: number | null
          parking_spaces: number | null
          amenities: string[] | null
          pet_friendly: boolean
          furnished: boolean
          utilities_included: string[] | null
          lease_term: string | null
          deposit_amount: number | null
          available_date: string | null
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          property_type?: 'apartment' | 'house' | 'condo' | 'townhouse' | 'commercial' | 'land' | null
          listing_type?: 'rent' | 'sale' | null
          bedrooms?: number | null
          bathrooms?: number | null
          square_feet?: number | null
          square_meters?: number | null
          lot_size?: number | null
          year_built?: number | null
          parking_spaces?: number | null
          amenities?: string[] | null
          pet_friendly?: boolean
          furnished?: boolean
          utilities_included?: string[] | null
          lease_term?: string | null
          deposit_amount?: number | null
          available_date?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          property_type?: 'apartment' | 'house' | 'condo' | 'townhouse' | 'commercial' | 'land' | null
          listing_type?: 'rent' | 'sale' | null
          bedrooms?: number | null
          bathrooms?: number | null
          square_feet?: number | null
          square_meters?: number | null
          lot_size?: number | null
          year_built?: number | null
          parking_spaces?: number | null
          amenities?: string[] | null
          pet_friendly?: boolean
          furnished?: boolean
          utilities_included?: string[] | null
          lease_term?: string | null
          deposit_amount?: number | null
          available_date?: string | null
          created_at?: string
        }
      }
      service_details: {
        Row: {
          id: string
          listing_id: string
          service_type: string | null
          duration_minutes: number | null
          service_area_miles: number | null
          online_service: boolean
          certifications: string[] | null
          languages: string[] | null
          availability_schedule: any | null
          booking_notice_hours: number
          cancellation_policy: string | null
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          service_type?: string | null
          duration_minutes?: number | null
          service_area_miles?: number | null
          online_service?: boolean
          certifications?: string[] | null
          languages?: string[] | null
          availability_schedule?: any | null
          booking_notice_hours?: number
          cancellation_policy?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          service_type?: string | null
          duration_minutes?: number | null
          service_area_miles?: number | null
          online_service?: boolean
          certifications?: string[] | null
          languages?: string[] | null
          availability_schedule?: any | null
          booking_notice_hours?: number
          cancellation_policy?: string | null
          created_at?: string
        }
      }
      food_details: {
        Row: {
          id: string
          listing_id: string
          restaurant_type: string | null
          cuisine_types: string[] | null
          delivery_available: boolean
          pickup_available: boolean
          delivery_radius_miles: number | null
          min_order_amount: number | null
          delivery_fee: number | null
          operating_hours: any | null
          payment_methods: string[] | null
          dietary_options: string[] | null
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          restaurant_type?: string | null
          cuisine_types?: string[] | null
          delivery_available?: boolean
          pickup_available?: boolean
          delivery_radius_miles?: number | null
          min_order_amount?: number | null
          delivery_fee?: number | null
          operating_hours?: any | null
          payment_methods?: string[] | null
          dietary_options?: string[] | null
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          restaurant_type?: string | null
          cuisine_types?: string[] | null
          delivery_available?: boolean
          pickup_available?: boolean
          delivery_radius_miles?: number | null
          min_order_amount?: number | null
          delivery_fee?: number | null
          operating_hours?: any | null
          payment_methods?: string[] | null
          dietary_options?: string[] | null
          created_at?: string
        }
      }
      menu_items: {
        Row: {
          id: string
          listing_id: string
          name: string
          description: string | null
          price: number
          category: string | null
          image_url: string | null
          is_available: boolean
          dietary_tags: string[] | null
          spice_level: number | null
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          name: string
          description?: string | null
          price: number
          category?: string | null
          image_url?: string | null
          is_available?: boolean
          dietary_tags?: string[] | null
          spice_level?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          name?: string
          description?: string | null
          price?: number
          category?: string | null
          image_url?: string | null
          is_available?: boolean
          dietary_tags?: string[] | null
          spice_level?: number | null
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          listing_id: string
          reviewer_id: string
          rating: number
          title: string | null
          comment: string | null
          is_verified_purchase: boolean
          helpful_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          reviewer_id: string
          rating: number
          title?: string | null
          comment?: string | null
          is_verified_purchase?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          reviewer_id?: string
          rating?: number
          title?: string | null
          comment?: string | null
          is_verified_purchase?: boolean
          helpful_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          listing_id: string
          sender_id: string
          recipient_id: string
          message: string
          message_type: 'text' | 'image' | 'file'
          attachment_url: string | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          listing_id: string
          sender_id: string
          recipient_id: string
          message: string
          message_type?: 'text' | 'image' | 'file'
          attachment_url?: string | null
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          listing_id?: string
          sender_id?: string
          recipient_id?: string
          message?: string
          message_type?: 'text' | 'image' | 'file'
          attachment_url?: string | null
          is_read?: boolean
          created_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          listing_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          listing_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          listing_id?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          type: string
          title: string
          message: string
          data: any | null
          is_read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          type: string
          title: string
          message: string
          data?: any | null
          is_read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          type?: string
          title?: string
          message?: string
          data?: any | null
          is_read?: boolean
          created_at?: string
        }
      }
    }
  }
}

// Utility types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Listing = Database['public']['Tables']['listings']['Row']
export type ListingImage = Database['public']['Tables']['listing_images']['Row']
export type JobDetails = Database['public']['Tables']['job_details']['Row']
export type RealEstateDetails = Database['public']['Tables']['real_estate_details']['Row']
export type ServiceDetails = Database['public']['Tables']['service_details']['Row']
export type FoodDetails = Database['public']['Tables']['food_details']['Row']
export type MenuItem = Database['public']['Tables']['menu_items']['Row']
export type Review = Database['public']['Tables']['reviews']['Row']
export type Message = Database['public']['Tables']['messages']['Row']
export type Favorite = Database['public']['Tables']['favorites']['Row']
export type Notification = Database['public']['Tables']['notifications']['Row']

// Combined types for API responses
export interface ListingWithDetails extends Listing {
  profile: Profile
  category: Category
  images: ListingImage[]
  job_details?: JobDetails
  real_estate_details?: RealEstateDetails
  service_details?: ServiceDetails
  food_details?: FoodDetails
  menu_items?: MenuItem[]
  reviews?: Review[]
  average_rating?: number
  review_count?: number
}

export interface CategoryWithChildren extends Category {
  children?: Category[]
  listings_count?: number
}

// Form types
export type CreateListingData = Database['public']['Tables']['listings']['Insert']
export type UpdateListingData = Database['public']['Tables']['listings']['Update']
export type CreateProfileData = Database['public']['Tables']['profiles']['Insert']
export type UpdateProfileData = Database['public']['Tables']['profiles']['Update']