'use client';
import React from 'react';
import { Input } from './ui/input';
import { useChat } from 'ai/react';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import MessageList from './MessageList';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Message } from 'ai';
import { toast } from './ui/use-toast';

type Props = { chatId: number };

const ChatComponent = ({ chatId }: Props) => {
  //render previouse messages
  const { data } = useQuery({
    queryKey: ['chat', chatId],
    queryFn: async () => {
      const res = await axios.post<Message[]>('/api/get-messages', { chatId });
      return res.data;
    },
  });

  //input state manager by ai/react
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    //api call when hit the input, send the message to route, see src/app/api/chat/route.tsx
    api: '/api/chat',
    body: {
      chatId,
    },
    initialMessages: data || [],
    onError: (err) => {
      if (err.message.includes('token limit')) {
        toast({
          variant: 'destructive',
          title: 'Limitation Exceeded',
          description: `Currently you can only send ${process.env
            .MAX_TOKENS!} messages every ${process.env
            .TOKEN_CYCLE!} hours, Please come back later.`,
        });
      } else if (err.message.includes('unauthorized')) {
        toast({
          variant: 'destructive',
          title: 'Unauthorized',
          description:
            'You log-in has expired, please log-in again to continue.',
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Internal Server Error',
          description:
            'Currently can not process your request, please try again later.',
        });
      }
    },
  });

  return (
    <div
      className="relative max-h-screen h-screen flex flex-col overflow-scroll"
      id="message-container"
    >
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>
      {/* message list */}
      <MessageList messages={messages} />
      {/* input form */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-0 inset-x-0 px-2 my-2 bg-white"
      >
        <div className="flex">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask any question you want..."
            className="w-full"
          />
          <Button className="bg-blue-600 ml-2">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;
