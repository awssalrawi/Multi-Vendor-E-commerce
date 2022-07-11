import React, { useEffect, Fragment, useState } from "react";
import {
  getSingleOrder,
  sellerOrders,
  sellerUpdateOrderStatus,
} from "../../redux/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoaderSpinner from "../../utilities/LoaderSpinner/LoaderSpinner";
import "./styles/seller-order-details.scss";
import ButtonMat from "../../utilities/button/ButtonMat";
import { Update, ArrowBack } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const SellerOrderDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  //*Radio buttons
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  //*Radio buttons
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

  useEffect(() => {
    dispatch(getSingleOrder(params.orderId));
  }, []);

  // useEffect(() => {
  //   dispatch(sellerOrders());
  // }, [dispatch]);

  const { loading, order } = useSelector((state) => state.singleOrder);

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
    if (value === "shipped") {
      const body = {
        itemStatus: value,
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
    <Fragment>
      {Object.keys(order).length <= 0 || loading ? (
        <LoaderSpinner text="Getting Order" />
      ) : (
        <div className="singleOrder-container">
          <div className="product-box">
            <div className="content-box">
              <span className="content-box__text">Order Id :</span>
              <span className="content-box__value">{order._id}</span>
            </div>
          </div>
          <div className="order-box">
            <div className="order-main-info">
              <figure className="img-container">
                <img
                  src={order.productId.cardPicture}
                  alt="Order"
                  className="order-img"
                />
              </figure>
              <div className="order-info">
                <div className="content-box">
                  <span className="content-box__text">Product Id :</span>
                  <span className="content-box__value">
                    {order.productId._id}
                  </span>
                </div>
                <div className="content-box">
                  <span className="content-box__text">Product Name :</span>
                  <span className="content-box__value">
                    {order.productId.name}
                  </span>
                </div>
                {order.specific && (
                  <div className="content-box">
                    <span className="content-box__text">Order Specific :</span>
                    <span className="content-box__value">{order.specific}</span>
                  </div>
                )}
                <div className="content-box">
                  <span className="content-box__text">Order receiver :</span>
                  <span className="content-box__value">{order.receiver}</span>
                </div>
                <div className="content-box">
                  <span className="content-box__text">Price :</span>
                  <span className="content-box__value">{order.payedPrice}</span>
                </div>
                <div className="content-box">
                  <span className="content-box__text">Price currency :</span>
                  <span className="content-box__value">
                    {order.payedCurrency}
                  </span>
                </div>
                <div className="content-box">
                  <span className="content-box__text">Quantity :</span>
                  <span className="content-box__value">
                    {order.purchasedQty}
                  </span>
                </div>
                <div className="content-box">
                  <span className="content-box__text">Price in dollar :</span>
                  <span className="content-box__value">
                    {` $${order.payedPiceInDollar}`}
                  </span>
                </div>
                <div className="content-box">
                  <span className="content-box__text">Ordered At :</span>
                  <span className="content-box__value">
                    {showDate(order.createdAt)}
                  </span>
                </div>
                <div className="content-box">
                  <span className="content-box__text">Updated At :</span>
                  <span className="content-box__value">
                    {showDate(order.updatedAt)}
                  </span>
                </div>
                <div className="content-box">
                  <span className="content-box__text">Status :</span>
                  <span className="content-box__value">{order.itemStatus}</span>
                </div>
              </div>
            </div>
            <div className="order-status">
              {/* <label htmlFor="order-status"> Change Order Status</label> */}
              {/* <select
                name="orderstatus"
                id="order-status"
                className="select-status"
              >
                <option value="">Pending</option>
                <option value="">Delivered to Ltreda</option>
                <option value="">Cancelled</option>
                <option value="">Refund</option>
              </select> */}
              <FormControl
                sx={{
                  "& .MuiSvgIcon-root": {
                    fontSize: 20,
                  },
                }}
              >
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Change Order Status
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value ? value : order.itemStatus}
                  onChange={handleChange}
                  sx={{ fontSize: "0.5rem" }}
                >
                  <FormControlLabel
                    value="pending"
                    control={<Radio />}
                    label="Pending"
                    disabled={order.itemStatus === "shipped"}
                  />
                  <FormControlLabel
                    value="shipped"
                    control={<Radio />}
                    label="Shipped"
                    disabled={order.itemStatus === "shipped"}
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="btn-box">
            <ButtonMat
              name="Back"
              icon={<ArrowBack />}
              className="btn-back"
              onClick={() => navigate(-1)}
            />
            {/* <ButtonMat
              name="Update Status"
              icon={<Update />}
              className="btn-update"
            /> */}

            <ButtonMat
              name="Update Status"
              icon={<Update />}
              className="btn-update"
              onClick={handleClickOpen}
              disabled={order.itemStatus === "shipped"}
            />
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
                  When you submit order as shipped the quantity of product in
                  stock will decrease or by the quantity of order,and if order
                  cancelled and there is no problem with it, you can update your
                  product and increase the count again.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={handleClose}>
                  Disagree
                </Button>
                <Button onClick={() => handleUpdateOrderStatus()} autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SellerOrderDetail;
