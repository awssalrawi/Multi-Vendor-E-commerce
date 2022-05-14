// import React from 'react';
// import './styles/admin-get-product.scss';
// import { Link } from 'react-router-dom';
// import { userData } from '../../../assests/sampleChartData';
// import Chart from './../pages/Chart';
// const AdminGetProduct = () => {
//   return (
//     <div className="adminProduct">
//       <div className="adminProduct__container">
//         <h1 className="adminProduct-title">Product</h1>
//         <Link to="admin/createproduct" className="link">
//           <button className="adminProduct-btn">Create</button>
//         </Link>
//       </div>
//       <div className="adminProduct__top">
//         <div className="adminProduct__top-left">
//           <Chart
//             title="Sales Performance"
//             data={userData}
//             dataKey="Active User"
//           />
//         </div>
//         <div className="adminProduct__top-right"></div>
//       </div>
//       <div className="adminProduct__bottom">

//       </div>
//     </div>
//   );
// };

// export default AdminGetProduct;
//! TRYING
import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Menu,
  ListItemIcon,
  Divider,
  IconButton,
  Typography,
  Tooltip,
  MenuItem,
} from '@mui/material';
import { PersonAdd, Settings, Logout } from '@mui/icons-material';

const AdminGetProduct = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="adminHeader">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography sx={{ minWidth: 100 }}>Contact</Typography>
        <Typography sx={{ minWidth: 100 }}>Profile</Typography>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
export default AdminGetProduct;
