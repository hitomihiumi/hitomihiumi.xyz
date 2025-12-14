import { Client, GatewayIntentBits, ActivityType, PresenceUpdateStatus } from 'discord.js';

const globalForDiscord = global as unknown as { discordClient: Client };

export const discordClient =
  globalForDiscord.discordClient ||
  new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildEmojisAndStickers,
      GatewayIntentBits.GuildPresences,
    ],
    presence: {
      activities: [
        {
          name: `Discord-Web-API`,
          type: ActivityType.Streaming,
          url: "https://www.twitch.tv/hitomihiumi",
        },
      ],
      status: PresenceUpdateStatus.Online,
    },
  });

if (process.env.NODE_ENV !== 'production') globalForDiscord.discordClient = discordClient;

if (!discordClient.isReady()) {
    discordClient.login(process.env.TOKEN).catch(console.error);
}

