"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Zap, FlaskConical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTagging } from '@/hooks/use-tagging';
import { PRODUCTS } from '@/lib/catalog';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HomePage() {
  const { trackEvent } = useTagging();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    trackEvent({
      event: 'page_view',
      page_title: 'EcoTagLab | Home',
      page_location: window.location.href
    });

    trackEvent({
      event: 'view_promotion',
      ecommerce: {
        promotion_id: 'summer_sale_2024',
        promotion_name: 'Summer Eco Lifestyle',
        creative_name: 'hero_banner_01',
        creative_slot: 'featured_header',
        items: PRODUCTS.slice(0, 3).map(p => ({
          item_id: p.id,
          item_name: p.name,
          item_category: p.category,
          price: p.price
        }))
      }
    });
  }, [trackEvent]);

  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-main');

  // Previne erros de hidratação
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
              Explore our curated collection of eco-friendly products. This page triggers a <code className="bg-black/30 px-1 rounded text-secondary">view_promotion</code> event for tagging studies.
            </p>
            <div className="flex gap-4">
              <Link href="/products">
                <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-primary/90">
                  Shop Catalog <ArrowRight className="ml-2 h-4 w-4" />
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
            { icon: ShieldCheck, title: "Verified Sustainable", desc: "All products undergo rigorous environmental impact assessments." },
            { icon: Zap, title: "Fast Green Shipping", desc: "Carbon-neutral delivery across the entire globe." },
            { icon: FlaskConical, title: "Tagging Lab", desc: "Simulate complex e-commerce events for GA4 and GTM testing." }
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
            <h2 className="text-3xl font-headline">Featured Collection</h2>
            <p className="text-muted-foreground">Top items this month</p>
          </div>
          <Link href="/products">
            <Button variant="link" className="text-primary font-bold">
              View All Products
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
                    <Button variant="secondary" size="sm" className="rounded-full">Details</Button>
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
