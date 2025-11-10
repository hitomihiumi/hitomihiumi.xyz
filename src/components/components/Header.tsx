"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Flex, ToggleButton, Line, Fade } from "@once-ui-system/core";
import styles from "@/components/components/Header.module.scss";

import { routes } from "@/resources/once-ui.config";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";

  return (
    <>
      <Fade s={{ hide: true }} fillWidth position="fixed" height="80" zIndex={9} />
      <Flex
        fitHeight
        position={"unset"}
        className={styles.position}
        as={"header"}
        zIndex={9}
        fillWidth
        padding={"16"}
        vertical={"center"}
      >
        <Flex fillWidth horizontal={"start"} vertical={"center"}>
          <Flex paddingLeft={"40"} textVariant={"label-strong-l"} gap={"20"}>
            <Flex s={{ hide: true }}>Europe/Kiev</Flex>
          </Flex>
        </Flex>
        <Flex fillWidth vertical={"center"} horizontal={"center"}>
          <Flex
            background={"overlay"}
            border={"neutral-alpha-medium"}
            radius="m-4"
            shadow="l"
            padding="4"
            vertical={"center"}
          >
            <Flex gap="4" horizontal={"center"} textVariant="body-default-s">
              {routes["/"] && (
                <ToggleButton prefixIcon="person" href="/" selected={pathname === "/"} />
              )}
              <Line vert={true} height={2} background={"neutral-alpha-medium"} />
              {routes["/gallery"] && (
                <>
                  <Flex s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="photo"
                      href="/gallery"
                      label={"Gallery"}
                      selected={pathname === "/gallery"}
                    />
                  </Flex>
                  <Flex hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="photo"
                      href="/gallery"
                      selected={pathname === "/gallery"}
                    />
                  </Flex>
                </>
              )}
              {routes["/steam"] && (
                <>
                  <Flex s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon="steam"
                      href="/steam"
                      label={"Steam"}
                      selected={pathname === "/steam"}
                    />
                  </Flex>
                  <Flex hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon="steam"
                      href="/steam"
                      selected={pathname === "/steam"}
                    />
                  </Flex>
                </>
              )}
            </Flex>
          </Flex>
        </Flex>
        <Flex fillWidth horizontal={"end"} vertical={"center"}>
          <Flex paddingRight={"40"} textVariant={"label-strong-l"} gap={"20"}>
            <Flex s={{ hide: true }}>
              <TimeDisplay timeZone={`Europe/Kiev`} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
