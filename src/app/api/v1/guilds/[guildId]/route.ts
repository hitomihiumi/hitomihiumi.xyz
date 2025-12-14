import { NextResponse } from 'next/server';
import { discordClient } from '@/lib/discord';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ guildId: string }> }
) {
  const guildId = (await params).guildId;
  try {
    const guild = await discordClient.guilds.fetch(guildId);
    if (!guild) {
        return NextResponse.json({ error: "Guild not found!" }, { status: 404 });
    }
    // Serialize guild data to avoid circular references
    return NextResponse.json({
        id: guild.id,
        name: guild.name,
        icon: guild.icon,
        features: guild.features,
        commands: guild.commands,
        members: guild.members,
        channels: guild.channels,
        bans: guild.bans,
        roles: guild.roles,
        presences: guild.presences,
        voiceStates: guild.voiceStates,
        stageInstances: guild.stageInstances,
        invites: guild.invites,
        scheduledEvents: guild.scheduledEvents,
        autoModerationRules: guild.autoModerationRules,
        available: guild.available,
        shardId: guild.shardId,
        splash: guild.splash,
        banner: guild.banner,
        description: guild.description,
        verificationLevel: guild.verificationLevel,
        vanityURLCode: guild.vanityURLCode,
        nsfwLevel: guild.nsfwLevel,
        premiumSubscriptionCount: guild.premiumSubscriptionCount,
        discoverySplash: guild.discoverySplash,
        memberCount: guild.memberCount,
        large: guild.large,
        premiumProgressBarEnabled: guild.premiumProgressBarEnabled,
        applicationId: guild.applicationId,
        afkTimeout: guild.afkTimeout,
        afkChannelId: guild.afkChannelId,
        systemChannelId: guild.systemChannelId,
        premiumTier: guild.premiumTier,
        widgetEnabled: guild.widgetEnabled,
        widgetChannelId: guild.widgetChannelId,
        explicitContentFilter: guild.explicitContentFilter,
        mfaLevel: guild.mfaLevel,
        joinedTimestamp: guild.joinedTimestamp,
        defaultMessageNotifications: guild.defaultMessageNotifications,
        systemChannelFlags: guild.systemChannelFlags,
        maximumMembers: guild.maximumMembers,
        maximumPresences: guild.maximumPresences,
        maxVideoChannelUsers: guild.maxVideoChannelUsers,
        approximateMemberCount: guild.approximateMemberCount,
        approximatePresenceCount: guild.approximatePresenceCount,
        vanityURLUses: guild.vanityURLUses,
        rulesChannelId: guild.rulesChannelId,
        publicUpdatesChannelId: guild.publicUpdatesChannelId,
        preferredLocale: guild.preferredLocale,
        ownerId: guild.ownerId,
        emojis: guild.emojis,
        stickers: guild.stickers,
        createdTimestamp: guild.createdTimestamp,
        nameAcronym: guild.nameAcronym,
        iconURL: guild.iconURL(),
        splashURL: guild.splashURL(),
        discoverySplashURL: guild.discoverySplashURL(),
        bannerURL: guild.bannerURL()
    });
  } catch (error) {
    return NextResponse.json({ error: "Guild not found or error fetching guild" }, { status: 404 });
  }
}

