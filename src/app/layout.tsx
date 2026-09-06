import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GRATIS India | PVC Foam Boards, Plywood, MDF, Laminates & Veneer in Kerala",
  description: "Trusted supplier of PVC Foam Boards, Plywood, MDF, Veneer, Laminates, and Hylam Sheets in Kerala, India. Over 25 years of material excellence and reliable service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased selection:bg-[#8C6D53] selection:text-white">
        {children}
      </body>
    </html>
  );
}
