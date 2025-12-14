import { NextResponse } from 'next/server';
import * as info from '@/../package.json';

export async function GET() {
  return NextResponse.json({
    version: info.version,
    message: "Discord-Web-API is running!",
    endpoints: {
        guilds: {
            get: "/v1/guilds/:guildId"
        },
        users: {
            get: "/v1/users/:userId"
        }
    }
  });
}

