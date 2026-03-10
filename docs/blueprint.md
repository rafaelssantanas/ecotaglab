# **App Name**: EcoTagLab

## Core Features:

- Home Page & Basic Tagging: Render a clean landing page, featuring promoted products and categories. Implement standard 'page_view' and custom content exposure ('view_promotion') tags for demonstration.
- Product Listing Page & List Tags: Display a grid of products with options for sorting/filtering. Implement 'view_item_list' and product impression tags upon loading and interaction with filters.
- Product Detail Page & Item Interaction Tags: Present comprehensive details for a selected product, including an 'Add to Cart' button. Implement 'view_item' and 'add_to_cart' events, crucial for e-commerce tracking.
- Shopping Cart Page & Cart Management Tags: Allow users to review, update quantities, or remove items from their shopping cart. Implement 'view_cart' and 'remove_from_cart' events.
- Checkout Flow & Purchase Tags: Simulate a simplified multi-step checkout process culminating in an order confirmation screen. Implement 'begin_checkout', 'add_shipping_info', 'add_payment_info', and 'purchase' events.
- AI Product Details Generation Tool: Utilize a generative AI tool to create diverse and engaging product titles and descriptions, allowing for dynamic content testing in tagging scenarios.
- Simulated Product Catalog: Manage a small, sample catalog of e-commerce products, allowing users to interact with varying product data to test tagging robustness.

## Style Guidelines:

- Primary color: A sophisticated dark blue-purple (#4C33CC) for professionalism and clarity, grounding the interactive elements.
- Background color: A subtle, light off-white (#F1F0F5) with a hint of purple, providing a clean and understated canvas.
- Accent color: A brighter, engaging blue (#6792E4) to highlight call-to-actions and important interactive elements, creating clear visual contrast.
- Headlines font: 'Space Grotesk' (sans-serif) for a modern, slightly tech-inspired aesthetic that reflects the application's purpose of studying technical implementations.
- Body font: 'Inter' (sans-serif) for its high readability and versatile, neutral character, ensuring comfortable reading of product details and technical information.
- Utilize clean, outline-style icons consistent with e-commerce best practices (e.g., cart, user, search, categories) for intuitive navigation and interaction.
- Adopt a grid-based layout for product displays, with ample white space to ensure focus on content and event-triggering elements. Keep a consistent header and footer across all 5 screens.
- Implement subtle animations for transitions between screens and feedback upon user interactions (e.g., 'Add to Cart' confirmation), providing a smooth user experience without distractions.