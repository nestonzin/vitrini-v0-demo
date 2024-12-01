import { Inter } from "next/font/google";
import { Metadata } from "next";
import { Providers } from "@/components/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vitrine Digital da Loja",
  description:
    "Loja online com produtos de alta qualidade, entrega via motoboy e retirada na loja.",
  keywords:
    "loja online, produtos, comprar online, entrega motoboy, retirada na loja",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
