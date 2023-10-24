import Image from 'next/image';
import { UserButton, auth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import FileUpload from '@/components/FileUpload';
import Header from '@/components/Header';
import { checkSubscription } from '@/lib/checkSubscription';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export default async function Home() {
  const { userId }: { userId: string | null } = await auth();
  const isauthenticated = !!userId;
  const isPro = await checkSubscription();

  let latestDialog;

  if (userId) {
    const chatList = await db
      .select()
      .from(chats)
      .where(eq(chats.userId, userId));
    const id = chatList[chatList.length - 1].id;
    latestDialog = id;
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <Header />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="mt-2 flex">
            {isauthenticated && (
              <Link href={`/chat/${latestDialog}`}>
                <Button>Click to Go!</Button>
              </Link>
            )}
          </div>
          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Use AI help you read those academic or bureaucratic PDFs.{' '}
          </p>

          <div className="w-full mt-4">
            {isauthenticated ? (
              <FileUpload />
            ) : (
              <Link href="/sign-in">
                <Button>Sign-In to get Start</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
