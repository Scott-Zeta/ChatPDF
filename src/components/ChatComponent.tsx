'use client';
import React from 'react';

type Props = {};

const ChatComponent = (props: Props) => {
  return (
    <div
      className="relative max-h-screen overflow-scroll"
      id="message-container"
    >
      {/* header */}
      <div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
        <h3 className="text-xl font-bold">Chat</h3>
      </div>

      {/* message list */}
    </div>
  );
};

export default ChatComponent;
