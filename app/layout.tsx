import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { CartStoreProvider } from "@/providers/cart-store-provider";
import { Toaster } from "@/components/ui/sonner";

const redHatText = localFont({
  src: [
    {
      path: "./fonts/static/RedHatText-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/static/RedHatText-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/static/RedHatText-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "AI Product Ordering System",
  description:
    "An AI-powered product ordering system. Order your products with the help of AI chatbot and automatically generate orders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${redHatText.className} relative bg-rose-50 antialiased`}
      >
        <CartStoreProvider>{children}</CartStoreProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
