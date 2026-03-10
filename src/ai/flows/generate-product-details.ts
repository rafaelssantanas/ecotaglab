'use server';
/**
 * @fileOverview A Genkit flow for generating diverse and engaging product titles and descriptions.
 *
 * - generateProductDetails - A function that handles the product details generation process.
 * - GenerateProductDetailsInput - The input type for the generateProductDetails function.
 * - GenerateProductDetailsOutput - The return type for the generateProductDetails function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateProductDetailsInputSchema = z.object({
  productType: z.string().describe('The general category or type of the product (e.g., "electronic gadget", "fashion accessory", "home decor").'),
  keywords: z.array(z.string()).optional().describe('An optional list of keywords to incorporate into the product description.'),
});
export type GenerateProductDetailsInput = z.infer<typeof GenerateProductDetailsInputSchema>;

const GenerateProductDetailsOutputSchema = z.object({
  title: z.string().describe('A compelling and engaging product title.'),
  description: z.string().describe('A detailed and engaging product description.'),
});
export type GenerateProductDetailsOutput = z.infer<typeof GenerateProductDetailsOutputSchema>;

export async function generateProductDetails(input: GenerateProductDetailsInput): Promise<GenerateProductDetailsOutput> {
  return generateProductDetailsFlow(input);
}

const productDetailsPrompt = ai.definePrompt({
  name: 'productDetailsPrompt',
  input: { schema: GenerateProductDetailsInputSchema },
  output: { schema: GenerateProductDetailsOutputSchema },
  prompt: `You are an expert product content creator for an e-commerce store. Your goal is to generate compelling and engaging product titles and descriptions that highlight the product's unique selling points and appeal to customers.

Generate a product title and a detailed description for a product of type: '{{{productType}}}'.

{{#if keywords}}Ensure the following keywords are naturally incorporated into the description: {{{keywords}}}.{{/if}}

Make sure the tone is enthusiastic and persuasive.`,
});

const generateProductDetailsFlow = ai.defineFlow(
  {
    name: 'generateProductDetailsFlow',
    inputSchema: GenerateProductDetailsInputSchema,
    outputSchema: GenerateProductDetailsOutputSchema,
  },
  async (input) => {
    const { output } = await productDetailsPrompt(input);
    return output!;
  }
);
