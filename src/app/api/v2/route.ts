import { NextResponse } from 'next/server';
import * as info from '@/../package.json';

export async function GET() {
  return NextResponse.json({
    version: info.version,
    message: "Discord-Web-API is running!",
    endpoints: {
        steam: {
            user: {
                get: "/v2/steam/user/:userId",
                games: {
                    get: "/v2/steam/user/:userId/games",
                    achievements: {
                        get: "/v2/steam/user/:userId/games/achievements/:appId"
                    },
                    recently: {
                        get: "/v2/steam/user/:userId/games/recently"
                    }
                }
            }
        }
    }
  });
}

