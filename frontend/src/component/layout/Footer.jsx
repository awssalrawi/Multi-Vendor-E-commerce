import React, { Fragment } from 'react';
import './styles/footer.scss';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from '@material-ui/icons';
const Footer = () => {
  return (
    <Fragment>
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="footer-col">
              <h4>مواقع التواصل</h4>
              <div className="social-links">
                <Link to="#">
                  <Facebook className="fo-icon" />
                </Link>

                <Link to="#">
                  <Instagram className="fo-icon" />
                </Link>
              </div>
            </div>

            <div className="footer-col">
              <h4>تسوق الان</h4>
              <ul>
                <li>
                  <span className="soon-clas">قريبا</span>
                </li>
                <li>
                  {/* <a href="#">bag</a> */}
                  <span className="soon-clas">قريبا</span>
                </li>
                <li>
                  <Link to="#">أحذية</Link>
                </li>
                <li>
                  <Link to="#">ملابس</Link>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>مساعدة</h4>
              <ul>
                <li>
                  <a href="#">أسئلة متكرره</a>
                </li>
                <li>
                  <a href="#">تسوق</a>
                </li>
                <li>
                  <a href="#">اعادة طلب</a>
                </li>
                <li>
                  <a href="#">الطلبيات خاصتي</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>ألشركة</h4>
              <ul>
                <li>
                  <a href="#">من نحن</a>
                </li>
                <li>
                  <a href="#">خدماتنا</a>
                </li>
                <li>
                  <a href="#">السياسة والخصوصية</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
