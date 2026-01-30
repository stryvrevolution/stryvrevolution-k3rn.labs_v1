import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "k3rn.labs",
  description: "k3rn.labs — laboratoire de projets"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
