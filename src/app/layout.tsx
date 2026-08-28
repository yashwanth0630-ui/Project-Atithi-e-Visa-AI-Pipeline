import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Atithi — Intent-to-Action Multimodal e-Visa Assistant",
  description: "AI-first document parsing, semantic visa category inference, and instant synthetic Electronic Travel Authorization (ETA) for India.",
  keywords: ["e-Visa", "India", "OpenAI Vision", "GPT-4o", "Multimodal", "Project Atithi", "Build What Moves India", "DPI", "Offline PWA"],
  authors: [{ name: "Project Atithi Team" }],
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#090d16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col font-sans selection:bg-orange-500/30 selection:text-orange-200 bg-[#090d16] text-slate-100">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(reg) { console.log('Atithi PWA Service Worker registered:', reg.scope); },
                    function(err) { console.log('Service Worker registration failed:', err); }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
