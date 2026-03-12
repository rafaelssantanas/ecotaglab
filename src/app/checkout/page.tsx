
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, CreditCard, Truck, MapPin } from 'lucide-react';
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
  const { totalPrice, clearCart } = useCart();

  const handleNextStep = () => {
    if (step === 'shipping') setStep('payment');
    else if (step === 'payment') setStep('confirmation');
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
          <h1 className="text-4xl font-headline font-bold">Compra Realizada com Sucesso!</h1>
          <p className="text-muted-foreground text-lg">Seu pedido foi processado com sucesso.</p>
        </div>
        <Link href="/">
          <Button size="lg" className="rounded-full px-8 bg-primary">Voltar para Home</Button>
        </Link>
      </div>
    );
  }

  const progress = step === 'shipping' ? 33 : step === 'payment' ? 66 : 100;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="space-y-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-headline font-bold">Checkout Seguro</h1>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span>Entrega</span>
              <span>Pagamento</span>
              <span>Confirmação</span>
            </div>
            <Progress value={progress} className="h-2 bg-muted border-none" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2 space-y-8">
            {step === 'shipping' && (
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" /> Informações de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fname">Nome</Label>
                      <Input id="fname" placeholder="João" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lname">Sobrenome</Label>
                      <Input id="lname" placeholder="Silva" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Endereço</Label>
                    <Input id="address" placeholder="Rua das Flores, 123" />
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 'payment' && (
              <Card className="border-none shadow-sm animate-in slide-in-from-right-8 duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" /> Método de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup defaultValue="card">
                    <div className="flex items-center space-x-2 border p-4 rounded-xl">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">Cartão de Crédito</Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            )}

            {step === 'confirmation' && (
              <Card className="border-none shadow-sm animate-in slide-in-from-right-8 duration-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-primary" /> Revisar Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-sm text-muted-foreground">Revise os detalhes abaixo antes de finalizar.</p>
                </CardContent>
              </Card>
            )}

            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={() => {
                if(step === 'payment') setStep('shipping');
                if(step === 'confirmation') setStep('payment');
              }} disabled={step === 'shipping'}>
                Voltar
              </Button>
              
              {step === 'confirmation' ? (
                <Button size="lg" className="rounded-full px-8 bg-primary" onClick={handleCompletePurchase}>
                  Finalizar Compra
                </Button>
              ) : (
                <Button size="lg" className="rounded-full px-8 bg-primary" onClick={handleNextStep}>
                  Próximo Passo
                </Button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-none bg-muted/50 shadow-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground">Total do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-headline font-bold text-primary">${totalPrice.toFixed(2)}</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
