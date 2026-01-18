// ============================================================
// ProductForm.tsx
// This form is used for BOTH creating and editing products.
// It handles all input fields and sends the final product object
// back to the parent component when the user submits.
//
// Key features:
// - Controlled inputs (React state mirrors form fields)
// - Pre-fills fields when editing an existing product
// - Generates a new ID when creating a product
// ============================================================

import { useState } from "react";
import type { Product } from "../../types/Product";
import { Form, Button } from "react-bootstrap";

interface Props {
  initialProduct?: Product;        // optional: used when editing a product
  onSubmit: (product: Product) => void; // called when the form is submitted
}

const ProductForm = ({ initialProduct, onSubmit }: Props) => {
  // ============================================================
  // Local state for each form field
  // If initialProduct exists (editing), pre-fill the fields.
  // If not (creating), start with empty/default values.
  // ============================================================
  const [name, setName] = useState(initialProduct?.name || "");
  const [price, setPrice] = useState(initialProduct?.price || 0);
  const [description, setDescription] = useState(initialProduct?.description || "");
  const [image, setImage] = useState(initialProduct?.image || "");

  // ============================================================
  // handleSubmit()
  // Called when the user presses the "Save" button.
  //
  // Steps:
  // 1. Prevent the page from refreshing (default form behavior)
  // 2. Build a Product object using the form values
  // 3. Use the existing ID if editing, or generate a new one if creating
  // 4. Pass the product back to the parent component
  // ============================================================
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault(); // stop the page from reloading

    const product: Product = {
      id: initialProduct?.id || crypto.randomUUID(), // keep existing ID or create a new one
      name,
      price,
      description,
      image,
    };

    // Send the product back to the parent page
    onSubmit(product);
  }

  // ============================================================
  // Form Layout
  // Each Form.Control is a "controlled input":
  // - Its value comes from React state
  // - Updating the input updates the state
  // ============================================================
  return (
    <Form onSubmit={handleSubmit}>
      
      {/* Product Name */}
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          value={name}
          onChange={(e) => setName(e.target.value)} // update state on typing
          required
        />
      </Form.Group>

      {/* Product Price */}
      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))} // convert string → number
          required
        />
      </Form.Group>

      {/* Product Description */}
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>

      {/* Product Image URL */}
      <Form.Group className="mb-3">
        <Form.Label>Image URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="https://example.com/image.jpg"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </Form.Group>

      {/* Submit Button */}
      <Button type="submit" variant="success">
        Save
      </Button>
    </Form>
  );
};

export default ProductForm;