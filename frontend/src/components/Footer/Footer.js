import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const Footer = () => {
  return (
    <div className="footer">
      <Paper
        sx={{
          marginTop: "calc(10% + 60px)",
          width: "100%",
          position: "fixed",
          bottom: 0,
          bgcolor: "darkcyan",
        }}
        component="footer"
        square
        variant="outlined"
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "center",
              display: "flex",
              mb: 2,
            }}
          >
            <Typography
              variant="caption"
              color="white"
              style={{ fontSize: "1rem", fontWeight: "400" }}
            >
              Copyright ©2022. MERN Todo
            </Typography>
          </Box>
        </Container>
      </Paper>
    </div>
  );
};
