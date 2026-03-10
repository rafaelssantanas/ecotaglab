import { FlaskConical, Github, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FlaskConical className="h-6 w-6 text-primary" />
              <span className="font-headline font-bold text-lg text-primary">EcoTagLab</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A specialized sandbox for studying e-commerce tagging, GA4 events, and GTM implementations in a modern tech stack.
            </p>
          </div>
          
          <div>
            <h4 className="font-headline font-bold mb-4 uppercase text-xs tracking-widest text-muted-foreground">App Sections</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-primary transition-colors">Home Page</a></li>
              <li><a href="/products" className="hover:text-primary transition-colors">Product Listing</a></li>
              <li><a href="/cart" className="hover:text-primary transition-colors">Shopping Cart</a></li>
              <li><a href="/checkout" className="hover:text-primary transition-colors">Checkout Flow</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-4 uppercase text-xs tracking-widest text-muted-foreground">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">GA4 Event Schema</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Tagging Best Practices</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-headline font-bold mb-4 uppercase text-xs tracking-widest text-muted-foreground">Stay Connected</h4>
            <div className="flex gap-4">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} EcoTagLab. Designed for technical research and tagging education.
        </div>
      </div>
    </footer>
  );
}