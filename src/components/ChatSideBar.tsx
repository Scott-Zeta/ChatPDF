'use client';
import { DrizzleChat } from '@/lib/db/schema';
import { Button } from './ui/button';
import { MessageCircle, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';
import GoPro from './GoPro';

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

const ChatSideBar = ({ chats, chatId }: Props) => {
  return (
    <div className="w-full h-screen p-4 text-gray-200 bg-gray-900 flex flex-col">
      <Link href="/">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>

      <div className="flex pb-2 flex-col gap-2 mt-4 overflow-scroll">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn('rounded-lg p-3 text-slate-300 flex items-center', {
                'bg-blue-600 text-white': chat.id === chatId,
                'hover:text-white': chat.id !== chatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                {chat.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <GoPro />
    </div>
  );
};

export default ChatSideBar;
