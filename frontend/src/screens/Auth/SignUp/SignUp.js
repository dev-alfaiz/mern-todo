import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

export const SignUp = () => {
  return (
    <div className="signup-page">
      <Container maxWidth="sm" align="center">
        <h1>Register</h1>
        <Box
          style={{
            display: "flex",
            flexFlow: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "auto",
            height: "auto",
          }}
        >
          <TextField
            label="Full Name"
            variant="outlined"
            type="text"
            sx={{ width: "400px", marginBottom: "10px" }}
          />
          <TextField
            label="Email"
            variant="outlined"
            type="email"
            sx={{ width: "400px", marginBottom: "10px" }}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            sx={{ width: "400px", marginBottom: "10px" }}
          />
        </Box>
      </Container>
    </div>
  );
};
