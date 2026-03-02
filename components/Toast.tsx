'use client'
// components/Toast.tsx
import { create } from 'zustand'
import { useEffect } from 'react'

interface ToastStore {
  message: string
  show: boolean
  showToast: (msg: string) => void
}

export const useToast = create<ToastStore>(set => ({
  message: '',
  show: false,
  showToast: (message) => {
    set({ message, show: true })
    setTimeout(() => set({ show: false }), 2800)
  },
}))

export default function Toast() {
  const { message, show } = useToast()
  return <div className={`toast ${show ? 'show' : ''}`}>{message}</div>
}
