// components/Footer.tsx
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo-text">SÈ<span>V</span>E</span>
          <p className="footer-tagline">
            Rare botanical fragrances, crafted in small batches at our atelier in Lyon, France.
            Every bottle tells a story. Every story begins with a place.
          </p>
        </div>

        <div className="footer-col">
          <h4>Collection</h4>
          <Link href="/product/foret-noire">Forêt Noire</Link>
          <Link href="/product/dune-doree">Dune Dorée</Link>
          <Link href="/product/sel-marin">Sel Marin</Link>
          <Link href="/product/rose-obscure">Rose Obscure</Link>
          <Link href="/product/cedre-blanc">Cèdre Blanc</Link>
          <Link href="/product/solstice">Solstice</Link>
        </div>

        <div className="footer-col">
          <h4>Maison</h4>
          <Link href="/about">Our Story</Link>
          <Link href="/blog">Journal</Link>
          <Link href="/about#atelier">The Atelier</Link>
          <Link href="/about#process">Our Process</Link>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <Link href="/faq">FAQ</Link>
          <Link href="/shipping">Shipping</Link>
          <Link href="/returns">Returns</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Sève Parfums. All rights reserved.</span>
        <span style={{ fontSize: 10, letterSpacing: '0.1em' }}>
          Lyon, France · contact@seveparfums.com
        </span>
      </div>
    </footer>
  )
}
