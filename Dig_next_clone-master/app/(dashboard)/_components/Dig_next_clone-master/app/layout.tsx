import "./globals.css";
import type { Metadata } from "next";
import { Noto_Kufi_Arabic } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { ConfettiProvider } from "@/components/providers/confetti-provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Provider } from "react-redux";
import { Providers } from "./Providers";
import { arSA } from "@clerk/localizations";
import Template from "./template";
const inter = Noto_Kufi_Arabic({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: "كورسات",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={arSA}>
      <html lang="en">
        <body className={inter.className}>
          <ConfettiProvider />
          <ToastProvider />
          <Providers>
            <Template>{children}</Template>
          </Providers>
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
