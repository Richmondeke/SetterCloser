import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/context/UserContext";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SetterCloser — Hire Your SDR Team on Autopilot",
  description:
    "Find pre-vetted sales setters, closers, and AI sales agents. Build your revenue team in minutes.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={ibmPlexMono.variable}>
      <body className="bg-[#0b0b0b] text-[#b9b9b9] font-sans antialiased min-h-screen" style={{ fontFamily: 'var(--font-sans)' }}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
