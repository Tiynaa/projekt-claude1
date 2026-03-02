'use client'
// components/CursorEffect.tsx
import { useEffect, useRef } from 'react'

export default function CursorEffect() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }

    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1
      ring.current.y += (pos.current.y - ring.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top = ring.current.y + 'px'
      }
      requestAnimationFrame(tick)
    }

    const enterLink = () => {
      cursorRef.current?.classList.add('hovering')
      ringRef.current?.classList.add('hovering')
    }
    const leaveLink = () => {
      cursorRef.current?.classList.remove('hovering')
      ringRef.current?.classList.remove('hovering')
    }

    document.addEventListener('mousemove', move)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', enterLink)
      el.addEventListener('mouseleave', leaveLink)
    })

    const raf = requestAnimationFrame(tick)
    return () => {
      document.removeEventListener('mousemove', move)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
