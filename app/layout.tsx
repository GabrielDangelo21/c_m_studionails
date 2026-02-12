import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "C&M Studio Nails | Manicura y Pedicura Profesional en España",
  description: "Descubre la elegancia y el cuidado profesional para tus manos y pies en C&M Studio Nails. Reserva tu cita online.",
  keywords: ["uñas", "manicura", "pedicura", "estudio de uñas", "españa", "nails spain"],
  icons: {
    icon: [
      { url: '/images/gallery/Logo.jpeg' },
      { url: '/images/gallery/Logo.jpeg', rel: 'icon', type: 'image/jpeg' },
    ],
    shortcut: '/images/gallery/Logo.jpeg',
    apple: [
      { url: '/images/gallery/Logo.jpeg' },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
