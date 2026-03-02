// lib/store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  notes: string
  price: number
  qty: number
  slug: string
  bottleColor: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'qty'>) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  total: () => number
  count: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const existing = get().items.find(i => i.id === item.id)
        if (existing) {
          set(s => ({ items: s.items.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) }))
        } else {
          set(s => ({ items: [...s.items, { ...item, qty: 1 }] }))
        }
      },

      removeItem: (id) => set(s => ({ items: s.items.filter(i => i.id !== id) })),

      updateQty: (id, qty) => {
        if (qty < 1) { get().removeItem(id); return }
        set(s => ({ items: s.items.map(i => i.id === id ? { ...i, qty } : i) }))
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set(s => ({ isOpen: !s.isOpen })),

      total: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
      count: () => get().items.reduce((s, i) => s + i.qty, 0),
    }),
    { name: 'seve-cart' }
  )
)
