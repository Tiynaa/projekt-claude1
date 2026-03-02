'use client'
// app/about/page.tsx
import { useEffect } from 'react'
import Link from 'next/link'
import Bottle from '@/components/Bottle'

export default function AboutPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* HERO */}
      <section style={{ minHeight: '70vh', background: 'var(--ink)', display: 'flex', alignItems: 'flex-end', padding: '160px 64px 80px', position: 'relative', overflow: 'hidden' }}>
        {/* BG decoration */}
        <div style={{ position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)', opacity: 0.04 }}>
          <Bottle color="#B8965A" size={600} label="Sève" number="No." />
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(184,150,90,0.05) 0%, transparent 60%)' }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 720 }}>
          <p style={{ fontSize: 10, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 24, animation: 'fadeUp 0.8s 0.2s both' }}>
            Our Story
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(52px,6vw,88px)', fontWeight: 300, lineHeight: 1.05, color: 'var(--cream)', marginBottom: 32, animation: 'fadeUp 0.8s 0.4s both' }}>
            Perfumery as a <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>practice</em>,<br />not a product
          </h1>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(245,240,232,0.55)', maxWidth: 560, animation: 'fadeUp 0.8s 0.6s both' }}>
            Founded in Lyon in 2019, Sève was born from a single conviction: that a truly great fragrance should tell you something real about the world. Not what luxury is supposed to smell like — but what a specific morning in a specific forest actually smells like.
          </p>
        </div>
      </section>

      {/* FOUNDING STORY */}
      <section style={{ padding: '100px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }}>
        <div className="reveal-left">
          <p className="section-eyebrow">The Beginning</p>
          <h2 className="section-title" style={{ marginBottom: 24 }}>A journey that <em>started</em><br />in a forest</h2>
          <div className="divider" />
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--muted)', marginBottom: 20 }}>
            In the winter of 2018, our founder Elise Moreau was hiking through the Vosges mountains in eastern France. She stopped in a clearing and noticed something — the smell of that moment was unlike anything she had ever encountered in a bottle.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--muted)', marginBottom: 20 }}>
            Cold pine, wet stone, distant smoke. Something fungal underneath, alive. She spent two hours trying to memorize it. That night, she called a perfumer she'd interviewed years earlier for a magazine article.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--muted)' }}>
            Eighteen months later, Forêt Noire was ready. Sève was founded.
          </p>
        </div>

        <div className="reveal-right" style={{ background: 'var(--cream-dark)', padding: 60, position: 'relative' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontStyle: 'italic', lineHeight: 1.7, color: 'var(--ink)', marginBottom: 28 }}>
            "I didn't want to make a fragrance. I wanted to capture a moment so precisely that someone who smelled it would feel like they were there — even if they'd never been."
          </p>
          <div style={{ width: 32, height: 1, background: 'var(--gold)', marginBottom: 16 }} />
          <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            Elise Moreau · Founder
          </p>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ background: 'var(--ink)', padding: '100px 64px' }} id="process">
        <div className="reveal" style={{ marginBottom: 64 }}>
          <p className="section-eyebrow" style={{ color: 'var(--gold)' }}>How We Work</p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px,4vw,54px)', fontWeight: 300, color: 'var(--cream)', maxWidth: 500 }}>
            Every decision <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>starts</em><br />with a place
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          {[
            { num: '01', title: 'The Journey', desc: 'Every fragrance begins with travel. Our perfumer visits the location that will inspire the scent — sometimes for days, sometimes for weeks.' },
            { num: '02', title: 'The Impression', desc: 'Notes are taken. Not formulas — impressions. What does it smell like? What does it feel like? What does it remind you of? Why?' },
            { num: '03', title: 'The Formula', desc: 'Working with raw materials sourced directly from producers, our perfumer constructs a formula that captures the essential truth of the impression.' },
            { num: '04', title: 'The Edit', desc: 'More is removed than added. We believe that great fragrance, like great writing, is defined by what you leave out. This process takes months.' },
          ].map((step, i) => (
            <div key={i} className="reveal" style={{ background: 'rgba(245,240,232,0.03)', padding: '40px 32px', transitionDelay: `${i * 0.1}s` }}>
              <p style={{ fontSize: 11, letterSpacing: '0.3em', color: 'var(--gold)', marginBottom: 28 }}>{step.num}</p>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--cream)', marginBottom: 16 }}>{step.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(245,240,232,0.45)' }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ATELIER */}
      <section style={{ padding: '100px 64px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} id="atelier">
        <div className="reveal-left" style={{ display: 'flex', gap: 16, alignItems: 'flex-end' }}>
          {['#3D4A3E', '#8C6A30', '#4A6B7A', '#7A3D4A'].map((c, i) => (
            <div key={c} style={{ transform: i % 2 === 1 ? 'translateY(-20px)' : 'translateY(0)' }}>
              <Bottle color={c} size={100 + i * 15} label="Sève" number={`0${i + 1}`} />
            </div>
          ))}
        </div>

        <div className="reveal-right">
          <p className="section-eyebrow">The Atelier</p>
          <h2 className="section-title" style={{ marginBottom: 24 }}>Lyon, <em>France</em></h2>
          <div className="divider" />
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--muted)', marginBottom: 20 }}>
            Our atelier is located in the Presqu'île district of Lyon — a city with a long history of fine craftsmanship. We share a building with a silk weaver and a master bookbinder. We like it that way.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--muted)', marginBottom: 20 }}>
            Every bottle is filled, sealed, and labeled by hand. Each label is printed on uncoated paper, in letterpress, using ink mixed to our specification.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'var(--muted)', marginBottom: 36 }}>
            We produce between 200 and 500 bottles of each fragrance per run. No exceptions.
          </p>
          <Link href="/#collection" className="btn-primary" style={{ display: 'inline-block', padding: '14px 36px' }}>
            Shop the Collection
          </Link>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: '80px 64px 100px', borderTop: '1px solid var(--border)' }}>
        <div className="reveal" style={{ marginBottom: 56 }}>
          <p className="section-eyebrow">The People</p>
          <h2 className="section-title">Small team, <em>strong convictions</em></h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40 }}>
          {[
            { name: 'Elise Moreau', role: 'Founder & Creative Director', bio: 'Former journalist turned fragrance obsessive. Has visited 23 countries in search of olfactory inspiration. Speaks French, English, and enough Italian to get into trouble.' },
            { name: 'Thomas Krebs', role: 'Master Perfumer', bio: 'Trained at the Institut Supérieur International du Parfum in Versailles. Has been creating fragrances for 18 years. Collects vintage Grès and Guerlain flacons.' },
            { name: 'Amara Diallo', role: 'Head of Sourcing', bio: 'Has relationships with raw material producers on five continents. Passionate about ethical sourcing and transparent supply chains. Never takes ingredients for granted.' },
          ].map((person, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
              <div style={{ width: '100%', height: 280, background: 'var(--cream-dark)', marginBottom: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontStyle: 'italic', color: 'var(--gold)', opacity: 0.3 }}>
                  {person.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 400, marginBottom: 4 }}>{person.name}</h3>
              <p style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>{person.role}</p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: 'var(--muted)' }}>{person.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(24px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </>
  )
}
