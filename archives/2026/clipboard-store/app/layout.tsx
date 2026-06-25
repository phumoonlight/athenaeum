import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clipboard Store — Fast Text Clipboard Manager",
  description:
    "Save, organize, and copy snippets of text instantly. A fast and beautiful clipboard manager for your browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
