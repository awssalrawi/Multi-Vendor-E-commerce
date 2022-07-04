import React from "react";
import { DataGrid } from "@material-ui/data-grid";

import { Link, useNavigate } from "react-router-dom";
import "./data-list.scss";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "&.MuiDataGrid-root .MuiDataGrid-cell:focus": {
      outline: "none",
    },
  },
});
//!Trying Making it responsive
// import { useTheme } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';

//!Trying Making it responsive

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

// const { products } = useSelector((state) => state.productsManagement);
const DataList = ({
  columns,
  rowsData,
  title,
  btn,
  createBtnName,
  createBtnLink,
}) => {
  const classes = useStyles();

  const navigate = useNavigate();
  //*row
  //   const productShow = (products) => {
  //     let productRowList = [];
  //     if (products?.length > 0) {
  //       products.map((product) =>
  //         productRowList.push({
  //           id: product._id,
  //           name: product.name,
  //           image: product.cardPicture,
  //           price: product.price,
  //           quantity: product.quantity,
  //           shop: product.shop.charAt(0).toUpperCase() + product.shop.slice(1),
  //           ProdDetails: product,
  //         })
  //       );
  //     }
  //     return productRowList;
  //   };

  //!Trying Making it responsive
  // const thame = useTheme();
  // console.log(thame);
  // const isMatch = useMediaQuery('960px');
  // console.log(isMatch);
  // const MyWidth = isMatch ? 100 : 200;
  //!Trying Making it responsive

  //   const columns = [
  //     { field: 'id', headerName: 'ID', width: '100' },
  //     {
  //       field: 'name',
  //       headerName: 'Product',
  //       width: 200,
  //       renderCell: (params) => (
  //         <div className="productListImg">
  //           <img
  //             src={params.row.image}
  //             alt="Product"
  //             className="productListImg-img"
  //           />
  //           {params.row.name}
  //         </div>
  //       ),

  //       // editable: true,
  //     },
  //     {
  //       field: 'shop',
  //       headerName: 'Stock',
  //       width: 250,
  //       //  editable: true,
  //     },
  //     {
  //       field: 'quantity',
  //       headerName: 'Quantity',
  //       //type: 'number',
  //       width: 120,
  //       //  editable: true,
  //     },
  //     {
  //       field: 'price',
  //       headerName: 'Price',
  //       description: 'This column has a value getter and is not sortable.',
  //       sortable: false,
  //       width: 160,
  //     },
  //     {
  //       field: 'action',
  //       headerName: 'Action',
  //       width: 80,
  //       renderCell: (params) => (
  //         <div className="iconsDisplay">
  //           <Link
  //             to={`/admin/product/${params.row.id}`}
  //             className="break-link"
  //             state={params.row.ProdDetails}
  //           >
  //             <Settings className="productEdit-icon" />
  //             <DeleteOutline className="productDelete-icon" />
  //           </Link>
  //           {/* <DeleteOutline
  //             className="productDelete-icon"
  //             onClick={() => handleDelete(params.row.id)}
  //           /> */}
  //         </div>
  //       ),
  //     },
  //   ];

  //   const handleDelete = (id) => {
  //     setData(data.filter((item) => item.id !== id));
  //   };
  return (
    <div className="adminproduct-table">
      <div className="adminProdTitleAndBtn">
        <h4 className="adminProdTitleAndBtn__title">{title}</h4>
        {btn && (
          <button
            className="adminProdTitleAndBtn__btn"
            onClick={() => navigate(`${createBtnLink}`)}
          >
            {createBtnName}
          </button>
        )}
      </div>
      <DataGrid
        className={classes.root}
        rows={rowsData}
        columns={columns}
        pageSize={25}
        // checkboxSelection
        disableColumnSelector={true}
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </div>
  );
};
export default DataList;
