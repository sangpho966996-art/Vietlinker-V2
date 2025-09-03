import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VietLinker - Vietnamese Marketplace & Services',
  description: 'Connect Vietnamese communities through marketplace, services, jobs, real estate, food, and classifieds.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}