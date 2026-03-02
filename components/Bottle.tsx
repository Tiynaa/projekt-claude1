// components/Bottle.tsx
interface BottleProps {
  color?: string
  size?: number
  className?: string
  label?: string
  number?: string
}

export default function Bottle({ color = '#B8965A', size = 160, className = '', label = 'Sève', number = '01' }: BottleProps) {
  const id = color.replace('#', 'c')
  const w = size * 0.6875
  const h = size

  return (
    <svg width={w} height={h} viewBox="0 0 220 320" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D4C4A8" />
          <stop offset="45%" stopColor="#F5F0E8" />
          <stop offset="100%" stopColor={color} stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id={`liq-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0.72" />
        </linearGradient>
        <linearGradient id={`cap-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2C2520" />
          <stop offset="100%" stopColor="#1A1612" />
        </linearGradient>
      </defs>

      {/* Cap */}
      <rect x="78" y="22" width="64" height="32" rx="5" fill={`url(#cap-${id})`} />
      <rect x="84" y="22" width="10" height="32" rx="2" fill="rgba(255,255,255,0.06)" />

      {/* Neck */}
      <rect x="88" y="54" width="44" height="36" rx="3" fill={`url(#bg-${id})`} />

      {/* Shoulders */}
      <path d="M50 90 Q50 78 88 78 L132 78 Q170 78 170 90 L170 100 L50 100 Z" fill={`url(#bg-${id})`} />

      {/* Body */}
      <rect x="50" y="98" width="120" height="190" rx="8" fill={`url(#bg-${id})`} />

      {/* Liquid */}
      <rect x="54" y="148" width="112" height="136" rx="6" fill={`url(#liq-${id})`} />

      {/* Label background */}
      <rect x="62" y="162" width="96" height="90" rx="3" fill="rgba(245,240,232,0.93)" />

      {/* Label content */}
      <text x="110" y="192" textAnchor="middle" fontFamily="'Cormorant Garamond',serif" fontSize="16" fontStyle="italic" fill="#1A1612">{label}</text>
      <line x1="74" y1="202" x2="146" y2="202" stroke={color} strokeWidth="0.6" />
      <text x="110" y="220" textAnchor="middle" fontFamily="Raleway,sans-serif" fontSize="7" letterSpacing="3.5" fill="#8C8070">PARFUM</text>
      <text x="110" y="238" textAnchor="middle" fontFamily="Raleway,sans-serif" fontSize="6.5" letterSpacing="2.5" fill={color}>No. {number}</text>

      {/* Shine */}
      <rect x="58" y="100" width="16" height="186" rx="4" fill="white" opacity="0.14" />
      <rect x="78" y="100" width="6" height="186" fill="white" opacity="0.05" />

      {/* Neck shine */}
      <rect x="92" y="56" width="7" height="32" rx="1" fill="white" opacity="0.15" />
    </svg>
  )
}
