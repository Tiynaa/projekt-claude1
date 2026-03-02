'use client'
// app/order/success/page.tsx
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCartStore } from '@/lib/store'

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const { clearCart } = useCartStore()

  useEffect(() => { clearCart() }, [])

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 64px' }}>
      <div style={{ textAlign: 'center', maxWidth: 560 }}>
        <div style={{ width: 64, height: 64, border: '1px solid var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px', fontSize: 24, color: 'var(--gold)' }}>
          ✓
        </div>
        <p style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
          Order Confirmed
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 300, lineHeight: 1.1, marginBottom: 20 }}>
          Thank you for your<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>selection</em>
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--muted)', marginBottom: 12 }}>
          Your order has been confirmed and will be prepared with care in our Lyon atelier. You'll receive a shipping confirmation email within 1–2 business days.
        </p>
        {sessionId && (
          <p style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 40 }}>
            Reference: {sessionId.slice(-12).toUpperCase()}
          </p>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link href="/#collection" className="btn-primary" style={{ padding: '14px 32px' }}>Continue Shopping</Link>
          <Link href="/about" className="btn-ghost" style={{ padding: '14px 24px' }}>Our Story</Link>
        </div>
      </div>
    </div>
  )
}
