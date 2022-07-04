import React, { useEffect } from "react";
import DataList from "../../utilities/datagrid/DataList";
import { Settings, DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerProducts,
  clearErrors,
  clearMessage,
} from "../../redux/actions/productAction";
import LoaderSpinner from "../../component/utilities/LoaderSpinner";
import { toast } from "react-toastify";
import { Fragment } from "react";
const SellerProducts = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSellerProducts());
  }, []);

  const { products, error, message, loading } = useSelector(
    (state) => state.sellerProduct
  );
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch]);

  const productShow = (products) => {
    let productRowList = [];
    if (products?.length > 0) {
      products.map((product) =>
        productRowList.push({
          id: product._id,
          name: product.name,
          image: product.cardPicture,
          price: product.price,
          quantity: product.quantity,
          ProdDetails: product,
        })
      );
    }
    return productRowList;
  };

  const productRows = [
    {
      id: 1,
      name: " Apple Airbord",
      image: "https://picsum.photos/201",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
    {
      id: 2,
      name: " Apple Airbord",
      image: "https://picsum.photos/201",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
    {
      id: 3,
      name: " Jon axios",
      image: "https://picsum.photos/203",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
    {
      id: 4,
      name: " aws nafea",
      image: "https://picsum.photos/204",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
    {
      id: 5,
      name: " mike jakson",
      image: "https://picsum.photos/190",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
    {
      id: 6,
      name: " Jon swwq",
      image: "https://picsum.photos/191",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
    {
      id: 7,
      name: " Apple Airbord",
      image: "https://picsum.photos/192",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
    {
      id: 8,
      name: " Apple Airbord",
      image: "https://picsum.photos/193",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
    {
      id: 9,
      name: " Apple Airbord",
      image: "https://picsum.photos/194",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
    {
      id: 10,
      name: " Apple Airbord",
      image: "https://picsum.photos/195",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
    {
      id: 11,
      name: " Apple Airbord",
      image: "https://picsum.photos/196",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
    {
      id: 12,
      name: " Apple Airbord",
      image: "https://picsum.photos/197",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
    {
      id: 13,
      name: " Apple Airbord",
      image: "https://picsum.photos/198",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
    {
      id: 14,
      name: " Apple Airbord",
      image: "https://picsum.photos/201",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
    {
      id: 15,
      name: " Apple Airbord",
      image: "https://picsum.photos/201",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
    {
      id: 16,
      name: " Apple Airbord",
      image: "https://picsum.photos/201",
      stock: "Electro-White",
      status: "active",
      price: "$120.5",
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: "100" },
    {
      field: "name",
      headerName: "Product",
      width: 200,
      renderCell: (params) => (
        <div className="productListImg">
          <img
            src={params.row.image}
            alt="Product"
            className="productListImg-img"
          />
          {params.row.name}
        </div>
      ),

      // editable: true,
    },

    {
      field: "quantity",
      headerName: "Quantity",
      //type: 'number',
      width: 120,
      //  editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (params) => (
        <div className="iconsDisplay">
          <Link
            to={`/seller-products/${params.row.id}`}
            className="break-link"
            state={params.row.ProdDetails}
          >
            <Settings className="productEdit-icon" />
            <DeleteOutline className="productDelete-icon" />
          </Link>
          {/* <DeleteOutline
                    className="productDelete-icon"
                    onClick={() => handleDelete(params.row.id)}
                  /> */}
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
          rowsData={productShow(products)}
          columns={columns}
          title="My Products"
          btn={true}
          createBtnName="Create Product"
          createBtnLink={"/seller/create-prod"}
        />
      )}
    </Fragment>
  );
};

export default SellerProducts;
