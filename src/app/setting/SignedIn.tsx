"use client";
import {
  Button,
  Flex,
  TextField,
  Text,
  AlertDialog,
  Card,
  Avatar,
  Box,
  Link,
} from "@radix-ui/themes";
import { signOut } from "next-auth/react";
import { FC, useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@/db/schema/users";
import { Session } from "next-auth";
interface IProps {
  session: Session;
  updateUserName: (data: TNameFormSchema) => Promise<void>;
}
const nameFormSchema = insertUserSchema.pick({ name: true });
export type TNameFormSchema = z.infer<typeof nameFormSchema>;
const SignedIn: FC<IProps> = ({ session, updateUserName }) => {
  const updateUserNameAlertRef = useRef<HTMLButtonElement>(null);
  const closeAlertRef = useRef<HTMLButtonElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TNameFormSchema>({
    resolver: zodResolver(nameFormSchema),
  });

  return (
    <>
      <Flex direction={"column"} justify="center" gap={"2"}>
        <Card>
          <Flex gap="3" align="center">
            <Avatar
              src={session.user.image || undefined}
              radius="full"
              fallback="T"
            />
            <Box>
              <Link
                asChild
                onClick={() => updateUserNameAlertRef.current?.click()}
              >
                <Text as="div" size="2" weight="bold">
                  {session.user.name || "设置昵称"}
                </Text>
              </Link>
              <Text as="div" size="2" color="gray">
                {session.user.email}
              </Text>
            </Box>
          </Flex>
        </Card>
        <Button onClick={() => signOut()}>登出</Button>
      </Flex>

      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <button hidden ref={updateUserNameAlertRef}></button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <form
            onSubmit={handleSubmit(async (d) => {
              await updateUserName(d);
              closeAlertRef.current?.click();
              alert("懒得搞了，自己重登刷新jwt");
            })}
          >
            <AlertDialog.Title>修改昵称</AlertDialog.Title>
            <Flex mb={"2"} gap={"2"} direction="column">
              <TextField.Input {...register("name")} placeholder="请输入昵称" />
              <Text size="1" color="red">
                {errors.name?.message}
              </Text>
            </Flex>

            <Flex gap="3" justify="end">
              <AlertDialog.Cancel>
                <Button variant="soft" color="gray" ref={closeAlertRef}>
                  关闭
                </Button>
              </AlertDialog.Cancel>
              <Button type="submit">提交</Button>
            </Flex>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default SignedIn;
