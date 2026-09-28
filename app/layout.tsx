import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  metadataBase: new URL("https://promptotheque-gpt.netlify.app"),
  title: {
    default: "Promptothèque — 60 prompts pour mieux utiliser ChatGPT",
    template: "%s | Promptothèque",
  },
  description:
    "Découvre 60 exemples de prompts ChatGPT pour écrire, apprendre, programmer et t’organiser. Recherche par thème et copie les formulations gratuitement.",
  applicationName: "Promptothèque",
  verification: {
    google: "hGMCr1W6D99RGbRgZ1WGKJuTdw_Mmqq7rlSObwX_1Ic",
  },
  alternates: { canonical: "/" },
  keywords: [
    "prompts ChatGPT",
    "exemples de prompts",
    "commandes ChatGPT",
    "bien utiliser ChatGPT",
    "prompt IA",
    "rédaction avec ChatGPT",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Promptothèque",
    title: "Promptothèque — 60 prompts pour mieux utiliser ChatGPT",
    description:
      "Un guide gratuit de 60 prompts à explorer, adapter et copier pour obtenir des réponses plus utiles de ChatGPT.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Promptothèque — 60 prompts pour ChatGPT",
    description:
      "60 exemples de prompts pour écrire, apprendre, programmer et mieux utiliser ChatGPT.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
