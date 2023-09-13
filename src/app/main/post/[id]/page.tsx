import db from "@/db";
import { Box, Flex, Heading, Text } from "@radix-ui/themes";
import { tzTransform } from "@/utils";
import { getPostById } from "@/app/_action/post";
export async function generateStaticParams() {
  const posts = await db.query.posts.findMany({ columns: { id: true } });
  return posts.map((post) => ({ id: post.id.toString() }));
}

interface IProps {
  params: { id: string };
}
export default async function Page({ params }: IProps) {
  const data = await getPostById(params.id);
  if (!data) return;
  return (
    <Flex direction={"column"} gap="2">
      <Heading align={"center"}>{data.title}</Heading>
      <Flex justify={"between"} align={"center"} gap="4">
        <Box>
          <Text size={"1"} color="gray">
            {data.description}
          </Text>
        </Box>
        <Box style={{ minWidth: 200 }}>
          <Text size={"1"} color="gray">
            &emsp;&emsp;作者：{data.author.name || data.author.email}
          </Text>
          <Flex direction={"column"}>
            <Text size={"1"} color="gray">
              {"发布时间："}
              {tzTransform(data.createdAt).calendar()}
            </Text>
            <Text size={"1"} color="gray">
              {"编辑时间："}
              {tzTransform(data.updatedAt).calendar()}
            </Text>
          </Flex>
        </Box>
      </Flex>
      <Text size={"2"} style={{ whiteSpace: "pre-wrap" }}>
        {data.content}
      </Text>
    </Flex>
  );
}
