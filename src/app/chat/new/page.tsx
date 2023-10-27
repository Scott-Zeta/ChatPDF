import ChatSideBar from '@/components/ChatSideBar';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { checkSubscription } from '@/lib/checkSubscription';
import React from 'react';
import FileUpload from '@/components/FileUpload';

type Props = {
  params: {
    chatId: string;
  };
};

const newPage = async ({ params: { chatId } }: Props) => {
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

  return (
    <div className="flex min-h-screen  overflow-scroll">
      <div className="flex w-full min-h-screen overflow-scroll">
        {/* chat sidebar */}
        <div className="flex-[3] max-w-xs">
          <ChatSideBar chatId={parseInt(chatId)} chats={_chats} isPro={isPro} />
        </div>
        <div className="max-h-screen p-4 overflow-scroll flex-[4] items-center justify-center flex">
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="text-3xl">Awaiting Order</h1>
            <div className="w-full">
              <FileUpload />
            </div>
          </div>
        </div>
        <div className="flex-[4] border-l-4 border-l-slate-200">
          <p>Further would be some pictures like user guide</p>
        </div>
      </div>
    </div>
  );
};

export default newPage;
