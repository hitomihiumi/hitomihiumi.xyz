import { NextResponse } from 'next/server';
import { discordClient } from '@/lib/discord';
import { getFlags, getSize, getAllUserData } from '@/lib/api-utils';
import { Presence } from 'discord.js';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const userId = (await params).userId;
  const { searchParams } = new URL(request.url);
  const content = searchParams.get('content');
  const forceStatic = searchParams.get('forceStatic') === 'true';
  const size = searchParams.get('size') ? Number(searchParams.get('size')) : 4096;

  try {
    const user = await discordClient.users.fetch(userId, { force: true });
    if (!user) {
        return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    if (content) {
        switch (content) {
            case "tag":
                return new NextResponse(user.tag);
            case "username":
                return new NextResponse(user.username);
            case "globalName":
                return new NextResponse(user.globalName || "");
            case "discriminator":
                return new NextResponse(user.discriminator);
            case "avatar":
                return NextResponse.redirect(user.displayAvatarURL({ forceStatic, size: getSize(size) }));
            case "avatarURL":
                return new NextResponse(user.avatarURL() || "");
            case "banner":
                const bannerUrl = user.bannerURL({ forceStatic, size: getSize(size) });
                if (bannerUrl) {
                    return NextResponse.redirect(bannerUrl);
                } else {
                    return NextResponse.json({ error: "User banner not found!" }, { status: 404 });
                }
            case "bannerURL":
                return new NextResponse(user.bannerURL({ forceStatic, size: getSize(size) }) || "");
            case "avatarDecoration":
                const decorationUrl = user.avatarDecorationURL({ size: getSize(size) });
                if (decorationUrl) {
                    return NextResponse.redirect(decorationUrl);
                } else {
                    return NextResponse.json({ error: "User avatar decoration not found!" }, { status: 404 });
                }
            case "avatarDecorationURL":
                return new NextResponse(user.avatarDecorationURL({ size: getSize(size) }) || "");
            case "id":
                return new NextResponse(user.id);
            case "createdTimestamp":
                return new NextResponse(String(user.createdTimestamp));
            case "createdAt":
                return new NextResponse(String(user.createdAt));
            case "bot":
                return new NextResponse(String(user.bot));
            case "system":
                return new NextResponse(String(user.system));
            case "flags":
                return NextResponse.json(user.flags);
            case "hexAccentColor":
                return new NextResponse(user.hexAccentColor || "");
            case "accentColor":
                return new NextResponse(String(user.accentColor));
            case "presence":
                try {
                    if (process.env.BASE_GUILD) {
                        const guild = await discordClient.guilds.fetch(process.env.BASE_GUILD);
                        const member = guild.members.cache.get(user.id);
                        if (member) {
                            let { status, activities, clientStatus } = member.presence as Presence;
                            return NextResponse.json({ status, activities, clientStatus });
                        } else {
                            return NextResponse.json({ error: "User presence not found!" }, { status: 404 });
                        }
                    } else {
                         return NextResponse.json({ error: "BASE_GUILD not configured" }, { status: 500 });
                    }
                } catch (error) {
                    return NextResponse.json({ error: "Error fetching presence" }, { status: 404 });
                }
            case "badges":
                // @ts-ignore
                return NextResponse.json(getFlags(user.flags?.toArray() || []));
            case "all":
                return NextResponse.json(await getAllUserData(discordClient, user));
            case "withoutPresence":
                let badges: string[] = [];
                let avatarURL: string = "";
                let bannerURL: string = "";
                let avatarDecorationURL: string = "";

                let data = { ...(user.toJSON() as object), badges, avatarURL, bannerURL, avatarDecorationURL, presence: {} };

                if (user.flags) data.badges = getFlags(user.flags.toArray());
                // @ts-ignore
                if (user.avatarURL({ size: 4096 })) data.avatarURL = user.avatarURL({ size: 4096 });
                // @ts-ignore
                if (user.bannerURL({ size: 4096 })) data.bannerURL = user.bannerURL({ size: 4096 });
                // @ts-ignore
                if (user.avatarDecorationURL({ size: 4096 })) data.avatarDecorationURL = user.avatarDecorationURL({ size: 4096 });

                return NextResponse.json(data);
            default:
                return NextResponse.json(await getAllUserData(discordClient, user));
        }
    } else {
        return NextResponse.json(await getAllUserData(discordClient, user));
    }

  } catch (error) {
    return NextResponse.json({ error: "Invalid ID or User not found" }, { status: 404 });
  }
}

