'use client'
// components/Header.tsx
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCartStore } from '@/lib/store'
import { useSession, signOut } from 'next-auth/react'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const { toggleCart, count } = useCartStore()
  const pathname = usePathname()
  const cartCount = count()
  const { data: session } = useSession()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <Link href="/" className="logo">SÈ<span>V</span>E</Link>

      <nav className="nav">
        <Link href="/#collection" className={isActive('/') ? 'active' : ''}>Collection</Link>
        <Link href="/about" className={isActive('/about') ? 'active' : ''}>Our Story</Link>
        <Link href="/blog" className={isActive('/blog') ? 'active' : ''}>Journal</Link>
      </nav>

      <div className="header-actions">
        {session ? (
          <button className="btn-ghost" onClick={() => signOut()}>Sign Out</button>
        ) : (
          <Link href="/auth/login" className="btn-ghost">Sign In</Link>
        )}
        <button className="btn-ghost cart-badge" onClick={toggleCart} style={{ position: 'relative' }}>
          Cart
          <span className={`cart-dot ${cartCount > 0 ? 'show' : ''}`}>{cartCount}</span>
        </button>
      </div>
    </header>
  )
}
