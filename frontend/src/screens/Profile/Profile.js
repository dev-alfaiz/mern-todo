import * as React from "react";
import moment from "moment";
import "./Profile.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";

export const Profile = () => {
  const auth = localStorage.getItem("user");
  const authDetail = JSON.parse(auth);

  const navigate = useNavigate();

  let createdDate = moment(authDetail.createdAt).format("YYYY-MM-DD");
  let createdTime = moment(authDetail.createdAt).format("HH:mm:ss");

  React.useEffect(() => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/signup");
    }
  }, [navigate]);

  return (
    <div className="profile">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className="table-head-row">
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {authDetail._id}
              </TableCell>
              <TableCell align="right">{authDetail.name}</TableCell>
              <TableCell align="right">{authDetail.email}</TableCell>
              <TableCell align="right">
                <p>Date: {createdDate}</p>
                <p>Time: {createdTime}</p>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
