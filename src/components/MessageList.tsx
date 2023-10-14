'use client';
import { cn } from '@/lib/utils';
import { Message } from 'ai/react';
import React from 'react';
import { useEffect, useRef } from 'react';

type Props = {
  messages: Message[];
};

const MessageList = ({ messages }: Props) => {
  //scroll to bottom when new message comes
  const messageEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageEndRef.current && containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 50;
      if (atBottom) {
        messageEndRef.current?.scrollIntoView({
          block: 'end',
          behavior: 'smooth',
        });
      }
    }
  }, [messages]);
  if (!messages)
    return (
      <div className="flex flex-grow max-h-screen overflow-scroll flex-col gap-2 px-4 pb-2"></div>
    );
  return (
    <div
      ref={containerRef}
      className="flex flex-grow max-h-screen overflow-scroll flex-col gap-2 px-4 pb-2"
    >
      {messages.map((message) => {
        return (
          <div
            key={message.id}
            className={cn('flex', {
              'justify-end pl-10': message.role === 'user',
              'justify-start pr-10': message.role === 'assistant',
            })}
          >
            <div
              className={cn(
                'rounded-lg px-3 text-sm py-1 shadow-md ring-1 ring-gray-900/10',
                {
                  'bg-blue-600 text-white': message.role === 'user',
                }
              )}
            >
              <p>{message.content}</p>
            </div>
          </div>
        );
      })}
      <div ref={messageEndRef}></div>
    </div>
  );
};

export default MessageList;
