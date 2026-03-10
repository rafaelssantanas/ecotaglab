import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartProvider } from '@/store/cart-context';
import { Toaster } from '@/components/ui/toaster';
import { TagMonitor } from '@/components/tagging/TagMonitor';

export const metadata: Metadata = {
  title: 'EcoTagLab - Study E-commerce Tagging',
  description: 'A platform to study and implement e-commerce tagging events.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
          <TagMonitor />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}