import React, { Fragment, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline, Settings } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import './styles/admin-products-list.scss';
//!Trying Making it responsive
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

//!Trying Making it responsive

const productRows = [
  {
    id: 1,
    name: ' Apple Airbord',
    image: 'https://picsum.photos/201',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
  {
    id: 2,
    name: ' Apple Airbord',
    image: 'https://picsum.photos/201',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
  {
    id: 3,
    name: ' Jon axios',
    image: 'https://picsum.photos/203',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
  {
    id: 4,
    name: ' aws nafea',
    image: 'https://picsum.photos/204',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
  {
    id: 5,
    name: ' mike jakson',
    image: 'https://picsum.photos/190',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
  {
    id: 6,
    name: ' Jon swwq',
    image: 'https://picsum.photos/191',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
  {
    id: 7,
    name: ' Apple Airbord',
    image: 'https://picsum.photos/192',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
  {
    id: 8,
    name: ' Apple Airbord',
    image: 'https://picsum.photos/193',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
  {
    id: 9,
    name: ' Apple Airbord',
    image: 'https://picsum.photos/194',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
  {
    id: 10,
    name: ' Apple Airbord',
    image: 'https://picsum.photos/195',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
  {
    id: 11,
    name: ' Apple Airbord',
    image: 'https://picsum.photos/196',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
  {
    id: 12,
    name: ' Apple Airbord',
    image: 'https://picsum.photos/197',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
  {
    id: 13,
    name: ' Apple Airbord',
    image: 'https://picsum.photos/198',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
  {
    id: 14,
    name: ' Apple Airbord',
    image: 'https://picsum.photos/201',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
  {
    id: 15,
    name: ' Apple Airbord',
    image: 'https://picsum.photos/201',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
  {
    id: 16,
    name: ' Apple Airbord',
    image: 'https://picsum.photos/201',
    stock: 'Electro-White',
    status: 'active',
    price: '$120.5',
  },
];
const AdminProductList = () => {
  //!Trying Making it responsive
  const thame = useTheme();
  console.log(thame);
  const isMatch = useMediaQuery('960px');
  console.log(isMatch);
  const MyWidth = isMatch ? 100 : 200;
  //!Trying Making it responsive

  const [data, setData] = useState(productRows);
  const columns = [
    { field: 'id', headerName: 'ID', width: '100' },
    {
      field: 'name',
      headerName: 'Product',
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
      field: 'stock',
      headerName: 'Stock',
      width: 250,
      //  editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      //type: 'number',
      width: 120,
      //  editable: true,
    },
    {
      field: 'price',
      headerName: 'Price',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 70,
      renderCell: (params) => (
        <div className="iconsDisplay">
          <Link to={`/admin/product/${params.row.id}`} className="break-link">
            <Settings className="productEdit-icon" />
          </Link>
          <DeleteOutline
            className="productDelete-icon"
            onClick={() => handleDelete(params.row.id)}
          />
        </div>
      ),
    },
  ];

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  return (
    <div className="adminproduct-table">
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        rowsPerPageOptions={[10, 25, 50, 100]}
      />
    </div>
  );
};
export default AdminProductList;
