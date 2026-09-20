import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "../shared/providers/QueryProvider";
import { AuthProvider } from "../shared/providers/AuthProvider";
import { ToastProvider } from "../shared/providers/ToastProvider";
import { BrandThemeProvider } from "../shared/providers/BrandThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ApexGym Peru | Red de Gimnasios Fitness Premium",
  description:
    "Instalaciones Hi-Tech, entrenadores certificados y membresías VIP. Sedes en San Miguel, Surco y Miraflores.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider>
          <QueryProvider>
            <BrandThemeProvider>
              <AuthProvider>{children}</AuthProvider>
            </BrandThemeProvider>
          </QueryProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
