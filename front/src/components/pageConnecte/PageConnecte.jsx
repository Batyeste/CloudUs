import React from "react";
import InsertFiles from "../InsertFiles/InsertFiles";
import GetFiles from "../GetFiles/GetFiles";
import { Box } from "@mui/material";
import theme from "../theme/theme";

const PageConnecte = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "84vh",
        padding: 2,
        bgcolor: theme.palette.background.default,
      }}
    >
      <InsertFiles />
      <GetFiles />
    </Box>
  );
};

export default PageConnecte;
