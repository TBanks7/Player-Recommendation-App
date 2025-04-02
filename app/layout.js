import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    // <html lang="en">
    //   <body
    //     className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    //   >
    //     {children}
    //   </body>
    // </html>

<html lang="en" suppressHydrationWarning>
<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow pb-6">
      {children}
    </main>
    <footer className="bg-gray-100 py-4 mt-6">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm text-gray-600">© 2025 PlayerMatch. All rights reserved.</p>
      </div>
    </footer>
  </div>
  {/* <Toaster /> */}
</body>
</html>
  );
}
