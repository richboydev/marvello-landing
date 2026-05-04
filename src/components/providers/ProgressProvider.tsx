"use client";

import { ProgressProvider as BProgressProvider } from "@bprogress/next/app";

export default function ProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BProgressProvider
      height="2px"
      color="#C9A96E"
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </BProgressProvider>
  );
}
