import { Inter } from "next/font/google";
import Header from "@/components/header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth App",
  description: "Simple Auth App.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <div className="flex items-center justify-center bg-gray-100">
          <Header />
        </div>
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
