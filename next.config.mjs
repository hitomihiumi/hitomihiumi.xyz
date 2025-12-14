/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  serverExternalPackages: ["discord.js", "zlib-sync", "bufferutil", "utf-8-validate"],
  sassOptions: {
    compiler: "modern",
    silenceDeprecations: ["legacy-js-api"],
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.node$/,
      loader: "node-loader",
    });
    return config;
  },
  images: {
    remotePatterns: [
      new URL("https://avatars.steamstatic.com/**"),
      new URL("https://avatars.fastly.steamstatic.com/**"),
      new URL("https://shared.fastly.steamstatic.com/community_assets/images/**"),
      new URL("https://community.fastly.steamstatic.com/public/images/**"),
      new URL("https://cdn.cloudflare.steamstatic.com/steam/**"),
      new URL("https://static-cdn.jtvnw.net/previews-ttv/**"),
      new URL("https://i.ytimg.com/vi/**"),
      new URL("https://i.scdn.co/image/**"),
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.discordapp.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
