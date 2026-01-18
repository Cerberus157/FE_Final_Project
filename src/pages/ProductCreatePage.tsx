// ============================================================
// ProductCreatePage.tsx
// This page is used to create a brand‑new product.
// It displays the ProductForm component and handles what happens
// after the user submits the form.
//
// Key responsibilities:
// - Receive the new product data from ProductForm
// - Call the parent handler (onCreate) if provided
// - Navigate back to the product list after saving
// ============================================================

import { useNavigate } from "react-router-dom";
import ProductForm from "../components/products/ProductForm";
import type { Product } from "../types/Product";

interface Props {
  onCreate?: (product: Product) => void; // optional callback from parent
}

const ProductCreatePage = ({ onCreate }: Props) => {
  // ============================================================
  // useNavigate()
  // This hook lets us programmatically change pages.
  // After creating a product, we redirect the user back to /products.
  // ============================================================
  const navigate = useNavigate();

  // ============================================================
  // handleCreate()
  // This function receives the product data from ProductForm.
  // Steps:
  // 1. Call the parent handler (if provided)
  // 2. Navigate back to the product list
  // ============================================================
  function handleCreate(product: Product) {
    // If the parent component passed a create handler, call it
    onCreate?.(product);

    // Redirect the user back to the products page
    navigate("/products");
  }

  // ============================================================
  // Page Layout
  // Displays a title and the ProductForm component.
  // ProductForm will call handleCreate when the user submits.
  // ============================================================
  return (
    <div className="container mt-4">
      <h1>Add New Product</h1>

      {/* ProductForm handles all input fields and validation */}
      <ProductForm onSubmit={handleCreate} />
    </div>
  );
};

export default ProductCreatePage;