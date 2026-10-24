import { Geist } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import StoreProvider from "@/store/StoreProvider";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shoply | Modern essentials",
  description: "A simple product shop built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <StoreProvider>
          <NavBar />
          <main className="site-main">{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
