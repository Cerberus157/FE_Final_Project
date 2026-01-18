// ============================================================
// ProductCard.tsx
// This component displays a single product inside a card layout.
// It shows:
// - Product image
// - Product name (with optional search highlighting)
// - Price
// - Description (if available)
// - Buttons for View, Edit, Delete, and Add to Cart
//
// It is used inside ProductList to render a grid of products.
// ============================================================

import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import type { Product } from "../../types/Product";

interface Props {
  product: Product;                       // the product to display
  onDelete?: (id: string) => void;        // optional delete handler
  onAddToCart?: (product: Product) => void; // optional add-to-cart handler
  searchQuery?: string;                   // used to highlight matching text
}

const ProductCard = ({ product, onDelete, onAddToCart, searchQuery }: Props) => {
  // Fallback image if the product has no image URL
  const placeholder = "https://via.placeholder.com/300x200.png?text=No+Image";

  // ============================================================
  // highlight()
  // This helper function highlights the search term inside the
  // product name by wrapping matches in <mark> tags.
  // Example:
  //   highlight("Apple Watch", "app")
  //   → "<mark>App</mark>le Watch"
  // ============================================================
  function highlight(text: string, query: string) {
    if (!query) return text; // no search term → return original text

    // Create a case-insensitive regular expression
    const regex = new RegExp(`(${query})`, "gi");

    // Replace matches with <mark> tags
    return text.replace(regex, "<mark>$1</mark>");
  }

  return (
    // ============================================================
    // Card Layout
    // The card contains:
    // - Image section
    // - Product details
    // - Action buttons
    // ============================================================
    <Card className="mb-3 shadow-sm h-100">
      
      {/* ========================================================
          IMAGE SECTION
          - Uses a fixed aspect ratio for consistent layout
          - Falls back to placeholder if image fails to load
         ======================================================== */}
      <div
        style={{
          width: "100%",
          aspectRatio: "3 / 2", // keeps all images the same shape
          overflow: "hidden",
          borderBottom: "1px solid #eee",
          borderTopLeftRadius: "0.25rem",
          borderTopRightRadius: "0.25rem"
        }}
      >
        <Card.Img
          variant="top"
          src={product.image || placeholder}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover" // ensures the image fills the space nicely
          }}
          onError={(e) => {
            // If the image fails to load, use the placeholder instead
            e.currentTarget.src = placeholder;
          }}
        />
      </div>

      {/* ========================================================
          PRODUCT DETAILS SECTION
         ======================================================== */}
      <Card.Body className="d-flex flex-column">
        
        {/* Product Name (with optional highlighting) */}
        <Card.Title
          dangerouslySetInnerHTML={{
            __html: highlight(product.name, searchQuery || "")
          }}
        />

        {/* Product Price */}
        <Card.Text>
          Price: $
          {typeof product.price === "number"
            ? product.price.toFixed(2)
            : "N/A"}
        </Card.Text>

        {/* Product Description (optional) */}
        {product.description && (
          <Card.Text>{product.description}</Card.Text>
        )}

        {/* ========================================================
            ACTION BUTTONS
            - View
            - Edit
            - Delete (optional)
            - Add to Cart (optional)
            Buttons stretch evenly using flexbox.
           ======================================================== */}
        <div className="d-flex flex-wrap gap-2 mt-auto">

          {/* View Button */}
          <Button variant="outline-secondary" className="flex-grow-1">
            <Link
              to={`/products/${product.id}`}
              className="text-decoration-none text-dark"
            >
              View
            </Link>
          </Button>

          {/* Edit Button */}
          <Button variant="primary" className="flex-grow-1">
            <Link
              to={`/products/${product.id}/edit`}
              className="text-white text-decoration-none"
            >
              Edit
            </Link>
          </Button>

          {/* Delete Button (only shown if onDelete was provided) */}
          {onDelete && (
            <Button
              variant="danger"
              className="flex-grow-1"
              onClick={() => onDelete(product.id)}
            >
              Delete
            </Button>
          )}

          {/* Add to Cart Button (only shown if onAddToCart was provided) */}
          {onAddToCart && (
            <Button
              variant="success"
              className="flex-grow-1"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;