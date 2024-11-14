// app/auth/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "../globals.css"; // Assuming global styles are still needed

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Auth Page",
  description: "Authentication pages for login and signup",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <main >
        {children}
        </main>
      </body>
    </html>
  );
}
