'use server'
import db from "@/db";
import { posts, TInsertPostSchema } from "@/db/schema/posts";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getUserId } from "..";



export async function getPostList() {
  const data = await db.query.posts.findMany({
    orderBy: (posts, { desc }) => [desc(posts.updatedAt)],
    columns: {
      id: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      description: true,
    },
    with: {
      author: {
        columns: {
          name: true,
          email: true,
          role: true,
          image: true,
        },
      },
    },
  });
  return data;
};

export async function getPostListByUserId() {
  const id = await getUserId();
  const data = await db.query.posts.findMany({
    where: (posts) => eq(posts.userId, id),
    orderBy: (posts, { desc }) => [desc(posts.updatedAt)],
    columns: {
      id: true,
      createdAt: true,
      updatedAt: true,
      title: true,
      description: true,
    },
    with: {
      author: {
        columns: {
          name: true,
          email: true,
          role: true,
          image: true,
        },
      },
    },
  });
  return data;
}

export async function getPostById(id: string | number) {
  const data = await db.query.posts.findFirst({
    where: eq(posts.id, Number(id)),
    columns: {
      createdAt: true,
      updatedAt: true,
      title: true,
      description: true,
      content: true,
    },
    with: {
      author: {
        columns: {
          name: true,
          email: true,
          role: true,
          image: true,
        },
      },
    },
  });
  return data;
}

export async function addPost(data: TInsertPostSchema) {
  const id = await getUserId();
  await db.insert(posts).values({ userId: id, ...data });
  redirect("/main");
}

export async function updatePostById(id: string | number, data: TInsertPostSchema) {
  await db.update(posts).set(data).where(eq(posts.id, Number(id)))
  redirect("/user/post");
}

export async function deletePostById(id: string | number) {
  await db.delete(posts).where(eq(posts.id, Number(id)))
  redirect("/user/post");
}