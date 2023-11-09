import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { chats } from '@/lib/db/schema';

export const GET = async (req: Request) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const _chats = await db
      .select()
      .from(chats)
      .where(eq(chats.userId, userId));

    const chatNumber = _chats.length;

    if (chatNumber >= parseInt(process.env.MAX_CHATS!)) {
      return new NextResponse('You have reached the maximum number of chats', {
        status: 403,
      });
    } else {
      return new NextResponse('You can create a new chat', { status: 200 });
    }
  } catch (error) {
    console.error('Fail to check user current chat number: ', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
