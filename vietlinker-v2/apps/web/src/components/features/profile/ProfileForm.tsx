'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Avatar } from '@/components/ui/Avatar'
import type { Profile, UpdateProfileData } from '@/types/database'
import { User, Building, Save, X } from 'lucide-react'

interface ProfileFormProps {
  profile: Profile | null
  onSubmit: (data: UpdateProfileData) => Promise<void>
  onCancel?: () => void
  loading?: boolean
}

export function ProfileForm({ 
  profile, 
  onSubmit, 
  onCancel, 
  loading = false 
}: ProfileFormProps) {
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
  
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
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
  }, [profile])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (formData.is_business && !formData.business_name.trim()) {
      newErrors.business_name = 'Tên doanh nghiệp là bắt buộc'
    }

    if (formData.phone && !/^(\+84|0)[1-9]\d{8,9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ'
    }

    if (formData.website && !formData.website.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)) {
      newErrors.website = 'Địa chỉ website không hợp lệ'
    }

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = 'Mô tả không được vượt quá 500 ký tự'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const updates: UpdateProfileData = {
      full_name: formData.full_name.trim() || null,
      bio: formData.bio.trim() || null,
      phone: formData.phone.trim() || null,
      location: formData.location.trim() || null,
      website: formData.website.trim() || null,
      is_business: formData.is_business,
      business_name: formData.is_business ? formData.business_name.trim() || null : null,
      business_license: formData.is_business ? formData.business_license.trim() || null : null
    }

    await onSubmit(updates)
  }

  return (
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
            Tính năng upload avatar sẽ được triển khai trong phiên bản tiếp theo
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
              error={errors.full_name}
              maxLength={100}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mô tả bản thân
              </label>
              <textarea
                className={`w-full min-h-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
                  errors.bio ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Viết vài dòng về bản thân bạn..."
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-1">
                <p className="text-xs text-gray-500">
                  {formData.bio.length}/500 ký tự
                </p>
                {errors.bio && (
                  <p className="text-xs text-red-600">{errors.bio}</p>
                )}
              </div>
            </div>

            <Input
              label="Số điện thoại"
              type="tel"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              error={errors.phone}
            />

            <Input
              label="Địa chỉ"
              type="text"
              placeholder="Nhập địa chỉ của bạn"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              error={errors.location}
            />

            <Input
              label="Website"
              type="url"
              placeholder="https://example.com"
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
              error={errors.website}
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
                error={errors.business_name}
                required={formData.is_business}
              />

              <Input
                label="Giấy phép kinh doanh"
                type="text"
                placeholder="Số giấy phép kinh doanh"
                value={formData.business_license}
                onChange={(e) => handleInputChange('business_license', e.target.value)}
                error={errors.business_license}
              />
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-6">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              <X size={16} className="mr-2" />
              Hủy
            </Button>
          )}
          
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
  )
}