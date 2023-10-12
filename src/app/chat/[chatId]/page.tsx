import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  if (!userId) {
    return redirect('/sign-in');
  }
  //searching for matching userId's chats in neon db
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect('/');
  }
  if (!_chats.find((chat) => chat.id === parseInt(chatId))) {
    return redirect('/');
  }

  return (
    <div className="flex max-h-screen overflow-scroll">
      <div className="flex w-full max-h-screen overflow-scroll">
        {/* chat sidebar */}
        <div className="flex-[1] max-w-xs">
          <p>Side bar</p>
        </div>
        {/* pdf viewer */}
        <div className="max-h-screen p-4 oveflow-scroll flex-[5]">
          <p>PDF viewer</p>
        </div>
        {/* chat component */}
        <div className="flex-[3] border-l-4 border-l-slate-200">
          <p>Chat Component</p>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
