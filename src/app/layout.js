import { Analytics } from '@vercel/analytics/react';
import "./globals.css";

export const metadata = {
  title: "AI Writing Assistant",
  description: "An AI-powered writing assistant built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
