import React, {useEffect, useState} from "react";
import { CountdownFx, Flex, IconButton, RevealFx, Text} from "@once-ui-system/core";

export const Birthday = () => {
    const [windowClosed, setWindowClosed] = useState(true);
    const targetDate = new Date(Date.UTC(new Date().getFullYear(), 2, 14)) // March 14, 2026 (months are 0-indexed)

    useEffect(() => {
        if (targetDate.getTime() + 24 * 60 * 60 * 1000 < new Date().getTime()) {
            setWindowClosed(true);
        } else if (new Date().getTime() + 30 * 24 * 60 * 60 * 1000 > targetDate.getTime()) {
            setWindowClosed(false);
        }
    }, [targetDate]);

    return (
        <>
            <RevealFx
                position={'absolute'}
                top={'16'}
                delay={0.2}
                translateY={0.5}
                horizontal={"center"}
                zIndex={'10'}
            >
                <Flex
                    horizontal={"center"}
                    vertical={"center"}
                    direction={"row"}
                    gap={"xs"}
                    background={'surface'}
                    border={'accent-alpha-medium'}
                    paddingX={'12'}
                    paddingY={'4'}
                    radius={'l'}
                    hide={windowClosed}
                >
                    <Flex
                        horizontal={"center"}
                        vertical={"center"}
                        direction={"row"}
                        gap={"8"}
                    >
                        {targetDate.getTime() > new Date(Date.now()).getTime() ? (
                            <>
                                <Text
                                    variant={'body-default-m'}
                                >
                                    🎂 Until my birthday! left:
                                </Text>
                                <CountdownFx
                                    targetDate={targetDate}
                                    format="DD:HH:MM:SS"
                                    variant="body-strong-m"
                                    effect="simple"
                                    onBackground={'accent-weak'}
                                />
                            </>
                        ) : (
                            <>
                                <Text
                                    variant={'body-default-m'}
                                >
                                    🎂 Happy birthday to me!
                                </Text>
                            </>
                        )}
                    </Flex>
                    <IconButton
                        icon={'close'}
                        variant={'ghost'}
                        size={'m'}
                        onClick={() => setWindowClosed(true)}
                    />
                </Flex>
            </RevealFx>
        </>
    );
}