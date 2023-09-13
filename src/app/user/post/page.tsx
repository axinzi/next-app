import NextLink from "next/link";
import { Button, Card, Flex, Link, Table } from "@radix-ui/themes";

import { getPostListByUserId, deletePostById } from "@/app/_action/post";
import { cache } from "react";
import { tzTransform } from "@/utils";
import { z } from "zod";
const getCachePostListByUserId = cache(getPostListByUserId);
async function deletePost(d: FormData) {
  "use server";
  const id = z.string().parse(d.get("id"));
  await deletePostById(id);
}
export default async function Page() {
  const data = await getCachePostListByUserId();
  return (
    <div>
      <NextLink legacyBehavior href={"/user/post/new"}>
        <Link asChild highContrast underline={"hover"}>
          <Card>新建文章</Card>
        </Link>
      </NextLink>
      <Table.Root size={"3"}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>标题</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>创建时间</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>编辑时间</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>操作</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((post) => {
            const { id, title, updatedAt, createdAt } = post;
            return (
              <Table.Row key={id}>
                <Table.RowHeaderCell>{title}</Table.RowHeaderCell>
                <Table.Cell>{tzTransform(createdAt).calendar()}</Table.Cell>
                <Table.Cell>{tzTransform(updatedAt).calendar()}</Table.Cell>
                <Table.Cell>
                  <Flex gap="2">
                    <NextLink legacyBehavior href={`/user/post/${id}`}>
                      <Button size={"1"}>编辑</Button>
                    </NextLink>
                    <form action={deletePost}>
                      <input type="hidden" name="id" defaultValue={id} />
                      <Button size={"1"} color="red" type="submit">
                        删除
                      </Button>
                    </form>
                  </Flex>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
