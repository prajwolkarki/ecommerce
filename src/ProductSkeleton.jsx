import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import { Box, Skeleton } from "@mui/material"


const ProductSkeleton = ({ count = 6, rows = 2 }) => {
  const itemsPerRow = Math.ceil(count / rows)
  return (
    <div>
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={`row-${rowIndex}`}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            gap: "16px",
            marginBottom: "16px",
          }}
        >
          {Array.from({ length: itemsPerRow }).map((_, colIndex) => {
            const itemIndex = rowIndex * itemsPerRow + colIndex
            if (itemIndex >= count) return null

            return (
              <Card
                key={`skeleton-${itemIndex}`}
                sx={{
                  maxWidth: 300,
                  flex: "1 1 30%",
                  borderRadius: "16px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  height: "auto",
                }}
              >
                <Skeleton variant="rectangular" height={200} animation="wave" sx={{ bgcolor: "rgba(0, 0, 0, 0.08)" }} />
                <CardContent sx={{ padding: "16px" }}>
                  <Skeleton
                    variant="text"
                    width="80%"
                    height={28}
                    animation="wave"
                    sx={{ marginBottom: "8px", bgcolor: "rgba(0, 0, 0, 0.08)" }}
                  />
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={20}
                    animation="wave"
                    sx={{ marginBottom: "8px", bgcolor: "rgba(0, 0, 0, 0.08)" }}
                  />
                  <Skeleton
                    variant="rounded"
                    width="40%"
                    height={32}
                    animation="wave"
                    sx={{ marginBottom: "16px", borderRadius: "20px", bgcolor: "rgba(0, 0, 0, 0.08)" }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Skeleton
                      variant="text"
                      width="30%"
                      height={32}
                      animation="wave"
                      sx={{ bgcolor: "rgba(0, 0, 0, 0.08)" }}
                    />
                    <Skeleton
                      variant="rounded"
                      width="40%"
                      height={36}
                      animation="wave"
                      sx={{ borderRadius: "20px", bgcolor: "rgba(0, 0, 0, 0.08)" }}
                    />
                  </Box>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export default ProductSkeleton
