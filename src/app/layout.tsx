import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/store/cart-context';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'EcoTagLab - Estudo de E-commerce',
  description: 'Plataforma para estudo e implementação de eventos de e-commerce.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <CartProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
