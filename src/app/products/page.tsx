"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Filter, Search, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PRODUCTS, CATEGORIES } from '@/lib/catalog';

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h3 className="text-lg font-headline mb-4 flex items-center gap-2">
              <Filter className="h-4 w-4" /> Filters
            </h3>
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-9 bg-white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Categories</h4>
            <div className="flex flex-wrap md:flex-col gap-2">
              {CATEGORIES.map(category => (
                <Button 
                  key={category} 
                  variant={selectedCategory === category ? "default" : "ghost"}
                  className="justify-start h-9 text-sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing <strong>{filteredProducts.length}</strong> products
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link 
                  key={product.id} 
                  href={`/products/${product.id}`}
                >
                  <Card className="group overflow-hidden border-none shadow-sm hover:shadow-lg transition-all">
                    <div className="aspect-square relative overflow-hidden bg-muted">
                      <Image 
                        src={product.imageUrl} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Badge variant="outline" className="text-[10px] uppercase mb-1">{product.category}</Badge>
                          <h3 className="font-headline font-bold">{product.name}</h3>
                        </div>
                        <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
              <ShoppingBag className="h-12 w-12 text-muted" />
              <div className="space-y-1">
                <h3 className="text-xl font-headline">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
              </div>
              <Button onClick={() => { setSearch(''); setSelectedCategory('All'); }} variant="outline">
                Clear all filters
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
