import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import LeftSideBar from "@/components/layout/LeftSideBar";
import TopBar from "@/components/layout/TopBar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nature Hug - Admin Dashboard",
  description: "Admin Dashboard to manage Nature Hug",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
        layout: {
          unsafe_disableDevelopmentModeWarnings: true,
        },
      }}>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex max-lg:flex-col text-grey-1">
        <LeftSideBar />
        <TopBar />
        <div className="flex-1" >{children}</div>
        </div>
      </body>
    </html>
    </ClerkProvider>
  );
}
