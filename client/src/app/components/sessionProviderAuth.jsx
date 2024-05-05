"use client";
import { SessionProvider } from "next-auth/react";

export default function SessionProviderAuth({ children }) {
 return <SessionProvider>{children}</SessionProvider>;
}
