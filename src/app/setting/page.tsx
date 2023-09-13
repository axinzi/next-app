import { users } from "@/db/schema/users";
import { Heading, Flex } from "@radix-ui/themes";
import InnerContainer from "./InnerContainer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { TNameFormSchema } from "./SignedIn";
import db from "@/db";
import { eq } from "drizzle-orm";
import { getUserId } from "../_action";

async function updateUserName(data: TNameFormSchema) {
  "use server";
  const id = await getUserId();
  await db.update(users).set({ name: data.name }).where(eq(users.id, id));
}
export default async function Page() {
  return (
    <Flex direction={"column"} align="center">
      <Heading mb={"4"}>设置</Heading>
      <InnerContainer updateUserName={updateUserName}></InnerContainer>
    </Flex>
  );
}
