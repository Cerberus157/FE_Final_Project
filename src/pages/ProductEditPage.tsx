// ============================================================
// ProductEditPage.tsx
// This page is used to edit an existing product.
// It loads the product based on the ID in the URL, fills the
// form with the existing data, and updates the product when
// the user submits the form.
//
// Key responsibilities:
// - Read the product ID from the URL
// - Find the matching product from the list passed by the parent
// - Show a fallback message if the product doesn't exist
// - Pass the updated product back to the parent (App.tsx)
// - Navigate back to the product list after saving
// ============================================================

import { useParams, useNavigate } from "react-router-dom";
import ProductForm from "../components/products/ProductForm";
import type { Product } from "../types/Product";

interface Props {
  products: Product[];                // full list of products from App.tsx
  onUpdate: (product: Product) => void; // callback to update the product
}

const ProductEditPage = ({ products, onUpdate }: Props) => {
  // ============================================================
  // useParams()
  // Reads the dynamic ":id" part of the URL.
  // Example: /products/123/edit → id = "123"
  // ============================================================
  const { id } = useParams();

  // ============================================================
  // useNavigate()
  // Lets us redirect the user after saving.
  // ============================================================
  const navigate = useNavigate();

  // ============================================================
  // Find the product that matches the ID from the URL.
  // If no product is found, the user may have typed an invalid URL
  // or the product may have been deleted.
  // ============================================================
  const product = products.find((p) => p.id === id);

  // ============================================================
  // If the product doesn't exist, show a simple fallback message.
  // This prevents the form from breaking due to missing data.
  // ============================================================
  if (!product) {
    return <h2 className="container mt-4">Product not found.</h2>;
  }

  // ============================================================
  // handleUpdate()
  // Called when the user submits the form.
  // Steps:
  // 1. Pass the updated product to the parent (App.tsx)
  // 2. Navigate back to the product list
  // ============================================================
  function handleUpdate(updatedProduct: Product) {
    onUpdate(updatedProduct);
    navigate("/products");
  }

  // ============================================================
  // Page Layout
  // ProductForm receives:
  // - initialProduct → pre-fills the form fields
  // - onSubmit → called when the user saves changes
  // ============================================================
  return (
    <div className="container mt-4">
      <h1>Edit Product</h1>

      <ProductForm
        initialProduct={product}  // pre-fill form with existing data
        onSubmit={handleUpdate}   // handle save action
      />
    </div>
  );
};

export default ProductEditPage;