'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import type { Session } from 'next-auth'
import { supabase } from '@/lib/supabase'
import type { Profile } from '@/types/database'

interface AuthContextType {
  session: Session | null
  profile: Profile | null
  loading: boolean
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshProfile = React.useCallback(async () => {
    if (!session?.user?.id) {
      setProfile(null)
      return
    }

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single()

      if (error) {
        console.error('Error fetching profile:', error)
        setProfile(null)
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      setProfile(null)
    }
  }, [session?.user?.id])

  useEffect(() => {
    if (status === 'loading') return

    if (session?.user?.id) {
      refreshProfile()
    } else {
      setProfile(null)
    }

    setLoading(false)
  }, [session, status, refreshProfile])

  return (
    <AuthContext.Provider 
      value={{ 
        session, 
        profile, 
        loading: loading || status === 'loading', 
        refreshProfile 
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Helper hooks
export function useProfile() {
  const { profile } = useAuth()
  return profile
}

export function useRequireAuth() {
  const { session, loading } = useAuth()
  
  useEffect(() => {
    if (!loading && !session) {
      // Redirect to sign in if not authenticated
      window.location.href = '/auth/signin'
    }
  }, [session, loading])

  return { session, loading }
}