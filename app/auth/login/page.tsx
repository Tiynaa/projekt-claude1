'use client'
// app/auth/login/page.tsx
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    if (mode === 'register') {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      })
      if (!res.ok) { setError('Registration failed. Try again.'); setLoading(false); return }
    }

    const result = await signIn('credentials', { email, password, redirect: false })
    setLoading(false)

    if (result?.error) {
      setError('Invalid email or password')
    } else {
      router.push('/')
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      {/* Left visual */}
      <div style={{ background: 'var(--ink)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(184,150,90,0.06), transparent)' }} />
        <Link href="/" style={{ position: 'absolute', top: 32, left: 40, fontFamily: 'var(--font-display)', fontSize: 24, letterSpacing: '0.35em', color: 'var(--cream)', textDecoration: 'none' }}>
          SÈ<span style={{ color: 'var(--gold)' }}>V</span>E
        </Link>
        <div style={{ textAlign: 'center', position: 'relative' }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontStyle: 'italic', color: 'var(--gold)', opacity: 0.15, marginBottom: -20 }}>Sève</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 300, color: 'var(--cream)', lineHeight: 1.4, maxWidth: 360 }}>
            "Perfume is the art that makes memory speak."
          </p>
          <div style={{ width: 40, height: 1, background: 'var(--gold)', margin: '24px auto' }} />
          <p style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(245,240,232,0.35)' }}>
            Francis Kurkdjian
          </p>
        </div>
      </div>

      {/* Right form */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 60 }}>
        <div style={{ width: '100%', maxWidth: 400 }}>
          <p style={{ fontSize: 9, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>
            {mode === 'login' ? 'Welcome back' : 'Join Sève'}
          </p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 300, marginBottom: 8 }}>
            {mode === 'login' ? 'Sign In' : 'Create Account'}
          </h1>
          <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 40 }}>
            {mode === 'login' ? 'Access your orders and preferences' : 'For order history and early access'}
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {mode === 'register' && (
              <div>
                <label style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Full Name</label>
                <input
                  type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your name"
                  style={inputStyle}
                />
              </div>
            )}

            <div>
              <label style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={inputStyle} />
            </div>

            <div>
              <label style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: 8 }}>Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
            </div>

            {error && <p style={{ fontSize: 12, color: '#B85A5A', letterSpacing: '0.05em' }}>{error}</p>}

            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 11, marginTop: 8 }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>

            <div style={{ position: 'relative', textAlign: 'center', margin: '8px 0' }}>
              <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--border)' }} />
              <span style={{ position: 'relative', background: 'var(--cream)', padding: '0 16px', fontSize: 10, letterSpacing: '0.2em', color: 'var(--muted)' }}>OR</span>
            </div>

            <button
              className="btn-ghost"
              style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: 10 }}
              onClick={() => signIn('google', { callbackUrl: '/' })}
            >
              Continue with Google
            </button>
          </div>

          <p style={{ fontSize: 12, color: 'var(--muted)', textAlign: 'center', marginTop: 28 }}>
            {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }} style={{ background: 'none', border: 'none', color: 'var(--gold)', fontSize: 12, cursor: 'none', textDecoration: 'underline' }}>
              {mode === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '14px 16px',
  background: 'var(--cream-dark)',
  border: '1px solid var(--border)',
  fontFamily: 'var(--font-body)',
  fontSize: 13, color: 'var(--ink)',
  outline: 'none',
  transition: 'border-color 0.2s',
}
