import { UserButton, auth, currentUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import FileUpload from '@/components/FileUpload';
import Header from '@/components/Header';
import { checkSubscription } from '@/lib/checkSubscription';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import ManageSubscription from '@/components/ManageSubscription';
import UserGuide from '@/components/UserGuide';

export default async function Home() {
  const { userId }: { userId: string | null } = await auth();
  const user = await currentUser();
  const isauthenticated = !!userId;
  const isPro = await checkSubscription();

  let latestDialog;

  if (userId) {
    const chatList = await db
      .select()
      .from(chats)
      .where(eq(chats.userId, userId));
    if (chatList.length !== 0) {
      const id = chatList[chatList.length - 1].id;
      latestDialog = id;
    }
  }

  return (
    <div className="flex flex-col w-screen h-full min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <Header />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/5">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          {isPro && (
            <p className="text-sm text-slate-500">
              Welcome, Honorable PRO Member {user?.firstName}!
            </p>
          )}
          <div className="mt-2 flex">
            {isauthenticated &&
              (latestDialog ? (
                <Link href={`/chat/${latestDialog}`}>
                  <Button>Click to Go!</Button>
                </Link>
              ) : (
                <p className="my-2">
                  You don&apos;t have any File yet, Start to Upload!
                </p>
              ))}
            {isPro && <ManageSubscription buttonClassName="ml-3" />}
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
        <div className="flex px-2">
          <UserGuide />
        </div>
      </div>
    </div>
  );
}
