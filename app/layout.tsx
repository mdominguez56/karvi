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
      <body className="antialiased bg-gray-100 text-gray-900">
        <header className="bg-blue-600 text-white p-4 text-center font-bold text-xl">
          Catálogo de Autos
        </header>
        <main className="container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}