import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-05-27.dahlia',
});

export const PLANS = {
  pro: {
    name: 'Pro',
    price: 999, // $9.99 in cents
    priceId: process.env.STRIPE_PRO_PRICE_ID || 'price_pro',
    features: ['Unlimited try-ons', 'All categories', 'No ads', 'HD quality', 'Priority processing'],
  },
  business: {
    name: 'Business',
    price: 2999, // $29.99 in cents
    priceId: process.env.STRIPE_BUSINESS_PRICE_ID || 'price_business',
    features: ['Everything in Pro', 'API access', 'Custom branding', 'Analytics dashboard', 'Priority support'],
  },
};

export async function createCheckoutSession(
  userId: string,
  plan: 'pro' | 'business',
  customerEmail: string
) {
  const session = await stripe.checkout.sessions.create({
    customer_email: customerEmail,
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `AI Fashion ${PLANS[plan].name} Plan`,
            description: PLANS[plan].features.join(', '),
          },
          unit_amount: PLANS[plan].price,
          recurring: { interval: 'month' },
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription?canceled=true`,
    metadata: {
      userId,
      plan,
    },
  });

  return session;
}
