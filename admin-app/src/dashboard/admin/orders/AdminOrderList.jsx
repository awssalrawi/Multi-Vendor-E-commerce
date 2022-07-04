import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminGetOrders } from "../../../redux/actions/orderAction";
import DataList from "../../../utilities/datagrid/DataList";
import { Link } from "react-router-dom";
import { VisibilityOutlined } from "@material-ui/icons";
import LoaderSpinner from "../../../component/utilities/LoaderSpinner";
import { toast } from "react-toastify";
import { clearErrors, clearMessage } from "../../../redux/actions/orderAction";
const AdminOrderList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminGetOrders());
  }, []);

  const { orders, loading } = useSelector((state) => state.adminOrders);
  const { message, error } = useSelector((state) => state.adminOrderConfig);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, message, error]);
  const findLastStatus = (status) => {
    let last;
    status.forEach((state) => {
      if (state.isCompleted) {
        last = state.type;
      }
    });
    return last;
  };

  const orderShow = (orders) => {
    let ordersList = [];
    if (orders?.length > 0) {
      orders.map((order) =>
        ordersList.push({
          id: order._id,
          customer: order.user.name,
          email: order.user.email,
          price: order.totalAmountText,
          paymentStatus: order.paymentStatus,
          status: findLastStatus(order.orderStatus),
        })
      );
    }
    return ordersList;
  };

  const columns = [
    // { field: "id", headerName: "ID", width: "200" },
    {
      field: "customer",
      headerName: "Customer",
      width: "150",
    },
    {
      field: "email",
      headerName: "Email",
      width: "150",
    },
    {
      field: "price",
      headerName: "Price",
      width: "150",
    },
    {
      field: "paymentStatus",
      headerName: "Payment",
      width: "150",
    },
    {
      field: "status",
      headerName: "Status",
      width: "150",
    },

    // editable: true,

    {
      field: "action",
      headerName: "Action",
      width: "150",
      renderCell: (params) => (
        <div className="iconsDisplay">
          <Link to={`/admin/orders/${params.row.id}`} className="break-link">
            <VisibilityOutlined />
          </Link>
          {/* <div
            onClick={() => navigate(`/test/${params.row.id}`)}
            className="break-link"
          >
            <VisibilityOutlined />
          </div> */}
        </div>
      ),
    },
  ];

  return (
    <Fragment>
      {loading ? (
        <LoaderSpinner text="Wait..." />
      ) : (
        <DataList
          rowsData={orderShow(orders)}
          columns={columns}
          btn={false}
          title="My Orders"
          createBtnName="Create Product"
          //  createBtnLink={"/seller/create-prod"}
        />
      )}
    </Fragment>
  );
};

export default AdminOrderList;
