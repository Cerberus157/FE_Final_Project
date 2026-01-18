// ============================================================
// ProductDetails.tsx
// This page shows the details for a single product.
// It loads the product from the API using the ID in the URL.
// Includes error handling so the page doesn't break if:
// - The product doesn't exist
// - The API fails
// - The ID is missing
// ============================================================

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../../api/productsApi";
import type { Product } from "../../types/Product";
import { Button } from "react-bootstrap";

interface Props {
  onAddToCart: (product: Product) => void;
}

const ProductDetails = ({ onAddToCart }: Props) => {
  // Read the product ID from the URL (e.g., /products/123)
  const { id } = useParams();

  // Store the product once it's loaded
  const [product, setProduct] = useState<Product | null>(null);

  // Show a loading message until the product finishes loading
  const [loading, setLoading] = useState(true);

  // ============================================================
  // Load the product when the page opens or when the ID changes
  // Wrapped in try/catch so the UI doesn't break on errors
  // ============================================================
  useEffect(() => {
    async function load() {
      // If there's no ID in the URL, we can't load anything
      if (!id) {
        console.error("ProductDetails: Missing product ID in URL");
        alert(
          "We couldn't load this product because the product ID was missing."
        );
        setLoading(false);
        return;
      }

      try {
        const data = await getProduct(id);
        setProduct(data);
      } catch (error) {
        console.error(`Error loading product with ID ${id}:`, error);
        alert(
          "We couldn't load this product. It may have been deleted or the server may be unavailable."
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  // ============================================================
  // Loading + Missing Product States
  // ============================================================

  if (loading) {
    return <p className="container mt-4">Loading product details...</p>;
  }

  if (!product) {
    return (
      <p className="container mt-4">
        Product not found. It may have been removed.
      </p>
    );
  }

  // Placeholder image if product has no image
  const placeholder =
    "https://via.placeholder.com/600x400.png?text=No+Image";

  // ============================================================
  // Main Product Details UI
  // ============================================================
  return (
    <div className="container mt-4">
      <h1 className="mb-4">{product.name}</h1>

      {/* Product Image */}
      <img
        src={product.image?.trim() ? product.image : placeholder}
        alt={product.name}
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          borderRadius: "8px",
          objectFit: "cover",
          marginBottom: "20px"
        }}
      />

      {/* Product Price */}
      <h3>
        Price: $
        {typeof product.price === "number"
          ? product.price.toFixed(2)
          : "N/A"}
      </h3>

      {/* Product Description */}
      {product.description && (
        <p className="mt-3">{product.description}</p>
      )}

      {/* Action Buttons */}
      <div className="d-flex gap-3 mt-4">

        {/* Add to Cart */}
        <Button
          variant="success"
          onClick={() => {
            try {
              onAddToCart(product);
            } catch (error) {
              console.error("Error adding product to cart:", error);
              alert(
                "We couldn't add this product to your cart. Please try again."
              );
            }
          }}
        >
          Add to Cart
        </Button>

        {/* Edit Product */}
        <Button variant="primary">
          <Link
            to={`/products/${product.id}/edit`}
            className="text-white text-decoration-none"
          >
            Edit Product
          </Link>
        </Button>

        {/* Back to Products */}
        <Button variant="secondary">
          <Link
            to="/products"
            className="text-white text-decoration-none"
          >
            Back to Products
          </Link>
        </Button>

      </div>
    </div>
  );
};

export default ProductDetails;