import ChatComponent from '@/components/ChatComponent';
import ChatSideBar from '@/components/ChatSideBar';
import PDFViewer from '@/components/PDFViewer';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { checkSubscription } from '@/lib/checkSubscription';
import React from 'react';

type Props = {
  params: {
    chatId: string;
  };
};

const ChatPage = async ({ params: { chatId } }: Props) => {
  const { userId } = await auth();
  const isPro = await checkSubscription();

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

  const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));

  return (
    <div className="flex min-h-screen  overflow-scroll">
      <div className="flex w-full min-h-screen overflow-scroll">
        {/* chat sidebar */}
        <div className="flex-[1] max-w-xs">
          <ChatSideBar chatId={parseInt(chatId)} chats={_chats} isPro={isPro} />
        </div>
        {/* pdf viewer */}
        <div className="max-h-screen p-4 oveflow-scroll flex-[4]">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ''} />
        </div>
        {/* chat component */}
        <div className="flex-[4] border-l-4 border-l-slate-200">
          <ChatComponent chatId={parseInt(chatId)} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
