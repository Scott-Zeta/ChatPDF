import { Configuration, OpenAIApi } from 'openai-edge';
//this can help streamming effect on front end
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { getContext } from '@/lib/context';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { getEmbedding } from '@/lib/embeddings';

//connect to openai api when chatting
export const runtime = 'edge';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { messages, chatId } = await req.json();
    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
    if (_chats.length != 1) {
      return NextResponse.json({ error: 'chat not found' }, { status: 404 });
    }
    const fileKey = _chats[0].fileKey;

    const lastMessage = messages[messages.length - 1].content;
    const context = await getContext(lastMessage, fileKey);

    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages,
      //stream will generate reponse one by one word
      stream: true,
    });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
  }
}
