import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { SupabaseAdapter } from '@auth/supabase-adapter'
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export const authOptions: NextAuthOptions = {
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'openid email profile',
          prompt: 'consent',
        }
      }
    })
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: '/auth/signin',
    signUp: '/auth/signup',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // Create or update profile in our custom profiles table
        try {
          const { data: existingProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (!existingProfile) {
            // Create new profile
            await supabase
              .from('profiles')
              .insert({
                id: user.id,
                email: user.email!,
                full_name: user.name,
                avatar_url: user.image,
              })
          } else {
            // Update existing profile
            await supabase
              .from('profiles')
              .update({
                full_name: user.name,
                avatar_url: user.image,
                updated_at: new Date().toISOString(),
              })
              .eq('id', user.id)
          }
        } catch (error) {
          console.error('Error creating/updating profile:', error)
          return false
        }
      }
      return true
    },

    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          }
        }
      }

      return token
    },

    async session({ session, token }) {
      if (token?.user) {
        session.user = {
          ...session.user,
          id: token.user.id,
        }
      }

      // Fetch fresh profile data from our custom table
      if (session.user?.id) {
        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profile) {
            session.user.profile = profile
          }
        } catch (error) {
          console.error('Error fetching profile:', error)
        }
      }

      return session
    },

    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
  },

  events: {
    async createUser({ user }) {
      console.log('New user created:', user.id)
    },
    
    async signIn({ user, account, isNewUser }) {
      console.log('User signed in:', user.id, 'New user:', isNewUser)
    },
    
    async signOut({ session }) {
      console.log('User signed out:', session?.user?.id)
    },
  },

  debug: process.env.NODE_ENV === 'development',
}

// Helper functions for server-side auth
export async function getServerSession() {
  const { getServerSession } = await import('next-auth')
  return await getServerSession(authOptions)
}

export async function requireAuth() {
  const session = await getServerSession()
  if (!session?.user) {
    throw new Error('Authentication required')
  }
  return session
}