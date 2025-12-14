import { NextResponse } from 'next/server';
import { processResponse } from '@/lib/api-utils';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const userId = (await params).userId;
  try {
    let data = await fetch(`http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${process.env.STEAM_API_KEY}&steamid=${userId}&format=json`);
    if (!data.ok) {
        throw new Error(`Steam API error: ${data.status} ${data.statusText}`);
    }
    let games = processResponse(await data.json());

    return NextResponse.json(games);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

