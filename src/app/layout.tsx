import type { Metadata } from "next";
import "./globals.css";
import { AquaProvider } from "@/context/AquaContext";

export const metadata: Metadata = {
  title: "AquaMarine Farm // Commercial Aquaculture & RAS Hatchery (Titan #32)",
  description: "Sistem monitoring akuakultur resirkulasi tertutup (RAS) dan manajemen biomassa cerdas berbasis Aurora Oceanic Gradient Mesh.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#020B18] text-[#E0F2FE] antialiased">
        <AquaProvider>{children}</AquaProvider>
      </body>
    </html>
  );
}
