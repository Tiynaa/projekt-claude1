'use client'
// components/CartDrawer.tsx
import { useCartStore } from '@/lib/store'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQty, total } = useCartStore()
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleCheckout = async () => {
    if (!items.length) return
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(i => ({ id: i.id, qty: i.qty })),
          email: session?.user?.email,
        }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={closeCart} />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-head">
          <h2>Your Selection</h2>
          <button className="cart-close" onClick={closeCart}>×</button>
        </div>

        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty-msg">
              <p>Your cart is empty</p>
              <span>Explore our collection</span>
            </div>
          ) : (
            items.map(item => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-notes">{item.notes}</div>
                  <div className="cart-item-price">€{((item.price * item.qty) / 100).toFixed(0)}</div>
                  <div className="cart-item-qty">
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span className="qty-num">{item.qty}</span>
                    <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                </div>
                <button style={{ background: 'none', border: 'none', color: 'var(--muted)', fontSize: 20, cursor: 'none', alignSelf: 'flex-start', paddingTop: 4 }} onClick={() => removeItem(item.id)}>×</button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-foot">
            <div className="cart-subtotal">
              <span className="cart-subtotal-label">Subtotal</span>
              <span className="cart-subtotal-price">€{(total() / 100).toFixed(0)}</span>
            </div>
            <p className="cart-note">Shipping calculated at checkout · Free over €150</p>
            <button className="checkout-btn" onClick={handleCheckout} disabled={loading}>
              {loading ? 'Redirecting...' : 'Proceed to Checkout'}
            </button>
          </div>
        )}
      </div>
    </>
  )
}
