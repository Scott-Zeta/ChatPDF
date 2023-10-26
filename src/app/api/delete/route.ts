import { NextResponse } from 'next/server';

export const DELETE = async (req: Request) => {
  const { chatId, userId } = await req.json();
  console.log('chatId', chatId);
  console.log('userId', userId);
  return new NextResponse('OK Testing', { status: 200 });
};
