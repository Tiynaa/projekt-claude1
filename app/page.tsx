'use client'
// app/page.tsx
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Bottle from '@/components/Bottle'
import { useCartStore } from '@/lib/store'
import { useToast } from '@/components/Toast'

const PRODUCTS = [
  { id: '1', slug: 'foret-noire', name: 'Forêt Noire', notes: 'Vetiver · Smoke · Pine', price: 22000, bottleColor: '#3D4A3E', num: '01', featured: true },
  { id: '2', slug: 'dune-doree', name: 'Dune Dorée', notes: 'Oud · Amber · Vanilla', price: 26000, bottleColor: '#8C6A30', num: '02', featured: true },
  { id: '3', slug: 'sel-marin', name: 'Sel Marin', notes: 'Neroli · Sea Salt · Musk', price: 19500, bottleColor: '#4A6B7A', num: '03', featured: false },
  { id: '4', slug: 'rose-obscure', name: 'Rose Obscure', notes: 'Bulgarian Rose · Suede · Pepper', price: 24000, bottleColor: '#7A3D4A', num: '04', featured: true },
  { id: '5', slug: 'cedre-blanc', name: 'Cèdre Blanc', notes: 'Cedar · Iris · Vetiver', price: 21500, bottleColor: '#5C5040', num: '05', featured: false },
  { id: '6', slug: 'solstice', name: 'Solstice', notes: 'Bergamot · White Musk · Skin', price: 18500, bottleColor: '#7A6840', num: '06', featured: false },
]

const MARQUEE = ['Rare Botanical', 'Small Batch', 'Lyon France', 'Handcrafted', 'Natural Ingredients', 'Artisan Perfumery']

export default function Home() {
  const { addItem } = useCartStore()
  const { showToast } = useToast()
  const [added, setAdded] = useState<Record<string, boolean>>({})
  const revealRefs = useRef<HTMLElement[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleAdd = (product: typeof PRODUCTS[0]) => {
    addItem({ id: product.id, name: product.name, notes: product.notes, price: product.price, slug: product.slug, bottleColor: product.bottleColor })
    showToast(`${product.name} added to your selection`)
    setAdded(a => ({ ...a, [product.id]: true }))
    setTimeout(() => setAdded(a => ({ ...a, [product.id]: false })), 1800)
  }

  return (
    <>
      {/* HERO */}
      <section style={heroStyles.section}>
        <div style={heroStyles.text}>
          <p style={{ ...heroStyles.eyebrow, animation: 'fadeUp 0.8s 0.3s both' }}>
            Maison de Parfum · Est. 2019
          </p>
          <h1 style={{ ...heroStyles.title, animation: 'fadeUp 0.8s 0.5s both' }}>
            Where <em style={{ color: 'var(--gold)', fontStyle: 'italic' }}>nature</em><br />meets memory
          </h1>
          <p style={{ ...heroStyles.desc, animation: 'fadeUp 0.8s 0.7s both' }}>
            Each fragrance is a story written in rare botanicals, aged woods, and the quiet poetry of forgotten places. Crafted in small batches. Made to last a lifetime.
          </p>
          <div style={{ display: 'flex', gap: 16, animation: 'fadeUp 0.8s 0.9s both' } as any}>
            <Link href="#collection" className="btn-primary" style={{ padding: '16px 40px' }}>
              Explore Collection
            </Link>
            <Link href="/about" className="btn-ghost" style={{ padding: '16px 32px' }}>
              Our Story
            </Link>
          </div>
        </div>

        <div style={heroStyles.visual}>
          <div style={heroStyles.ring1} />
          <div style={heroStyles.ring2} />
          <span style={heroStyles.floatText1}>Rare · Botanical</span>
          <span style={heroStyles.floatText2}>Small Batch · Artisan</span>
          <div style={{ animation: 'bottleFloat 5s ease-in-out infinite' }}>
            <Bottle color="#B8965A" size={280} label="Sève" number="No." />
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={marqueeStyles.wrap}>
        <div style={marqueeStyles.track}>
          {[...MARQUEE, ...MARQUEE].map((item, i) => (
            <span key={i} style={marqueeStyles.item}>
              {item} <span style={{ color: 'rgba(184,150,90,0.4)', margin: '0 20px' }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* COLLECTION */}
      <section id="collection" style={{ padding: '100px 64px' }}>
        <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 64 }}>
          <div>
            <p className="section-eyebrow">The Collection</p>
            <h2 className="section-title">Six <em>expressions</em> — one house</h2>
          </div>
          <span style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Free shipping over €150
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onAdd={handleAdd} added={!!added[p.id]} />
          ))}
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section style={aboutStripStyles.section}>
        <div className="reveal-left" style={{ flex: 1 }}>
          <p className="section-eyebrow" style={{ color: 'var(--gold)' }}>Maison Sève</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,54px)', fontWeight: 300, lineHeight: 1.1, color: 'var(--cream)', marginBottom: 24 }}>
            Perfumery as a <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>practice</em>,<br />not a product
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(245,240,232,0.55)', maxWidth: 440, marginBottom: 36 }}>
            We founded Sève with one conviction: that a great fragrance should tell you something true about the world. Not what luxury is supposed to smell like — but what a specific morning in a specific forest actually smells like.
          </p>
          <Link href="/about" style={{ display: 'inline-block', borderBottom: '1px solid var(--gold)', paddingBottom: 4, fontSize: 11, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none' }}>
            Read Our Story
          </Link>
        </div>

        <div className="reveal-right" style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
            {['#3D4A3E', '#7A3D4A', '#4A6B7A'].map((c, i) => (
              <div key={c} style={{ transform: i === 1 ? 'translateY(-24px)' : 'translateY(0)', opacity: 0.7 + i * 0.1 }}>
                <Bottle color={c} size={120} label="Sève" number={`0${i+1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '100px 64px', borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48 }}>
          {[
            { num: '01', title: 'Natural Ingredients', desc: 'Every raw material is traceable to its origin. We publish sourcing information for every formulation.' },
            { num: '02', title: 'Small Batch Only', desc: 'Each fragrance is produced in runs of 200–500 bottles. When it\'s gone, it\'s gone.' },
            { num: '03', title: 'Free Returns', desc: 'Not the right fit? We offer free returns within 30 days. Fragrance is personal — we understand.' },
          ].map((f, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.15}s`, borderTop: '1px solid var(--border)', paddingTop: 36 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.3em', color: 'var(--gold)', display: 'block', marginBottom: 16 }}>{f.num}</span>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 400, marginBottom: 12 }}>{f.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--muted)' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }
        @keyframes bottleFloat { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-14px) } }
        @keyframes marqueeAnim { from { transform:translateX(0) } to { transform:translateX(-50%) } }
        @keyframes rotSlow { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }
        @keyframes rotSlowR { from { transform:rotate(0deg) } to { transform:rotate(-360deg) } }
      `}</style>
    </>
  )
}

function ProductCard({ product, index, onAdd, added }: { product: any; index: number; onAdd: (p: any) => void; added: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="reveal"
      style={{
        background: 'var(--card-bg)',
        padding: '48px 36px 36px',
        position: 'relative',
        overflow: 'hidden',
        transitionDelay: `${index * 0.08}s`,
        cursor: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Hover overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(184,150,90,0.04), transparent)',
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s',
      }} />

      <p style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: 32, textTransform: 'uppercase' }}>
        No. {product.num}
      </p>

      <div style={{ height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
        <div style={{ transform: hovered ? 'translateY(-10px) scale(1.04)' : 'translateY(0) scale(1)', transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
          <Bottle color={product.bottleColor} size={180} label="Sève" number={product.num} />
        </div>
      </div>

      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 400, marginBottom: 6 }}>{product.name}</h3>
      <p style={{ fontSize: 10, letterSpacing: '0.18em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 28 }}>{product.notes}</p>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'var(--gold)' }}>
          €{(product.price / 100).toFixed(0)}
        </span>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link href={`/product/${product.slug}`} className="btn-ghost" style={{ padding: '10px 16px', fontSize: 10 }}>View</Link>
          <button className={added ? 'btn-primary' : 'btn-ghost'} style={{ padding: '10px 18px', fontSize: 10 }} onClick={() => onAdd(product)}>
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

const heroStyles: Record<string, any> = {
  section: {
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    padding: '140px 64px 80px',
    gap: 60,
  },
  text: {},
  eyebrow: { fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 28, display: 'block' },
  title: { fontFamily: 'var(--font-display)', fontSize: 'clamp(52px,6vw,88px)', fontWeight: 300, lineHeight: 1.05, marginBottom: 28 },
  desc: { fontSize: 14, lineHeight: 1.9, color: 'var(--muted)', maxWidth: 400, marginBottom: 44 },
  visual: {
    position: 'relative', display: 'flex',
    alignItems: 'center', justifyContent: 'center',
    height: '65vh',
  },
  ring1: {
    position: 'absolute', width: 380, height: 380,
    border: '1px solid var(--border)', borderRadius: '50%',
    animation: 'rotSlow 22s linear infinite',
  },
  ring2: {
    position: 'absolute', width: 520, height: 520,
    border: '1px solid rgba(184,150,90,0.08)', borderRadius: '50%',
    animation: 'rotSlowR 32s linear infinite',
  },
  floatText1: { position: 'absolute', top: '12%', left: '2%', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' },
  floatText2: { position: 'absolute', bottom: '18%', right: '-2%', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' },
}

const marqueeStyles: Record<string, any> = {
  wrap: { overflow: 'hidden', background: 'var(--ink)', borderTop: '1px solid rgba(184,150,90,0.15)', borderBottom: '1px solid rgba(184,150,90,0.15)', padding: '18px 0' },
  track: { display: 'flex', whiteSpace: 'nowrap', animation: 'marqueeAnim 22s linear infinite' },
  item: { fontFamily: 'var(--font-display)', fontSize: 13, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', flexShrink: 0 },
}

const aboutStripStyles: Record<string, any> = {
  section: {
    background: 'var(--ink)',
    padding: '100px 64px',
    display: 'flex',
    gap: 80,
    alignItems: 'center',
  },
}
