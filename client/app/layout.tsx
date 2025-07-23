import { Geist, Geist_Mono } from "next/font/google";
import StoreProvider from "@/app/StoreProvider";
import React from 'react';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto max-w-3xl`}>
          <StoreProvider>
            {children}
          </StoreProvider>
      </body>
    </html>
  );
}
