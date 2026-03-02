'use client'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import CartDrawer from '@/components/CartDrawer'
import CursorEffect from '@/components/CursorEffect'
import Toast from '@/components/Toast'
import Footer from '@/components/Footer'
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <CursorEffect />
          <Header />
          <CartDrawer />
          <Toast />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}