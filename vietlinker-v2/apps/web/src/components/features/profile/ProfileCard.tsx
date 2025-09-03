import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Profile } from '@/types/database'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Star, 
  Calendar, 
  Building,
  Edit,
  MessageSquare
} from 'lucide-react'

interface ProfileCardProps {
  profile: Profile
  isOwner?: boolean
  showActions?: boolean
  compact?: boolean
}

export function ProfileCard({ 
  profile, 
  isOwner = false, 
  showActions = true,
  compact = false 
}: ProfileCardProps) {
  return (
    <Card className={`p-6 ${compact ? 'shadow-sm' : ''}`}>
      <div className="flex items-start gap-6">
        <Avatar
          src={profile.avatar_url}
          alt={profile.full_name || profile.email}
          size={compact ? "md" : "lg"}
          className="flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2">
            <h2 className={`font-bold text-gray-900 ${compact ? 'text-lg' : 'text-2xl'}`}>
              {profile.full_name || 'Người dùng VietLinker'}
            </h2>
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
          
          {profile.bio && !compact && (
            <p className="text-gray-600 mb-4 leading-relaxed">{profile.bio}</p>
          )}
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
            {profile.location && (
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{profile.location}</span>
              </div>
            )}
            {profile.phone && !compact && (
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

          {showActions && (
            <div className="flex items-center gap-3">
              {isOwner ? (
                <Link href="/profile/edit">
                  <Button variant="outline">
                    <Edit size={16} className="mr-2" />
                    Chỉnh sửa hồ sơ
                  </Button>
                </Link>
              ) : (
                <Button>
                  <MessageSquare size={16} className="mr-2" />
                  Nhắn tin
                </Button>
              )}
              
              {!compact && (
                <Link href={`/profile/${profile.id}`}>
                  <Button variant="outline">
                    Xem hồ sơ đầy đủ
                  </Button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      {profile.is_business && profile.business_name && !compact && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <Building size={20} />
            Thông tin doanh nghiệp
          </h3>
          <p className="text-gray-600">{profile.business_name}</p>
          {profile.business_license && (
            <p className="text-sm text-gray-500 mt-1">
              Giấy phép: {profile.business_license}
            </p>
          )}
        </div>
      )}
    </Card>
  )
}