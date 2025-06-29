import type { Metadata } from "next";
import { Providers } from "../store/provider";
import { QueryProvider } from "../components/QueryProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "AppNation - Weather Dashboard",
  description: "Modern and user-friendly weather application",
  keywords: ["weather", "dashboard", "Next.js", "React"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-gray-50">
        <QueryProvider>
          <Providers>{children}</Providers>
        </QueryProvider>
      </body>
    </html>
  );
}
