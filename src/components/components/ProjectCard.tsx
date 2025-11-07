"use client";

import { Flex, Text, Media, Line, IconButton, Icon, Heading, Tag } from "@once-ui-system/core";
import { Project } from "@/types/types";

import styles from "@/components/components/ProjectCard.module.scss";

export interface ProjectCardProps {
  data: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ data }) => {
  let statusString =
    data.status === "progress"
      ? "In Progress"
      : data.status === "completed"
        ? "Completed"
        : data.status === "frozen"
          ? "Frozen"
          : data.status === "archived"
            ? "Archived"
            : "Abandoned";

  return (
    <>
      <Flex
        fillHeight
        fillWidth
        direction={"column"}
        background={"overlay"}
        border={"neutral-alpha-medium"}
        radius={"l"}
        className={styles.base}
      >
        <Flex direction={"column"}>
          <Media
            src={data.image}
            aspectRatio={"16 / 9"}
            fill
            maxHeight={"160"}
            position={"relative"}
            radius={"m"}
          />
          <Line background={"neutral-alpha-medium"} vert={false} />
        </Flex>
        <Flex padding={"8"} gap={"4"} direction={"column"} fillHeight>
          {data.tags && (
            <>
              <Flex fit gap={"4"}>
                {data.tags.map((tag, index) => (
                  <Tag
                    key={index}
                    variant={tag.variant}
                    size={tag.size}
                    label={tag.label}
                    textVariant={"body-default-s"}
                  />
                ))}
              </Flex>
            </>
          )}
          <Flex padding={"4"} gap={"4"} direction={"column"} fillHeight>
            <Heading variant={"heading-strong-m"}>{data.name}</Heading>
            <Text variant="body-default-m" onBackground="neutral-weak">
              {data.description}
            </Text>
          </Flex>
          <Flex gap={"4"}>
            {data.github && <IconButton href={data.github} icon={"github"} variant={"secondary"} />}
            {data.website && (
              <IconButton href={data.website} icon={"document"} variant={"secondary"} />
            )}
            {data.npm && <IconButton href={data.npm} icon={"npm"} variant={"secondary"} />}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};
