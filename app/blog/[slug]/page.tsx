'use client'
// app/blog/[slug]/page.tsx
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

const POSTS: Record<string, any> = {
  'art-of-layering-fragrances': {
    title: 'The Art of Layering Fragrances',
    category: 'Craft', readTime: 6, publishedAt: 'January 15, 2025',
    excerpt: 'How to combine scents to create something uniquely yours.',
    content: [
      { type: 'p', text: 'Fragrance layering is one of perfumery\'s great pleasures and greatest mysteries. The idea is simple: apply more than one fragrance simultaneously to create something neither could achieve alone. The practice, however, requires intuition, experimentation, and patience.' },
      { type: 'h2', text: 'Start with anchors' },
      { type: 'p', text: 'Every layered composition needs a foundation — something that sits close to the skin and lasts. Our Forêt Noire or Dune Dorée work beautifully as base layers. Their depth and longevity give lighter fragrances something to rest upon.' },
      { type: 'h2', text: 'Add the middle voice' },
      { type: 'p', text: 'This is where your personality enters. Rose Obscure worn over Sel Marin creates an unexpected coastal rose that shouldn\'t work — and does. Cèdre Blanc over Dune Dorée builds a spiced wood that transforms across the day.' },
      { type: 'h2', text: 'The rule of three' },
      { type: 'p', text: 'Rarely does one need more than three fragrances layered. Two is often perfect. Three is the maximum before the composition becomes muddled. Think of it like cooking: restraint produces clarity.' },
      { type: 'h2', text: 'Application order matters' },
      { type: 'p', text: 'Apply the heaviest, most complex fragrance first. Let it dry for 30 seconds. Then add lighter layers on top. This ensures each note has space to breathe before the next arrives.' },
      { type: 'h2', text: 'Skin chemistry is everything' },
      { type: 'p', text: 'What works on paper — or on someone else — may read differently on your skin. Your body heat, pH, and natural oils change every fragrance. Experiment on your own skin, never on paper strips.' },
      { type: 'p', text: 'The most personal fragrance you will ever wear is one you created yourself. We encourage it.' },
    ],
    related: ['sourcing-rare-ingredients', 'fragrance-and-memory'],
  },
  'sourcing-rare-ingredients': {
    title: 'Sourcing Rare Ingredients: A Journey',
    category: 'Ingredients', readTime: 8, publishedAt: 'February 3, 2025',
    excerpt: 'From the oud forests of Assam to the rose fields of Kazanlak.',
    content: [
      { type: 'p', text: 'Every fragrance begins long before it reaches a perfumer\'s organ. It begins in a field, a forest, a distillery in a place most people will never visit. Sourcing these materials is as much an art as the blending that follows.' },
      { type: 'h2', text: 'Bulgarian Rose — Kazanlak Valley' },
      { type: 'p', text: 'The Rose Valley of Bulgaria produces some of the finest rosa damascena in the world. The harvest window is precisely 20 days in May. Each blossom must be picked before 10am. One kilogram of absolute requires approximately 3.5 tons of petals. We work with the same family-run distillery we\'ve sourced from since 2019.' },
      { type: 'h2', text: 'Oud — Assam, India' },
      { type: 'p', text: 'Genuine agarwood oud is one of the most expensive raw materials in the world. The resin forms inside Aquilaria trees when they become infected with a particular mold — a process that takes decades. We source only ethically farmed oud from plantations that replant faster than they harvest.' },
      { type: 'h2', text: 'Vetiver — Haiti and Réunion' },
      { type: 'p', text: 'Haitian vetiver has a smoky, earthy quality that differs markedly from Réunion\'s cleaner, more floral expression. We use both, in different formulations, for exactly this reason. The roots are steam-distilled after 18 months of growth.' },
      { type: 'h2', text: 'Transparency is not optional' },
      { type: 'p', text: 'We believe you should know where your fragrance comes from. Every ingredient in every Sève fragrance is traceable to its source. We publish this information because the people who grow and tend these materials deserve recognition as much as the perfumers who transform them.' },
    ],
    related: ['art-of-layering-fragrances', 'fragrance-and-memory'],
  },
  'fragrance-and-memory': {
    title: 'Fragrance and Memory: The Science of Scent',
    category: 'Science', readTime: 7, publishedAt: 'February 20, 2025',
    excerpt: 'Why does a particular smell transport you instantly to a specific moment?',
    content: [
      { type: 'p', text: 'Of all the senses, smell has the most direct pathway to memory. This is not metaphor — it is anatomy.' },
      { type: 'h2', text: 'The olfactory system' },
      { type: 'p', text: 'When you inhale a scent, odor molecules travel through the nasal cavity to the olfactory epithelium, where they bind to receptor neurons. These neurons send signals directly to the olfactory bulb, which connects immediately to two critical brain regions: the amygdala (which processes emotion) and the hippocampus (which is central to memory formation).' },
      { type: 'p', text: 'This is why smell bypasses the rational, analytical mind in a way that sound and vision cannot. A smell does not remind you of something — it returns you to it.' },
      { type: 'h2', text: 'The Proustian phenomenon' },
      { type: 'p', text: 'Marcel Proust described it precisely in his novel — the madeleine dipped in tea that returns the narrator entirely to his childhood in Combray. Researchers now call this involuntary autobiographical memory "the Proustian phenomenon." It is triggered more reliably and vividly by smell than by any other sense.' },
      { type: 'h2', text: 'Why fragrances become yours' },
      { type: 'p', text: 'When you wear a perfume consistently during a particular period of your life — first love, a summer abroad, a period of great work — the scent becomes encoded alongside those memories. Returning to it years later does not merely remind you of those times. For a moment, you are there.' },
      { type: 'h2', text: 'Creating new memories' },
      { type: 'p', text: 'This is why we believe choosing a fragrance is significant. The scent you wear today is being woven into the memories of tomorrow. Choose accordingly.' },
    ],
    related: ['art-of-layering-fragrances', 'sourcing-rare-ingredients'],
  },
}

const POST_TITLES: Record<string, string> = {
  'art-of-layering-fragrances': 'The Art of Layering Fragrances',
  'sourcing-rare-ingredients': 'Sourcing Rare Ingredients: A Journey',
  'fragrance-and-memory': 'Fragrance and Memory: The Science of Scent',
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  const post = POSTS[slug]

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  if (!post) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: 80 }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontStyle: 'italic', color: 'var(--muted)' }}>Post not found</p>
        <Link href="/blog" className="btn-primary" style={{ marginTop: 24, display: 'inline-block', padding: '14px 32px' }}>Back to Journal</Link>
      </div>
    </div>
  )

  return (
    <>
      {/* HEADER */}
      <section style={{ background: 'var(--ink)', padding: '160px 64px 80px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(184,150,90,0.05), transparent)' }} />
        <div style={{ maxWidth: 720, position: 'relative' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 28, animation: 'fadeUp 0.7s 0.2s both' }}>
            <Link href="/blog" style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--muted)', textDecoration: 'none' }}>Journal</Link>
            <span style={{ color: 'rgba(184,150,90,0.4)' }}>·</span>
            <span style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)' }}>{post.category}</span>
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(40px,5vw,72px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1.05, marginBottom: 24, animation: 'fadeUp 0.7s 0.35s both' }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', animation: 'fadeUp 0.7s 0.5s both' }}>
            <span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'rgba(245,240,232,0.4)' }}>{post.publishedAt}</span>
            <span style={{ color: 'rgba(184,150,90,0.3)' }}>·</span>
            <span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'rgba(245,240,232,0.4)' }}>{post.readTime} min read</span>
          </div>
        </div>
      </section>

      {/* ARTICLE */}
      <section style={{ padding: '80px 64px', display: 'grid', gridTemplateColumns: '1fr 280px', gap: 80, maxWidth: 1100 }}>
        <article>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontStyle: 'italic', lineHeight: 1.7, color: 'var(--muted)', marginBottom: 48, borderLeft: '3px solid var(--gold)', paddingLeft: 24 }}>
            {post.excerpt}
          </p>

          {post.content.map((block: any, i: number) => {
            if (block.type === 'h2') return (
              <h2 key={i} style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 300, marginTop: 52, marginBottom: 20 }}>
                {block.text}
              </h2>
            )
            return (
              <p key={i} style={{ fontSize: 15, lineHeight: 1.95, color: 'var(--ink)', marginBottom: 20 }}>
                {block.text}
              </p>
            )
          })}

          {/* Tags */}
          <div style={{ marginTop: 60, paddingTop: 32, borderTop: '1px solid var(--border)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {[post.category, 'Perfumery', 'Sève Journal'].map(tag => (
              <span key={tag} style={{ border: '1px solid var(--border)', padding: '6px 14px', fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                {tag}
              </span>
            ))}
          </div>
        </article>

        {/* SIDEBAR */}
        <aside style={{ paddingTop: 4 }}>
          <div style={{ position: 'sticky', top: 100 }}>
            <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20 }}>
              More from the Journal
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {post.related.map((relSlug: string) => (
                <Link key={relSlug} href={`/blog/${relSlug}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', padding: '20px', background: 'var(--card-bg)', cursor: 'none' }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 400, lineHeight: 1.3, marginBottom: 8 }}>
                    {POST_TITLES[relSlug]}
                  </h4>
                  <span style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)' }}>Read →</span>
                </Link>
              ))}
            </div>

            <div style={{ marginTop: 32, background: 'var(--ink)', padding: 28 }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: 18, color: 'var(--cream)', marginBottom: 12 }}>
                The <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Collection</em>
              </p>
              <p style={{ fontSize: 11, lineHeight: 1.7, color: 'rgba(245,240,232,0.4)', marginBottom: 20 }}>
                Six fragrances, each inspired by a specific place and moment.
              </p>
              <Link href="/#collection" className="btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '12px 20px', fontSize: 9 }}>
                Shop Now
              </Link>
            </div>
          </div>
        </aside>
      </section>

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </>
  )
}
