import React, { Fragment } from "react";
import "./style/MyProfile.scss";
import { ReactComponent as CupIcon } from "./../../assests/cup.svg";
// import { ReactComponent as UploadPic } from "./../../assests/uploadPic.svg";
import InputField from "../utilis/InputField";
import CustomButton from "../utilis/CustomButton";

const MyProfile = () => {
  return (
    <Fragment>
      <div className="profile">
        <div className="profile__header">
          <div className="user-scroll">
            <span className="user-scroll__text">customer</span>
            <div className="cup-icon-style">
              <CupIcon className="cup-icon" />
            </div>
            <span className="user-scroll__text">Point: 78</span>
          </div>
        </div>
        <div className="profile__content">
          <div className="user-update">
            <figure className="profile-avatar">
              <img
                src="https://picsum.photos/200"
                alt="avatar"
                className="rounded-circle "
              />
              <input
                type="file"
                name="avatar"
                className="upload-input"
                id="customFile"
              />
              <label htmlFor="customFile">
                <i className="uil uil-image-plus upload-avatar-icon"></i>
              </label>
            </figure>
            <form action="#" className="name-update__form">
              <InputField name="name" placeholder="Name" type="text">
                <i className="uil uil-user input-icon"></i>
              </InputField>
            </form>
            <CustomButton
              type="submit"
              color="orange"
              style={{ marginTop: "20px" }}
            >
              Update Profile
            </CustomButton>

            <CustomButton
              type="submit"
              color="red"
              style={{ marginTop: "20px" }}
            >
              Change Password
            </CustomButton>
          </div>
          <div className="user-info">
            <div className="info__container">
              <p className="info-label">Name:</p>
              <p className="info-field">Aws Nafea</p>
            </div>
            <div className="info__container">
              <p className="info-label">Email:</p>
              <p className="info-field">awss.alrawi@gmail.com</p>
            </div>
            <div className="info__container">
              <p className="info-label">Joined at:</p>
              <p className="info-field">01.04.2022</p>
            </div>
            <div className="info__container">
              <p className="info-label">Active Coupon</p>
              <p className="info-field no-coupon">01.04.2022</p>
            </div>
            <div className="order-btn-large" id="order-btn-large">
              <CustomButton type="button" color="blue">
                My orders
              </CustomButton>
            </div>
          </div>
          {/* <div className="order-btn-phone" id="order-btn-phone">
            <CustomButton type="button" color="blue">
              My orders
            </CustomButton>
          </div> */}
        </div>
      </div>
    </Fragment>
  );
};

export default MyProfile;
