import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

export const SignUp = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = (event) => {
    event.preventDefault();
    console.log("Register:", { name, email, password });
  };
  return (
    <div className="signup-page">
      <Container maxWidth="sm" align="center">
        <h1>Register</h1>
        <Box>
          <form
            onSubmit={handleRegister}
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
              value={name}
              onChange={(event) => setName(event.target.value)}
              variant="outlined"
              type="text"
              sx={{ width: "400px", marginBottom: "10px" }}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              variant="outlined"
              type="email"
              sx={{ width: "400px", marginBottom: "10px" }}
            />
            <FormControl
              sx={{ width: "400px", marginBottom: "10px" }}
              variant="outlined"
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={values.showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  handleChange("password");
                  setPassword(event.target.value);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button
              variant="contained"
              sx={{ bgcolor: "darkcyan" }}
              type="submit"
            >
              Register
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};
