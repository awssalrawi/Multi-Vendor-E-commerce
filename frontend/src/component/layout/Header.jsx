import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/header.scss';
import { ReactComponent as CartIcon } from './../../assests/shopping-cart.svg';
import { ReactComponent as ScoreIcon } from './../../assests/certificate.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/actions/userAction';
import PhoneFooterNav from './PhoneFooterNav';
//import { LOGOUT } from '../../redux/constants/userConstant';
//!add ne MenuItem
import {
  Box,
  Avatar,
  Menu,
  ListItemIcon,
  Divider,
  IconButton,
  Tooltip,
  MenuItem,
} from '@mui/material';
import {
  Settings,
  Logout,
  LocalMallOutlined,
  PersonOutlineOutlined,
} from '@mui/icons-material';

const Header = () => {
  const { loading, user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    // dispatch(userLoggedOut);

    dispatch(logout());
  };

  const splitName = (name) => {
    if (name.split(' ')?.length === 1) return name;
    return name.split(' ')[0];
  };
  //! new Menu Item
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      <div className="header header-phone">
        <Link to="/" className="link">
          <img src="./logo.png" alt="logo" className="logo" />
        </Link>
        <form action="#" className="search">
          <input
            type="text"
            className="search__input"
            placeholder="Search product"
          />
          <button className="search__button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
        <nav className="user-nav" id="user-nav">
          <Link className="user-nav__icon-box" to="/cart">
            <CartIcon className="cart-icon" />
            <span className="cart-notification">
              {cartItems && cartItems.length}
            </span>
          </Link>
          {!isAuthenticated || !user || loading ? (
            <Fragment>
              <Link to="/login" className="user-nav__login-shape">
                <img
                  src="./user.png"
                  alt="user avatar"
                  className="user-nav__user-photo"
                />
                <span className="user-nav__login-shape-button">Login</span>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <div className="user-nav__user">
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '12px',
                    // textAlign: 'left',
                    // justifyContent: 'left',
                    // flexDirection: 'column',
                  }}
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      // onMouseOver={handleClick}
                      size="small"
                      aria-controls={open ? 'account-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                    >
                      {user.picture ? (
                        <Fragment>
                          <img
                            src={`${user.picture}`}
                            alt="user avatar"
                            className="user-nav__user-photo"
                          />
                          <span className="user-nav__user-name">
                            {splitName(user.name)}
                          </span>
                        </Fragment>
                      ) : (
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  // open={open}
                  onClose={handleClose}
                  open={Boolean(anchorEl)}
                  MenuListProps={{ onMouseLeave: handleClose }}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '.MuiAvatar-root': {
                        display: 'flex',
                        flexDirection: 'column',
                      },
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
                        // transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        outline: 'none',
                      },
                    },
                  }}
                  transformOrigin={{
                    horizontal: 'right',
                    vertical: 'top',
                  }}
                  anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'bottom',
                  }}
                >
                  <MenuItem>
                    <Link className="link centered-flex" to="/me">
                      <ListItemIcon>
                        <PersonOutlineOutlined fontSize="small" />
                      </ListItemIcon>
                      My account
                    </Link>
                  </MenuItem>
                  {/* <Divider /> */}
                  <MenuItem>
                    <ListItemIcon>
                      <LocalMallOutlined fontSize="small" />
                    </ListItemIcon>
                    My Cart
                  </MenuItem>
                  {/* <Divider /> */}
                  <MenuItem>
                    <Link className="link centered-flex" to="/admin">
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Dashboard
                    </Link>
                  </MenuItem>
                  {/* <Divider /> */}
                  <MenuItem>
                    <Link
                      className="link centered-flex"
                      onClick={logoutHandler}
                      to="/"
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>{' '}
                      Logout
                    </Link>
                  </MenuItem>
                </Menu>
              </div>
              <div className="user-nav__scrol">
                <ScoreIcon className="user-nav__scrol__icon" />
                <span className="user-nav__scrol__value">point: 70</span>
              </div>
            </Fragment>
          )}
        </nav>
      </div>

      <PhoneFooterNav user={user} cartItems={cartItems} />
      {/* <nav className="phone-footer-nav" id="phone-footer-nav">
        <div className="phone-footer-nav__icon-box">
          <i className="fa-solid fa-house phone-footer-nav__icon"></i>
        </div>
        <div className="phone-footer-nav__icon-box">
          <i className="fa-solid fa-bars phone-footer-nav__icon"></i>
        </div>
        <div className="phone-footer-nav__icon-box">
          
          <i className="fa-brands fa-opencart phone-footer-nav__icon"></i>
          <span className="phone-footer-nav__notification">30</span>
        </div>
        <Link to="/login">login</Link>
        <div className="phone-footer-nav__icon-box">
          <i className="fa-regular fa-user phone-footer-nav__icon"></i>
        </div>

        <div className="phone-footer-nav__scrol">
          <i className="phone-footer-nav__scrol__icon fa-solid fa-trophy"></i>
          <span className="phone-footer-nav__scrol__level">Bronze</span>
        </div>
      </nav> */}
    </Fragment>
  );
};

export default Header;
