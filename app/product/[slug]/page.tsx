'use client'
// app/product/[slug]/page.tsx
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Bottle from '@/components/Bottle'
import { useCartStore } from '@/lib/store'
import { useToast } from '@/components/Toast'

const PRODUCTS: Record<string, any> = {
  'foret-noire': {
    id: '1', slug: 'foret-noire', name: 'Forêt Noire', subtitle: 'A walk through forgotten woods',
    notes: 'Vetiver · Smoke · Pine', price: 22000, bottleColor: '#3D4A3E', num: '01',
    description: 'Forêt Noire opens with a breath of cold air through pine needles, drifting into a heart of wet earth and smoke. The dry-down settles into vetiver and dark wood — a fragrance that lingers like the memory of a place you\'ve never been.',
    story: 'Inspired by the Black Forest in winter. The perfumer spent three days walking through its depths in January, collecting impressions that became this scent.',
    topNotes: ['Pine Needle', 'Cold Air', 'Green Fern'],
    heartNotes: ['Wet Earth', 'Birch Smoke', 'Oakmoss'],
    baseNotes: ['Haitian Vetiver', 'Dark Wood', 'Ambergris'],
    intensity: 'Intense', longevity: '10–14 hours', season: 'Autumn · Winter',
    relatedSlugs: ['dune-doree', 'cedre-blanc'],
  },
  'dune-doree': {
    id: '2', slug: 'dune-doree', name: 'Dune Dorée', subtitle: 'The warmth of golden sand at dusk',
    notes: 'Oud · Amber · Vanilla', price: 26000, bottleColor: '#8C6A30', num: '02',
    description: 'Rich and enveloping, Dune Dorée is a meditation on warmth. Oud from the Middle East meets French amber and Madagascar vanilla in a composition that is simultaneously opulent and intimate.',
    story: 'Created after a journey through Oman. The scent captures that precise moment when the desert turns from gold to amber at sundown.',
    topNotes: ['Saffron', 'Pink Pepper', 'Cardamom'],
    heartNotes: ['Omani Oud', 'French Labdanum', 'Rose Absolute'],
    baseNotes: ['Madagascar Vanilla', 'Amber', 'Sandalwood'],
    intensity: 'Rich', longevity: '14–18 hours', season: 'All seasons',
    relatedSlugs: ['foret-noire', 'rose-obscure'],
  },
  'sel-marin': {
    id: '3', slug: 'sel-marin', name: 'Sel Marin', subtitle: 'Salt air and open horizon',
    notes: 'Neroli · Sea Salt · White Musk', price: 19500, bottleColor: '#4A6B7A', num: '03',
    description: 'Sel Marin is clarity in a bottle. Neroli blossoms drift over the salinity of an Atlantic coast, lifted by a clean white musk that leaves skin smelling like morning after rain by the sea.',
    story: 'Born from a summer in Brittany. The perfumer describes it as "the feeling of standing at the edge of everything, looking out."',
    topNotes: ['Sicilian Bergamot', 'Sea Salt', 'Ozone'],
    heartNotes: ['Neroli', 'Sea Iris', 'Water Lily'],
    baseNotes: ['White Musk', 'Driftwood', 'Ambergris'],
    intensity: 'Light', longevity: '6–8 hours', season: 'Spring · Summer',
    relatedSlugs: ['solstice', 'cedre-blanc'],
  },
  'rose-obscure': {
    id: '4', slug: 'rose-obscure', name: 'Rose Obscure', subtitle: 'The dark side of beauty',
    notes: 'Bulgarian Rose · Suede · Black Pepper', price: 24000, bottleColor: '#7A3D4A', num: '04',
    description: 'This is not a gentle rose. Rose Obscure takes the queen of flowers and places her in shadow — surrounded by suede, dusted with black pepper, anchored by a base of patchouli and dark woods.',
    story: 'A deliberate subversion of the rose fragrance. Created for those who find conventional florals too soft, too obvious.',
    topNotes: ['Black Pepper', 'Cardamom', 'Elemi'],
    heartNotes: ['Bulgarian Rose Absolute', 'Suede', 'Geranium'],
    baseNotes: ['Patchouli', 'Dark Oud', 'Amberwood'],
    intensity: 'Bold', longevity: '12–16 hours', season: 'Autumn · Winter',
    relatedSlugs: ['dune-doree', 'foret-noire'],
  },
  'cedre-blanc': {
    id: '5', slug: 'cedre-blanc', name: 'Cèdre Blanc', subtitle: 'Stillness and clarity',
    notes: 'Cedar · Iris · Vetiver', price: 21500, bottleColor: '#5C5040', num: '05',
    description: 'Cèdre Blanc is the scent of an empty room filled with light. Cedar and iris create an architectural space that feels simultaneously warm and cool, lived-in and pristine.',
    story: 'Influenced by Japanese minimalism. The perfumer worked for six months to remove every superfluous note, until only the essential remained.',
    topNotes: ['Aldehydes', 'Grapefruit', 'Green Tea'],
    heartNotes: ['Iris Root', 'White Cedar', 'Violet'],
    baseNotes: ['Haitian Vetiver', 'White Musks', 'Cashmere Wood'],
    intensity: 'Moderate', longevity: '8–12 hours', season: 'All seasons',
    relatedSlugs: ['sel-marin', 'solstice'],
  },
  'solstice': {
    id: '6', slug: 'solstice', name: 'Solstice', subtitle: 'Light at its longest',
    notes: 'Bergamot · White Musk · Skin', price: 18500, bottleColor: '#7A6840', num: '06',
    description: 'The lightest fragrance in our collection. Solstice was designed to smell like skin — warm, clean, alive. Bergamot lifts into white musk and slowly disappears into you.',
    story: 'Created during the summer solstice in Provence. It smells like the longest day of the year feels.',
    topNotes: ['Bergamot', 'Solar Notes', 'Lemon Verbena'],
    heartNotes: ['Jasmine Sambac', 'Skin Musk', 'Peach Skin'],
    baseNotes: ['White Musk', 'Cashmeran', 'Ambroxan'],
    intensity: 'Sheer', longevity: '6–8 hours', season: 'Spring · Summer',
    relatedSlugs: ['sel-marin', 'cedre-blanc'],
  },
}

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const product = PRODUCTS[slug]
  const { addItem } = useCartStore()
  const { showToast } = useToast()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState<'notes' | 'story' | 'details'>('notes')

  useEffect(() => {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      new IntersectionObserver(entries => {
        entries.forEach(e => e.isIntersecting && e.target.classList.add('in'))
      }, { threshold: 0.1 }).observe(el)
    })
  }, [])

  if (!product) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontStyle: 'italic', color: 'var(--muted)' }}>Product not found</p>
        <Link href="/#collection" className="btn-primary" style={{ marginTop: 24, display: 'inline-block', padding: '14px 32px' }}>Back to Collection</Link>
      </div>
    </div>
  )

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, notes: product.notes, price: product.price, slug: product.slug, bottleColor: product.bottleColor })
    }
    showToast(`${product.name} added to your selection`)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const related = product.relatedSlugs.map((s: string) => PRODUCTS[s]).filter(Boolean)

  return (
    <>
      {/* BREADCRUMB */}
      <div style={{ paddingTop: 100, paddingLeft: 64, paddingBottom: 20 }}>
        <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 10px' }}>·</span>
          <Link href="/#collection" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Collection</Link>
          <span style={{ margin: '0 10px' }}>·</span>
          <span style={{ color: 'var(--ink)' }}>{product.name}</span>
        </p>
      </div>

      {/* MAIN PRODUCT */}
      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, padding: '40px 64px 100px', minHeight: '80vh', alignItems: 'center' }}>
        {/* Visual */}
        <div className="reveal-left" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', height: '60vh' }}>
          <div style={{ position: 'absolute', width: 400, height: 400, border: '1px solid var(--border)', borderRadius: '50%', animation: 'rotSlow 25s linear infinite' }} />
          <div style={{ animation: 'bottleFloat 5s ease-in-out infinite' }}>
            <Bottle color={product.bottleColor} size={320} label="Sève" number={product.num} />
          </div>
          <p style={{ position: 'absolute', bottom: '8%', left: '8%', fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>
            50 ML
          </p>
        </div>

        {/* Info */}
        <div className="reveal-right">
          <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>
            No. {product.num}
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,4vw,64px)', fontWeight: 300, lineHeight: 1.05, marginBottom: 8 }}>
            {product.name}
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontStyle: 'italic', color: 'var(--muted)', marginBottom: 20 }}>
            {product.subtitle}
          </p>
          <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 32 }}>
            {product.notes}
          </p>

          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--ink)', maxWidth: 480, marginBottom: 40 }}>
            {product.description}
          </p>

          {/* Price + qty */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 36, color: 'var(--gold)' }}>
              €{(product.price / 100).toFixed(0)}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, border: '1px solid var(--border)' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 40, height: 44, background: 'none', border: 'none', fontSize: 18, cursor: 'none', color: 'var(--ink)', transition: 'background 0.2s' }}>−</button>
              <span style={{ width: 44, textAlign: 'center', fontSize: 14 }}>{qty}</span>
              <button onClick={() => setQty(q => Math.min(10, q + 1))} style={{ width: 40, height: 44, background: 'none', border: 'none', fontSize: 18, cursor: 'none', color: 'var(--ink)', transition: 'background 0.2s' }}>+</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
            <button className={added ? 'btn-primary' : 'btn-gold'} style={{ flex: 1, padding: '16px 24px', fontSize: 11 }} onClick={handleAdd}>
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button className="btn-ghost" style={{ padding: '16px 20px' }}>♡</button>
          </div>

          <p style={{ fontSize: 11, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 32 }}>
            Free shipping on orders over €150 · Returns within 30 days
          </p>

          {/* Meta pills */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {[
              { label: 'Intensity', val: product.intensity },
              { label: 'Longevity', val: product.longevity },
              { label: 'Season', val: product.season },
            ].map(m => (
              <div key={m.label} style={{ border: '1px solid var(--border)', padding: '10px 16px' }}>
                <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 4 }}>{m.label}</p>
                <p style={{ fontSize: 12, color: 'var(--ink)' }}>{m.val}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TABS: Notes / Story / Details */}
      <section style={{ padding: '0 64px 100px' }}>
        <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', display: 'flex', gap: 0, marginBottom: 56 }}>
          {(['notes', 'story', 'details'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none', border: 'none', borderRight: '1px solid var(--border)',
                padding: '18px 36px', fontSize: 10, letterSpacing: '0.25em',
                textTransform: 'uppercase', cursor: 'none',
                color: activeTab === tab ? 'var(--ink)' : 'var(--muted)',
                borderBottom: activeTab === tab ? '2px solid var(--gold)' : '2px solid transparent',
                fontFamily: 'var(--font-body)', transition: 'color 0.3s',
                marginBottom: -1,
              }}
            >
              {tab === 'notes' ? 'Fragrance Notes' : tab === 'story' ? 'The Story' : 'Details'}
            </button>
          ))}
        </div>

        {activeTab === 'notes' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
            {[
              { tier: 'Top Notes', items: product.topNotes, desc: 'First impression · 0–30 min' },
              { tier: 'Heart Notes', items: product.heartNotes, desc: 'The core · 30 min–4 hrs' },
              { tier: 'Base Notes', items: product.baseNotes, desc: 'The foundation · 4–18 hrs' },
            ].map((tier, i) => (
              <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
                <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{tier.tier}</p>
                <p style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 24 }}>{tier.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {tier.items.map((note: string, j: number) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 300 }}>{note}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'story' && (
          <div className="reveal" style={{ maxWidth: 640 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', lineHeight: 1.7, color: 'var(--ink)', marginBottom: 24 }}>
              "{product.story}"
            </p>
            <div style={{ width: 40, height: 1, background: 'var(--gold)', marginBottom: 24 }} />
            <p style={{ fontSize: 13, lineHeight: 1.9, color: 'var(--muted)' }}>
              Every Sève fragrance begins with a specific place and a specific moment. Our perfumer travels to collect raw impressions before a single formula is attempted. This fragrance took {Math.floor(Math.random() * 8 + 6)} months from first concept to final formula.
            </p>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, maxWidth: 700 }}>
            {[
              ['Volume', '50 ML Eau de Parfum'],
              ['Concentration', '22–25% Fragrance Oil'],
              ['Origin', 'Lyon, France'],
              ['Ingredients', '100% Natural Perfumery Materials'],
              ['Bottle', 'Mouth-blown glass with machined cap'],
              ['Cruelty Free', 'Yes · Never tested on animals'],
              ['Vegan', 'Yes · No animal-derived ingredients'],
              ['Batch Size', '200–500 bottles per run'],
            ].map(([k, v]) => (
              <div key={k} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 16 }}>
                <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 6 }}>{k}</p>
                <p style={{ fontSize: 13, color: 'var(--ink)' }}>{v}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* RELATED */}
      <section style={{ padding: '60px 64px 100px', borderTop: '1px solid var(--border)' }}>
        <p className="section-eyebrow reveal" style={{ marginBottom: 8 }}>You May Also Like</p>
        <h2 className="section-title reveal" style={{ marginBottom: 48 }}>Continue <em>exploring</em></h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {related.map((p: any, i: number) => (
            <Link key={p.slug} href={`/product/${p.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="reveal" style={{ background: 'var(--card-bg)', padding: '40px', display: 'flex', gap: 32, alignItems: 'center', transitionDelay: `${i * 0.1}s`, cursor: 'none' }}>
                <Bottle color={p.bottleColor} size={120} label="Sève" number={p.num} />
                <div>
                  <p style={{ fontSize: 10, letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: 8 }}>No. {p.num}</p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 300, marginBottom: 6 }}>{p.name}</h3>
                  <p style={{ fontSize: 10, letterSpacing: '0.15em', color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 16 }}>{p.notes}</p>
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--gold)' }}>€{(p.price / 100).toFixed(0)}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes rotSlow { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }
        @keyframes bottleFloat { 0%,100% { transform:translateY(0) } 50% { transform:translateY(-14px) } }
      `}</style>
    </>
  )
}
