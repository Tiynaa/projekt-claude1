// app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'
import prisma from '@/lib/prisma'

export async function POST(req: NextRequest) {
  try {
    const { items, email } = await req.json()
    const session = await getServerSession(authOptions)

    if (!items?.length) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 })
    }

    // Validate products from DB
    const productIds = items.map((i: any) => i.id)
    const products = await prisma.product.findMany({ where: { id: { in: productIds } } })

    const lineItems = items.map((item: any) => {
      const product = products.find(p => p.id === item.id)
      if (!product) throw new Error(`Product ${item.id} not found`)

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: product.name,
            description: product.notes,
            metadata: { productId: product.id },
          },
          unit_amount: product.price,
        },
        quantity: item.qty,
      }
    })

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: session?.user?.email ?? email,
      shipping_address_collection: {
        allowed_countries: ['US', 'GB', 'DE', 'FR', 'IT', 'ES', 'NL', 'PL'],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 0, currency: 'eur' },
            display_name: 'Standard shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 3 },
              maximum: { unit: 'business_day', value: 7 },
            },
          },
        },
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 1500, currency: 'eur' },
            display_name: 'Express shipping',
            delivery_estimate: {
              minimum: { unit: 'business_day', value: 1 },
              maximum: { unit: 'business_day', value: 2 },
            },
          },
        },
      ],
      metadata: {
        userId: session?.user ? (session.user as any).id : '',
        cartItems: JSON.stringify(items.map((i: any) => ({ id: i.id, qty: i.qty }))),
      },
      success_url: `${process.env.NEXT_PUBLIC_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/?cart=open`,
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (err: any) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
