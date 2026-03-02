<<<<<<< HEAD
# SÈVE Parfums — Full Stack E-Commerce

A luxury fragrance shop built with Next.js 14, Prisma, Stripe, and NextAuth.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | CSS Variables + custom (no Tailwind needed) |
| Animations | CSS keyframes + Framer Motion |
| State | Zustand (cart, persisted to localStorage) |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth.js (credentials + Google OAuth) |
| Payments | Stripe Checkout + Webhooks |
| Deployment | Vercel (recommended) |

## Pages

- `/` — Homepage: hero, product grid, marquee, about strip, features
- `/product/[slug]` — Product detail: bottle visual, notes, story, add to cart
- `/about` — Brand story, process, atelier, team
- `/blog` — Journal listing with featured post
- `/blog/[slug]` — Full article with sidebar
- `/auth/login` — Sign in / register (credentials + Google)
- `/order/success` — Post-checkout confirmation

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
# Fill in all values in .env.local
```

### 3. Set up the database
```bash
# Run migrations
npx prisma migrate dev --name init

# Seed with sample data
npx prisma db seed
```

### 4. Run locally
```bash
npm run dev
# Open http://localhost:3000
```

## Stripe Setup

1. Create account at stripe.com
2. Copy test API keys to `.env.local`
3. For webhooks locally, install Stripe CLI:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

## Deploy to Vercel

1. Push code to GitHub
2. Import repo in Vercel dashboard
3. Add all environment variables from `.env.example`
4. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_URL` to your production domain
5. Add your production URL to Stripe webhook endpoints

## Database Options (Free Tiers)

- **Supabase** — PostgreSQL, generous free tier, built-in auth
- **Neon** — Serverless PostgreSQL, fast cold starts
- **Railway** — Simple setup, $5/month after trial

## Extending the Project

- **Admin panel** — Add `/admin` protected route to manage products, orders
- **Wishlist** — Already has ♡ button on product page, just needs DB table
- **Reviews** — Add Review model to Prisma schema
- **Multi-currency** — Stripe supports it natively
- **Email** — Add Nodemailer + order confirmation template
=======
# projekt-claude1
>>>>>>> 785c0c8c6a02fd77657c17a6da515e515c859eaa
