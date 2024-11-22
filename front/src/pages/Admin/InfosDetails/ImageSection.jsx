import React from "react";
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";
import theme from "../../../components/theme/theme";

function ImageSection({ images }) {
  return (
    <Box display="flex" flexWrap="wrap" gap={2}>
      {images.map((image) => (
        <Card
          key={image.fileId}
          sx={{
            width: 200,
            bgcolor: theme.palette.background.secondary,
            boxShadow: "0 3 7px rgba(0, 0, 0, 0.5)",
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={`http://127.0.0.1:8000${image.filePath}`} // Assurez-vous que le chemin est correct
            alt={image.fileName}
          />
          <CardContent>
            <Typography variant="body2" textAlign="center">
              {image.fileName}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}

export default ImageSection;
