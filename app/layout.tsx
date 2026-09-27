import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LearnSpace",
  description: "Personal learning dashboard"
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
