import React from 'react';
import { Box, Typography } from '@mui/material';

function FileSection({ files }) {
  return (
    <Box>
      {files.map(file => (
        <Box key={file.fileId} sx={{ marginBottom: 2 }}>
          <Typography variant="h6">{file.fileName}</Typography>
          <Typography variant="body2">Taille: {file.fileSize} Ko</Typography>
          <Typography variant="body2">Extension: {file.format}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export default FileSection;
