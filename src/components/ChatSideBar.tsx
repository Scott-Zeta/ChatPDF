'use client';
import { DrizzleChat } from '@/lib/db/schema';
import { Button } from './ui/button';
import { MessageCircle, PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { cn } from '@/lib/utils';
import GoPro from './GoPro';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import FileUpload from './FileUpload';
import ManageSubscription from './ManageSubscription';
import axios from 'axios';

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const handleDeletion = async (chatId: number) => {
    const res = await axios.delete('/api/delete', { data: { chatId } });
  };
  return (
    <div className="w-full h-screen p-4 text-gray-200 bg-gray-900 flex flex-col">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full border-dashed border-white border">
            <PlusCircle className="mr-2 w-4 h-4" />
            New Chat
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload a new File</DialogTitle>
          </DialogHeader>
          <div>
            <FileUpload />
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex pb-2 flex-col gap-2 my-4 overflow-scroll">
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

              {chat.id === chatId && (
                <Button
                  onClick={() => handleDeletion(chat.id)}
                  className="p-0 h-auto hover:bg-transparent"
                  variant="ghost"
                >
                  <Trash2 />
                </Button>
              )}
            </div>
          </Link>
        ))}
      </div>
      {isPro ? (
        <ManageSubscription buttonClassName="mt-auto bg-yellow-500 hover:bg-yellow-400" />
      ) : (
        <GoPro />
      )}
    </div>
  );
};

export default ChatSideBar;
