import { auth, currentUser } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { userSubscriptions } from '@/lib/db/schema';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';

const return_url = process.env.NEXT_BASE_URL + '/';

export async function GET() {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    //check user subscription status
    const _userSubscriptions = await db
      .select()
      .from(userSubscriptions)
      .where(eq(userSubscriptions.userId, userId));
    if (_userSubscriptions[0] && _userSubscriptions[0].stripeCustomerId) {
      // trying to cancel at the billing portal
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: _userSubscriptions[0].stripeCustomerId,
        return_url,
      });
      return NextResponse.json({ url: stripeSession.url });
    }

    // user's first time trying to subscribe
    const stripeSession = await stripe.checkout.sessions.create({
      success_url: return_url,
      cancel_url: return_url,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: user?.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: 'AUD',
            product_data: {
              name: 'ChatPDF Pro',
              description: 'Unlimited PDF sessions!',
            },
            unit_amount: 200,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });
    return NextResponse.json({ url: stripeSession.url });
  } catch (error) {
    console.error('Stripe Error: ', error);
    return new NextResponse('Internal Server Error: Stripe', { status: 500 });
  }
}
