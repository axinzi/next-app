import { Avatar, Box, Flex, Heading, Link } from "@radix-ui/themes";
import { FC } from "react";
import NextLink from "next/link";
import HeaderTabs from "./HeaderTabs";
import { Session } from "next-auth";
import { PersonIcon } from "@radix-ui/react-icons";
interface IProps {
  session: Session | null;
}
const Header: FC<IProps> = ({ session }) => {
  return (
    <Box
      style={{
        zIndex: 1,
        backgroundColor: "var(--color-panel-solid)",
        boxShadow: "0 1px var(--gray-a4)",
      }}
      position={"sticky"}
      top="0"
      left="0"
      right="0"
    >
      <Flex justify={"between"} px={"4"} height={"8"}>
        <NextLink legacyBehavior href={"/"}>
          <Link asChild highContrast underline={"hover"}>
            <Heading asChild>
              <Flex align={"center"}>Next-App</Flex>
            </Heading>
          </Link>
        </NextLink>
        <HeaderTabs></HeaderTabs>
      </Flex>
    </Box>
  );
};

export default Header;
