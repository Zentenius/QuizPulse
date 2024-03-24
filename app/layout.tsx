import type { Metadata } from "next";
import { Poppins } from 'next/font/google' 

import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});


export const metadata: Metadata = {
  title: "QuizPulse",
  description: "QuizPulse is a quiz app that helps you learn new topics through ai innovation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` bg-[#ecf3f1] dark:bg-[#111c19] ${poppins.className}`}>
        <Providers>
        <Navbar/>
        {
        children} 
        <Toaster/>
        </Providers>    </body>

    </html>

  );
}
