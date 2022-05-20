import React, { Fragment } from 'react';
import './styles/sidebar.scss';
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  CategoryOutlined,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  function handleActive(i) {
    const elem = document.querySelectorAll('.page-side-link');
    elem.forEach((link, index) => {
      if (index === i && !link.classList.contains('activePage')) {
        link.classList.add('activePage');
      } else {
        link.classList.remove('activePage');
      }
    });
  }
  return (
    <Fragment>
      <div className="sidebar">
        <div className="sidebarWrapper">
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Dashboard</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <Link
                  to="/admin"
                  className="page-side-link"
                  onClick={() => handleActive(0)}
                >
                  <LineStyle className="sidebarIcon " />
                  Home
                </Link>
              </li>
              <li className="sidebarListItem">
                <Link
                  to="/admin/categories"
                  className="page-side-link"
                  onClick={() => handleActive(1)}
                >
                  <CategoryOutlined className="sidebarIcon" />
                  Categories
                </Link>
              </li>
              <li className="sidebarListItem">
                <Link
                  to="/admin/product"
                  className="page-side-link"
                  onClick={() => handleActive(2)}
                >
                  <TrendingUp className="sidebarIcon" />
                  Sales
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Quick Menu</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <Link
                  to="/admin/user-list"
                  className="page-side-link"
                  onClick={() => handleActive(3)}
                >
                  <PermIdentity className="sidebarIcon" />
                  Users
                </Link>
              </li>

              <li className="sidebarListItem">
                <Link
                  to="/admin/product"
                  className="page-side-link"
                  onClick={() => handleActive(4)}
                >
                  <Storefront className="sidebarIcon" />
                  Products
                </Link>
              </li>
              <li className="sidebarListItem">
                <Link
                  to="/admin/product"
                  className="page-side-link"
                  onClick={() => handleActive(5)}
                >
                  <AttachMoney className="sidebarIcon" />
                  Transactions
                </Link>
              </li>
              <li className="sidebarListItem">
                <Link
                  to="/admin/product"
                  className="page-side-link"
                  onClick={() => handleActive(6)}
                >
                  <BarChart className="sidebarIcon" />
                  Reports
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Notifications</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <Link
                  to="/admin/product"
                  className="page-side-link"
                  onClick={() => handleActive(7)}
                >
                  <MailOutline className="sidebarIcon" />
                  Mail
                </Link>
              </li>

              <li className="sidebarListItem">
                <Link
                  to="/admin/feedbacks"
                  className="page-side-link"
                  onClick={() => handleActive(8)}
                >
                  <DynamicFeed className="sidebarIcon" />
                  Feedback
                </Link>
              </li>

              <li className="sidebarListItem">
                <Link
                  to="/admin/viewproducts"
                  className="page-side-link "
                  onClick={() => handleActive(9)}
                >
                  <ChatBubbleOutline className="sidebarIcon" />
                  Admin-Products
                </Link>
              </li>
            </ul>
          </div>
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Staff</h3>
            <ul className="sidebarList">
              <li className="sidebarListItem">
                <Link
                  to="/admin/feedbacks"
                  className="page-side-link"
                  onClick={() => handleActive(10)}
                >
                  <WorkOutline className="sidebarIcon" />
                  Manage
                </Link>
              </li>
              <li className="sidebarListItem">
                <Link
                  to="/admin/product"
                  className="page-side-link"
                  onClick={() => handleActive(11)}
                >
                  <Timeline className="sidebarIcon" />
                  Analytics
                </Link>
              </li>
              <li className="sidebarListItem">
                <Link
                  to="/admin/product"
                  className="page-side-link"
                  onClick={() => handleActive(12)}
                >
                  <Report className="sidebarIcon" />
                  Reports
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Sidebar;
