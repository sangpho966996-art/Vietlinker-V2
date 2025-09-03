import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Auth helpers
export const auth = {
  signUp: async (email: string, password: string, metadata?: any) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    })
  },

  signIn: async (email: string, password: string) => {
    return await supabase.auth.signInWithPassword({
      email,
      password
    })
  },

  signInWithGoogle: async () => {
    return await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`
      }
    })
  },

  signOut: async () => {
    return await supabase.auth.signOut()
  },

  getUser: async () => {
    return await supabase.auth.getUser()
  },

  getSession: async () => {
    return await supabase.auth.getSession()
  }
}

// Database helpers
export const db = {
  // Profiles
  getProfile: async (userId: string) => {
    return await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
  },

  createProfile: async (profile: Database['public']['Tables']['profiles']['Insert']) => {
    return await supabase
      .from('profiles')
      .insert(profile)
      .select()
      .single()
  },

  updateProfile: async (userId: string, updates: Database['public']['Tables']['profiles']['Update']) => {
    return await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
  },

  // Categories
  getCategories: async (parentId?: string | null) => {
    let query = supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    if (parentId === null) {
      query = query.is('parent_id', null)
    } else if (parentId) {
      query = query.eq('parent_id', parentId)
    }

    return await query
  },

  getCategoriesWithChildren: async () => {
    return await supabase
      .from('categories')
      .select(`
        *,
        children:categories!parent_id(*)
      `)
      .is('parent_id', null)
      .eq('is_active', true)
      .order('sort_order')
  },

  // Listings
  getListings: async (filters: {
    type?: string
    categoryId?: string
    location?: string
    minPrice?: number
    maxPrice?: number
    status?: string
    limit?: number
    offset?: number
    userId?: string
  } = {}) => {
    let query = supabase
      .from('listings')
      .select(`
        *,
        profile:profiles(*),
        category:categories(*),
        images:listing_images(*),
        reviews(rating),
        _count:reviews(count)
      `)

    // Only filter by status if not looking for user's listings
    if (!filters.userId) {
      query = query.eq('status', filters.status || 'active')
    } else {
      query = query.eq('user_id', filters.userId)
      if (filters.status) {
        query = query.eq('status', filters.status)
      }
    }

    if (filters.type) query = query.eq('type', filters.type)
    if (filters.categoryId) query = query.eq('category_id', filters.categoryId)
    if (filters.location) query = query.ilike('location', `%${filters.location}%`)
    if (filters.minPrice) query = query.gte('price', filters.minPrice)
    if (filters.maxPrice) query = query.lte('price', filters.maxPrice)

    query = query
      .order('created_at', { ascending: false })
      .limit(filters.limit || 20)

    if (filters.offset) query = query.range(filters.offset, filters.offset + (filters.limit || 20) - 1)

    return await query
  },

  getListing: async (id: string) => {
    return await supabase
      .from('listings')
      .select(`
        *,
        profile:profiles(*),
        category:categories(*),
        images:listing_images(*),
        job_details(*),
        real_estate_details(*),
        service_details(*),
        food_details(*),
        menu_items(*),
        reviews(*, reviewer:profiles(*))
      `)
      .eq('id', id)
      .single()
  },

  createListing: async (listing: Database['public']['Tables']['listings']['Insert']) => {
    return await supabase
      .from('listings')
      .insert(listing)
      .select()
      .single()
  },

  updateListing: async (id: string, updates: Database['public']['Tables']['listings']['Update']) => {
    return await supabase
      .from('listings')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
  },

  deleteListing: async (id: string) => {
    return await supabase
      .from('listings')
      .delete()
      .eq('id', id)
  },

  incrementViews: async (id: string) => {
    return await supabase.rpc('increment_views', { listing_id: id })
  },

  // Images
  uploadImage: async (file: File, path: string) => {
    return await supabase.storage
      .from('listings')
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      })
  },

  getImageUrl: (path: string) => {
    return supabase.storage
      .from('listings')
      .getPublicUrl(path).data.publicUrl
  },

  // Reviews
  createReview: async (review: Database['public']['Tables']['reviews']['Insert']) => {
    return await supabase
      .from('reviews')
      .insert(review)
      .select()
      .single()
  },

  // Messages
  sendMessage: async (message: Database['public']['Tables']['messages']['Insert']) => {
    return await supabase
      .from('messages')
      .insert(message)
      .select()
      .single()
  },

  getConversation: async (listingId: string, userId1: string, userId2: string) => {
    return await supabase
      .from('messages')
      .select(`
        *,
        sender:profiles!sender_id(*),
        recipient:profiles!recipient_id(*)
      `)
      .eq('listing_id', listingId)
      .or(`and(sender_id.eq.${userId1},recipient_id.eq.${userId2}),and(sender_id.eq.${userId2},recipient_id.eq.${userId1})`)
      .order('created_at')
  },

  // Favorites
  addFavorite: async (userId: string, listingId: string) => {
    return await supabase
      .from('favorites')
      .insert({ user_id: userId, listing_id: listingId })
      .select()
      .single()
  },

  removeFavorite: async (userId: string, listingId: string) => {
    return await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('listing_id', listingId)
  },

  getFavorites: async (userId: string) => {
    return await supabase
      .from('favorites')
      .select(`
        *,
        listing:listings(
          *,
          profile:profiles(*),
          category:categories(*),
          images:listing_images(*)
        )
      `)
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
  }
}

export default supabase