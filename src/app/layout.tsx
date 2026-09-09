import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GRATIS Group | Industrial Timber & Architectural Materials",
  description: "Leader in manufacturing, wholesale, Woodmall retail, and architectural panel solutions across South India & UAE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Oswald:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased selection:bg-[#D9233E] selection:text-white bg-[#0B0B0B] text-[#FFFFFF]">
        {children}
      </body>
    </html>
  );
}
