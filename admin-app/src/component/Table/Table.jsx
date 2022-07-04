import React, { Fragment } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LoaderSpinner from "../../component/utilities/LoaderSpinner";
import { Link } from "react-router-dom";
import "./Table.css";
import { useSelector, useDispatch } from "react-redux";

function createData(name, OrderId, date, status) {
  return { name, OrderId, date, status };
}

const rows = [
  createData("Lasania Chiken Fri", 18908424, "2 March 2022", "Approved"),
  createData("Big Baza Bang ", 18908424, "2 March 2022", "Pending"),
  createData("Mouth Freshner", 18908424, "2 March 2022", "Approved"),
  createData("Cupcake", 18908421, "2 March 2022", "Delivered"),
];

const makeStyle = (status) => {
  if (status === "approved") {
    return {
      background: "rgb(145 254 159 / 47%)",
      color: "green",
    };
  } else if (status === "pending") {
    return {
      background: "#ffadad8f",
      color: "red",
    };
  } else {
    return {
      background: "#59bfff",
      color: "white",
    };
  }
};

export default function BasicTable() {
  const { loading, orders } = useSelector((state) => state.shop);

  const showDate = (date) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };
  return (
    <Fragment>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div className="Table" style={{ marginTop: "1rem" }}>
          <h3>Recent Orders</h3>
          <TableContainer
            component={Paper}
            style={{ boxShadow: "0px 13px 20px 0px #80808029" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Receiver</TableCell>
                  <TableCell align="left">Order ID</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ color: "white" }}>
                {orders.length > 0 &&
                  orders.map((row, index) => (
                    <Fragment>
                      {index <= 5 && (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.receiver}
                          </TableCell>
                          <TableCell align="left">{row._id}</TableCell>
                          <TableCell align="left">
                            {showDate(row.createdAt)}
                          </TableCell>
                          <TableCell align="left">
                            <span
                              className="status"
                              style={makeStyle(row.itemStatus)}
                            >
                              {row.itemStatus}
                            </span>
                          </TableCell>
                          <TableCell align="left">
                            <Link
                              to={`/seller-orders/${row._id}`}
                              className="Details"
                            >
                              Details
                            </Link>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Fragment>
  );
}
