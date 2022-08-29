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
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

import { loginUser } from "../../../app/slices/authSlice";

export const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.userData);

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

  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setIsError(true);
      toast.warn("Please provide valid information!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return false;
    }

    if (email && password) {
      dispatch(
        loginUser({
          email: email.toLowerCase(),
          password: password.toLowerCase(),
        })
      );
      navigate("/");
      setIsError(false);
      if (user?.name?.length > 0) {
        setEmail("");
        setPassword("");
      }
    }
  };

  React.useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <div className="login-page">
      <Container maxWidth="sm" align="center">
        <h1>Login</h1>
        <Box>
          <form
            onSubmit={handleLogin}
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
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              variant="outlined"
              type="email"
              sx={{ width: "400px", marginBottom: "10px" }}
            />
            {isError && !email && <span className="error-span">*Required</span>}
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
            {isError && !password && (
              <span className="error-span">*Required</span>
            )}
            <Button
              variant="contained"
              sx={{ bgcolor: "darkcyan" }}
              type="submit"
            >
              Login
            </Button>
          </form>
        </Box>
      </Container>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};
