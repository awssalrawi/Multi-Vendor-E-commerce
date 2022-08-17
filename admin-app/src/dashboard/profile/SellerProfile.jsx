import React, { Fragment, useState } from "react";
import "./styles/seller-profile.scss";
// import { Link, useNavigate } from "react-router-dom";
import { Publish } from "@material-ui/icons";
import LoaderSpinner from "../../utilities/LoaderSpinner/LoaderSpinner";
import { useSelector, useDispatch } from "react-redux";
import ButtonMat from "../../utilities/button/ButtonMat";
import {
  updateSellerShop,
  sellerGetInfo,
} from "../../redux/actions/orderAction";
import { useTranslation } from "react-i18next";
import PageTitle from "../utilities/PageTitle";
const SellerProfile = () => {
  const { t } = useTranslation();
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { shop, loading } = useSelector((state) => state.shop);

  const [shopDescription, setShopDescription] = useState(
    shop?.description ? shop.description : ""
  );
  const [shopImage, setShopImage] = useState("");
  const [shopImagePreview, setShopImagePreview] = useState("");
  const [storeName, setStoreName] = useState("");

  const handleCardImage = (e) => {
    setShopImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setShopImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubmitUpdateShop = (e) => {
    e.preventDefault();
    if (!shopDescription && !shopImage) return;
    const form = new FormData();
    if (shopDescription) form.append("description", shopDescription);
    if (shopImage) form.append("shopImage", shopImage);
    if (storeName) form.append("name", storeName);

    console.log("Store name", storeName);
    dispatch(updateSellerShop(form));
    dispatch(sellerGetInfo());
  };
  return (
    <Fragment>
      <PageTitle title="My Shop" />
      {loading ? (
        <LoaderSpinner text="Getting Shop Data" />
      ) : (
        <div className="seller-profile">
          <div className="my-prof">
            <div className="current-info">
              <div className="current-info__userShow">
                <div className="prof-top">
                  <img
                    src={
                      shop && Object.keys(shop).length > 0 && shop.shopImage
                        ? shop.shopImage
                        : ""
                    }
                    alt="Header"
                    className="curr-img"
                  />
                </div>
                <div className="userShow-bottom">
                  <span className="userShow-bottom__title">
                    {t("Shop_Details")}
                  </span>
                  <div className="userShow-bottom__info">
                    <span className="userShow-bottom__info-header">
                      {t("Name")}
                    </span>
                    <span className="userShow-bottom__info-other">
                      {shop && Object.keys(shop).length > 0 && shop.owner.name}
                    </span>
                  </div>
                  <div className="userShow-bottom__info">
                    <span className="userShow-bottom__info-header">
                      {t("Email")}
                    </span>
                    <span className="userShow-bottom__info-other">
                      {shop && Object.keys(shop).length > 0 && shop.owner.email}
                    </span>
                  </div>
                  <div className="userShow-bottom__info">
                    <span className="userShow-bottom__info-header">
                      {t("Store_Name")}
                    </span>
                    <span className="userShow-bottom__info-other">
                      {shop && Object.keys(shop).length > 0 && shop.name}
                    </span>
                  </div>
                  <div className="userShow-bottom__info">
                    <span className="userShow-bottom__info-header">
                      {t("Description")}
                    </span>
                    <span className="userShow-bottom__info-other">
                      {shop && Object.keys(shop).length > 0 && shop.description}
                    </span>
                  </div>
                </div>
              </div>
              <div className="current-info__userUpdate">
                <span className="current-info__userUpdate-title">
                  {t("Edit")}
                </span>
                <form
                  action="#"
                  className="userForm"
                  onSubmit={handleSubmitUpdateShop}
                >
                  <div className="userForm__left">
                    <div className="userForm__right">
                      <div className="userForm__left-field">
                        <label htmlFor="">{t("Store_Name")}</label>
                        <input
                          type="text"
                          className="userUpdate-input"
                          placeholder={t("Store_Name")}
                          onChange={(e) => setStoreName(e.target.value)}
                          disabled={shop.name !== "noName"}
                          style={{ marginBottom: "10px" }}
                        ></input>
                      </div>
                      <div className="userUpdate-upload">
                        <img
                          src={
                            shopImagePreview ? shopImagePreview : shop.shopImage
                          }
                          alt="User"
                          className="userUpdate-upload-img"
                        />
                        <label htmlFor="file">
                          <Publish className="userUpdate-upload-icon" />
                        </label>
                        <input
                          type="file"
                          id="file"
                          style={{ display: "none" }}
                          onChange={(e) => handleCardImage(e)}
                        />
                      </div>
                    </div>
                    <div className="userForm__left-field">
                      <label htmlFor="discp-store">{t("Description")}</label>
                      <textarea
                        id="discp-store"
                        type="text"
                        className="userUpdate-input"
                        placeholder={shop.description}
                        cols="30"
                        rows="10"
                        onChange={(e) => setShopDescription(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                  <ButtonMat
                    name={t("Update_Profile")}
                    icon={<Publish />}
                    style={{ marginTop: "30px" }}
                    type="submit"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default SellerProfile;
