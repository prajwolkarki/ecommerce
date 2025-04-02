import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCartStore } from "./store";
import { Badge, Button, Drawer } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };
  const { cart, removeFromCart, clearCart, getTotalPrice ,getTotalQuantity} = useCartStore();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "#6d28d9",
          margin: 0,
          cursor: "pointer",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Prajwol's Shop
      </h1>
      <nav>
        <ul style={{ display: "flex", listStyleType: "none", gap: "20px" }}>
          <li style={{ cursor: "pointer" }}>Home</li>
          <li style={{ cursor: "pointer" }}>About</li>
          <li style={{ cursor: "pointer" }}>Products</li>
        </ul>
      </nav>
      <div style={{ display: "flex" }}>
        <FacebookIcon sx={{ cursor: "pointer" }} />
        <LinkedInIcon sx={{ marginLeft: "10px", cursor: "pointer" }} />
        <GitHubIcon sx={{ marginLeft: "10px", cursor: "pointer" }} />
        <Badge badgeContent={getTotalQuantity()} color="primary">
          <ShoppingCartIcon
            sx={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={() => toggleDrawer(true)}
          />
        </Badge>
        <Drawer open={open} onClose={() => toggleDrawer(false)} anchor="right">
          <div style={{ width: 250, padding: 20 }}>
            <h2>Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id + Math.random().toString()}
                  style={{ marginBottom: "10px" }}
                >
                  <h4>{item.title}</h4>
                  <p>
                    Quantity: {item.quantity}{" "}
                    <RemoveShoppingCartIcon
                      onClick={() => removeFromCart(item.id)}
                    />
                  </p>
                  <p style={{ fontWeight: "bolder" }}>
                    $ {item.price * item.quantity}
                  </p>
                </div>
              ))
            )}
          </div>
          <p style={{ fontWeight: "bold", padding: "10px" }}>
            Total: $ {getTotalPrice() || 0}
          </p>
          <Button onClick={clearCart}>Clear Cart</Button>
        </Drawer>
      </div>
    </div>
  );
};

export default Header;
