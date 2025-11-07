"use client";

import React, { useEffect, useState } from "react";

import { Flex, Grid, MasonryGrid, Media, RevealFx } from "@once-ui-system/core";

export default function Page() {
  return (
    <Flex fill direction={"column"} gap={"s"} horizontal={"center"} vertical={"center"}>
      <RevealFx fill delay={0.2} translateY={0.5} horizontal={"center"}>
        <Flex
          direction={"column"}
          fill
          padding={"16"}
          gap={"16"}
          horizontal={"center"}
          background={"page"}
          radius={"l"}
          border={"neutral-alpha-medium"}
          maxWidth={"xl"}
        >
          <MasonryGrid columns={4} m={{ columns: 3 }} s={{ columns: 2 }}>
            {[
              "IMG_20251011_202950264",
              "IMG_20251011_203301865",
              "IMG_20251011_204744499",
              "IMG_20251011_204818742",
              "IMG_20250810_210716438",
              "IMG_20250813_212054907",
              "IMG_20250813_212550842",
              "IMG_20251027_130536564",
              "IMG_20251027_133422927",
              "IMG_20251027_134341343",
              "IMG_20251028_130228876",
              "IMG_20251028_140151601",
            ].map((item, index) => (
              <Media key={index} src={`/images/gallery/${item}.jpg`} enlarge />
            ))}
          </MasonryGrid>
        </Flex>
      </RevealFx>
    </Flex>
  );
}
