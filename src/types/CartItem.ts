// ============================================================
// CartItem.ts
// This file defines the shape of a single item in the cart.
// A CartItem always contains:
// - The full product object
// - The quantity the user wants
//
// This type is used throughout the app to ensure the cart
// always has consistent and predictable data.
// ============================================================

import type { Product } from "./Product";

// ============================================================
// CartItem Interface
// - "product": the actual product being added to the cart
// - "quantity": how many of that product the user wants
// ============================================================
export interface CartItem {
  product: Product;   // full product details (name, price, image, etc.)
  quantity: number;   // number of units added to the cart
}