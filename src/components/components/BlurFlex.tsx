"use client";

import React, { forwardRef } from "react";
import classNames from "classnames";
import { Flex } from "@once-ui-system/core";

interface BlurFlexProps {
  flexProps?: React.ComponentProps<typeof Flex>;
  blurAmount?: number;
  blurColor?: string;
  blurFade?: number;
}

const BlurFlex = forwardRef<HTMLDivElement, BlurFlexProps & React.ComponentProps<typeof Flex>>(
  (
    {
      blurAmount = 10,
      blurColor = "rgba(255, 255, 255, 0.1)",
      blurFade = 0,
      className,
      style,
      children,
      flexProps,
      ...props
    },
    ref,
  ) => {
    const fadeIntensity = Math.max(0, Math.min(1, blurFade));

    return (
      <Flex
        ref={ref}
        className={classNames("relative overflow-hidden", className)}
        style={{
          position: "relative",
          ...style,
        }}
        {...props}
      >
        <Flex
          fill
          position={"absolute"}
          pointerEvents={"none"}
          zIndex={-1}
          style={{
            background: blurColor,
            backdropFilter: `blur(${blurAmount}px)`,
            WebkitBackdropFilter: `blur(${blurAmount}px)`,
            maskImage: fadeIntensity
              ? `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, ${fadeIntensity}) 5%, rgba(0, 0, 0, ${fadeIntensity}) 95%, rgba(0, 0, 0, 0) 100%)`
              : undefined,
            WebkitMaskImage: fadeIntensity
              ? `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, ${fadeIntensity}) 5%, rgba(0, 0, 0, ${fadeIntensity}) 95%, rgba(0, 0, 0, 0) 100%)`
              : undefined,
          }}
        ></Flex>

        <Flex position={"relative"} {...flexProps}>
          {children}
        </Flex>
      </Flex>
    );
  },
);

BlurFlex.displayName = "BlurFlex";

export { BlurFlex };
