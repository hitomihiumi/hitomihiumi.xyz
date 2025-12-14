import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string, appId: string }> }
) {
  const { userId, appId } = await params;
  try {
    let data = await fetch(`http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=${appId}&key=${process.env.STEAM_API_KEY}&steamid=${userId}&format=json`);
    if (!data.ok) {
        throw new Error(`Steam API error: ${data.status} ${data.statusText}`);
    }
    let stats = await data.json();

    return NextResponse.json(stats);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

