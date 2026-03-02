// lib/stripe.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
})

export const formatPrice = (cents: number) =>
  new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR' }).format(cents / 100)
