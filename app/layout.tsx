import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "UI Vibe Lab",
  description: "AI-assisted UX review from interface screenshots.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
