import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="bg-slate-900 text-slate-100 bg-gradient-to-tr from-slate-950 from-10% to-slate-700 to-80%"
    >
      <body className={urbanist.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
