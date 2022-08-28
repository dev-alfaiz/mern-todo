import * as React from "react";
import "./TodoList.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
// import moment from "moment";

export const TodoList = ({ data, refreshList }) => {
  return (
    <div className="todo-list">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="table-head-row">
              <TableCell>#</TableCell>
              <TableCell align="right">Title</TableCell>
              <TableCell align="right">Body</TableCell>
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
                  <TableCell align="right">{todo.body}</TableCell>
                  <TableCell
                    align="right"
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      alignItems: "center",
                    }}
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
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "darkcyan" }}
                      size="small"
                      type="submit"
                      style={{ marginBottom: "5px" }}
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
