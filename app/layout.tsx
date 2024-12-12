import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Compra de Carros Usados e Novos com Historico Veicular | Karvi",
  description: "Encontre os melhores carros usados e novos no Karvi.com.br! Confira nosso historico veicular detalhado e faça uma compra segura. Descubra ofertas incriveis e adquira seu carro ideal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-gray-900">
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}