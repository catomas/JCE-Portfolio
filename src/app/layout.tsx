import type { Metadata } from "next";
import { Vollkorn, Work_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Background from "@/components/background";

const vollkorn = Vollkorn({ subsets: ["latin"], variable: "--font-vollkorn" });
const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
});

export const metadata: Metadata = {
  title: "Juan Carlos Avalúos | Avaluos Inmobiliarios ",
  description: "Avaluos Inmobiliarios | Juan Carlos Avalúos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${vollkorn.variable} ${workSans.variable} bg-gray-50 `}>
        <Background />
        <Header />
        <div className="pt-28">{children}</div>
      </body>
    </html>
  );
}
