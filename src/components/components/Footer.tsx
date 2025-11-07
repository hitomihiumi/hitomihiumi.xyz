import { Fade, Flex, IconButton, SmartLink, Text } from "@once-ui-system/core";
import { social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Flex
        as="footer"
        fillWidth
        padding="8"
        horizontal="center"
        s={{ direction: "column" }}
        zIndex={8}
      >
        <Flex
          className={styles.mobile}
          maxWidth="m"
          paddingY="8"
          paddingX="16"
          gap="16"
          horizontal="between"
          vertical="center"
        >
          <Text variant="body-default-s" onBackground="neutral-strong">
            <Text onBackground="neutral-weak">© 2024-{currentYear} /</Text>
            <Text onBackground="neutral-weak">
              {" "}
              Built with <SmartLink href="https://once-ui.com">Once UI</SmartLink> / By Me 💜
            </Text>
          </Text>
          <Flex gap="16">
            {social.map(
              (item) =>
                item.link && (
                  <IconButton
                    key={item.name}
                    href={item.link}
                    icon={item.icon}
                    tooltip={item.name}
                    size="s"
                    variant="ghost"
                  />
                ),
            )}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
