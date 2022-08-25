import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./AddPage.css";

export const AddPage = () => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const authDetail = JSON.parse(auth);

  const addProductHandler = (event) => {
    event.preventDefault();

    if (!title || !body) {
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

    console.log("ADD-PRODUCT:", { title, body, userId: authDetail._id });
  };
  return (
    <div className="add-page">
      <Container maxWidth="sm" align="center">
        <h1>Add Todo</h1>
        <Box>
          <form
            onSubmit={addProductHandler}
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
              label="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              variant="outlined"
              type="text"
              sx={{ width: "400px", marginBottom: "10px" }}
            />
            {isError && !title && <span className="error-span">*Required</span>}
            <TextField
              label="Body"
              value={body}
              onChange={(event) => setBody(event.target.value)}
              variant="outlined"
              type="text"
              sx={{ width: "400px", marginBottom: "10px" }}
              multiline
              rows={8}
            />
            {isError && !body && <span className="error-span">*Required</span>}

            <Button
              variant="contained"
              sx={{ bgcolor: "darkcyan" }}
              type="submit"
            >
              Add Todo
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
