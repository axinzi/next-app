"use client";

import { SessionProvider as AuthSessionProvider } from "next-auth/react";
import { SessionProviderProps } from "next-auth/react";

export default function SessionProvider(props: SessionProviderProps) {
  return <AuthSessionProvider {...props}>{props.children}</AuthSessionProvider>;
}
