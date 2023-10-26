import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { chats, messages } from '@/lib/db/schema';

export const DELETE = async (req: Request) => {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const { chatId } = await req.json();
    try {
      const chat = await db.select().from(chats).where(eq(chats.id, chatId));
      if (!chat[0]) {
        return new NextResponse('Chat not found', { status: 404 });
      }
      if (chat[0].userId !== userId) {
        return new NextResponse('Unauthorized', { status: 401 });
      }
    } catch (error) {
      console.error('Fail to verify the chat owner', error);
      return new NextResponse('Fail to verify the chat owner', { status: 500 });
    }

    //Waiting for further implementation....

    return new NextResponse('OK Testing', { status: 200 });
  } catch (error) {
    console.error('Delete Chat Error', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
