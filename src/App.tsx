// ============================================================
// App.tsx
// Main application component
// - Loads products from the API
// - Manages the shopping cart
// - Saves the cart to localStorage
// - Handles all product + cart actions
// - Sets up all page routes
// ============================================================

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from "./api/productsApi";

import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductCreatePage from "./pages/ProductCreatePage";
import ProductEditPage from "./pages/ProductEditPage";
import CartPage from "./pages/CartPage";

import NavBar from "./components/layout/NavBar";
import type { Product } from "./types/Product";
import ProductDetailsPage from "./components/products/ProductDetails";
import type { CartItem } from "./types/CartItem";

function App() {
  // ============================================================
  // Products + Loading State
  // ============================================================
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true); // shows "Loading..." until products finish loading

  // ============================================================
  // Cart State (loaded from localStorage)
  // This lets the cart stay saved even after refreshing the page.
  // Includes a try/catch in case the saved data is corrupted.
  // ============================================================
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error reading cart from localStorage:", error);
      alert(
        "We couldn't load your saved cart because the data was invalid. Your cart has been reset."
      );
      return [];
    }
  });

  // ============================================================
  // Load products when the app first starts
  // Wrapped in try/catch so the app doesn't break if the API fails
  // ============================================================
  useEffect(() => {
    async function load() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Error loading products:", error);
        alert(
          "We couldn't load the product list. Please check your internet connection or try again later."
        );
      } finally {
        setLoading(false); // always stop loading, even if there was an error
      }
    }

    load();
  }, []);

  // ============================================================
  // Save cart to localStorage whenever it changes
  // Wrapped in try/catch in case the browser blocks storage
  // ============================================================
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
      alert(
        "Your cart couldn't be saved. Some changes may not stay after refreshing the page."
      );
    }
  }, [cartItems]);

  // ============================================================
  // Product CRUD Handlers
  // These talk to the API and update the product list
  // Each one has try/catch so the app doesn't crash on errors
  // ============================================================

  async function handleCreateProduct(product: Product) {
    try {
      const newProduct = await createProduct(product);
      setProducts([...products, newProduct]);
    } catch (error) {
      console.error("Error creating product:", error);
      alert(
        "We couldn't create this product. The server may be down or the data may be invalid."
      );
    }
  }

  async function handleUpdateProduct(updated: Product) {
    try {
      const saved = await updateProduct(updated.id, updated);
      setProducts(products.map((p) => (p.id === saved.id ? saved : p)));
    } catch (error) {
      console.error("Error updating product:", error);
      alert(
        "We couldn't update this product. Please try again or check your connection."
      );
    }
  }

  async function handleDeleteProduct(id: string) {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert(
        "We couldn't delete this product. It may have already been removed or the server may be unavailable."
      );
    }
  }

  // ============================================================
  // Cart Handlers
  // These update the cart stored in state (and saved to localStorage)
  // ============================================================

  function handleAddToCart(product: Product) {
    try {
      if (!product || !product.id) {
        throw new Error("Invalid product passed to handleAddToCart");
      }

      setCartItems((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);

        // If item already exists, increase quantity
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }

        // Otherwise add new item
        return [...prev, { product, quantity: 1 }];
      });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      alert(
        "We couldn't add this item to your cart because the product data was invalid."
      );
    }
  }

  function handleRemoveFromCart(productId: string) {
    try {
      setCartItems((prev) =>
        prev.filter((item) => item.product.id !== productId)
      );
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("We couldn't remove this item from your cart.");
    }
  }

  function handleUpdateCartQuantity(productId: string, quantity: number) {
    try {
      // If quantity is zero or negative, remove the item
      if (quantity <= 0) {
        setCartItems((prev) =>
          prev.filter((item) => item.product.id !== productId)
        );
        return;
      }

      // Otherwise update the quantity
      setCartItems((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating cart quantity:", error);
      alert(
        "We couldn't update the quantity for this item. Please try again."
      );
    }
  }

  // ============================================================
  // Clear Cart
  // Removes all items at once
  // ============================================================
  function handleClearCart() {
    try {
      setCartItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("We couldn't clear your cart. Please try again.");
    }
  }

  // ============================================================
  // Page Routes
  // ============================================================
  return (
    <>
      {/* Navigation bar always visible */}
      <NavBar cartCount={cartItems.length} />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/products"
          element={
            <ProductsPage
              products={products}
              onDelete={handleDeleteProduct}
              loading={loading}
              onAddToCart={handleAddToCart}
            />
          }
        />

        <Route
          path="/products/new"
          element={<ProductCreatePage onCreate={handleCreateProduct} />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetailsPage onAddToCart={handleAddToCart} />}
        />

        <Route
          path="/products/:id/edit"
          element={
            <ProductEditPage
              products={products}
              onUpdate={handleUpdateProduct}
            />
          }
        />

        <Route
          path="/cart"
          element={
            <CartPage
              items={cartItems}
              onRemove={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateCartQuantity}
              onClearCart={handleClearCart}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;