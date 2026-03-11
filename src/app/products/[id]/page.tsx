"use client";

import { useState, use } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Heart, Share2, Sparkles, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PRODUCTS } from '@/lib/catalog';
import { useCart } from '@/store/cart-context';
import { generateProductDetails } from '@/ai/flows/generate-product-details';
import { toast } from '@/hooks/use-toast';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { addItem } = useCart();
  
  const initialProduct = PRODUCTS.find(p => p.id === id);
  const [product, setProduct] = useState(initialProduct);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) {
    router.push('/products');
    return null;
  }

  const handleAddToCart = () => {
    addItem(product);
    setIsAdded(true);
    
    toast({
      title: "Added to cart!",
      description: `${product.name} is now in your bag.`
    });

    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleAiEnhance = async () => {
    setIsGenerating(true);
    try {
      const result = await generateProductDetails({
        productType: product.name,
        keywords: ['sustainable', 'eco-friendly', 'high-quality', 'premium']
      });
      
      setProduct(prev => prev ? {
        ...prev,
        name: result.title,
        description: result.description
      } : prev);

      toast({
        title: "Content Enhanced!",
        description: "AI has generated a new title and description for this product."
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "AI Generation failed",
        description: "Could not enhance product details at this time."
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-2xl overflow-hidden bg-white shadow-sm">
            <Image 
              src={product.imageUrl} 
              alt={product.name} 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge className="bg-secondary">{product.category}</Badge>
              <Badge variant="outline" className="border-green-500 text-green-600">In Stock</Badge>
            </div>
            <h1 className="text-4xl font-headline font-bold leading-tight">{product.name}</h1>
            <p className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</p>
          </div>

          <p className="text-muted-foreground leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className={`flex-1 rounded-full h-14 text-lg font-bold shadow-lg transition-all ${isAdded ? 'bg-green-500 hover:bg-green-600' : ''}`}
                onClick={handleAddToCart}
              >
                {isAdded ? (
                  <><Check className="mr-2 h-5 w-5" /> Added!</>
                ) : (
                  <><ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart</>
                )}
              </Button>
              <Button size="icon" variant="outline" className="h-14 w-14 rounded-full border-primary/20">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="icon" variant="outline" className="h-14 w-14 rounded-full border-primary/20">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <Button 
              variant="secondary" 
              className="w-full rounded-full h-12 flex items-center justify-center gap-2 font-medium"
              onClick={handleAiEnhance}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Enhancing...</>
              ) : (
                <><Sparkles className="h-4 w-4" /> Enhance with AI</>
              )}
            </Button>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <span className="text-muted-foreground">SKU:</span>
              <p className="font-mono">ECO-{product.id.padStart(4, '0')}</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground">Availability:</span>
              <p>Ready to Ship</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
