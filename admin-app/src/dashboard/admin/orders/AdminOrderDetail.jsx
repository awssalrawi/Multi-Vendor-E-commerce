import React, { useEffect, Fragment, useState, useRef } from "react";
import { adminGetOrderDetail } from "../../../redux/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  PersonOutlineRounded,
  PhoneAndroidRounded,
  LocationOn,
  LocalShippingOutlined,
  AttachmentRounded,
} from "@material-ui/icons";
import { useNavigate, Link } from "react-router-dom";

import ButtonMat from "../../../utilities/button/ButtonMat";
import "./styles/admin-order-detail.scss";
import LoaderSpinner from "../../../utilities/LoaderSpinner/LoaderSpinner";
import { adminUpdateOrderStatus } from "../../../redux/actions/orderAction";

//import { PDFDownloadLink } from "@react-pdf/renderer";
// import axios from "axios";
// import { saveAs } from "file-saver";

const AdminOrderDetail = () => {
  const [updateOrderState, setUpdateOrderState] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(adminGetOrderDetail(params.orderId));
  }, []);

  const {
    order: { order, addressShow },
    loading,
  } = useSelector((state) => state.adminOrderConfig);

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

  const showTotalQtyOfOrder = (orders) => {
    return orders.items.reduce((acc, item) => acc + item.purchasedQty, 0);
  };

  const showAddressField = (addressDetail, city, state = null, country) => {
    let address = " ";
    if (addressDetail.slice(-1) !== ".") {
      address = `${addressDetail}.${state ? state : null}.${city}. ${country}`;
    } else {
      address = `${addressDetail} ${state ? state : null}. ${city}. ${country}`;
    }

    return address;
  };

  const findLastStatus = (status) => {
    let last;
    status.forEach((state) => {
      if (state.isCompleted) {
        last = state.type;
      }
    });
    return last;
  };

  const handleUpdateStatus = (status) => {
    const body = {
      orderId: params.orderId,
      type: updateOrderState,
    };

    dispatch(adminUpdateOrderStatus(body));

    navigate(-1);
  };

  // const handleCreatePdf = () => {
  //   const data = { name: "Awss" };
  //   const config = {
  //     headers: {
  //       "Content-Type": " multipart/form-data",
  //       Accept: "application/pdf",
  //     },
  //   };

  //   axios
  //     .post("/api/v1/order/create-pdf", data)
  //     .then(() => axios.get("/api/v1/order/get-pdf", { responseType: "blob" }))
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((err) => console.log(err));
  //   // axios
  //   //   .post("/api/v1/order/create-pdf", data)
  //   //   .then(() => axios.get("/api/v1/order/get-pdf", { responseType: "blob" }))
  //   //   .then((res) => {
  //   //     const pdfBlob = new Blob([res.data], { type: "application/pdf" });
  //   //     saveAs(pdfBlob, "newPdf.pdf");
  //   //     // const file = new File([res.data], "pp.pdf", {type: "text/plain;charset=utf-8"});
  //   //   })
  //   //   .catch((err) => console.log(err));
  // };

  return (
    <Fragment>
      {loading || !order || Object.keys(order).length === 0 ? (
        <LoaderSpinner text="Getting Order" />
      ) : (
        <div className="admin-ord-det">
          <div className="orders-container">
            <div className="order-package">
              <div className="order-package__info">
                <div className="order-header-box">
                  <span className="order-header-box-title">Data</span>
                  <span className="order-header-box-data">
                    {showDate(order.createdAt)}
                  </span>
                </div>
                <div className="order-header-box">
                  <span className="order-header-box-title">Name</span>
                  <span className="order-header-box-data">
                    {order.receiver}
                  </span>
                </div>
                <div className="order-header-box">
                  <span className="order-header-box-title">Quantity</span>
                  <span className="order-header-box-data">
                    {showTotalQtyOfOrder(order)}
                  </span>
                </div>
                <div className="order-header-box">
                  <span className="order-header-box-title">Total Price</span>
                  <span className="order-header-box-data">
                    {order.totalAmountText}
                  </span>
                </div>
                <span
                  className={`order-status ${
                    findLastStatus(order.orderStatus) === "ordered"
                      ? "pending"
                      : findLastStatus(order.orderStatus) === "packed"
                      ? "approved"
                      : "declined"
                  }`}
                >
                  {findLastStatus(order.orderStatus)}
                </span>
              </div>
              {order.items.length > 0 &&
                order.items.map((item, index) => (
                  <div className="order-package__content" key={index}>
                    <div className="img-name-box">
                      <img
                        src={item.productId.cardPicture}
                        alt="order"
                        className="img-name-box__image"
                      />
                      <span className="img-name-box__name">
                        {`${item.productId.name}.${
                          item.specific ? item.specific : ""
                        }`}
                      </span>
                    </div>
                    <span className="order-price">{`${item.purchasedQty} x ${item.payedPrice}`}</span>
                    <span className="order-seller">{item.shop}</span>
                    <span
                      className={`order-item-status ${
                        item.itemStatus === "pending"
                          ? "pending"
                          : item.itemStatus === "shipped"
                          ? "approved"
                          : "declined"
                      }`}
                    >
                      {item.itemStatus}
                    </span>
                  </div>
                ))}
            </div>
          </div>
          <div className="address-container ">
            <div className="address-content">
              <div className="coc-contact">
                <PersonOutlineRounded className="ucc-icon" />
                <span className="ucc-txt">{addressShow.name}</span>
              </div>
              <div className="coc-contact">
                <PhoneAndroidRounded className="ucc-icon" />
                <span className="ucc-txt">{addressShow.phoneNumber}</span>
              </div>
              <div className="coc-contact">
                <LocationOn className="ucc-icon" />
                <span className="ucc-txt">
                  {showAddressField(
                    addressShow.addressDetail,
                    addressShow.city,
                    addressShow.state,
                    addressShow.country
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="update-fields">
            <div className="update-box">
              <select
                name="status"
                id="status"
                value={
                  updateOrderState === ""
                    ? findLastStatus(order.orderStatus)
                    : updateOrderState
                }
                onChange={(e) => setUpdateOrderState(e.target.value)}
              >
                <option value="ordered">Ordered</option>
                <option value="packed">Packed</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
              <ButtonMat
                name="Update Status"
                icon={<LocalShippingOutlined />}
                onClick={() => handleUpdateStatus(updateOrderState)}
              />

              <Link to="/admin/order/bill" state={{ order, addressShow }}>
                Show Bill
              </Link>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AdminOrderDetail;
