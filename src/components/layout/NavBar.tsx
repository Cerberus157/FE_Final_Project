// ============================================================
// NavBar.tsx
// This component displays the top navigation bar for the app.
// It includes:
// - A link to the home page
// - A link to the products page
// - A link to the cart page
// - A badge showing how many items are in the cart
//
// It uses React Bootstrap for styling and layout.
// ============================================================

import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { Badge } from "react-bootstrap";

interface Props {
  cartCount: number; // number of items currently in the cart
}

const NavBar = ({ cartCount }: Props) => {
  return (
    // ============================================================
    // Navbar Component
    // "bg=dark" and "variant=dark" give it a dark theme
    // "expand=lg" means the menu collapses on smaller screens
    // ============================================================
    <Navbar bg="dark" variant="dark" expand="lg">
      <div className="container">
        
        {/* ========================================================
            Brand / Logo
            Clicking this takes the user to the home page
           ======================================================== */}
        <Navbar.Brand as={Link} to="/">
          Shopping App
        </Navbar.Brand>

        {/* Button that appears on small screens to toggle the menu */}
        <Navbar.Toggle aria-controls="main-nav" />

        {/* ========================================================
            Collapsible Navigation Area
            Contains the actual navigation links
           ======================================================== */}
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto"> 
            {/* "ms-auto" pushes links to the right */}

            {/* Products Link */}
            <Nav.Link as={Link} to="/products">
              Products
            </Nav.Link>

            {/* Cart Link */}
            <Nav.Link as={Link} to="/cart">
              Cart

              {/* ====================================================
                  Cart Badge
                  Only shows when cartCount > 0
                  "pill" makes it rounded
                  "bg=danger" gives it a red background
                 ==================================================== */}
              {cartCount > 0 && (
                <Badge bg="danger" pill className="ms-2">
                  {cartCount}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default NavBar;