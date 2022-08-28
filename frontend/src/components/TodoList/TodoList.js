import * as React from "react";
import "./TodoList.css";
import { Link } from "react-router-dom";
import moment from "moment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";

import { deleteTodo, getAllTodos } from "../../app/slices/todoSlice";

export const TodoList = ({ data }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const handleDelete = (deleteableId) => {
    dispatch(deleteTodo(deleteableId));
    dispatch(getAllTodos());
  };
  return (
    <div className="todo-list">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="table-head-row">
              <TableCell>#</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Body</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Operations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((todo, index) => {
              return (
                <TableRow
                  key={todo._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="right">{todo.title}</TableCell>
                  <TableCell align="right" title={todo.body}>
                    {todo.body.length > 19
                      ? todo.body.slice(0, 20) + "..."
                      : todo.body}
                  </TableCell>
                  <TableCell align="right">
                    {todo.createdAt ? (
                      <>
                        <Typography>
                          {moment(todo.createdAt).format("MMMM Do YYYY")}
                        </Typography>
                        <Typography>
                          On: {moment(todo.createdAt).format("h:mm:ss a")}
                        </Typography>
                      </>
                    ) : (
                      <>
                        <Typography>
                          {moment(todo.updatedAt).format("MMMM Do YYYY")}
                        </Typography>
                        <Typography>
                          On: {moment(todo.updatedAt).format("h:mm:ss a")}
                        </Typography>
                      </>
                    )}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      alignItems: "center",
                    }}
                  >
                    <Link
                      to={`/todo/${todo._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <Button
                        variant="contained"
                        sx={{ bgcolor: "darkcyan" }}
                        size="small"
                        type="submit"
                        style={{ marginBottom: "5px" }}
                      >
                        Update
                      </Button>
                    </Link>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "darkcyan" }}
                      size="small"
                      type="submit"
                      style={{ marginBottom: "5px" }}
                      onClick={() => handleDelete(todo._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
