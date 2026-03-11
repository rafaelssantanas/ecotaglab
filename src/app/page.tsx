"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Zap, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PRODUCTS } from '@/lib/catalog';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-main');

  if (!mounted) return null;

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden">
        <Image 
          src={heroImg?.imageUrl || ''} 
          alt="Hero" 
          fill 
          className="object-cover brightness-50 scale-105 hover:scale-100 transition-transform duration-1000"
          priority
          data-ai-hint="eco friendly"
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
            <div className="inline-flex items-center gap-2 bg-secondary/90 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              <Sparkles className="h-3 w-3" /> Summer Promotion Live
            </div>
            <h1 className="text-5xl md:text-7xl font-headline leading-tight">
              Sustainable Living, <br />
              <span className="text-secondary">Measured.</span>
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed">
              Explore nossa coleção de produtos eco-friendly. Esta página está pronta para você implementar seu próprio tagueamento.
            </p>
            <div className="flex gap-4">
              <Link href="/products">
                <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
                  Ver Catálogo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: "Sustentabilidade Verificada", desc: "Todos os produtos passam por avaliações rigorosas de impacto ambiental." },
            { icon: Zap, title: "Entrega Rápida e Verde", desc: "Logística com emissão zero de carbono para todo o mundo." },
            { icon: FlaskConical, title: "Tagging Lab", desc: "Sua base limpa para implementar eventos complexos de e-commerce." }
          ].map((feature, i) => (
            <Card key={i} className="border-none bg-white/50 backdrop-blur shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-8 space-y-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-headline">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-headline">Coleção em Destaque</h2>
            <p className="text-muted-foreground">Os itens mais populares deste mês</p>
          </div>
          <Link href="/products">
            <Button variant="link" className="text-primary font-bold">
              Ver Todos os Produtos
            </Button>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 3).map((product) => (
            <Link key={product.id} href={`/products/${product.id}`}>
              <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all">
                <div className="aspect-square relative overflow-hidden">
                  <Image 
                    src={product.imageUrl} 
                    alt={product.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <Badge className="absolute top-4 left-4 bg-primary">{product.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="font-headline text-lg group-hover:text-primary transition-colors">{product.name}</h3>
                  <p className="text-muted-foreground text-sm line-clamp-1 mt-1">{product.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
                    <Button variant="secondary" size="sm" className="rounded-full">Detalhes</Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
