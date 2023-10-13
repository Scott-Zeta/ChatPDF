import { Configuration, OpenAIApi } from 'openai-edge';
//this can help streamming effect on front end
import { OpenAIStream, StreamingTextResponse } from 'ai';

//connect to openai api when chatting
export const runtime = 'edge';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
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
