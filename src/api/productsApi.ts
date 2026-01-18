// ============================================================
// productsApi.ts
// This file contains all API calls related to products.
// Each function talks to your MockAPI backend.
// All functions include error handling so the app won't crash
// if the server is down or returns invalid data.
// ============================================================

import axios from "axios";
import type { Product } from "../types/Product";

// Base URL for your MockAPI endpoint
const BASE_URL = "https://6968735269178471522a8488.mockapi.io/products";

// ============================================================
// Get ALL products
// ============================================================
export async function getProducts(): Promise<Product[]> {
  try {
    // Request the full product list
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error("API Error: Failed to fetch product list:", error);

    // User-friendly + developer-friendly message
    alert(
      "We couldn't load the product list from the server. " +
        "This may be due to a network issue or the API being unavailable."
    );

    // Return an empty list so the UI doesn't break
    return [];
  }
}

// ============================================================
// Get a single product by ID
// ============================================================
export async function getProduct(id: string): Promise<Product> {
  try {
    // Fetch a single product
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`API Error: Failed to fetch product with ID ${id}:`, error);

    alert(
      `We couldn't load the product with ID ${id}. ` +
        "It may have been deleted or the server may be unavailable."
    );

    // Throwing here allows the calling component to handle the failure
    throw error;
  }
}

// ============================================================
// Create a new product
// ============================================================
export async function createProduct(product: Product): Promise<Product> {
  try {
    const response = await axios.post(BASE_URL, product);
    return response.data;
  } catch (error) {
    console.error("API Error: Failed to create product:", error);

    alert(
      "We couldn't create this product. " +
        "Please check your input or try again later."
    );

    throw error;
  }
}

// ============================================================
// Update an existing product
// ============================================================
export async function updateProduct(
  id: string,
  product: Product
): Promise<Product> {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, product);
    return response.data;
  } catch (error) {
    console.error(`API Error: Failed to update product with ID ${id}:`, error);

    alert(
      "We couldn't update this product. " +
        "The server may be unavailable or the product may no longer exist."
    );

    throw error;
  }
}

// ============================================================
// Delete a product
// ============================================================
export async function deleteProduct(id: string): Promise<void> {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error(`API Error: Failed to delete product with ID ${id}:`, error);

    alert(
      "We couldn't delete this product. " +
        "It may have already been removed or the server may be unavailable."
    );

    throw error;
  }
}