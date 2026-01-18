// ============================================================
// ProductList.tsx
// This component displays a grid of ProductCard components.
// It receives:
// - A list of products to show
// - Optional handlers for deleting or adding to cart
// - The current search query (used for highlighting)
//
// This component does NOT contain business logic.
// It simply loops through the products and renders a card for each one.
// ============================================================

import ProductCard from "./ProductCard";
import type { Product } from "../../types/Product";

interface Props {
  products: Product[];                        // list of products to display
  onDelete?: (id: string) => void;            // optional delete handler
  onAddToCart?: (product: Product) => void;   // optional add-to-cart handler
  searchQuery?: string;                       // used to highlight matching text
}

const ProductList = ({ products, onDelete, onAddToCart, searchQuery }: Props) => {
  return (
    // ============================================================
    // Grid Layout
    // "row g-3" creates a responsive grid with spacing between items.
    // Each product is placed inside a column that adjusts based on screen size.
    // ============================================================
    <div className="row g-3">
      {products.map((product) => (
        // Each product gets its own column
        <div
          key={product.id}                     // unique key required by React
          className="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          {/* ======================================================
              ProductCard
              Receives:
              - product data
              - optional delete handler
              - optional add-to-cart handler
              - search query for highlighting
             ====================================================== */}
          <ProductCard
            product={product}
            onDelete={onDelete}
            onAddToCart={onAddToCart}
            searchQuery={searchQuery}
          />
        </div>
      ))}
    </div>
  );
};

export default ProductList;