import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Dancing_Script, Inter } from "next/font/google";
import type React from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});

export const metadata = {
  title: "Kỷ niệm 2000 Ngày Yêu Nhau - Qy & NYL",
  description: "Trang kỷ niệm 2000 ngày yêu nhau của Qy và NYL",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${inter.variable} ${dancingScript.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
