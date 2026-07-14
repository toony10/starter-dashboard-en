import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";
import { AppearanceProvider } from "@/components/providers/appearance-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getAppearanceInitScript } from "@/lib/appearance-settings";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Starter Dashboard",
  description: "Starter Dashboard using Shadcn and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={ `${ geistSans.variable } ${ geistMono.variable } h-full antialiased` }
    >
      <body className="min-h-full flex flex-col">
        <Script
          id="appearance-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={ { __html: getAppearanceInitScript() } }
        />
        <NuqsAdapter defaultOptions={{ shallow: false }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AppearanceProvider>
              { children }
              <Toaster position="top-center" duration={ 3000 } />
            </AppearanceProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
