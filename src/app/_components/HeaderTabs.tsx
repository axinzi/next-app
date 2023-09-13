"use client";
import { FC } from "react";
import { Flex, Link, Tabs, Avatar } from "@radix-ui/themes";
import NextLink from "next/link";
import { useSession } from "next-auth/react";
import { PersonIcon } from "@radix-ui/react-icons";

const HeaderTabs: FC = () => {
  const { data: session } = useSession();
  return (
    <>
      <Tabs.Root>
        <Tabs.List>
          <NextLink legacyBehavior href={"/main"}>
            <Tabs.Trigger value="/main">主页</Tabs.Trigger>
          </NextLink>
          <NextLink legacyBehavior href={"/user"}>
            <Tabs.Trigger value="/user">我的</Tabs.Trigger>
          </NextLink>
          {session?.user.role === "admin" && (
            <NextLink legacyBehavior href={"/admin"}>
              <Tabs.Trigger value="/admin">管理员</Tabs.Trigger>
            </NextLink>
          )}
        </Tabs.List>
      </Tabs.Root>
      <NextLink legacyBehavior href={"/setting"}>
        <Link asChild highContrast underline={"hover"}>
          <Flex align={"center"}>
            <Avatar
              src={session?.user?.image || undefined}
              color={session ? undefined : "gray"}
              radius="full"
              fallback={<PersonIcon />}
            />
          </Flex>
        </Link>
      </NextLink>
    </>
  );
};

export default HeaderTabs;
