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

    //verify the chat owner
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

    //delete the chat in NeonDB
    try {
      await db.transaction(async (tx) => {
        await tx.delete(chats).where(eq(chats.id, chatId));
        await tx.delete(messages).where(eq(messages.chatId, chatId));
      });
    } catch (error) {
      console.error('Fail to delete the chat in NeonDB', error);
      return new NextResponse(
        'Fail to delete the chat in NeonDB, please try again',
        { status: 500 }
      );
    }

    return new NextResponse('OK Testing', { status: 200 });
  } catch (error) {
    console.error('Delete Chat Error', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
};
