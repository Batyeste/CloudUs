import React from "react";
import { Box, Typography } from "@mui/material";
import theme from "../../../components/theme/theme";

function FileSection({ files }) {
  return (
    <Box>
      {files.map((file) => (
        <Box key={file.fileId} sx={{ marginBottom: 2 }}>
          <Typography variant="h6">{file.fileName}</Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.primary }}
          >
            Taille: {file.fileSize} Ko
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.primary }}
          >
            Extension: {file.format}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default FileSection;
