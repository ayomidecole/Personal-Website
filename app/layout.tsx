import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FolderNav } from "./components/FolderNav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Personal Website",
  description: "Developer portfolio and writing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased bg-[#050810]`}
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(5, 8, 16, 0.5) 0%, rgba(5, 8, 16, 0.72) 100%), url("/new-bg.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <FolderNav />
        <main className="min-h-screen p-8">{children}</main>
      </body>
    </html>
  );
}
