import NewPostForm from "../new/NewPostForm";
import { Flex, Heading } from "@radix-ui/themes";

import { updatePostById, getPostById } from "@/app/_action/post";
import { cache } from "react";
import { TInsertPostSchema } from "@/db/schema/posts";
interface IProps {
  params: { id: string };
}
const getCachePostById = cache(getPostById);
export default async function Page({ params }: IProps) {
  const data = await getCachePostById(params.id);
  if (!data) return;
  const defaultValues: TInsertPostSchema = {
    title: data.title,
    description: data.description,
    content: data.content,
  };
  async function updatePost(data: TInsertPostSchema) {
    "use server";
    await updatePostById(params.id, data);
  }
  return (
    <Flex direction={"column"} align="center">
      <Heading mb={"4"}>编辑文章</Heading>
      <NewPostForm
        action={updatePost}
        defaultValues={defaultValues}
      ></NewPostForm>
    </Flex>
  );
}
