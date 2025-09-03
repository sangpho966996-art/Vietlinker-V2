'use client'

import { signIn, getSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const errorParam = searchParams.get('error')

  useEffect(() => {
    // Check if user is already signed in
    getSession().then(session => {
      if (session) {
        router.push(callbackUrl)
      }
    })

    // Handle error parameter
    if (errorParam) {
      switch (errorParam) {
        case 'OAuthSignin':
          setError('Error constructing an authorization URL')
          break
        case 'OAuthCallback':
          setError('Error in handling the response from the OAuth provider')
          break
        case 'OAuthCreateAccount':
          setError('Could not create OAuth account')
          break
        case 'EmailCreateAccount':
          setError('Could not create email account')
          break
        case 'Callback':
          setError('Error in the OAuth callback handler route')
          break
        case 'OAuthAccountNotLinked':
          setError('OAuth account is not linked to an existing account')
          break
        case 'SessionRequired':
          setError('You must be signed in to access this page')
          break
        default:
          setError('An error occurred during authentication')
      }
    }
  }, [callbackUrl, errorParam, router])

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await signIn('google', {
        callbackUrl,
        redirect: false,
      })

      if (result?.error) {
        setError('Failed to sign in with Google')
      } else if (result?.url) {
        router.push(result.url)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập VietLinker
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Kết nối cộng đồng Việt Nam qua marketplace và dịch vụ
          </p>
        </div>
        
        <div className="mt-8 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Đang đăng nhập...
              </div>
            ) : (
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Đăng nhập với Google
              </div>
            )}
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Bằng cách đăng nhập, bạn đồng ý với{' '}
              <a href="/terms" className="text-blue-600 hover:text-blue-500">
                Điều khoản sử dụng
              </a>{' '}
              và{' '}
              <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                Chính sách bảo mật
              </a>{' '}
              của chúng tôi.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}