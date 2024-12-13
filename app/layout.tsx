import type { Metadata } from "next";
import "./globals.css";
import { FavoritesProvider } from "./context/FavoritesContext";

export const metadata: Metadata = {
  title: "Compra de Carros Usados e Novos com Histórico Veicular | Karvi",
  description:
    "Encontre os melhores carros usados e novos no Karvi.com.br! Confira nosso histórico veicular detalhado e faça uma compra segura. Descubra ofertas incríveis e adquira seu carro ideal.",
  keywords: ["carros usados", "carros novos", "histórico veicular", "compra segura", "Karvi"],
  authors: [{ name: "Karvi Team", url: "https://www.karvi.com.br/" }],
  publisher: "Karvi",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Compra de Carros Usados e Novos com Histórico Veicular | Karvi",
    description:
      "Encontre os melhores carros usados e novos no Karvi.com.br! Confira nosso histórico veicular detalhado e faça uma compra segura. Descubra ofertas incríveis e adquira seu carro ideal.",
    url: "https://www.karvi.com.br/",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compra de Carros Usados e Novos com Histórico Veicular | Karvi",
    description:
      "Encontre os melhores carros usados e novos no Karvi.com.br! Confira nosso histórico veicular detalhado e faça uma compra segura. Descubra ofertas incríveis e adquira seu carro ideal.",
  },
  alternates: {
    canonical: "https://www.karvi.com.br/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="author" content="Karvi Team" />
        <meta name="publisher" content="Karvi" />
        <meta name="robots" content="INDEX,FOLLOW" />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <FavoritesProvider>
          <main className="container mx-auto p-4">{children}</main>
        </FavoritesProvider>
      </body>
    </html>
  );
}