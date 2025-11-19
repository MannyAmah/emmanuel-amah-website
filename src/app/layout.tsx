import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CommandMenu } from "@/components/command-menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Emmanuel Amah",
  description: "Healthcare Provider, Data Scientist and Founder. Building products. Sharing insights on health and life.",
  openGraph: {
    title: "Emmanuel Amah",
    description: "Healthcare Provider, Data Scientist and Founder. Building products. Sharing insights on health and life.",
    url: "https://emmanuelamah.com",
    siteName: "Emmanuel Amah",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-black`}
      >
        {children}
        <CommandMenu />
      </body>
    </html>
  );
}
