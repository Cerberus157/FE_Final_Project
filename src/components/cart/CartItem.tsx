import { Button } from "react-bootstrap";
import type { CartItem as CartItemType } from "../../types/CartItem";

interface Props {
  item: CartItemType;
  updateQuantity: (id: string, newQty: number) => void;
  removeFromCart: (id: string) => void;
}

const CartItem = ({ item, updateQuantity, removeFromCart }: Props) => {
  const placeholder = "https://via.placeholder.com/80x80.png?text=No+Image";

  return (
    <div className="d-flex align-items-center gap-3 p-3 border rounded shadow-sm mb-3">

      {/* Thumbnail */}
      <img
        src={item.product.image || placeholder}
        alt={item.product.name}
        style={{
          width: "80px",
          height: "80px",
          objectFit: "cover",
          borderRadius: "6px"
        }}
        onError={(e) => {
          e.currentTarget.src = placeholder;
        }}
      />

      {/* Name + Price */}
      <div className="flex-grow-1">
        <h5 className="mb-1">{item.product.name}</h5>
        <div className="text-muted">Price: ${item.product.price.toFixed(2)}</div>
      </div>

      {/* Quantity Stepper */}
      <div className="d-flex align-items-center gap-2">
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          −
        </Button>

        <span className="fw-bold">{item.quantity}</span>

        <Button
          variant="outline-secondary"
          size="sm"
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
        >
          +
        </Button>
      </div>

      {/* Subtotal */}
      <div className="fw-bold" style={{ width: "100px", textAlign: "right" }}>
        ${(item.product.price * item.quantity).toFixed(2)}
      </div>

      {/* Remove */}
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.product.id)}
      >
        Remove
      </Button>
    </div>
  );
};

export default CartItem;