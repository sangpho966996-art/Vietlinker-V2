'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { 
  ArrowLeft,
  User, 
  Shield, 
  Bell, 
  Mail,
  Lock,
  Trash2,
  LogOut,
  Settings as SettingsIcon
} from 'lucide-react'

export default function SettingsPage() {
  const router = useRouter()
  const { profile, session, loading: authLoading } = useAuth()
  
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  })

  useEffect(() => {
    if (!authLoading && !session) {
      router.push('/auth/signin')
      return
    }
  }, [session, authLoading, router])

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleSignOut = async () => {
    if (confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      await signOut({ callbackUrl: '/' })
    }
  }

  const handleDeleteAccount = () => {
    if (confirm('CẢNH BÁO: Hành động này sẽ xóa vĩnh viễn tài khoản và tất cả dữ liệu của bạn. Bạn có chắc chắn?')) {
      // This would be implemented in a real app
      alert('Tính năng xóa tài khoản sẽ được triển khai trong phiên bản tiếp theo')
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6" />
            <Card className="p-6 mb-6">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
              <div className="space-y-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-12 bg-gray-200 rounded" />
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/dashboard')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Dashboard
          </Button>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <SettingsIcon size={28} />
            Cài đặt tài khoản
          </h1>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <User size={20} />
              Thông tin cá nhân
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Chỉnh sửa hồ sơ</h3>
                  <p className="text-sm text-gray-600">
                    Cập nhật thông tin cá nhân, ảnh đại diện và thông tin liên hệ
                  </p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => router.push('/profile/edit')}
                >
                  Chỉnh sửa
                </Button>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Xem hồ sơ công khai</h3>
                  <p className="text-sm text-gray-600">
                    Xem hồ sơ của bạn như người khác nhìn thấy
                  </p>
                </div>
                <Button 
                  variant="outline"
                  onClick={() => router.push(`/profile/${session?.user?.id}`)}
                >
                  Xem hồ sơ
                </Button>
              </div>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Shield size={20} />
              Bảo mật
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-sm text-gray-600">
                    {profile?.email}
                  </p>
                </div>
                <Button variant="outline" disabled>
                  Đã xác thực
                </Button>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Đổi mật khẩu</h3>
                  <p className="text-sm text-gray-600">
                    Cập nhật mật khẩu để bảo vệ tài khoản
                  </p>
                </div>
                <Button variant="outline" disabled>
                  <Lock size={16} className="mr-2" />
                  Sắp có
                </Button>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Xác thực 2 bước</h3>
                  <p className="text-sm text-gray-600">
                    Tăng cường bảo mật với xác thực 2 bước
                  </p>
                </div>
                <Button variant="outline" disabled>
                  <Shield size={16} className="mr-2" />
                  Sắp có
                </Button>
              </div>
            </div>
          </Card>

          {/* Notification Settings */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Bell size={20} />
              Thông báo
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Thông báo qua email</h3>
                  <p className="text-sm text-gray-600">
                    Nhận thông báo về tin nhắn mới và hoạt động tài khoản
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => handleNotificationChange('email', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Thông báo SMS</h3>
                  <p className="text-sm text-gray-600">
                    Nhận thông báo quan trọng qua tin nhắn
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.sms}
                    onChange={(e) => handleNotificationChange('sms', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Thông báo đẩy</h3>
                  <p className="text-sm text-gray-600">
                    Nhận thông báo trên trình duyệt
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) => handleNotificationChange('push', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-200">
                <div>
                  <h3 className="font-medium text-gray-900">Email marketing</h3>
                  <p className="text-sm text-gray-600">
                    Nhận thông tin về tính năng mới và khuyến mãi
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.marketing}
                    onChange={(e) => handleNotificationChange('marketing', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </Card>

          {/* Account Actions */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Hành động tài khoản
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Đăng xuất</h3>
                  <p className="text-sm text-gray-600">
                    Đăng xuất khỏi tài khoản trên thiết bị này
                  </p>
                </div>
                <Button 
                  variant="outline"
                  onClick={handleSignOut}
                >
                  <LogOut size={16} className="mr-2" />
                  Đăng xuất
                </Button>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-gray-200">
                <div>
                  <h3 className="font-medium text-red-600">Xóa tài khoản</h3>
                  <p className="text-sm text-gray-600">
                    Xóa vĩnh viễn tài khoản và tất cả dữ liệu của bạn
                  </p>
                </div>
                <Button 
                  variant="outline"
                  onClick={handleDeleteAccount}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 size={16} className="mr-2" />
                  Xóa tài khoản
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}