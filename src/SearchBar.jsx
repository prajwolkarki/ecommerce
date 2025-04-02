import React, { useState } from "react";
import { TextField, InputAdornment, List, ListItem, ListItemText, Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import SearchSharpIcon from "@mui/icons-material/SearchSharp";
import { useStore } from "./store";


const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data } = useStore();
    const filteredItems = data.filter((item) =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",    
        alignItems: "center",
        width: "100%", 
        gap: "20px",
        margin: "20px",
      }}
    >
      <TextField
        id="search-bar"
        placeholder="Search ..." 
        variant="outlined"
        sx={{
          width: "100%",
          maxWidth: "600px",
          alignSelf:"start"
        }}
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchSharpIcon
                sx={{
                  color: "#6d28d9", 
                  fontSize: "24px", 
                }}
              />
            </InputAdornment>
          ),
        }}
      />
      {searchValue && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px",width:"100%" }}>
        {filteredItems.map((item) => {
          return (
            <Card
              sx={{
                maxWidth: 345,
                flex: "1 1 30%",
                borderRadius: "16px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                height: "auto",
              }}
              key={item.id}
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

                {/* Category Button */}
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
                  >
                    Add To Cart
                  </Button>
                </Box>
              </CardContent>
            </Card>
          );
        })}
      </div>
        
      )}
    </div>
  );
};

export default SearchBar;
