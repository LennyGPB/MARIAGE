import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "react-day-picker/style.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Montserrat = localFont({
  src: [
    { path: './fonts/montserrat/MontserratAlternates-ExtraLight.ttf', weight: '200' },
    { path: './fonts/montserrat/MontserratAlternates-Light.ttf', weight: '300' },
    { path: './fonts/montserrat/MontserratAlternates-Regular.ttf', weight: '400' },
    { path: './fonts/montserrat/MontserratAlternates-Medium.ttf', weight: '500' },
    { path: './fonts/montserrat/MontserratAlternates-Bold.ttf', weight: '700' },
    { path: './fonts/montserrat/MontserratAlternates-ExtraBold.ttf', weight: '800' },
    { path: './fonts/montserrat/MontserratAlternates-Black.ttf', weight: '900' },
  ],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "EasyWed",
  description: "Organisez votre mariage sans stress grâce à une checklist IA personnalisée. Gagnez du temps, suivez vos tâches, et profitez de votre jour J en toute sérénité.",
  icons: {
    icon: "/icon.png",
  },
};

const RubikHatch = localFont({
  src: [
    { path: './fonts/RubikMarkerHatch-Regular.ttf', weight: '100' }
  ],
  variable: '--font-rubik-hatch',
  display: 'swap',
});

const Inter = localFont({
  src: [
    { path: './fonts/Inter-VariableFont_opsz,wght.ttf', weight: '400' }
  ],
  variable: '--font-inter',
  display: 'swap',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable} ${Montserrat.variable} ${RubikHatch.variable} ${Inter.variable} antialiased min-h-screen bg-white `}> 
        <Providers>
        {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
