import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "./components/header/Header";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { getUserFromServer } from "./utils/getUserFromServer";
import { AuthProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cloud Hoisting ",
  description: "Cloud Hoisting Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = getUserFromServer();

  return (
    <html
      lang="en"
      className={`${playfairDisplay.className} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <AuthProvider user={user}>
          <Header />
          <ToastContainer theme="colored" />

          <main className="flex-1">{children}</main>

          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
