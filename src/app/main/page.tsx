import db from "@/db";
import dayjs from "dayjs";
import {
  Container,
  Grid,
  Card,
  Text,
  Link,
  Flex,
  Heading,
} from "@radix-ui/themes";
import { cache } from "react";
import NextLink from "next/link";
import style from "./stlye.module.css";
import { tzTransform } from "@/utils";
import { getPostList } from "@/app/_action/post";
const getCachePostList = cache(getPostList);

export default async function Page() {
  const data = await getCachePostList();
  return (
    <Container p={"5"}>
      <Flex direction={"column"} gap={"4"}>
        {data.map((post) => {
          const { title, description, author, updatedAt, id } = post;
          return (
            <NextLink legacyBehavior href={`/main/post/${id}`} key={id}>
              <a>
                <Card className={style["post-card"]}>
                  <Flex direction={"column"} gap={"2"}>
                    <Heading size={"4"}>{title}</Heading>
                    <Text size={"2"}>{description}</Text>
                    <Text size={"1"} color="gray">
                      {author.name || author.email}&emsp;
                      {tzTransform(updatedAt).calendar()}
                    </Text>
                  </Flex>
                </Card>
              </a>
            </NextLink>
          );
        })}
      </Flex>
    </Container>
  );
}
