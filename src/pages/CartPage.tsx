// ============================================================
// CartPage.tsx
// This page displays everything inside the user's shopping cart.
// It shows:
// - A list of all cart items
// - Buttons to remove items or update quantities
// - A summary section with totals
//
// The parent (App.tsx) handles the actual cart logic, so this
// component focuses only on displaying the cart and calling
// the provided handlers.
// ============================================================

import type { CartItem } from "../types/CartItem";
import CartItemComponent from "../components/cart/CartItem";

interface Props {
  items: CartItem[];                                   // all items currently in the cart
  onRemove: (productId: string) => void;               // remove a single item
  onUpdateQuantity: (productId: string, quantity: number) => void; // change quantity
  onClearCart: () => void;                             // remove ALL items
}

const CartPage = ({ items, onRemove, onUpdateQuantity, onClearCart }: Props) => {
  // ============================================================
  // Calculate the total price of all items in the cart
  // - "reduce" loops through each item and adds up the cost
  // ============================================================
  const total = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // ============================================================
  // If the cart is empty, show a simple message instead of the layout
  // ============================================================
  if (items.length === 0) {
    return (
      <div className="container mt-4">
        <h1 className="mb-4">Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  // ============================================================
  // Main Cart Layout
  // Left side: list of cart items
  // Right side: order summary + actions
  // ============================================================
  return (
    <div className="container mt-4">
      <h1 className="mb-4">Cart</h1>

      <div className="row">
        {/* ========================================================
            LEFT COLUMN — CART ITEMS
            Displays each item using the CartItemComponent
           ======================================================== */}
        <div className="col-lg-8">
          {items.map((item) => (
            <CartItemComponent
              key={item.product.id}          // unique key for React
              item={item}                    // the cart item data
              updateQuantity={onUpdateQuantity} // handler for changing quantity
              removeFromCart={onRemove}         // handler for removing item
            />
          ))}
        </div>

        {/* ========================================================
            RIGHT COLUMN — ORDER SUMMARY
            Shows totals and action buttons
           ======================================================== */}
        <div className="col-lg-4">
          <div
            className="p-3 border rounded shadow-sm sticky-top"
            style={{ top: "90px" }} // keeps the summary visible while scrolling
          >
            <h4 className="mb-3">Order Summary</h4>

            {/* Subtotal */}
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <strong>${total.toFixed(2)}</strong>
            </div>

            {/* Placeholder for tax */}
            <div className="d-flex justify-content-between mb-3 text-muted">
              <span>Estimated Tax</span>
              <span>—</span>
            </div>

            <hr />

            {/* Total */}
            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold">Total</span>
              <span className="fw-bold">${total.toFixed(2)}</span>
            </div>

            {/* Checkout button (disabled for now) */}
            <button className="btn btn-success w-100" disabled>
              Checkout (Disabled)
            </button>

            {/* Remove all items */}
            <button
              className="btn btn-danger w-100 mt-2"
              onClick={onClearCart}
            >
              Remove All Items
            </button>

            {/* Continue shopping */}
            <a href="/products" className="btn btn-link w-100 mt-2">
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;