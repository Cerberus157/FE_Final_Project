// ============================================================
// ProductsPage.tsx
// This page shows the full list of products.
// It receives the product list from App.tsx (so it does NOT
// fetch data itself).
//
// It includes:
// - Search
// - Sorting
// - Price filtering
// - A slide‑in filter panel
// - Add to Cart + Delete actions
//
// Error handling is added around user actions that could fail.
// ============================================================

import { useState } from "react";
import ProductList from "../components/products/ProductList";
import type { Product } from "../types/Product";
import { Link } from "react-router-dom";

interface Props {
  products: Product[];
  onDelete: (id: string) => void;
  loading: boolean;
  onAddToCart: (product: Product) => void;
}

const ProductsPage = ({ products, onDelete, loading, onAddToCart }: Props) => {
  // ============================================================
  // Local UI State
  // These control search, filters, and sorting.
  // ============================================================
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Count how many filters are active (for the badge)
  const activeFilters =
    (sortOption ? 1 : 0) +
    (minPrice ? 1 : 0) +
    (maxPrice ? 1 : 0);

  // ============================================================
  // 1. Search Filter
  // ============================================================
  let filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // ============================================================
  // 2. Price Range Filter
  // Wrapped in try/catch in case user enters invalid numbers
  // ============================================================
  try {
    filteredProducts = filteredProducts.filter((p) => {
      const meetsMin = minPrice === "" || p.price >= Number(minPrice);
      const meetsMax = maxPrice === "" || p.price <= Number(maxPrice);
      return meetsMin && meetsMax;
    });
  } catch (error) {
    console.error("Error applying price filters:", error);
    alert(
      "There was a problem applying the price filters. " +
      "Please check your input values."
    );
  }

  // ============================================================
  // 3. Sorting Logic
  // Wrapped in try/catch to prevent UI crashes
  // ============================================================
  try {
    if (sortOption === "price-asc") {
      filteredProducts = [...filteredProducts].sort(
        (a, b) => a.price - b.price
      );
    }

    if (sortOption === "price-desc") {
      filteredProducts = [...filteredProducts].sort(
        (a, b) => b.price - a.price
      );
    }

    if (sortOption === "name-asc") {
      filteredProducts = [...filteredProducts].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    if (sortOption === "name-desc") {
      filteredProducts = [...filteredProducts].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }
  } catch (error) {
    console.error("Error sorting products:", error);
    alert(
      "There was a problem sorting the products. " +
      "Please try a different sorting option."
    );
  }

  // ============================================================
  // Main Page UI
  // ============================================================
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Products</h1>

      {/* ========================================================
          Search Bar + Filter Button + Create Button
         ======================================================== */}

      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Search Input */}
        <input
          type="text"
          className="form-control me-2"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: "300px" }}
        />

        {/* Right-side actions */}
        <div className="d-flex align-items-center gap-2">
          {/* ✅ Create New Item */}
          <Link to="/products/new" className="btn btn-primary">
            ➕ Create New Item
          </Link>

          {/* Filter Button with Badge */}
          <button
            className="btn btn-outline-secondary position-relative"
            onClick={() => setShowFilters(true)}
          >
            ⚙️ Filters
            {activeFilters > 0 && (
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                style={{ fontSize: "0.65rem" }}
              >
                {activeFilters}
              </span>
            )}
          </button>
        </div>
      </div>


      {/* ========================================================
          Filter Panel (Slide‑In)
         ======================================================== */}
      <div
        className={`offcanvas offcanvas-end ${showFilters ? "show" : ""}`}
        style={{
          visibility: showFilters ? "visible" : "hidden",
          backgroundColor: "#f8f9fa"
        }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Filters & Sorting</h5>
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowFilters(false)}
          ></button>
        </div>

        <div className="offcanvas-body">

          {/* Sorting */}
          <hr className="my-4" />
          <div className="mb-4">
            <label className="form-label fw-bold">Sort By</label>
            <select
              className="form-select"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">None</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          {/* Price Range */}
          <hr className="my-4" />
          <div className="mb-4">
            <label className="form-label fw-bold">Price Range</label>

            <div className="d-flex gap-2">
              <input
                type="number"
                className="form-control"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />

              <input
                type="number"
                className="form-control"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          {/* Clear Filters */}
          <hr className="my-4" />
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => {
              try {
                setMinPrice("");
                setMaxPrice("");
                setSortOption("");
              } catch (error) {
                console.error("Error clearing filters:", error);
                alert(
                  "We couldn't clear the filters. Please try again."
                );
              }
            }}
          >
            Clear Filters
          </button>

        </div>
      </div>

      {/* ========================================================
          Loading + Empty States
         ======================================================== */}
      {loading && <p>Loading...</p>}

      {!loading && filteredProducts.length === 0 && (
        <p className="text-muted fst-italic">No results found.</p>
      )}

      {/* ========================================================
          Product List
         ======================================================== */}
      {!loading && filteredProducts.length > 0 && (
        <ProductList
          products={filteredProducts}
          onDelete={(id) => {
            try {
              onDelete(id);
            } catch (error) {
              console.error("Error deleting product:", error);
              alert(
                "We couldn't delete this product. Please try again."
              );
            }
          }}
          onAddToCart={(product) => {
            try {
              onAddToCart(product);
            } catch (error) {
              console.error("Error adding product to cart:", error);
              alert(
                "We couldn't add this product to your cart. Please try again."
              );
            }
          }}
          searchQuery={search}
        />
      )}
    </div>
  );
};

export default ProductsPage;