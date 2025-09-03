'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { db } from '@/lib/supabase'
import type { Profile, Listing } from '@/types/database'
import { MapPin, Phone, Mail, Globe, Star, Calendar, User, Building } from 'lucide-react'

export default function ProfilePage() {
  const params = useParams()
  const userId = params.id as string
  
  const [profile, setProfile] = useState<Profile | null>(null)
  const [listings, setListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!userId) return

      try {
        // Fetch profile
        const { data: profileData, error: profileError } = await db.getProfile(userId)
        if (profileError) throw profileError
        setProfile(profileData)

        // Fetch user's listings
        const { data: userListings, error: listingsError } = await db.getListings({
          userId: userId,
          status: 'active',
          limit: 12
        })
        if (listingsError) throw listingsError
        
        setListings(userListings || [])

      } catch (err) {
        console.error('Error fetching profile:', err)
        setError('Không thể tải thông tin hồ sơ')
      } finally {
        setLoading(false)
      }
    }

    fetchProfileData()
  }, [userId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <Card className="p-6 mb-6">
              <div className="flex items-start gap-6">
                <div className="w-24 h-24 bg-gray-200 rounded-full" />
                <div className="flex-1">
                  <div className="h-8 bg-gray-200 rounded w-1/3 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="p-6 text-center">
            <div className="text-gray-400 mb-4">
              <User size={48} className="mx-auto" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Không tìm thấy hồ sơ
            </h1>
            <p className="text-gray-600 mb-6">
              {error || 'Hồ sơ người dùng này không tồn tại hoặc đã bị xóa.'}
            </p>
            <Button onClick={() => window.history.back()}>
              Quay lại
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex items-start gap-6">
            <Avatar
              src={profile.avatar_url}
              alt={profile.full_name || profile.email}
              size="lg"
              className="flex-shrink-0"
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-gray-900">
                  {profile.full_name || 'Người dùng VietLinker'}
                </h1>
                {profile.is_verified && (
                  <Badge variant="success" className="text-xs">
                    <Star size={12} className="mr-1" />
                    Đã xác thực
                  </Badge>
                )}
                {profile.is_business && (
                  <Badge variant="secondary" className="text-xs">
                    <Building size={12} className="mr-1" />
                    Doanh nghiệp
                  </Badge>
                )}
              </div>
              
              {profile.bio && (
                <p className="text-gray-600 mb-4">{profile.bio}</p>
              )}
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                {profile.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center gap-1">
                    <Phone size={16} />
                    <span>{profile.phone}</span>
                  </div>
                )}
                {profile.website && (
                  <div className="flex items-center gap-1">
                    <Globe size={16} />
                    <a 
                      href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      Website
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar size={16} />
                  <span>
                    Tham gia {new Date(profile.created_at).toLocaleDateString('vi-VN', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {profile.is_business && profile.business_name && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Thông tin doanh nghiệp
              </h3>
              <p className="text-gray-600">{profile.business_name}</p>
            </div>
          )}
        </Card>

        {/* Listings Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Tin đăng ({listings.length})
          </h2>
          
          {listings.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-gray-400 mb-4">
                <Building size={48} className="mx-auto" />
              </div>
              <p className="text-gray-600">Chưa có tin đăng nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((listing) => (
                <Card key={listing.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-3" />
                  <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                    {listing.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                      {listing.price 
                        ? `${listing.price.toLocaleString('vi-VN')} ${listing.currency}`
                        : 'Liên hệ'
                      }
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {listing.type === 'marketplace' && 'Mua bán'}
                      {listing.type === 'service' && 'Dịch vụ'}
                      {listing.type === 'job' && 'Việc làm'}
                      {listing.type === 'real_estate' && 'Bất động sản'}
                      {listing.type === 'food' && 'Ăn uống'}
                      {listing.type === 'classified' && 'Rao vặt'}
                    </Badge>
                  </div>
                  {listing.location && (
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                      <MapPin size={12} />
                      <span>{listing.location}</span>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}