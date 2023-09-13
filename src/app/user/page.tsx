import NextLink from "next/link";
import { Card, Link } from "@radix-ui/themes";

export default async function Page() {
  return (
    <div>
      <NextLink legacyBehavior href={"/user/post"}>
        <Link asChild highContrast underline={"hover"}>
          <Card>文章管理</Card>
        </Link>
      </NextLink>
    </div>
  );
}
