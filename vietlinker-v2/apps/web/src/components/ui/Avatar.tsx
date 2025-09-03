import * as React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

const AvatarRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
))
AvatarRoot.displayName = 'AvatarRoot'

interface AvatarImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height'> {
  alt: string
  width?: number
  height?: number
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt, width = 100, height = 100, ...props }, ref) => (
    <Image
      ref={ref}
      className={cn('aspect-square h-full w-full object-cover', className)}
      alt={alt}
      width={width}
      height={height}
      {...props}
    />
  )
)
AvatarImage.displayName = 'AvatarImage'

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600',
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = 'AvatarFallback'

// Avatar wrapper component with convenient props
interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string | null
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  fallback?: string
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, size = 'md', fallback, className, ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-8 w-8',
      md: 'h-12 w-12', 
      lg: 'h-16 w-16',
      xl: 'h-24 w-24'
    }

    const getInitials = (name?: string) => {
      if (!name) return '?'
      return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }

    return (
      <AvatarRoot 
        ref={ref} 
        className={cn(sizeClasses[size], className)} 
        {...props}
      >
        {src ? (
          <AvatarImage src={src} alt={alt || 'Avatar'} />
        ) : (
          <AvatarFallback>
            {fallback || getInitials(alt)}
          </AvatarFallback>
        )}
      </AvatarRoot>
    )
  }
)
Avatar.displayName = 'Avatar'

export { Avatar, AvatarRoot, AvatarImage, AvatarFallback }