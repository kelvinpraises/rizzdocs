import Header from "@/components/organisms/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Footer from "@/components/organisms/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className=" flex flex-col gap-8 w-screen h-screen">
          <Header />
          <div className=" flex flex-1 overflow-y-scroll px-8 gap-8">
            {children}
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}