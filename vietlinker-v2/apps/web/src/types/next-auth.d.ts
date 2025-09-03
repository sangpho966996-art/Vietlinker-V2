import 'next-auth'
import type { Profile } from '@/types/database'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      profile?: Profile
    }
  }

  interface User {
    id: string
    email?: string | null
    name?: string | null
    image?: string | null
  }

  interface JWT {
    user?: {
      id: string
      email?: string | null
      name?: string | null
      image?: string | null
    }
    accessToken?: string
  }
}