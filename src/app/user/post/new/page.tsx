import NewPostForm from "./NewPostForm";
import { Flex, Heading } from "@radix-ui/themes";

import { addPost } from "@/app/_action/post";

export default async function Page() {
  return (
    <Flex direction={"column"} align="center">
      <Heading mb={"4"}>新建文章</Heading>
      <NewPostForm action={addPost}></NewPostForm>
    </Flex>
  );
}
