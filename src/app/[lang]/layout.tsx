import { Noto_Naskh_Arabic, Architects_Daughter } from "next/font/google";
import type { Metadata } from "next";
//@ts-ignore
import "../globals.css";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Toaster } from "@/components/ui/sonner";
const sansFont = Architects_Daughter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "CoffeeCoin Loyalty Platform",
  description: "Your digital loyalty card for the best coffee shops.",
};
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isRtl = lang === "ar-SY";

  return (
    <html lang={lang} dir={isRtl ? "rtl" : "ltr"}>
      <body className={`${sansFont.className} antialiased`}>
        <LanguageSwitcher locale={lang} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
