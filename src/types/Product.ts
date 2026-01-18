// ============================================================
// Product.ts
// This file defines the shape of a Product object.
// Every product in your app must follow this structure.
//
// Why this matters:
// - It keeps your data consistent
// - It helps TypeScript catch mistakes early
// - It makes your components easier to understand and maintain
// ============================================================

// ============================================================
// Product Interface
// Each field represents a piece of information about a product.
// ============================================================
export interface Product {
  id: string;          // unique identifier for the product (string from MockAPI or generated locally)
  name: string;        // product name shown in listings and detail pages
  price: number;       // product price (stored as a number, not a string)
  description?: string; // optional text describing the product (the "?" means it's not required)
  image?: string;       // optional URL to a product image (also not required)
}