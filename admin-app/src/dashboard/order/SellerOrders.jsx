import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DataList from "../../utilities/datagrid/DataList";
import { Link } from "react-router-dom";
import { VisibilityOutlined } from "@material-ui/icons";
import LoaderSpinner from "../../component/utilities/LoaderSpinner";
import { sellerOrders } from "../../redux/actions/orderAction";

const SellerOrders = () => {
  const dispatch = useDispatch();

  const { loading, orders } = useSelector((state) => state.shop);

  const orderShow = (orders) => {
    let ordersList = [];
    if (orders?.length > 0) {
      orders.map((order) =>
        ordersList.push({
          id: order._id,
          receiver: order.receiver,
          purchasedQty: order.purchasedQty,
          itemStatus: order.itemStatus,
          specific: order.specific ? order.specific : null,
          notification: order.notification,
        })
      );
    }
    return ordersList;
  };

  const columns = [
    // { field: "id", headerName: "ID", width: "200" },
    {
      field: "receiver",
      headerName: "receiver",
      width: "200",
    },
    {
      field: "purchasedQty",
      headerName: "Quantity",
      width: "200",
    },
    {
      field: "itemStatus",
      headerName: "Status",
      width: "200",
    },
    {
      field: "specific",
      headerName: "Specific",
      width: "200",
    },

    // editable: true,

    {
      field: "action",
      headerName: "Action",
      width: "200",
      renderCell: (params) => (
        <div className="iconsDisplay">
          <Link to={`/seller-orders/${params.row.id}`} className="break-link">
            <VisibilityOutlined
              style={{
                color: params.row.notification ? "blue" : "green",
              }}
            />
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

  useEffect(() => {
    dispatch(sellerOrders());
  }, [dispatch]);
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

export default SellerOrders;
