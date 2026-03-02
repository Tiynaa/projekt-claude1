// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const cartItems = JSON.parse(session.metadata?.cartItems || '[]')
    const userId = session.metadata?.userId || null

    // Create order in database
    await prisma.order.create({
      data: {
        stripeSessionId: session.id,
        email: session.customer_email!,
        userId: userId || undefined,
        status: 'PAID',
        total: session.amount_total!,
        shippingAddress: session.shipping_details as any,
        items: {
          create: await Promise.all(
            cartItems.map(async (item: { id: string; qty: number }) => {
              const product = await prisma.product.findUnique({ where: { id: item.id } })
              return {
                productId: item.id,
                quantity: item.qty,
                price: product!.price,
              }
            })
          ),
        },
      },
    })

    // Decrement stock
    for (const item of cartItems) {
      await prisma.product.update({
        where: { id: item.id },
        data: { stock: { decrement: item.qty } },
      })
    }
  }

  return NextResponse.json({ received: true })
}


