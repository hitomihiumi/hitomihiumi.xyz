"use client";

import {
    Heading,
    Text,
    Button,
    Column,
    Badge,
    Logo,
    Line,
    LetterFx,
    Flex,
    RevealFx,
    Carousel,
    SmartLink,
    DropdownWrapper,
} from "@once-ui-system/core";
import React, { useEffect } from "react";
import { Presence as IPresence, User } from "@/types/types";
import { AvatarWFrame, Presence } from "@/components";

import styles from "@/components/home/page.module.scss";

export default function Home() {
    const [data, setData] = React.useState<User>();

    useEffect(() => {
        const cacheKey = "user-1356347611283591218";
        const cached = localStorage.getItem(cacheKey);
        const now = Date.now();

        if (cached) {
            const { timestamp, data } = JSON.parse(cached);
            if (now - timestamp < 600_000) {
                setData(data);
                return;
            }
        }

        fetch("api/v1/users/1356347611283591218?content=withoutPresence")
            .then((res) => res.json() as Promise<User>)
            .then((res) => {
                let data = res;
                data.avatarURL = data.avatarURL.replace("?size=4096", "?size=256");
                setData(data);
                localStorage.setItem(cacheKey, JSON.stringify({ timestamp: now, data: data }));
            });
    }, []);

    return (
        <Flex
            fill
            paddingX="l"
            paddingY="l"
            direction="column"
            gap={"24"}
            horizontal={"center"}
            vertical={"center"}
        >
            <Flex horizontal={"center"} direction={"column"} gap={"s"}>
                <RevealFx delay={0.2} translateY={0.5} direction="row" s={{ direction: "column" }}>
                    <Flex
                        className={styles.avatarPosition}
                        paddingX={"l"}
                        direction={"column"}
                        vertical={"center"}
                        horizontal={"center"}
                        gap={"s"}
                        minWidth={"160"}
                    >
                        <AvatarWFrame
                            size={"xl"}
                            style={{ zIndex: "1" }}
                            src={data?.avatarURL}
                            frame={data?.avatarDecorationURL}
                            loading={!data}
                            radius={"full"}
                        />
                        <Flex direction={"column"} horizontal={"center"}>
                            <Button
                                fillWidth
                                label={"Find avatar?"}
                                prefixIcon={"search"}
                                href={"https://lens.google.com/uploadbyurl?url=" + data?.avatarURL}
                                variant={"tertiary"}
                                size={"s"}
                                target={"_blank"}
                            />
                        </Flex>
                    </Flex>
                    <Flex className={styles.infoPosition}>
                        <Flex direction={"column"} gap={"s"} maxWidth={"xs"}>
                            <Flex direction={"column"} gap={"2"}>
                                <Heading variant={"display-strong-xl"} className={styles.textAlign}>
                                    {data ? data.username : ""}
                                </Heading>
                            </Flex>
                            <Flex direction={"column"} gap={"s"} className={styles.about}>
                                <Text variant={"body-default-l"}>
                                    &nbsp;&nbsp;&nbsp;Meet <SmartLink prefixIcon={'github'} href={'https://github.com/hitomihiumi/Amelia'}>{data ? data.username : ""}</SmartLink>, an open-source project for a multifunctional Discord bot! It supports various languages, including EN, RU, and UA. Advanced economy, built-in level system. Beautiful user cards.
                                </Text>
                                <Text variant={"body-default-l"}>
                                    &nbsp;&nbsp;&nbsp;Frequent and major updates. Component and script builders that allow you to create your own utilities for the server. Add {data ? data.username : ""} to your server and test it now!
                                </Text>
                                <Flex gap={'xs'} marginTop={'16'} s={{ horizontal: 'center' }}>
                                    <Button prefixIcon={'discord'} href={'https://discord.com/api/oauth2/authorize?client_id=1356347611283591218&permissions=295749283071&scope=bot%20applications.commands'} target={'_blank'}>
                                        Invite {data ? data.username : ""}
                                    </Button>
                                    <Button variant={'secondary'} prefixIcon={'github'} href={'https://github.com/hitomihiumi/Amelia'} target={'_blank'}>
                                        View Source
                                    </Button>
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>
                </RevealFx>
            </Flex>
        </Flex>
    );
}
