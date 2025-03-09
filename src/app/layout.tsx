import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ShitPoster",
  description: "Speak your mind and shitpost on your twitter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-background text-foreground">
      <body>
        {children}
      </body>
    </html>
  );
}
