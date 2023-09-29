import DocumentNav from "@/components/molecules/DocumentNav";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DocumentNav />
      {children}
    </>
  );
}
