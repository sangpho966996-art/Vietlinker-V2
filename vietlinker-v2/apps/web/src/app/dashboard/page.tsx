'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { useAuth } from '@/contexts/AuthContext'
import { db } from '@/lib/supabase'
import type { Listing } from '@/types/database'
import { 
  User, 
  Settings, 
  Plus, 
  Eye, 
  MessageSquare, 
  Heart,
  TrendingUp,
  Package,
  Edit3,
  Star,
  MapPin
} from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const { profile, session, loading: authLoading } = useAuth()
  
  const [listings, setListings] = useState<Listing[]>([])
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalViews: 0,
    draftListings: 0
  })
  const [loading, setLoading] = useState(true)

  const fetchDashboardData = React.useCallback(async () => {
    if (!session?.user?.id) return

    try {
      // Fetch user's listings (all statuses for dashboard)
      const { data: userListings, error } = await db.getListings({ 
        userId: session.user.id,
        limit: 100 
      })
      if (error) throw error
      setListings(userListings || [])

      // Calculate stats
      const totalViews = (userListings || []).reduce((sum, listing) => sum + (listing.views_count || 0), 0)
      const activeCount = (userListings || []).filter(listing => listing.status === 'active').length
      const draftCount = (userListings || []).filter(listing => listing.status === 'draft').length

      setStats({
        totalListings: (userListings || []).length,
        activeListings: activeCount,
        totalViews,
        draftListings: draftCount
      })

    } catch (err) {
      console.error('Error fetching dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }, [session?.user?.id])

  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/auth/signin')
      return
    }

    if (session?.user?.id) {
      fetchDashboardData()
    }
  }, [session, authLoading, router, fetchDashboardData])

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[1,2,3,4].map(i => (
                <Card key={i} className="p-6">
                  <div className="h-12 bg-gray-200 rounded mb-4" />
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Avatar
              src={profile?.avatar_url}
              alt={profile?.full_name || profile?.email || 'Avatar'}
              size="md"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Chào {profile?.full_name || 'bạn'}!
              </h1>
              <p className="text-gray-600">
                Quản lý tin đăng và thông tin cá nhân của bạn
              </p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => router.push('/profile/edit')}
            >
              <Edit3 size={16} className="mr-2" />
              Sửa hồ sơ
            </Button>
            <Button onClick={() => router.push('/listings/create')}>
              <Plus size={16} className="mr-2" />
              Đăng tin
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <Package className="text-blue-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stats.totalListings}
            </div>
            <div className="text-sm text-gray-600">Tổng tin đăng</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mb-4">
              <TrendingUp className="text-green-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stats.activeListings}
            </div>
            <div className="text-sm text-gray-600">Đang hiển thị</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
              <Eye className="text-purple-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stats.totalViews.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Lượt xem</div>
          </Card>

          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mb-4">
              <Edit3 className="text-yellow-600" size={24} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {stats.draftListings}
            </div>
            <div className="text-sm text-gray-600">Bản nháp</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Listings */}
          <div className="lg:col-span-2">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Tin đăng gần đây
                </h2>
                <Link href="/dashboard/listings">
                  <Button variant="outline" size="sm">
                    Xem tất cả
                  </Button>
                </Link>
              </div>

              {listings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg mb-4">
                    <Package className="text-gray-400" size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Chưa có tin đăng nào
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Bắt đầu bằng cách đăng tin đầu tiên của bạn
                  </p>
                  <Button onClick={() => router.push('/listings/create')}>
                    <Plus size={16} className="mr-2" />
                    Đăng tin ngay
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {listings.slice(0, 5).map((listing) => (
                    <div
                      key={listing.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {listing.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge 
                            variant={listing.status === 'active' ? 'success' : listing.status === 'draft' ? 'secondary' : 'destructive'}
                            className="text-xs"
                          >
                            {listing.status === 'active' && 'Đang hiển thị'}
                            {listing.status === 'draft' && 'Bản nháp'}
                            {listing.status === 'sold' && 'Đã bán'}
                            {listing.status === 'expired' && 'Hết hạn'}
                          </Badge>
                          {listing.location && (
                            <div className="flex items-center gap-1 text-xs text-gray-500">
                              <MapPin size={12} />
                              <span className="truncate">{listing.location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-gray-900">
                          {listing.price 
                            ? `${listing.price.toLocaleString('vi-VN')} ${listing.currency}`
                            : 'Liên hệ'
                          }
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Eye size={12} />
                          {listing.views_count || 0} lượt xem
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Hành động nhanh
              </h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/listings/create')}
                >
                  <Plus size={16} className="mr-3" />
                  Đăng tin mới
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/listings')}
                >
                  <Package size={16} className="mr-3" />
                  Quản lý tin đăng
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/favorites')}
                >
                  <Heart size={16} className="mr-3" />
                  Tin đã lưu
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/messages')}
                >
                  <MessageSquare size={16} className="mr-3" />
                  Tin nhắn
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tài khoản
              </h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/profile/edit')}
                >
                  <User size={16} className="mr-3" />
                  Chỉnh sửa hồ sơ
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => router.push('/dashboard/settings')}
                >
                  <Settings size={16} className="mr-3" />
                  Cài đặt
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}