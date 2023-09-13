"use client";
import { useSession } from "next-auth/react";
import { FC } from "react";
import SignedIn, { TNameFormSchema } from "./SignedIn";
import UnsignedIn from "./UnsignedIn";
interface IProps {
  updateUserName: (data: TNameFormSchema) => Promise<void>;
}
const InnerContainer: FC<IProps> = ({ updateUserName }) => {
  const { data: session } = useSession();
  return session ? (
    <SignedIn session={session} updateUserName={updateUserName} />
  ) : (
    <UnsignedIn />
  );
};
export default InnerContainer;
