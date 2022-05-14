import React, { Fragment, useState } from 'react';
import './styles/user-list.scss';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline, Settings } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const rows = [
  {
    id: 1,
    username: ' Jon Snow',
    avatar: 'https://picsum.photos/201',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
  {
    id: 2,
    username: ' nas Snow',
    avatar: 'https://picsum.photos/201',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
  {
    id: 3,
    username: ' Jon axios',
    avatar: 'https://picsum.photos/203',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
  {
    id: 4,
    username: ' aws nafea',
    avatar: 'https://picsum.photos/204',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
  {
    id: 5,
    username: ' mike jakson',
    avatar: 'https://picsum.photos/190',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
  {
    id: 6,
    username: ' Jon swwq',
    avatar: 'https://picsum.photos/191',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
  {
    id: 7,
    username: ' Jon Snow',
    avatar: 'https://picsum.photos/192',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
  {
    id: 8,
    username: ' Jon Snow',
    avatar: 'https://picsum.photos/193',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
  {
    id: 9,
    username: ' Jon Snow',
    avatar: 'https://picsum.photos/194',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
  {
    id: 10,
    username: ' Jon Snow',
    avatar: 'https://picsum.photos/195',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
  {
    id: 11,
    username: ' Jon Snow',
    avatar: 'https://picsum.photos/196',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
  {
    id: 12,
    username: ' Jon Snow',
    avatar: 'https://picsum.photos/197',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
  {
    id: 13,
    username: ' Jon Snow',
    avatar: 'https://picsum.photos/198',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
  {
    id: 14,
    username: ' Jon Snow',
    avatar: 'https://picsum.photos/201',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
  {
    id: 15,
    username: ' Jon Snow',
    avatar: 'https://picsum.photos/201',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
  {
    id: 16,
    username: ' Jon Snow',
    avatar: 'https://picsum.photos/201',
    email: 'awss.alrawi@gmail.com',
    status: 'active',
    transactions: '$120.5',
  },
];
const UserList = () => {
  const [data, setData] = useState(rows); //*For delete

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'user',
      headerName: 'User',
      width: 200,
      renderCell: (params) => (
        <div className="gridtable__user">
          <img
            src={params.row.avatar}
            alt="avatar"
            className="gridtable__user-img"
          />
          {params.row.username}
        </div>
      ),

      // editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
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
      field: 'transactions',
      headerName: 'Transaction',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 70,
      renderCell: (params) => (
        <Fragment>
          <Link to={`/admin/user-list/${params.row.id}`}>
            <Settings className="gridtable__edit" />
          </Link>
          <DeleteOutline
            className="gridtable__delete"
            onClick={() => handleDelete(params.row.id)}
          />
        </Fragment>
      ),
    },
  ];
  return (
    <div className="user-list">
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

export default UserList;
