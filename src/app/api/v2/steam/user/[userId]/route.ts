import { NextResponse } from 'next/server';
import { extendProfile } from '@/lib/api-utils';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const userId = (await params).userId;
  try {
    let data = await fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_API_KEY}&steamids=${userId}&format=json`);
    if (!data.ok) {
        throw new Error(`Steam API error: ${data.status} ${data.statusText}`);
    }
    let user = await data.json();

    return NextResponse.json(await extendProfile(user));
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

