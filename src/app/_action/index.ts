'use server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
export async function getUserId() {
  const session = await getServerSession(authOptions);
  const id = session?.user.id;
  if (!id) {
    redirect("/api/auth/signin");
  }
  return id;
}