import Image from 'next/image';
import { UserButton, auth } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function Home() {
  const { userId }: { userId: string | null } = await auth();
  const isauthenticated = !!userId;
  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center">
            <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
          <div className="mt-2 flex">
            {isauthenticated && <Button>Click to Go!</Button>}
          </div>
          <p className="max-w-xl mt-1 text-lg text-slate-600">
            Use AI help you read those academic or bureaucratic PDFs.{' '}
          </p>

          <div className="w-full mt-4">
            {isauthenticated ? (
              <h1>File upload components</h1>
            ) : (
              <Link href="/sign-in">
                <Button>Login to get Start</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
