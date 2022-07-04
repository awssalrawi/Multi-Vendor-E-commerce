import React from 'react';
import './styles/admin-get-user.scss';
import {
  PermIdentity,
  CalendarToday,
  Face,
  LocationOn,
  MailOutline,
  PhoneAndroid,
  Publish,
} from '@material-ui/icons';
import { Link } from 'react-router-dom';
const AdminGetUser = () => {
  return (
    <div className="admin-getuser">
      <div className="admin-user">
        <ha className="admin-user__title">User Info</ha>
        <Link to="/admin/admincreateuser">
          <button className="admin-user__btn">Create</button>
        </Link>
      </div>
      <div className="currentUser">
        <div className="currentUser__userShow">
          <div className="userShow-top">
            <img
              src="https://picsum.photos/140"
              alt="User"
              className="currentUserImage"
            />
            <div className="userShow-top__title">
              <span className="currentUser-username">Aws Nafea</span>
              <span className="currentUser-jobTitle">
                Electronic engineering
              </span>
            </div>
          </div>
          <div className="userShow-bottom">
            <span className="userShow-bottom__title">Account Details</span>
            <div className="userShow-bottom__info">
              <PermIdentity className="userShow-bottom__info-icon" />
              <span className="userShow-bottom__info-other">Awss Alrawi</span>
            </div>
            <div className="userShow-bottom__info">
              <CalendarToday className="userShow-bottom__info-icon" />
              <span className="userShow-bottom__info-other">10.12.1995</span>
            </div>
            <div className="userShow-bottom__info">
              <Face className="userShow-bottom__info-icon" />
              <span className="userShow-bottom__info-other">Seller</span>
            </div>
            <span className="userShow-bottom__title">Contact Details</span>
            <div className="userShow-bottom__info">
              <PhoneAndroid className="userShow-bottom__info-icon" />
              <span className="userShow-bottom__info-other">+5538589198</span>
            </div>
            <div className="userShow-bottom__info">
              <MailOutline className="userShow-bottom__info-icon" />
              <span className="userShow-bottom__info-other">
                awss.alrawi@gmail.com
              </span>
            </div>
            <div className="userShow-bottom__info">
              <LocationOn className="userShow-bottom__info-icon" />
              <span className="userShow-bottom__info-other">
                Çiftlik Mah. 100.yil Blv 225/5 ilkadim samsun zil mehmet büyük
              </span>
            </div>
          </div>
        </div>
        <div className="currentUser__userUpdate">
          <span className="currentUser__userUpdate-title">Edit</span>
          <form action="#" className="userForm">
            <div className="userForm__left">
              <div className="userForm__left-field">
                <label htmlFor="">User Name</label>
                <input
                  type="text"
                  className="userUpdate-input"
                  placeholder="Awss Alrawi"
                />
              </div>
              <div className="userForm__left-field">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  className="userUpdate-input"
                  placeholder="awss.alrawi@gmail.com"
                />
              </div>
              <div className="userForm__left-field">
                <label htmlFor="">Phone Number</label>
                <input
                  type="text"
                  className="userUpdate-input"
                  placeholder="+5538589198"
                />
              </div>
              <div className="userForm__left-field">
                <label htmlFor="">Address</label>
                <textarea
                  type="text"
                  className="userUpdate-input"
                  placeholder="Çiftlik Mah. 100.yil Blv 225/5 ilkadim samsun zil mehmet büyük"
                ></textarea>
              </div>
            </div>
            <div className="userForm__right">
              <div className="userUpdate-upload">
                <img
                  src="https://picsum.photos/164"
                  alt="User"
                  className="userUpdate-upload-img"
                />
                <label htmlFor="file">
                  <Publish className="userUpdate-upload-icon" />
                </label>
                <input type="file" id="file" style={{ display: 'none' }} />
              </div>
              <button className="userUpdate-btn">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminGetUser;
