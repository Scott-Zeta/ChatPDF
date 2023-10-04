import { NextResponse } from 'next/server';

// /api/create-chat api route
export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { file_key, file_name } = body;
    console.log('Upload complete: ', file_key, file_name);
    return NextResponse.json({ file_key, file_name }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'internal server error' },
      { status: 500 }
    );
  }
}
