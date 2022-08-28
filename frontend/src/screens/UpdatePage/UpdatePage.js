import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./UpdatePage.css";

import { getAllTodos, updateTodo } from "../../app/slices/todoSlice";

export const UpdatePage = () => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const [isError, setIsError] = React.useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = localStorage.getItem("user");
  const authDetail = JSON.parse(auth);
  const todos = useSelector((state) => state.todoReducer.todos);

  const updateTodoHandler = (event) => {
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

    if (title && body) {
      dispatch(updateTodo({ id: params.id, body: { title, body } }));
      navigate("/");
      setIsError(false);
      setTitle("");
      setBody("");
    }
  };

  React.useEffect(() => {
    dispatch(getAllTodos());
    const filteredTodo = todos.filter((todo) => todo._id === params.id);
    setTitle(filteredTodo[0].title);
    setBody(filteredTodo[0].body);
  }, []);

  return (
    <div className="update-page">
      <Container maxWidth="sm" align="center">
        <h1>Update Todo</h1>
        <Box>
          <form
            onSubmit={updateTodoHandler}
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
              Update Todo
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
