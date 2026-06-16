import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ToastProvider from "@/components/ToastProvider";

export const metadata = {
  title: "SunCart - Summer Essentials",
  description: "Premium Summer E-Commerce Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="summer">
      <body className="bg-slate-50 text-neutral min-h-screen flex flex-col">
        <ToastProvider />
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}