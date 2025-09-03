'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Input } from '@/components/ui/Input'
import { useAuth } from '@/contexts/AuthContext'
import { db } from '@/lib/supabase'
import type { Listing } from '@/types/database'
import { 
  ArrowLeft,
  Plus, 
  Search, 
  Filter,
  Eye, 
  Edit, 
  Trash2,
  MapPin,
  Calendar,
  MoreHorizontal
} from 'lucide-react'

export default function ManageListingsPage() {
  const router = useRouter()
  const { session, loading: authLoading } = useAuth()
  
  const [listings, setListings] = useState<Listing[]>([])
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'draft' | 'sold' | 'expired'>('all')

  const fetchListings = React.useCallback(async () => {
    if (!session?.user?.id) return

    try {
      const { data: userListings, error } = await db.getListings({ 
        userId: session.user.id,
        limit: 100 
      })
      if (error) throw error

      setListings(userListings || [])
    } catch (err) {
      console.error('Error fetching listings:', err)
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
      fetchListings()
    }
  }, [session, authLoading, router, fetchListings])

  useEffect(() => {
    // Filter listings based on search and status
    let filtered = listings

    if (searchQuery.trim()) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(listing => listing.status === statusFilter)
    }

    setFilteredListings(filtered)
  }, [listings, searchQuery, statusFilter])

  const handleDeleteListing = async (listingId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa tin đăng này?')) return

    try {
      const { error } = await db.deleteListing(listingId)
      if (error) throw error

      setListings(prev => prev.filter(listing => listing.id !== listingId))
    } catch (err) {
      console.error('Error deleting listing:', err)
      alert('Có lỗi xảy ra khi xóa tin đăng')
    }
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
            <div className="space-y-4">
              {[1,2,3,4].map(i => (
                <Card key={i} className="p-6">
                  <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push('/dashboard')}
            >
              <ArrowLeft size={16} className="mr-2" />
              Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              Quản lý tin đăng ({filteredListings.length})
            </h1>
          </div>
          
          <Button onClick={() => router.push('/listings/create')}>
            <Plus size={16} className="mr-2" />
            Đăng tin mới
          </Button>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Tìm kiếm theo tiêu đề hoặc mô tả..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                icon={<Search size={16} />}
              />
            </div>
            
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang hiển thị</option>
                <option value="draft">Bản nháp</option>
                <option value="sold">Đã bán</option>
                <option value="expired">Hết hạn</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Listings */}
        {filteredListings.length === 0 ? (
          <Card className="p-12 text-center">
            {listings.length === 0 ? (
              <>
                <div className="text-gray-400 mb-4">
                  <Plus size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Chưa có tin đăng nào
                </h3>
                <p className="text-gray-600 mb-6">
                  Bắt đầu bằng cách tạo tin đăng đầu tiên của bạn
                </p>
                <Button onClick={() => router.push('/listings/create')}>
                  <Plus size={16} className="mr-2" />
                  Đăng tin ngay
                </Button>
              </>
            ) : (
              <>
                <div className="text-gray-400 mb-4">
                  <Search size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  Không tìm thấy tin đăng nào
                </h3>
                <p className="text-gray-600">
                  Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc
                </p>
              </>
            )}
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredListings.map((listing) => (
              <Card key={listing.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-6">
                  {/* Thumbnail */}
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0" />
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 mr-4">
                        <h3 className="text-lg font-medium text-gray-900 truncate mb-2">
                          {listing.title}
                        </h3>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <Badge 
                            variant={
                              listing.status === 'active' ? 'success' : 
                              listing.status === 'draft' ? 'secondary' : 
                              'destructive'
                            }
                            className="text-xs"
                          >
                            {listing.status === 'active' && 'Đang hiển thị'}
                            {listing.status === 'draft' && 'Bản nháp'}
                            {listing.status === 'sold' && 'Đã bán'}
                            {listing.status === 'expired' && 'Hết hạn'}
                          </Badge>
                          
                          <Badge variant="outline" className="text-xs">
                            {listing.type === 'marketplace' && 'Mua bán'}
                            {listing.type === 'service' && 'Dịch vụ'}
                            {listing.type === 'job' && 'Việc làm'}
                            {listing.type === 'real_estate' && 'Bất động sản'}
                            {listing.type === 'food' && 'Ăn uống'}
                            {listing.type === 'classified' && 'Rao vặt'}
                          </Badge>
                          
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Eye size={12} />
                            {listing.views_count || 0} lượt xem
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          {listing.location && (
                            <div className="flex items-center gap-1">
                              <MapPin size={14} />
                              <span>{listing.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(listing.created_at).toLocaleDateString('vi-VN')}</span>
                          </div>
                        </div>
                      </div>

                      {/* Price and Actions */}
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600 mb-4">
                          {listing.price 
                            ? `${listing.price.toLocaleString('vi-VN')} ${listing.currency}`
                            : 'Liên hệ'
                          }
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Link href={`/listings/${listing.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye size={14} className="mr-2" />
                              Xem
                            </Button>
                          </Link>
                          <Link href={`/listings/${listing.id}/edit`}>
                            <Button variant="outline" size="sm">
                              <Edit size={14} className="mr-2" />
                              Sửa
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteListing(listing.id)}
                            className="text-red-600 border-red-200 hover:bg-red-50"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}