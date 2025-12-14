import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ appId: string }> }
) {
  const appId = (await params).appId;
  try {
    let data = await fetch(`https://www.steamgriddb.com/api/v2/logos/steam/${appId}`, {
        headers: {
            Authorization: `Bearer ${process.env.STEAM_GRID_API_KEY}`
        }
    })

    let grid = await data.json();

    return new NextResponse(grid.data[0].thumb);
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

