import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "./components/nav/Navbar";
import Footer from "./components/footer/Footer";
import { Toaster } from "react-hot-toast";
import CartProvider from "../Providers/CartProvider";
import OfflineDetector from "./components/OfflineDetector";
import ScrollHandler from "./components/nav/ScrollHandler";
import Banner from "./components/nav/Banner";
import { UserProvider } from "./context/userContext";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Ecommerce Website",
  description: "Ecommerce App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) 

{
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
      <UserProvider>
        <OfflineDetector />
          <CartProvider>
            <div className="flex flex-col min-h-screen">
              <ScrollHandler>
                <Banner />
                <Navbar />
              </ScrollHandler>
              <main className="flex-grow">{children}</main>
              <Toaster/>
              <Footer />
            </div>
          </CartProvider>
          </UserProvider>
      </body>
    </html>
  );
}
