'use client'
// app/blog/page.tsx
import { useEffect } from 'react'
import Link from 'next/link'

const POSTS = [
  {
    slug: 'art-of-layering-fragrances',
    title: 'The Art of Layering Fragrances',
    excerpt: 'How to combine scents to create something uniquely yours — a guide to fragrance layering for the curious nose.',
    category: 'Craft',
    readTime: 6,
    publishedAt: 'January 15, 2025',
    featured: true,
  },
  {
    slug: 'sourcing-rare-ingredients',
    title: 'Sourcing Rare Ingredients: A Journey',
    excerpt: 'From the oud forests of Assam to the rose fields of Kazanlak — how we find the world\'s finest raw materials.',
    category: 'Ingredients',
    readTime: 8,
    publishedAt: 'February 3, 2025',
    featured: false,
  },
  {
    slug: 'fragrance-and-memory',
    title: 'Fragrance and Memory: The Science of Scent',
    excerpt: 'Why does a particular smell transport you instantly to a specific moment? The neuroscience of olfactory memory.',
    category: 'Science',
    readTime: 7,
    publishedAt: 'February 20, 2025',
    featured: false,
  },
]

const CATEGORY_COLORS: Record<string, string> = {
  Craft: '#3D4A3E',
  Ingredients: '#8C6A30',
  Science: '#4A6B7A',
}

export default function BlogPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const featured = POSTS.find(p => p.featured)
  const rest = POSTS.filter(p => !p.featured)

  return (
    <>
      {/* HERO */}
      <section style={{ background: 'var(--ink)', padding: '160px 64px 80px' }}>
        <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, animation: 'fadeUp 0.7s 0.2s both' }}>
          Journal
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(48px,6vw,80px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.05, animation: 'fadeUp 0.7s 0.4s both' }}>
          Notes on <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>fragrance</em>,<br />craft, and beauty
        </h1>
      </section>

      {/* FEATURED */}
      {featured && (
        <section style={{ padding: '80px 64px', borderBottom: '1px solid var(--border)' }}>
          <Link href={`/blog/${featured.slug}`} style={{ textDecoration: 'none', color: 'inherit', cursor: 'none', display: 'block' }}>
            <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
              {/* Visual placeholder */}
              <div style={{ height: 420, background: 'var(--cream-dark)', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(184,150,90,0.08), transparent)' }} />
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 120, fontStyle: 'italic', color: 'var(--gold)', opacity: 0.12, lineHeight: 1 }}>Craft</span>
                <div style={{ position: 'absolute', bottom: 24, left: 24 }}>
                  <span style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', background: 'rgba(26,22,18,0.6)', padding: '6px 14px' }}>
                    Featured
                  </span>
                </div>
              </div>

              <div>
                <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
                  {featured.category} · {featured.readTime} min read
                </p>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,3.5vw,52px)', fontWeight: 300, lineHeight: 1.1, marginBottom: 24 }}>
                  {featured.title}
                </h2>
                <p style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--muted)', marginBottom: 32, maxWidth: 440 }}>
                  {featured.excerpt}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', borderBottom: '1px solid var(--gold)', paddingBottom: 3 }}>
                    Read Article
                  </span>
                  <span style={{ color: 'var(--muted)', fontSize: 11 }}>→</span>
                </div>
                <p style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--muted)', marginTop: 20 }}>{featured.publishedAt}</p>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* GRID */}
      <section style={{ padding: '80px 64px 100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
          {rest.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit', cursor: 'none', display: 'block' }}>
              <div className="reveal" style={{ background: 'var(--card-bg)', padding: 48, transitionDelay: `${i * 0.1}s` }}>
                <div style={{ height: 240, background: 'var(--cream-dark)', marginBottom: 32, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${CATEGORY_COLORS[post.category] || '#3D4A3E'}18, transparent)` }} />
                  <span style={{ fontFamily: 'var(--font-display)', fontSize: 80, fontStyle: 'italic', color: CATEGORY_COLORS[post.category] || 'var(--gold)', opacity: 0.15, lineHeight: 1 }}>
                    {post.category}
                  </span>
                </div>

                <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>
                  {post.category} · {post.readTime} min read
                </p>

                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, lineHeight: 1.15, marginBottom: 16 }}>
                  {post.title}
                </h3>

                <p style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--muted)', marginBottom: 28 }}>
                  {post.excerpt}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                  <span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'var(--muted)' }}>{post.publishedAt}</span>
                  <span style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Read →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ background: 'var(--ink)', padding: '80px 64px', textAlign: 'center' }}>
        <div className="reveal">
          <p className="section-eyebrow" style={{ color: 'var(--gold)', marginBottom: 16 }}>Stay Close</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: 'var(--cream)', marginBottom: 16, lineHeight: 1.1 }}>
            Notes from <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>the atelier</em>
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(245,240,232,0.45)', marginBottom: 36, maxWidth: 400, margin: '0 auto 36px' }}>
            New fragrances, sourcing stories, and essays on the nature of scent. Sent rarely. Never sold.
          </p>
          <div style={{ display: 'flex', gap: 0, maxWidth: 440, margin: '0 auto', justifyContent: 'center' }}>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                flex: 1, padding: '16px 24px',
                background: 'rgba(245,240,232,0.06)',
                border: '1px solid rgba(184,150,90,0.25)',
                borderRight: 'none',
                color: 'var(--cream)',
                fontFamily: 'var(--font-body)',
                fontSize: 12, letterSpacing: '0.05em',
                outline: 'none',
              }}
            />
            <button className="btn-gold" style={{ flexShrink: 0, padding: '16px 28px', fontSize: 10 }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </>
  )
}
