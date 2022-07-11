import React, { useState, useEffect } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link, useParams, useNavigate } from "react-router-dom";
//*myWork
import {
  getSingleOrder,
  sellerOrders,
  sellerUpdateOrderStatus,
} from "../../redux/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";

import LoaderSpinner from "../../utilities/LoaderSpinner/LoaderSpinner";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
const OrderDetailmain = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  //*Model
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //*Model
  console.log("Params value", params);
  useEffect(() => {
    dispatch(getSingleOrder(params.orderId));
  }, []);

  const { loading, order } = useSelector((state) => state.singleOrder);

  const [status, setStatus] = useState("");
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
  //*Handle Update
  const handleUpdateOrderStatus = () => {
    if (status !== "shipped") {
      const body = {
        itemStatus: status,
      };
      dispatch(sellerUpdateOrderStatus(params.orderId, body));
      handleClose();

      dispatch(sellerOrders());
      navigate(-1);
    } else {
      handleClose();
      return;
    }
  };
  //*Handle Update

  return (
    <>
      {loading ? (
        <LoaderSpinner text="Getting order" />
      ) : (
        <section className="content-main">
          <div className="content-header">
            <Link to="/seller-orders" className="btn btn-dark text-white">
              Back To Orders
            </Link>
          </div>
          {Object.keys(order).length > 0 && (
            <div className="card">
              <header className="card-header p-3 Header-green">
                <div className="row align-items-center ">
                  <div className="col-lg-6 col-md-6">
                    <span>
                      <i className="far fa-calendar-alt mx-2"></i>
                      <b className="text-white">{showDate(order.createdAt)}</b>
                    </span>
                    <br />
                    <small className="text-white mx-3 ">
                      {`Order ID: ${order._id}`}
                    </small>
                  </div>
                  <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                    <select
                      className="form-select d-inline-block"
                      style={{ maxWidth: "200px" }}
                      value={status ? status : order.itemStatus}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="Refund">Refund</option>
                    </select>
                    <button
                      className="btn btn-success ms-2"
                      //  onClick={()=>handleUpdateOrderStatus()}
                      onClick={handleClickOpen}
                    >
                      <i className="fas fa-print"></i>
                    </button>

                    <Dialog
                      fullScreen={fullScreen}
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="responsive-dialog-title"
                    >
                      <DialogTitle id="responsive-dialog-title">
                        {"Update Status of Order"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          When you submit order as shipped the quantity of
                          product in stock will decrease or by the quantity of
                          order,and if order cancelled and there is no problem
                          with it, you can update your product and increase the
                          count again.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                          Disagree
                        </Button>
                        <Button
                          onClick={() => handleUpdateOrderStatus()}
                          autoFocus
                        >
                          Agree
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </div>
                </div>
              </header>
              <div className="card-body">
                {/* Order info */}
                <OrderDetailInfo order={order} />

                <div className="row">
                  <div className="col-lg-9">
                    <div className="table-responsive">
                      <OrderDetailProducts order={order} />
                    </div>
                  </div>
                  {/* Payment Info */}
                  <div className="col-lg-3">
                    <div className="box shadow-sm bg-light">
                      <button className="btn btn-dark col-12">
                        MARK AS DELIVERED
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default OrderDetailmain;
