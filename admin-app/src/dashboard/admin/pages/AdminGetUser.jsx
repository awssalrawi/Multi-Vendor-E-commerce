import React, { useState } from "react";
import "./styles/admin-get-user.scss";
import {
  PermIdentity,
  CalendarToday,
  Face,
  LocationOn,
  MailOutline,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../redux/actions/adminAction";
const AdminGetUser = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const user = location.state;

  const showDate = (date) => {
    return new Date(date).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const obj = {};

    if (name) obj.name = name;
    if (email) obj.email = email;
    if (role) obj.role = role;

    if (Object.keys(obj).length > 0) {
      dispatch(updateUser(user.id, obj));

      navigate(-1);
    }
    console.log(obj);
  };
  return (
    <div className="admin-getuser">
      <div className="admin-user">
        <h3 className="admin-user__title">User Info</h3>
        <Link to="/admin/admincreateuser">
          <button className="admin-user__btn">Create</button>
        </Link>
      </div>
      {Object.keys(user).length > 0 && (
        <div className="currentUser">
          <div className="currentUser__userShow">
            <div className="userShow-top">
              {/* <img
            src="https://picsum.photos/140"
            alt="User"
            className="currentUserImage"
          /> */}
              {/* <div className="userShow-top__title">
                <span className="currentUser-username">{user.name}</span>
                <span className="currentUser-jobTitle">
              Electronic engineering
            </span>
              </div> */}
            </div>
            <div className="userShow-bottom">
              <span className="userShow-bottom__title">Account Details</span>
              <div className="userShow-bottom__info">
                <PermIdentity className="userShow-bottom__info-icon" />
                <span className="userShow-bottom__info-other">{user.name}</span>
              </div>
              <div className="userShow-bottom__info">
                <CalendarToday className="userShow-bottom__info-icon" />
                <span className="userShow-bottom__info-other">
                  {showDate(user.createdAt)}
                </span>
              </div>
              <div className="userShow-bottom__info">
                <Face className="userShow-bottom__info-icon" />
                <span className="userShow-bottom__info-other">{user.role}</span>
              </div>
              <span className="userShow-bottom__title">Contact Details</span>
              {/* <div className="userShow-bottom__info">
                <PhoneAndroid className="userShow-bottom__info-icon" />
                <span className="userShow-bottom__info-other">+5538589198</span>
              </div> */}
              <div className="userShow-bottom__info">
                <MailOutline className="userShow-bottom__info-icon" />
                <span className="userShow-bottom__info-other">
                  {user.email}
                </span>
              </div>
              {/* <div className="userShow-bottom__info">
                <LocationOn className="userShow-bottom__info-icon" />
                <span className="userShow-bottom__info-other">
                  Çiftlik Mah. 100.yil Blv 225/5 ilkadim samsun zil mehmet büyük
                </span>
              </div> */}
            </div>
          </div>
          <div className="currentUser__userUpdate">
            <span className="currentUser__userUpdate-title">Edit</span>
            <form action="#" className="userForm" onSubmit={handleUpdateUser}>
              <div className="userForm__left">
                <div className="userForm__left-field">
                  <label htmlFor="user-name">User Name</label>
                  <input
                    id="user-name"
                    type="text"
                    className="userUpdate-input"
                    placeholder={user.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="userForm__left-field">
                  <label htmlFor="user-email">Email</label>
                  <input
                    id="user-email"
                    type="email"
                    className="userUpdate-input"
                    placeholder={user.email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="userForm__left-field">
                  <label htmlFor="user-role">Role</label>

                  <select
                    name="rold"
                    id="user-role"
                    className="userUpdate-input"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    <option value="subscriber">Subscriber</option>
                    <option value="seller">Seller</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button className="userUpdate-btn" type="submit">
                    Update
                  </button>
                </div>
                {/* <div className="userForm__left-field">
                  <label htmlFor="">Address</label>
                  <textarea
                    type="text"
                    className="userUpdate-input"
                    placeholder="Çiftlik Mah. 100.yil Blv 225/5 ilkadim samsun zil mehmet büyük"
                  ></textarea>
                </div> */}
              </div>
              {/* <div className="userForm__right">
                <div className="userUpdate-upload">
                  <img
                    src="https://picsum.photos/164"
                    alt="User"
                    className="userUpdate-upload-img"
                  />
                  <label htmlFor="file">
                    <Publish className="userUpdate-upload-icon" />
                  </label>
                  <input type="file" id="file" style={{ display: "none" }} />
                </div>
              </div> */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGetUser;
