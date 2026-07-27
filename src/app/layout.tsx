import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import BackgroundMount from "@/components/BackgroundMount";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

// runs before hydration: apply saved theme immediately, no white/black flash on load.
// Also forces horizontal scroll back to 0 and turns off the browser's scroll
// restoration — a stale horizontal scrollLeft from before overflow-x was locked
// down (or the browser restoring a scroll position from a previous visit) was
// what made the left/right margins look asymmetric: the whole page sat shifted
// left by however many px it had scrolled, eating into the left margin and
// opening up extra space on the right.
const themeInitScript = `
try {
  var t = localStorage.getItem('theme');
  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, window.scrollY);
  document.documentElement.scrollLeft = 0;
  document.body.scrollLeft = 0;
} catch (e) {}
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Merek Comercializadora",
  description: "Comercialización y transporte farmacéutico.",
};

// exporting `viewport` REPLACES Next's default entirely rather than merging —
// omitting width/initialScale here was dropping the responsive viewport meta
// tag, so mobile browsers rendered at a fallback desktop width and scaled down.
// That's what misaligned normal content against the `fixed` background (the
// right-side gap): position:fixed is tied to the true device viewport, normal
// layout was being computed against the wrong (wider) one.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0d1526",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <BackgroundMount />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
