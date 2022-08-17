import React, { useState, Fragment } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
//import './styles/admin-get-product.scss';
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { ArrowBack, Backup, HighlightOff } from "@material-ui/icons";
import { toast } from "react-toastify";
import { IconButton } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import {
  adminDeleteProductById,
  adminUpdateProductById,
} from "../../../redux/actions/productAction";
import { useDispatch } from "react-redux";
//*imported from product details
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
//*imported from product details
import { useTranslation } from "react-i18next";
//*agp for this function
const AdminGetProduct = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  //*Declare variables
  const [cardImage, setCardImage] = useState("");
  const [cardImagePreview, setCardImagePreview] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [specifications, setSpecifications] = useState("");
  const [priceAfterDiscount, setPriceAfterDiscount] = useState("");
  const [availableSpecific, setAvailableSpecific] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productPicturesPreview, setProductPicturesPreview] = useState([]);
  const [productDetailPictures, setProductDetailPictures] = useState([]);
  const [productDetailPicturesPreview, setProductDetailPicturesPreview] =
    useState([]);
  const [subProducts, setSubProducts] = useState({
    subName: "",
    model: [{ name: "", subNumInStock: 0, subPrice: price }],
  });

  const [checkLocationInIraq, setCheckLocationInIraq] = useState(false);
  const [checkLocationInTurkey, setCheckLocationInTurkey] = useState(true);
  const [prodSpecific, setProdSpecific] = useState([{ specific: "" }]);
  //*Declare variables

  //*functions for update

  const handleCardImage = (e) => {
    setCardImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setCardImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleDeleteImageformProductImages = (index) => {
    const img = productPicturesPreview.splice(index, 1);
    setProductPicturesPreview(
      productPicturesPreview.filter((val) => val !== img)
    );
    const file = productPictures.splice(index, 1);
    setProductPictures(productPictures.filter((val) => val !== file));

    console.log(productPictures);
  };

  const handleDeleteImagefromDetailsPictures = (index) => {
    const file = productDetailPictures.splice(index, 1);

    setProductDetailPictures(
      productDetailPictures.filter((val) => val !== file)
    );
    const img = productDetailPicturesPreview.splice(index, 1);
    setProductDetailPicturesPreview(
      productDetailPicturesPreview.filter((val) => val !== img)
    );
  };
  const handleDeleteImage = () => {
    setCardImage("");
    setCardImagePreview("");
  };
  const handleProductImages = (e) => {
    const files = Array.from(e.target.files);
    console.log(files);
    files.forEach((file) => {
      //*We have to send files to multer
      setProductPictures((old) => [...old, file]);
      //* This reader is used for display images on the screen
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductPicturesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const handleDetailsImages = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      setProductDetailPictures((oldArray) => [...oldArray, file]);
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setProductDetailPicturesPreview((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  //*functions for update
  const TextDetail = ({ header, content }) => (
    <div className="content-container__textBox">
      <span className="content-container__textBox-header">{`${header}`}</span>
      <span className="content-container__textBox-content">{content}</span>
    </div>
  );
  const product = location.state;

  //*Submit update function
  const submitUpdateProduct = () => {
    const form = new FormData();

    if (cardImage !== "") form.append("cardPicture", cardImage);
    if (name) form.append("name", name);
    if (price) form.append("price", price);
    if (quantity && quantity > 0) form.append("quantity", quantity);
    if (description) form.append("description", description);
    if (specifications) form.append("specification", specifications);
    if (availableSpecific) form.append("availableSpecific", availableSpecific);
    if (priceAfterDiscount) {
      if (
        (!price && priceAfterDiscount > product.price) ||
        (price && priceAfterDiscount > price)
      ) {
        return toast.error(
          "Discount price Cannot be bigger then previous price"
        );
      }

      form.append("priceAfterDiscount", priceAfterDiscount);
    }

    if (productPictures.length > 0) {
      if (productPictures.length < 3)
        return toast.error("Product pictures must be at least 3 images");

      productPictures.forEach((image) => {
        form.append("productPictures", image);
      });
    }

    if (productDetailPictures.length > 0) {
      productDetailPictures.forEach((image) => {
        form.append("detailsPictures", image);
      });
    }

    //*Continuo
    const pr = dispatch(adminUpdateProductById(params.productId, form));

    toast
      .promise(pr, {
        loading: "Loading",
        success: "Product Updated successfully",
        error: "Error happened",
      })
      .then(() => navigate("/admin/product"));
  };

  const submitDeleteProduct = () => {
    console.log(params);
    const promise = dispatch(adminDeleteProductById(params.productId));

    toast
      .promise(promise, {
        loading: "Loading",
        success: "Product Deleted successfully",
        error: "Error happened",
      })
      .then(() => navigate("/admin/product"));
  };

  //*Sub Product
  const handleSubProductName = (e) => {
    const values = { ...subProducts };
    values.subName = e.target.value;
    setSubProducts(values);
  };
  const handleModelChangeName = (i, e) => {
    const values = { ...subProducts };
    values.model[i].name = e.target.value;
    setSubProducts(values);
  };
  const handleModelChangeNumStok = (i, e) => {
    const values = { ...subProducts };
    values.model[i].subNumInStock = e.target.value;
    setSubProducts(values);
  };
  const handleModelChangeSubPrice = (i, e) => {
    const values = { ...subProducts };
    values.model[i].subPrice = e.target.value;
    setSubProducts(values);
  };

  const handleAddNewModelInSubProduct = (subProducts) => {
    subProducts.model = [
      ...subProducts.model,
      { name: "", subNumInStock: "", subPrice: price },
    ];

    setSubProducts({ ...subProducts });
  };
  const handleRemoveNewModelInSubProduct = (subProducts, subindex) => {
    const removedModel = subProducts.model.splice(subindex, 1);
    const newMod = subProducts.model.filter((obj) => obj !== removedModel);

    const update = {};
    update.subName = subProducts.subName;
    update.model = newMod;

    setSubProducts(update);
  };

  //*Sub Product
  //*Sub Product
  //*Specific fields
  const handleAddNewSpecificField = (specifics) => {
    specifics = [...specifics, { specific: "" }];

    setProdSpecific([...specifics]);
  };

  const handleSetSpecificField = (i, e) => {
    const arr = [...prodSpecific];
    arr[i].specific = e.target.value;
    setProdSpecific(arr);
  };

  const handleRemoveSpecificField = (field, i) => {
    const newArr = prodSpecific.filter((obj) => obj !== field);
    setProdSpecific(newArr);
  };
  //*Specific fields

  return (
    <Fragment>
      <ArrowBack onClick={() => navigate(-1)} />
      <div className="agp-body">
        <div className="agp-exists">
          <span className="agp-exists__header">{t("Product_overview")}</span>
          <div className="content-container">
            <img
              src={product.cardPicture}
              alt="Product"
              className="content-container__cardImage"
            />
          </div>
          <div className="content-container">
            <TextDetail header={t("name")} content={product.name} />
          </div>
          <div className="content-container">
            <TextDetail header={t("Currency")} content={product.currency} />
          </div>
          <div className="content-container">
            <TextDetail header={t("Price")} content={product.price} />
          </div>
          <div className="content-container">
            <TextDetail
              header={t("Product_in_Stock")}
              content={product.inStockCount}
            />
          </div>
          <div className="content-container">
            <TextDetail
              header={t("Description")}
              content={product.description}
            />
          </div>

          <div className="content-container">
            <span className="content-container__label">
              {t("Products_Place")}
            </span>
            <div className="productLocation">
              <FormControlLabel
                label={t("In_Turkey")}
                control={
                  <Checkbox
                    checked={product.foundInTurkey}
                    defaultChecked
                    inputProps={{ "aria-label": "controlled" }}
                    readOnly
                  />
                }
              />
              <FormControlLabel
                label={t("In_Iraq")}
                control={
                  <Checkbox
                    checked={product.foundInIraq}
                    inputProps={{ "aria-label": "controlled" }}
                    readOnly
                  />
                }
              />
            </div>
          </div>
          {Object.keys(product.subProducts).length !== 0 && (
            <div className="content-container">
              <span className="content-container__general-header">
                {t("available_Items")}
              </span>
              <table className="availableSpecific">
                <tbody className="availableSpecific__body">
                  <tr className="availableSpecific__body-tr">
                    <th className="av-th">N</th>
                    <th className="av-th">{t("Option")}</th>
                    <th className="av-th">{t("Count_in_stock")}</th>
                    <th className="av-th">{t("Price")}</th>
                  </tr>
                  {product.subProducts.model.map((item, index) => (
                    <tr className="availableSpecific__body-tr" key={index}>
                      <td className="av-td">{index + 1}</td>
                      <td className="av-td">{item.name}</td>
                      <td className="av-td">{item.subNumInStock}</td>
                      <td className="av-td">{item.subPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {product.specification && (
            <div className="content-container">
              <span className="content-container__general-header">
                {t("Specifications")}
              </span>
              <div className="specification-box">
                {product.specification.map((item, index) => (
                  <span className="specification-box__content" key={index}>
                    {item.specific}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="content-container">
            <span className="content-container__general-header">
              {t("Product_Images")}
            </span>
            <div className="productImages-container">
              <PhotoProvider>
                {product.productPictures &&
                  product.productPictures.map((item, index) => (
                    <div className="productImage-item" key={index}>
                      <PhotoView src={item.img}>
                        <img
                          src={item.img}
                          style={{ objectFit: "cover", width: "100%" }}
                          alt="Product"
                        />
                      </PhotoView>
                    </div>
                  ))}
              </PhotoProvider>
            </div>
          </div>
          {product.detailsPictures && (
            <div className="content-container">
              <span className="content-container__general-header">
                {t("Details_Images")}
              </span>
              <div className="productImages-container">
                <PhotoProvider>
                  {product.detailsPictures &&
                    product.detailsPictures.map((item, index) => (
                      <div className="productImage-item" key={index}>
                        <PhotoView src={item.img}>
                          <img
                            src={item.img}
                            style={{ objectFit: "cover", width: "100%" }}
                            alt="Product"
                          />
                        </PhotoView>
                      </div>
                    ))}
                </PhotoProvider>
              </div>
            </div>
          )}

          <div className="content-container">
            <TextDetail
              header={t("Created_At")}
              content={new Date(product.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            />
            <TextDetail
              header={t("Updated_At")}
              content={new Date(product.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            />
          </div>

          <div className="content-container">
            <TextDetail header={t("Seller")} content={product.shop} />
          </div>
          <div className="content-container">
            <TextDetail
              header={t("Number_of_Ratings")}
              content={product.ratingsQuantity}
            />
          </div>
          <div className="content-container">
            <TextDetail
              header={t("Average_of_Ratings")}
              content={product.ratingsAverage}
            />
          </div>

          <div className="content-container">
            <button
              className="content-container__button content-container__button-delete"
              onClick={() => submitDeleteProduct()}
            >
              {t("Delete_Product")}
            </button>
          </div>
        </div>
        <div className="agp-exists">
          <span className="agp-exists__header">{t("Product_Update")}</span>
          <span className="agp-exists__header">
            {t("fields_that_you_don't_want_to_update_leave_them_empty")}
          </span>

          <div className="content-container">
            <img
              src={cardImagePreview ? cardImagePreview : product.cardPicture}
              alt="Product"
              className="content-container__cardImage"
            />
            <HighlightOff
              className="content-container__cardImage-deleteIcon"
              style={{ display: `${cardImagePreview ? "block" : "none"}` }}
              onClick={() => handleDeleteImage()}
            />
            <input
              style={{ display: "none" }}
              type="file"
              className="content-container__input"
              accept="images/*"
              onChange={(e) => handleCardImage(e)}
              id="agp-cardImage"
            />
            <label
              htmlFor="agp-cardImage"
              className="content-container__label"
              style={{ textAlign: "center" }}
            >
              <Backup fontSize="large" />
            </label>
          </div>
          <div className="content-container">
            <label htmlFor="agp-name" className="content-container__label">
              {t("Product_Name")}
            </label>
            <input
              type="text"
              value={name}
              placeholder={product.name}
              className="content-container__input"
              id="agp-name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="content-container">
            <label htmlFor="agp-currency" className="content-container__label">
              {t("Currency")}
            </label>
            <input
              type="text"
              placeholder={product.currency}
              className="content-container__input"
              id="agp-currency"
              disabled
              // value={price}
              // onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="content-container">
            <label htmlFor="agp-price" className="content-container__label">
              {t("Product_Price")}
            </label>
            <input
              type="number"
              placeholder={product.price}
              className="content-container__input"
              id="agp-price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="content-container">
            <label htmlFor="agp-price" className="content-container__label">
              {t("new_Price_Discount")}
            </label>
            <input
              type="number"
              placeholder="if there discount, Enter new Price "
              className="content-container__input"
              id="agp-price"
              value={priceAfterDiscount}
              onChange={(e) => setPriceAfterDiscount(e.target.value)}
            />
          </div>
          <div className="content-container">
            <label htmlFor="agp-quantity" className="content-container__label">
              {t("Product_Quantity")}
            </label>
            <input
              type="number"
              placeholder={product.quantity}
              className="content-container__input"
              id="agp-quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <div className="content-container">
            <label
              htmlFor="agp-description"
              className="content-container__label"
            >
              {t("Description")}
            </label>
            <textarea
              name="description"
              id="agp-description"
              cols="30"
              className="content-container__textarea"
              rows="10"
              placeholder={product.description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="content-container">
            <span className="content-container__label">
              {t("Products_Place")}
            </span>
            <div className="productLocation">
              <FormControlLabel
                label={t("In_Turkey")}
                control={
                  <Checkbox
                    checked={checkLocationInTurkey}
                    defaultChecked
                    onChange={(e) => setCheckLocationInTurkey(e.target.checked)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
              />
              <FormControlLabel
                label={t("In_Iraq")}
                control={
                  <Checkbox
                    checked={checkLocationInIraq}
                    onChange={(e) => setCheckLocationInIraq(e.target.checked)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
              />
            </div>
          </div>
          <div className="content-container">
            <label htmlFor="agp-sp" className="content-container__label">
              {`${t("Specifications")} (${t("if_there_or_leave_empty")})`}
            </label>
            <div className="specific-fields-container">
              <IconButton
                onClick={() => handleAddNewSpecificField(prodSpecific)}
                style={{
                  display: "block",
                  width: "fitContent",
                }}
              >
                <Add />
              </IconButton>
            </div>

            {prodSpecific.map((field, index) => (
              <div className="specific-inputs" key={index}>
                <input
                  type="text"
                  value={field.specific}
                  placeholder={t("Origin_Turkey")}
                  className="subprodInput"
                  id="agp-sp"
                  onChange={(e) => handleSetSpecificField(index, e)}
                  style={{ width: "50%", marginBottom: "5px" }}
                />
                <IconButton
                  onClick={() => handleRemoveSpecificField(field, index)}
                >
                  <Remove />
                </IconButton>
              </div>
            ))}
          </div>
          <div className="content-container">
            <span className="content-container__label">
              {`${t("Sub_Product")} (${t("if_there_or_leave_empty")})`}
            </span>
            <div>
              <div
                style={{
                  padding: "8px",
                  border: "1px solid black",
                  marginBottom: "2px",
                  fontSize: "12px",
                }}
              >
                <label htmlFor={`sub-prod-subname`} className="subprodLabel">
                  {t("Name_of_Sub_Product_like_color_or_size")}
                </label>
                <input
                  className="subprodInput"
                  placeholder={t("ex_Size_Color")}
                  id={`sub-prod-subname`}
                  type="text"
                  value={subProducts.subName}
                  onChange={(e) => handleSubProductName(e)}
                />
                <IconButton
                  onClick={() => handleAddNewModelInSubProduct(subProducts)}
                  style={{
                    display: "block",
                  }}
                >
                  <Add />
                </IconButton>
                <div>
                  {subProducts.model.map((col, i) => (
                    <Fragment key={i}>
                      <div className="subProdModel">
                        <div className="subPorductInputContainer">
                          <label
                            htmlFor={`sub-prod-mod-name${i}-s`}
                            className="subprodLabel"
                          >
                            {t("Specific_Name")}
                          </label>
                          <input
                            id={`sub-prod-mod-name${i}-s`}
                            name="name"
                            className="subprodInput"
                            type="text"
                            value={col.name}
                            onChange={(e) => handleModelChangeName(i, e)}
                          />
                        </div>
                        <div className="subPorductInputContainer">
                          <label
                            htmlFor={`sub-prod-mod-stock${i}-s`}
                            className="subprodLabel"
                          >
                            {t("Product_in_Stock")}
                          </label>
                          <input
                            id={`sub-prod-mod-stock${i}-s`}
                            name="subNumInStock"
                            className="subprodInput"
                            type="number"
                            value={col.subNumInStock}
                            onChange={(e) => handleModelChangeNumStok(i, e)}
                          />
                        </div>

                        <div className="subPorductInputContainer">
                          <label
                            htmlFor={`sub-prod-mod-price${i}-s`}
                            className="subprodLabel"
                          >
                            {t("Price")}
                          </label>
                          <input
                            id={`sub-prod-mod-price${i}-s`}
                            type="number"
                            value={col.subPrice}
                            className="subprodInput"
                            onChange={(e) => handleModelChangeSubPrice(i, e)}
                          />
                        </div>
                        <IconButton
                          onClick={() =>
                            handleRemoveNewModelInSubProduct(subProducts, i)
                          }
                        >
                          <Remove />
                        </IconButton>
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="content-container">
            <span className="content-container__general-header">
              {t("Product_Images")}
            </span>
            <div className="productImages-container">
              <PhotoProvider>
                {productPicturesPreview.length > 0
                  ? productPicturesPreview.map((item, index) => (
                      <div className="productImage-item" key={index}>
                        <PhotoView src={item}>
                          <img
                            src={item}
                            style={{ objectFit: "cover", width: "100%" }}
                            alt="Product"
                          />
                        </PhotoView>
                        <HighlightOff
                          onClick={() =>
                            handleDeleteImageformProductImages(index)
                          }
                        />
                      </div>
                    ))
                  : product.productPictures &&
                    product.productPictures.map((item, index) => (
                      <div className="productImage-item" key={index}>
                        <PhotoView src={item.img}>
                          <img
                            src={item.img}
                            style={{ objectFit: "cover", width: "100%" }}
                            alt="Product"
                          />
                        </PhotoView>
                      </div>
                    ))}
              </PhotoProvider>
            </div>
            <input
              style={{ display: "none" }}
              type="file"
              className="content-container__input"
              accept="images/*"
              onChange={(e) => handleProductImages(e)}
              id="agp-product-pictures"
              multiple
            />
            <label
              htmlFor="agp-product-pictures"
              className="content-container__label"
              style={{ textAlign: "center" }}
            >
              <Backup fontSize="large" />
            </label>
          </div>

          <div className="content-container">
            <span className="content-container__general-header">
              {`${t("Details_Images")} (${t("if_there_or_leave_empty")})`}
            </span>
            <div className="productImages-container">
              <PhotoProvider>
                {productDetailPicturesPreview.length > 0
                  ? productDetailPicturesPreview.map((item, index) => (
                      <div className="productImage-item" key={index}>
                        <PhotoView src={item}>
                          <img
                            src={item}
                            style={{ objectFit: "cover", width: "100%" }}
                            alt="Product"
                          />
                        </PhotoView>
                        <HighlightOff
                          onClick={() =>
                            handleDeleteImagefromDetailsPictures(index)
                          }
                        />
                      </div>
                    ))
                  : product.detailsPictures &&
                    product.detailsPictures.map((item, index) => (
                      <div className="productImage-item" key={index}>
                        <PhotoView src={item.img}>
                          <img
                            src={item.img}
                            style={{ objectFit: "cover", width: "100%" }}
                            alt="Product"
                          />
                        </PhotoView>
                      </div>
                    ))}
              </PhotoProvider>
            </div>
            <input
              style={{ display: "none" }}
              type="file"
              className="content-container__input"
              accept="images/*"
              onChange={(e) => handleDetailsImages(e)}
              id="agp-detail-pictures"
              multiple
            />
            <label
              htmlFor="agp-detail-pictures"
              className="content-container__label"
              style={{ textAlign: "center" }}
            >
              <Backup fontSize="large" />
            </label>
          </div>
          <div className="content-container">
            <button
              className="content-container__button content-container__button-update"
              onClick={() => submitUpdateProduct()}
            >
              {t("Product_Update")}
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default AdminGetProduct;
