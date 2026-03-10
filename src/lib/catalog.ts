import { PlaceHolderImages } from './placeholder-images';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  imageHint: string;
}

export const CATEGORIES = ['All', 'Accessories', 'Outdoor', 'Home', 'Apparel'];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Bamboo Water Bottle',
    description: 'A stylish and sustainable water bottle made from 100% natural bamboo and stainless steel. Keeps your drinks cold for 24 hours or hot for 12 hours.',
    price: 34.99,
    category: 'Home',
    imageUrl: PlaceHolderImages.find(img => img.id === 'prod-1')?.imageUrl || '',
    imageHint: 'bamboo bottle'
  },
  {
    id: '2',
    name: 'Organic Cotton Tote',
    description: 'Perfect for grocery shopping or a day at the beach. This heavy-duty tote is made from certified organic cotton and features internal pockets.',
    price: 19.50,
    category: 'Accessories',
    imageUrl: PlaceHolderImages.find(img => img.id === 'prod-2')?.imageUrl || '',
    imageHint: 'cotton bag'
  },
  {
    id: '3',
    name: 'Solar Power Bank',
    description: 'Never run out of juice while exploring the outdoors. This rugged power bank charges via solar energy and features a 20,000mAh capacity.',
    price: 59.99,
    category: 'Outdoor',
    imageUrl: PlaceHolderImages.find(img => img.id === 'prod-3')?.imageUrl || '',
    imageHint: 'solar charger'
  },
  {
    id: '4',
    name: 'Recycled Plastic Sneakers',
    description: 'Lightweight, breathable, and made entirely from ocean-bound recycled plastic. Comfortable enough for all-day wear.',
    price: 89.00,
    category: 'Apparel',
    imageUrl: PlaceHolderImages.find(img => img.id === 'prod-4')?.imageUrl || '',
    imageHint: 'recycled sneakers'
  },
  {
    id: '5',
    name: 'Hemp Backpack',
    description: 'Durable, naturally antimicrobial, and sustainably sourced. This hemp backpack is the ultimate companion for your daily commute.',
    price: 75.00,
    category: 'Accessories',
    imageUrl: PlaceHolderImages.find(img => img.id === 'prod-5')?.imageUrl || '',
    imageHint: 'hemp backpack'
  },
  {
    id: '6',
    name: 'Beeswax Food Wraps',
    description: 'The natural alternative to plastic wrap. Set of 3 assorted sizes. Washable, reusable, and compostable.',
    price: 24.99,
    category: 'Home',
    imageUrl: PlaceHolderImages.find(img => img.id === 'prod-6')?.imageUrl || '',
    imageHint: 'beeswax wrap'
  }
];