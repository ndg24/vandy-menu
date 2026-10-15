import type { Metadata, Viewport } from "next";
import { Silkscreen, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ACCENT_STORAGE_KEY } from "@/lib/accent";

const silkscreen = Silkscreen({
  variable: "--font-display",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DINING.SYS",
  description: "Vanderbilt dining hall menus, fast.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "DINING.SYS",
  },
  icons: {
    icon: "/icons/icon-512.png",
    apple: "/icons/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#F4F4F2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${silkscreen.variable} ${ibmPlexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Apply the saved accent before first paint so pink users don't see a green flash. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem(${JSON.stringify(ACCENT_STORAGE_KEY)})==="pink")document.documentElement.dataset.accent="pink"}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-black font-mono">
        {children}
      </body>
    </html>
  );
}
