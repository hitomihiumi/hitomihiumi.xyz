"use client";

import React, { useEffect, useState } from "react";

import {Flex, Text, Grid, RevealFx, Accordion} from "@once-ui-system/core";
import { GameCard, SteamProfile } from "@/components";
import { ExtendedSteamGame, ExtendedSteamProfile } from "@/types/types";

import styles from "../../components/steam/page.module.scss";

export default function Page() {
  const [games, setGames] = useState<ExtendedSteamGame[]>([]);
  const [profile, setProfile] = useState<ExtendedSteamProfile | null>(null);

  useEffect(() => {
    fetch("https://api.hitomihiumi.xyz/v2/steam/user/76561198904028626/games/recently")
      .then((data) => data.json())
      .then((data) => setGames(data.response.games));
  }, []);

  useEffect(() => {
    fetch("https://api.hitomihiumi.xyz/v2/steam/user/76561198904028626").then((data) =>
      data.json().then((data) => setProfile(data.response.players[0])),
    );
  }, []);

  return (
    <Flex fill direction={"column"} gap={"s"} horizontal={"center"} vertical={"center"}>
      {profile && (
        <RevealFx delay={0.2} translateY={0.5} horizontal={"center"}>
          <SteamProfile profileData={profile} className={styles.steamProfile} />
        </RevealFx>
      )}

      {games && games.length > 0 && (
        <RevealFx delay={0.4} translateY={1} horizontal={"center"} fit>
          <Accordion title={'Recently Played Games'}>
              <Flex
                  direction={"column"}
                  fit
                  padding={"16"}
                  gap={"16"}
                  horizontal={"center"}
                  background={"page"}
                  radius={"l"}
                  border={"neutral-alpha-medium"}
                  overflow={"hidden"}
                  m={{ maxWidth: "xs" }}
              >
                  <Text variant={"heading-strong-m"}>Recently Played Games</Text>
                  <Grid
                      columns={"4"}
                      gap={"16"}
                      s={{ columns: "2", gap: "8" }}
                      m={{ columns: "3", gap: "12" }}
                  >
                      {games.map((game, idx) => (
                          <Flex key={idx}>
                              {game.library_capsule_2x && <GameCard key={game.appid} data={game} size={"xl"} />}
                          </Flex>
                      ))}
                  </Grid>
              </Flex>
          </Accordion>
        </RevealFx>
      )}
    </Flex>
  );
}
