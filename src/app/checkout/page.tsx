"use client";

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, CreditCard, Truck, MapPin, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useCart } from '@/store/cart-context';
import { Progress } from '@/components/ui/progress';

type Step = 'shipping' | 'payment' | 'confirmation' | 'success';

export default function CheckoutPage() {
  const [step, setStep] = useState<Step>('shipping');
  const { items, totalPrice, clearCart } = useCart();

  const handleNextStep = () => {
    if (step === 'shipping') {
      setStep('payment');
    } else if (step === 'payment') {
      setStep('confirmation');
    }
  };

  const handleCompletePurchase = () => {
    setStep('success');
    clearCart();
  };

  if (step === 'success') {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-8 animate-in zoom-in-95 duration-500">
        <div className="bg-green-100 text-green-600 h-24 w-24 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="h-12 w-12" />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-headline font-bold">Thank You for Your Purchase!</h1>
          <p className="text-muted-foreground text-lg">Your transaction was successful.</p>
        </div>
        <Link href="/">
          <Button size="lg" className="rounded-full px-8 bg-primary">Return to Home</Button>
        </Link>
      </div>
    );
  }

  const progress = step === 'shipping' ? 33 : step === 'payment' ? 66 : 100;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-headline font-bold">Secure Checkout</h1>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span>Shipping</span>
              <span>Payment</span>
              <span>Confirm</span>
            </div>
            <Progress value={progress} className="h-2 bg-muted border-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            {step === 'shipping' && (
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" /> Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fname">First Name</Label>
                      <Input id="fname" placeholder="Jane" defaultValue="Jane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lname">Last Name</Label>
                      <Input id="lname" placeholder="Doe" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" placeholder="123 Eco Street" defaultValue="123 Eco Street" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Greentown" defaultValue="Greentown" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">Zip Code</Label>
                      <Input id="zip" placeholder="12345" defaultValue="12345" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 'payment' && (
              <Card className="border-none shadow-sm animate-in slide-in-from-right-8 duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" /> Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup defaultValue="card">
                    <div className="flex items-center space-x-2 border p-4 rounded-xl">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 flex justify-between cursor-pointer">
                        <span>Credit / Debit Card</span>
                        <div className="flex gap-1">
                          <div className="h-6 w-9 bg-muted rounded"></div>
                          <div className="h-6 w-9 bg-muted rounded"></div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cname">Name on Card</Label>
                      <Input id="cname" placeholder="JANE DOE" defaultValue="JANE DOE" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnum">Card Number</Label>
                      <Input id="cnum" placeholder="0000 0000 0000 0000" defaultValue="4242 4242 4242 4242" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 'confirmation' && (
              <Card className="border-none shadow-sm animate-in slide-in-from-right-8 duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" /> Confirm Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 bg-muted/50 rounded-xl space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Deliver to:</span>
                      <span className="font-medium">Jane Doe, 123 Eco Street</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment:</span>
                      <span className="font-medium">Visa ending in 4242</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic text-center">
                    Please review your order before final submission.
                  </p>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between pt-4">
              {step !== 'shipping' ? (
                <Button variant="ghost" onClick={() => setStep(step === 'payment' ? 'shipping' : 'payment')}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
              ) : (
                <Link href="/cart">
                  <Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Return to Cart</Button>
                </Link>
              )}
              
              {step === 'confirmation' ? (
                <Button size="lg" className="rounded-full px-8 bg-primary" onClick={handleCompletePurchase}>
                  Complete Purchase <CheckCircle2 className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button size="lg" className="rounded-full px-8 bg-primary" onClick={handleNextStep}>
                  Next Step <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Sidebar Summary */}
          <div className="space-y-6">
            <Card className="border-none bg-muted/50 shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground">Order Total</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-headline font-bold text-primary">${totalPrice.toFixed(2)}</div>
                <div className="mt-4 space-y-2">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-xs">
                      <span className="text-muted-foreground line-clamp-1">{item.quantity}x {item.name}</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
