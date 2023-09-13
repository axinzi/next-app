import { FC, ReactNode } from "react";
import { Theme, ThemePanel, Dialog } from "@radix-ui/themes";
import "./global.css";
import "@radix-ui/themes/styles.css";
import SessionProvider from "./_components/SessionProvider";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import Header from "./_components/Header";
import PageContainer from "./_components/PageContainer";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import utc from "dayjs/plugin/utc";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import localizedFormat from "dayjs/plugin/localizedFormat";
import timezone from "dayjs/plugin/timezone";
dayjs.locale("zh-cn");
dayjs.extend(timezone);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(utc);
dayjs.tz.setDefault("Asia/Shanghai");
dayjs.updateLocale("zh-cn", {
  calendar: {
    lastDay: "昨天 LT",
    sameDay: "今天 LT",
    nextDay: "明天 LT",
    lastWeek: "上周 dddd LT",
    nextWeek: "下周 dddd LT",
    sameElse: "YYYY-MM-DD",
  },
});
export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="zh-cn" suppressHydrationWarning>
      <body>
        <Theme
          appearance="light"
          accentColor="iris"
          grayColor="sand"
          radius="full"
          scaling="110%"
          panelBackground="solid"
        >
          <SessionProvider session={session}>
            <Header session={session} />
            <PageContainer>{children}</PageContainer>
          </SessionProvider>
          {/* <ThemePanel></ThemePanel> */}
        </Theme>
      </body>
    </html>
  );
}
