"use client";

import Link from 'next/link';
import { ShoppingCart, LayoutGrid, Home, FlaskConical } from 'lucide-react';
import { useCart } from '@/store/cart-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-lg text-primary-foreground group-hover:rotate-12 transition-transform">
            <FlaskConical className="h-6 w-6" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight text-primary">EcoTagLab</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
            <Home className="h-4 w-4" /> Home
          </Link>
          <Link href="/products" className="flex items-center gap-1 hover:text-primary transition-colors">
            <LayoutGrid className="h-4 w-4" /> Products
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative h-10 w-10">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}