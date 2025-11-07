"use client";

import { useEffect, useState } from "react";
import type { Activity } from "@/types/types";

import { Flex, Heading, Text, Media } from "@once-ui-system/core";

import styles from "@/components/components/Presence.module.scss";

type PresenceTimeProps = {
  startTime?: number | string;
  endTime?: number | string;
  createdTimestamp?: number | string;
};

const parseTime = (value?: number | string): number | undefined => {
  if (typeof value === "string") {
    const parsed = Date.parse(value);
    return isNaN(parsed) ? undefined : parsed;
  }
  return value;
};

const PresenceTime: React.FC<PresenceTimeProps> = ({ startTime, endTime, createdTimestamp }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = Date.now();
      const start = parseTime(startTime) ?? parseTime(createdTimestamp) ?? 0;
      const end = parseTime(endTime);

      const elapsed = Math.max(0, now - start);
      const remaining = end ? Math.max(0, end - now) : 0;

      const totalSeconds = end ? remaining : elapsed;
      const hours = Math.floor(totalSeconds / 3600000);
      const minutes = Math.floor((totalSeconds % 3600000) / 60000);
      const seconds = Math.floor((totalSeconds % 60000) / 1000);

      const timeString = [
        hours > 0 ? String(hours).padStart(2, "0") : null,
        String(minutes).padStart(2, "0"),
        String(seconds).padStart(2, "0"),
      ]
        .filter(Boolean)
        .join(":");

      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [startTime, endTime, createdTimestamp]);

  return (
    <>
      {currentTime} {endTime ? "remains" : "elapsed"}
    </>
  );
};
const getURL = (hash: string) => {
  if (!hash) return null;
  if (hash.includes(":")) {
    const [platform, id] = hash.split(":");
    switch (platform) {
      case "mp":
        return `https://media.discordapp.net/${id}`;
      case "spotify":
        return `https://i.scdn.co/image/${id}`;
      case "youtube":
        return `https://i.ytimg.com/vi/${id}/hqdefault_live.jpg`;
      case "twitch":
        return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${id}.png`;
      default:
        return null;
    }
  }

  return null;
};

interface PresenceProps {
  data: Activity;
}

export const Presence: React.FC<PresenceProps> = ({ data }) => {
  if (!data) return <></>;

  let { type, name, details, state, emoji, createdTimestamp, timestamps, assets } = data;

  if (type === 4) {
    name = state || name;
    state = null;
  }

  return (
    <>
      <Flex
        fillHeight
        fitWidth
        direction={"column"}
        background={"overlay"}
        border={"neutral-alpha-medium"}
        radius={"l"}
        className={styles.base}
      >
        <Flex fillWidth padding={"12"} gap={"16"}>
          <Media
            src={
              type === 4
                ? emoji?.animated
                  ? emoji?.imageURL.replace(/\.webp/g, ".gif") || "/images/game.png"
                  : emoji?.imageURL || "/images/game.png"
                : getURL(assets?.largeImage as string) || "/images/game.png"
            }
            aspectRatio={"1 / 1"}
            alt={assets?.largeText || "game"}
            fill
            maxWidth={"104"}
            maxHeight={"104"}
            minWidth={"104"}
            minHeight={"104"}
            position={"relative"}
            radius={"m"}
          />
          {assets?.smallImage && (
            <>
              <Media
                src={getURL(assets.smallImage) || ""}
                aspectRatio={"1 / 1"}
                alt={assets.smallText || ""}
                fill
                maxWidth={"32"}
                maxHeight={"32"}
                position={"fixed"}
                radius={"full"}
                marginLeft={"80"}
                marginTop={"80"}
                zIndex={1}
              />
            </>
          )}
          <Flex direction={"column"}>
            {name && (
              <>
                <Heading variant={"heading-strong-xl"}>
                  {name.length > 20 ? name.slice(0, 17) + "..." : name}
                </Heading>
              </>
            )}
            {details && (
              <>
                <Text variant={"body-default-m"} onBackground={"neutral-medium"}>
                  {details.length > 28 ? details.slice(0, 26) + "..." : details}
                </Text>
              </>
            )}
            {state && (
              <>
                <Text variant={"body-default-m"} onBackground={"neutral-medium"}>
                  {state.length > 28 ? state.slice(0, 26) + "..." : state}
                </Text>
              </>
            )}
            {timestamps && (
              <>
                <Text variant={"body-default-m"} onBackground={"neutral-weak"}>
                  <PresenceTime
                    startTime={timestamps.start}
                    endTime={timestamps.end}
                    createdTimestamp={createdTimestamp}
                  />
                </Text>
              </>
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
