import React, { useState, useEffect } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { HighlightOff, Backup, TurnedInNot } from "@material-ui/icons";
import ButtonMat from "../../../utilities/button/ButtonMat";
import "./page-ads.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getAdsLogo,
  updateAdsLogo,
  clearErrors,
} from "../../../redux/actions/adminAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Page = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAdsLogo());
  }, []);

  const { data, error } = useSelector((state) => state.logoAds);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    dispatch(clearErrors());
  }, [error, dispatch]);

  const [adsPics, setAdsPics] = useState([]);
  const [adsPicsPreview, setAdsPicsPreview] = useState([]);

  const [logo, setLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState("");

  const handleDeleteAdsImage = (index) => {
    const img = adsPicsPreview.splice(index, 1);
    setAdsPicsPreview(adsPicsPreview.filter((val) => val !== img));
    const file = adsPics.splice(index, 1);
    setAdsPics(adsPics.filter((val) => val !== file));
  };
  const handleProductImages = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      //*We have to send files to multer
      setAdsPics((old) => [...old, file]);
      //* This reader is used for display images on the screen
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAdsPicsPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleCardImage = (e) => {
    setLogo(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setLogoPreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleDeleteImage = () => {
    setLogo("");
    setLogoPreview("");
  };

  const handleSubmitAdsLogo = (e) => {
    e.preventDefault();

    const formDate = new FormData();
    if (logo) {
      formDate.append("appLogo", logo);
    }
    //*
    if (adsPics.length > 0) {
      adsPics.forEach((image, i) => {
        formDate.append("adsPic", image);
      });
    }
    //*

    dispatch(updateAdsLogo(formDate));

    navigate(-1);
  };

  return (
    <form className="ads-logo-page" onSubmit={handleSubmitAdsLogo}>
      <div className="page-logo-con">
        <span className="page-logo-con__label">
          Logo height: 200 px width: 500 px
        </span>
        <img
          src={
            logoPreview
              ? logoPreview
              : "https://cdn1.iconfinder.com/data/icons/picture-sharing-sites-filled/32/No_Image-512.png"
          }
          alt="Product"
          style={{ width: "150px", height: "auto" }}
        />
        <HighlightOff
          className="page-logo-con__icon"
          style={{ display: `${logoPreview ? "block" : "none"}` }}
          onClick={() => handleDeleteImage()}
        />
        <input
          style={{ display: "none" }}
          type="file"
          accept="images/*"
          onChange={(e) => handleCardImage(e)}
          id="agp-cardImage"
        />
        <label
          htmlFor="agp-cardImage"
          className="page-logo-con__label"
          style={{ textAlign: "center" }}
        >
          <Backup fontSize="large" />
        </label>
        {data.appLogo && (
          <div className="page-logo-exist">
            <img
              src={data.appLogo}
              alt="logo"
              className="page-logo-exist__img"
            />
          </div>
        )}
      </div>

      <div className="ads-imgs">
        <span className="ads-imgs__label">
          Ads height: 480 px width: 1500 px
        </span>
        <div className="ads-imgs__items">
          <PhotoProvider>
            {adsPicsPreview.length > 0 ? (
              adsPicsPreview.map((item, index) => (
                <div key={index}>
                  <PhotoView src={item}>
                    <img
                      src={item}
                      style={{
                        objectFit: "cover",
                        width: "200px",
                        height: "auto",
                        maxHeight: "480px",
                        margin: "5px 0",
                      }}
                      alt="Product"
                    />
                  </PhotoView>

                  <HighlightOff onClick={() => handleDeleteAdsImage(index)} />
                </div>
              ))
            ) : (
              <div>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/picture-sharing-sites-filled/32/No_Image-512.png"
                  style={{ objectFit: "cover", width: "150px", height: "auto" }}
                  alt="Product"
                />
              </div>
            )}
          </PhotoProvider>
        </div>
        <input
          style={{ display: "none" }}
          type="file"
          //   className="content-container__input"
          accept="images/*"
          onChange={(e) => handleProductImages(e)}
          id="agp-product-pictures"
          multiple
        />
        <label htmlFor="agp-product-pictures" style={{ textAlign: "center" }}>
          <Backup fontSize="large" />
        </label>
      </div>
      <div className="page-ads-btn">
        <div className="ads-imgs__exist-ads">
          <PhotoProvider>
            {data?.adsPic?.length > 0
              ? data.adsPic.map((item, index) => (
                  <div key={index} style={{ margin: "2px 5px" }}>
                    <PhotoView src={item.img}>
                      <img
                        src={item.img}
                        style={{
                          objectFit: "cover",
                          width: "200px",
                          height: "auto",
                          maxHeight: "480px",
                          margin: "5px 0",
                        }}
                        alt="Product"
                      />
                    </PhotoView>
                  </div>
                ))
              : null}
          </PhotoProvider>
        </div>
        <ButtonMat
          icon={<TurnedInNot />}
          name="update"
          className="page-ads-submit"
          type="submit"
        />
      </div>
    </form>
  );
};

export default Page;
