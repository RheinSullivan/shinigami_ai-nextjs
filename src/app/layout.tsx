import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shinigami AI",
  description: "The presence of this AI Shinigami is to carry out the Great Task, nothing else :v",
  icons: {
    icon: "/icons/shinigami_ai_logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ebGaramond.variable} $antialiased`}>{children}</body>
    </html>
  );
}
