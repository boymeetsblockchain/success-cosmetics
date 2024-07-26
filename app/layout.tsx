import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SessionProvider } from "next-auth/react";
import  {Toaster} from 'react-hot-toast'

const urbanist = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Success Cosmetics",
  description: "Welcome to Success Cosmetics, we sell a variety of skincare and wellness products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={urbanist.className}>
      
       <SessionProvider>
      <Navbar />
          {children}

        <Footer />
      </SessionProvider>
      <Toaster/>
  
      </body>
    </html>
  );
}
