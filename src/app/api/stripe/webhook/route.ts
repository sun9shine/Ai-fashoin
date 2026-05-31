import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as any;
      const { userId, plan } = session.metadata;

      if (userId && plan) {
        // Update user plan
        await prisma.user.update({
          where: { id: userId },
          data: { plan },
        });

        // Record order
        await prisma.order.create({
          data: {
            userId,
            amount: session.amount_total / 100,
            status: 'completed',
            stripeId: session.id,
            type: 'subscription',
            plan,
          },
        });
      }
      break;
    }

    case 'customer.subscription.deleted': {
      // Reset user to free plan when subscription is canceled
      const subscription = event.data.object as any;
      const customerId = subscription.customer;

      // Find user by stripe customer ID in orders
      const order = await prisma.order.findFirst({
        where: { stripeId: customerId },
        include: { user: true },
      });

      if (order) {
        await prisma.user.update({
          where: { id: order.userId },
          data: { plan: 'free' },
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
