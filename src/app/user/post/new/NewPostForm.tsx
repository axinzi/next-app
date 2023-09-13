"use client";

import { Button, TextField, Text, Flex, Box, TextArea } from "@radix-ui/themes";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPostSchema, TInsertPostSchema } from "@/db/schema/posts";
interface IProps {
  action: (formData: TInsertPostSchema) => Promise<void>;
  defaultValues?: TInsertPostSchema;
}
const NewPostForm: FC<IProps> = ({ action, defaultValues }) => {
  const useFormConfig = defaultValues ? { defaultValues } : {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInsertPostSchema>({
    resolver: zodResolver(insertPostSchema),
    ...useFormConfig,
  });
  return (
    <form
      onSubmit={handleSubmit((d) => action(d))}
      style={{ maxWidth: 777, width: "100%" }}
    >
      <Flex direction={"column"} gap={"2"}>
        <TextField.Input
          color={errors.title ? "red" : undefined}
          placeholder="请输入标题"
          {...register("title")}
        />
        <TextArea
          color={errors.description ? "red" : undefined}
          placeholder="请输入描述"
          {...register("description")}
        />
        <TextArea
          color={errors.content ? "red" : undefined}
          placeholder="请输入内容"
          {...register("content")}
          style={{ height: 300 }}
        />
        <Flex justify={"center"}>
          <Button type="submit">提交</Button>
        </Flex>
      </Flex>
    </form>
  );
};
export default NewPostForm;
