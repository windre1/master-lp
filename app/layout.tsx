import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spartan Tube | LP Factory",
  description: "Premium Landing Page Factory for YouTube Creators",
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
      <body className="min-h-full flex flex-col">
        {children}

        {/* 🔥 Wakrod Affiliate Tracking */}
        <Script id="affiliate-tracking" strategy="afterInteractive">{`
(function() {
  var urlParams = new URLSearchParams(window.location.search);
  var ref = urlParams.get('ref');
  if (!ref) { try { ref = localStorage.getItem('wk_ref'); } catch(e) {} }
  if (!ref) return;
  try { localStorage.setItem('wk_ref', ref); } catch(e) {}
  function updateOrderLinks() {
    var links = document.querySelectorAll('a[href*="wakrod.my.id/order"]');
    links.forEach(function(link) {
      var href = link.getAttribute('href');
      if (href && !href.includes('ref=')) {
        var separator = href.includes('?') ? '&' : '?';
        link.setAttribute('href', href + separator + 'ref=' + ref);
      }
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateOrderLinks);
  } else {
    updateOrderLinks();
  }
  setTimeout(updateOrderLinks, 1000);
})();
        `}</Script>
      </body>
    </html>
  );
}
