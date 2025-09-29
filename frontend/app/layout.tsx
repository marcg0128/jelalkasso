import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['100','200','300','400','500','600','700','800','900'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Jelal Kasso"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={raleway.className}>
      <body>{children}</body>
    </html>
  );
}
