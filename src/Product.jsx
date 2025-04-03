import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, Snackbar, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useCartStore, useStore } from "./store";

const Product = () => {
  const { data, loading, error, fetchData } = useStore();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { cart, addToCart } = useCartStore();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("Cart items:", cart);
  }, [cart]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-around", gap: "16px" }}>
        {data.map((item) => (
          <Card
            key={item.id}
            sx={{
              maxWidth: 300,
              flex: "1 1 30%",
              borderRadius: "16px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              height: "auto",
              cursor: "pointer",
            }}
            onClick={() => handleCardClick(item)} 
          >
            <CardMedia
              component="img"
              height="200"
              image={item.image}
              alt={item.title}
              sx={{ objectFit: "contain" }}
            />
            <CardContent sx={{ padding: "16px" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: "bold",
                  marginBottom: "8px",
                  fontSize: "16px",
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: 1,
                  textOverflow: "ellipsis",
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  WebkitLineClamp: 1,
                  textOverflow: "ellipsis",
                  marginBottom: "8px",
                }}
              >
                {item.description}
              </Typography>
              <Button
                variant="outlined"
                size="small"
                sx={{
                  borderRadius: "20px",
                  textTransform: "none",
                  marginBottom: "16px",
                  color: "gray",
                  borderColor: "gray",
                }}
              >
                {item.category || "Clothes"}
              </Button>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  ${item.price.toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#6d28d9",
                    color: "white",
                    borderRadius: "20px",
                    textTransform: "none",
                    padding: "8px 16px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent opening the dialog when clicking "Add to Cart"
                    handleAddToCart(item);
                  }}
                >
                  Add To Cart
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Snackbar for Add to Cart */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Product added to cart"
        action={
          <Button color="inherit" onClick={handleCloseSnackbar}>
            X
          </Button>
        }
      />

      {/* Product Detail Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm" disableScrollLock>
        {selectedProduct && (
          <>
            <DialogTitle>{selectedProduct.title}</DialogTitle>
            <DialogContent>
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "contain",
                  marginBottom: "16px",
                }}
              />
              <Typography variant="body1" color="text.secondary">
                {selectedProduct.description}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold", marginTop: "16px" }}>
                Price: ${selectedProduct.price.toLocaleString()}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="secondary">
                Close
              </Button>
              <Button
                onClick={() => handleAddToCart(selectedProduct)}
                variant="contained"
                sx={{
                  backgroundColor: "#6d28d9",
                  color: "white",
                  textTransform: "none",
                }}
              >
                Add to Cart
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
};

export default Product;
