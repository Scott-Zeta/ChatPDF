import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { processingForPinecone } from '@/lib/pinecone';
import { getS3Url } from '@/lib/s3';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// /api/create-chat api route
export async function POST(req: Request, res: Response) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log('Upload complete: ', file_key, file_name);
    const result = await processingForPinecone(file_key);
    //create a chat in neon DB, if success
    //return the chat id for further routes
    const chat_id = await db
      .insert(chats)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfUrl: getS3Url(file_key),
        userId,
      })
      .returning({ insertedId: chats.id });
    return NextResponse.json(
      {
        chat_id: chat_id[0].insertedId,
        result,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  }
}