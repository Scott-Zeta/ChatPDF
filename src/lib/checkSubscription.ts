import { auth } from '@clerk/nextjs';
import { db } from './db';
import { eq } from 'drizzle-orm';
import { userSubscriptions } from './db/schema';

const day = 1000 * 60 * 60 * 24;
export const checkSubscription = async () => {
  const { userId } = await auth();
  if (!userId) {
    return false;
  }

  const userQuery = await db
    .select()
    .from(userSubscriptions)
    .where(eq(userSubscriptions.userId, userId));

  if (!userQuery || !userQuery[0] || userQuery[1]) {
    return false;
  }

  const user = userQuery[0];

  const isValid =
    user.stripePriceId &&
    user.stripeCurrentPeriodEnd?.getTime()! + day > Date.now();
  return !!isValid;
};
