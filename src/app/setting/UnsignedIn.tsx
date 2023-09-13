"use client";
import { Button, Flex, TextField, Text, AlertDialog } from "@radix-ui/themes";
import { signIn } from "next-auth/react";
import { FC, useRef } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@/db/schema/users";

const emailFormSchema = insertUserSchema.pick({ email: true });
const UnsignedIn: FC = () => {
  const emailCheckAlertRef = useRef<HTMLButtonElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
  });
  return (
    <>
      <Flex direction={"column"} justify="center" gap={"2"}>
        <form
          onSubmit={handleSubmit(async (data) => {
            await signIn("email", { ...data, redirect: false });
            emailCheckAlertRef.current?.click();
          })}
        >
          <Flex gap={"2"} direction="column">
            <TextField.Input {...register("email")} placeholder="请输入邮箱" />
            <Text size="1" color="red">
              {errors.email?.message}
            </Text>

            <Button type="submit">邮箱登录</Button>
          </Flex>
        </form>
        <Flex justify={"between"} gap="2">
          <Button
            onClick={() =>
              signIn("credentials", {
                email: "222@222.com",
                redirect: false,
              })
            }
          >
            用户一键登录
          </Button>
          <Button
            onClick={() =>
              signIn("credentials", {
                email: "333@333.com",
                redirect: false,
              })
            }
          >
            管理员一键登录
          </Button>
        </Flex>
      </Flex>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <button hidden ref={emailCheckAlertRef}></button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>邮箱登录</AlertDialog.Title>
          <AlertDialog.Description size="2">
            激活链接已发送，请前往邮箱查看
          </AlertDialog.Description>

          <Flex gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                关闭
              </Button>
            </AlertDialog.Cancel>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default UnsignedIn;
