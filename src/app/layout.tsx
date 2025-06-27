import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../store/provider";
import { QueryProvider } from "../components/QueryProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AppNation - Hava Durumu Dashboard",
  description: "Modern ve kullanıcı dostu hava durumu uygulaması",
  keywords: ["hava durumu", "weather", "dashboard", "Next.js", "React"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <QueryProvider>
          <Providers>{children}</Providers>
        </QueryProvider>
      </body>
    </html>
  );
}
