import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Marci Metzger | Pahrump REALTOR®",
  description:
    "Marci Metzger, your expert real estate professional in Pahrump, Nevada. Helping you buy and sell homes in the Pahrump Valley area.",
  keywords: [
    "Pahrump real estate",
    "Marci Metzger",
    "Nevada homes",
    "Pahrump REALTOR",
    "Pahrump property",
  ],
  openGraph: {
    title: "Marci Metzger | Pahrump REALTOR®",
    description: "Your expert real estate professional in Pahrump, Nevada",
    url: "https://marcimetzger.com",
    siteName: "Marci Metzger Real Estate",
    images: [
      {
        url: "https://marcimetzger.com/wp-content/uploads/2018/05/mm-banner-dark-1600x500.jpg",
        width: 1600,
        height: 500,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
