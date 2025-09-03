'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'
import { useAuth } from '@/contexts/AuthContext'
import { db } from '@/lib/supabase'
import type { UpdateProfileData } from '@/types/database'
import { User, Building, Save, X } from 'lucide-react'

export default function EditProfilePage() {
  const router = useRouter()
  const { profile, session, loading: authLoading, refreshProfile } = useAuth()
  
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    phone: '',
    location: '',
    website: '',
    is_business: false,
    business_name: '',
    business_license: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/auth/signin')
      return
    }

    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        bio: profile.bio || '',
        phone: profile.phone || '',
        location: profile.location || '',
        website: profile.website || '',
        is_business: profile.is_business || false,
        business_name: profile.business_name || '',
        business_license: profile.business_license || ''
      })
    }
  }, [profile, session, authLoading, router])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setError(null)
    setSuccess(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!session?.user?.id) return

    setLoading(true)
    setError(null)

    try {
      const updates: UpdateProfileData = {
        full_name: formData.full_name || null,
        bio: formData.bio || null,
        phone: formData.phone || null,
        location: formData.location || null,
        website: formData.website || null,
        is_business: formData.is_business,
        business_name: formData.is_business ? formData.business_name || null : null,
        business_license: formData.is_business ? formData.business_license || null : null
      }

      const { error } = await db.updateProfile(session.user.id, updates)
      
      if (error) throw error

      setSuccess(true)
      await refreshProfile()
      
      // Redirect back to profile after a short delay
      setTimeout(() => {
        router.push(`/profile/${session.user.id}`)
      }, 1500)

    } catch (err) {
      console.error('Error updating profile:', err)
      setError('Có lỗi xảy ra khi cập nhật hồ sơ. Vui lòng thử lại.')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <div className="animate-pulse">
            <Card className="p-6">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6" />
              <div className="space-y-4">
                <div className="h-12 bg-gray-200 rounded" />
                <div className="h-24 bg-gray-200 rounded" />
                <div className="h-12 bg-gray-200 rounded" />
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Chỉnh sửa hồ sơ</h1>
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            disabled={loading}
          >
            <X size={16} className="mr-2" />
            Hủy
          </Button>
        </div>

        <Card className="p-6">
          {/* Current Avatar Display */}
          <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <Avatar
              src={profile?.avatar_url}
              alt={profile?.full_name || profile?.email || 'Avatar'}
              size="md"
            />
            <div>
              <p className="font-medium text-gray-900">Ảnh đại diện</p>
              <p className="text-sm text-gray-600">
                Upload avatar sẽ được triển khai trong phiên bản tiếp theo
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User size={20} />
                Thông tin cá nhân
              </h3>
              
              <div className="space-y-4">
                <Input
                  label="Họ và tên"
                  type="text"
                  placeholder="Nhập họ và tên của bạn"
                  value={formData.full_name}
                  onChange={(e) => handleInputChange('full_name', e.target.value)}
                  maxLength={100}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mô tả bản thân
                  </label>
                  <textarea
                    className="w-full min-h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                    placeholder="Viết vài dòng về bản thân bạn..."
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.bio.length}/500 ký tự
                  </p>
                </div>

                <Input
                  label="Số điện thoại"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />

                <Input
                  label="Địa chỉ"
                  type="text"
                  placeholder="Nhập địa chỉ của bạn"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />

                <Input
                  label="Website"
                  type="url"
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                />
              </div>
            </div>

            {/* Business Information */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="is_business"
                  checked={formData.is_business}
                  onChange={(e) => handleInputChange('is_business', e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_business" className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Building size={20} />
                  Tài khoản doanh nghiệp
                </label>
              </div>

              {formData.is_business && (
                <div className="space-y-4 ml-6">
                  <Input
                    label="Tên doanh nghiệp"
                    type="text"
                    placeholder="Nhập tên doanh nghiệp"
                    value={formData.business_name}
                    onChange={(e) => handleInputChange('business_name', e.target.value)}
                    required={formData.is_business}
                  />

                  <Input
                    label="Giấy phép kinh doanh"
                    type="text"
                    placeholder="Số giấy phép kinh doanh"
                    value={formData.business_license}
                    onChange={(e) => handleInputChange('business_license', e.target.value)}
                  />
                </div>
              )}
            </div>

            {/* Form Messages */}
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-600 text-sm">
                  Cập nhật hồ sơ thành công! Đang chuyển hướng...
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                disabled={loading}
                className="min-w-32"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Đang lưu...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Save size={16} />
                    Lưu thay đổi
                  </div>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}