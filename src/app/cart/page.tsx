"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingCart, ArrowRight, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/store/cart-context';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="bg-muted h-24 w-24 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
            <ShoppingCart className="h-10 w-10" />
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold">Your cart is empty</h1>
            <p className="text-muted-foreground">Looks like you haven't added any eco-friendly goodies yet.</p>
          </div>
          <Link href="/products">
            <Button size="lg" className="rounded-full px-8 bg-primary">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-headline font-bold mb-10">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex gap-6">
                <div className="h-24 w-24 relative rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline font-bold">{item.name}</h3>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{item.category}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border rounded-full bg-white px-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 rounded-full"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 border-primary/10 shadow-lg bg-white">
            <CardContent className="p-8 space-y-6">
              <h2 className="text-xl font-headline font-bold">Order Summary</h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span>$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button className="w-full rounded-full h-12 bg-primary hover:bg-primary/90 text-lg shadow-md group">
                  Begin Checkout <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
