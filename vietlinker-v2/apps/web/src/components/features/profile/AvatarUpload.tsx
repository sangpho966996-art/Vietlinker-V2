'use client'

import { useState, useRef } from 'react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { Upload, Camera, X, Check } from 'lucide-react'

interface AvatarUploadProps {
  currentAvatar?: string | null
  userName?: string
  onUpload: (file: File) => Promise<void>
  loading?: boolean
  disabled?: boolean
}

export function AvatarUpload({ 
  currentAvatar, 
  userName, 
  onUpload, 
  loading = false,
  disabled = false
}: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn file hình ảnh')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File không được vượt quá 5MB')
      return
    }

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleUpload = async () => {
    const file = fileInputRef.current?.files?.[0]
    if (file) {
      await onUpload(file)
      setPreview(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const clearPreview = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Camera size={20} />
        Ảnh đại diện
      </h3>

      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Current Avatar */}
        <div className="flex flex-col items-center">
          <Avatar
            src={preview || currentAvatar}
            alt={userName || 'Avatar'}
            size="xl"
            className="mb-2"
          />
          <p className="text-sm text-gray-600 text-center">
            {preview ? 'Xem trước' : 'Ảnh hiện tại'}
          </p>
        </div>

        {/* Upload Area */}
        <div className="flex-1 w-full">
          {!disabled ? (
            <>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">
                  Kéo thả ảnh vào đây
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Hoặc click để chọn file từ máy tính
                </p>
                
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                >
                  <Upload size={16} className="mr-2" />
                  Chọn ảnh
                </Button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              <div className="text-xs text-gray-500 mt-2">
                Hỗ trợ: JPG, PNG, GIF. Tối đa 5MB.
              </div>

              {preview && (
                <div className="flex items-center gap-3 mt-4">
                  <Button
                    onClick={handleUpload}
                    disabled={loading}
                    className="flex-1"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                        Đang tải lên...
                      </>
                    ) : (
                      <>
                        <Check size={16} className="mr-2" />
                        Cập nhật ảnh đại diện
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={clearPreview}
                    disabled={loading}
                  >
                    <X size={16} />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-lg mb-4">
                <Camera className="text-gray-400" size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Tính năng đang phát triển
              </h3>
              <p className="text-gray-600">
                Upload avatar sẽ được triển khai trong phiên bản tiếp theo
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}