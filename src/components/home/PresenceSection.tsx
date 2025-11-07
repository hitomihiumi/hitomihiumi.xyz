"use client";

import styles from "@/components/home/PresenceSection.module.scss";

import { Flex, Carousel } from "@once-ui-system/core";
import React, { forwardRef } from "react";
import type { Presence as IPresence } from "@/types/types";
import { Presence } from "@/components/components";

export interface PresenceSectionProps {
  data?: IPresence;
  flexProps?: React.ComponentProps<typeof Flex>;
}

export const PresenceSection = forwardRef<
  HTMLDivElement,
  PresenceSectionProps & React.ComponentProps<typeof Flex>
>(({ className, style, children, data, flexProps, ...props }, ref) => {
  return (
    <Flex
      fit
      horizontal={"center"}
      className={styles.position}
      ref={ref}
      style={{
        ...style,
      }}
      {...props}
    >
      {data && (
        <>
          <Carousel
            items={{
              ...data.activities.map((activity, index) => {
                return { slide: <Presence data={activity} key={index} /> };
              }),
            }}
            fit
          ></Carousel>
        </>
      )}
      {children}
    </Flex>
  );
});
