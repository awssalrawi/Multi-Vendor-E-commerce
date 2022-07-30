import React, { useState, useEffect, Fragment } from "react";
import "./style/seller-update-products.scss";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { ArrowBack, Backup, HighlightOff } from "@material-ui/icons";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  clearMessage,
  sellerCreateProduct,
  clearErrors,
} from "../../redux/actions/productAction";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { Add, Remove } from "@material-ui/icons";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const SellerCreateProduct = () => {
  //*Declare variables
  const [cardImage, setCardImage] = useState("");
  const [cardImagePreview, setCardImagePreview] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [currency, setCurrency] = useState("");
  const [shippingPriceInDollar, setShippingPriceInDollar] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const [productPicturesPreview, setProductPicturesPreview] = useState([]);
  const [productDetailPictures, setProductDetailPictures] = useState([]);
  const [productDetailPicturesPreview, setProductDetailPicturesPreview] =
    useState([]);

  const [subProducts, setSubProducts] = useState({
    subName: "",
    model: [{ name: "", subNumInStock: 0, subPrice: price }],
  });

  const [prodSpecific, setProdSpecific] = useState([{ specific: "" }]);

  const [checkLocationInIraq, setCheckLocationInIraq] = useState(false);
  const [checkLocationInTurkey, setCheckLocationInTurkey] = useState(true);
  const { categories } = useSelector((state) => state.category);
  const { loading, error, message } = useSelector(
    (state) => state.sellerProduct
  );
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  //*Declare variables

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch]);

  //*functions for update
  const handleDeleteImage = () => {
    setCardImage("");
    setCardImagePreview("");
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

  const handleProductInfoAndSubmit = (e) => {
    e.preventDefault();

    let arrOfSpecific = [];
    if (prodSpecific.length !== 1 || prodSpecific[0].specific !== "") {
      prodSpecific.forEach((c) => {
        if (c.specific !== "") arrOfSpecific.push(c);
      });
    }

    //* Validation
    if (cardImage === "" || !cardImage)
      return toast.error("Please Select the Product Image");
    if (!name) return toast.error("Please Enter the Product Name");
    if (price <= 0) return toast.error("Please Enter the Product Price");
    if (quantity <= 0) return toast.error("Please Enter the Product Quantity");
    if (!category || category === "..")
      return toast.error("Please Select the Product Category");
    if (!description)
      return toast.error("Please Enter the Product Description");
    if (productPictures.length < 3)
      return toast.error("Product Images Must be at least 3 images");
    if (productPictures.length > 8)
      return toast.error("Maximum Product Images is 8");
    if (productDetailPictures.length > 8)
      return toast.error("Maximum Product Details Images is 8");
    if (currency === "") return toast.error("Please Select the Currency");
    if (!checkLocationInIraq && !checkLocationInTurkey)
      return toast.error("Please Select Product Place");

    //* Validation

    //*Create form data and set content inside

    const form = new FormData();
    form.append("name", name);
    form.append("cardPicture", cardImage);
    form.append("description", description);
    form.append("category", category);
    form.append("inStockCount", quantity);
    form.append("currency", currency);
    form.append("foundInTurkey", checkLocationInTurkey);
    form.append("foundInIraq", checkLocationInIraq);

    form.append("price", price);
    console.log("productPictures", productPictures);
    productPictures.forEach((image, i) => {
      form.append("productPictures", image);
    });
    if (productDetailPictures.length > 0) {
      productDetailPictures.forEach((image, i) => {
        form.append("detailsPictures", image);
      });
    }
    if (arrOfSpecific.length > 0) {
      form.append("specification", JSON.stringify(arrOfSpecific));
    }
    if (subProducts.subName) {
      if (subProducts.model.length <= 1)
        return toast.error(
          "Sub Product Name must be at least 2 item Please delete it if there not"
        );
      subProducts.model.forEach((item) => {
        console.log(item);
        if (!item.name || !item.subNumInStock || !item.subPrice)
          return toast.error("Please Enter the Sub Product field correctly");
      });

      form.append("subProducts", JSON.stringify(subProducts));
    }

    const promise = dispatch(sellerCreateProduct(form));

    toast
      .promise(promise, {
        loading: "Loading",
      })
      .then(() => navigate(-1))
      .catch((error) => toast.error(error));

    //*Create form data and set content inside
  };
  //*functions for update

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
    <div className="agp-body">
      <ArrowBack onClick={() => navigate(-1)} />
      <form
        className="agp-exists"
        onSubmit={handleProductInfoAndSubmit}
        encType="multipart/form-data"
      >
        <span className="agp-exists__header">New Product</span>
        <div className="content-container">
          <img
            src={
              cardImagePreview
                ? cardImagePreview
                : "https://cdn1.iconfinder.com/data/icons/picture-sharing-sites-filled/32/No_Image-512.png"
            }
            alt="Product"
            className="content-container__cardImage"
            style={{ width: "20%", height: "auto" }}
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
            Product Name
          </label>
          <input
            type="text"
            value={name}
            placeholder="Product Name"
            className="content-container__input"
            id="agp-name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="price-currency-container">
          <div className="content-container">
            <label htmlFor="agp-price" className="content-container__label">
              Product Price
            </label>

            <input
              type="number"
              placeholder="Product Price "
              className="content-container__input"
              id="agp-price"
              value={price}
              onChange={(e) => setPrice(Math.abs(e.target.value))}
            />
          </div>
          <div className="content-container">
            <label htmlFor="agp-currency" className="content-container__label">
              Currency
            </label>

            <select
              id="agp-currency"
              onChange={(e) => setCurrency(e.target.value)}
              value={currency}
              className="content-container__input"
            >
              <option value="">..</option>
              <option value="IQD" className="options-style">
                IQD
              </option>
              <option value="TRY" className="options-style">
                TRY
              </option>
              <option value="USD" className="options-style">
                USD
              </option>
            </select>
          </div>
        </div>
        <div className="content-container">
          <label htmlFor="agp-ship-price" className="content-container__label">
            Shipping Price
          </label>
          <input
            type="text"
            value={shippingPriceInDollar}
            placeholder="5$"
            className="content-container__input"
            id="agp-ship-price"
            onChange={(e) => setShippingPriceInDollar(e.target.value)}
            disabled
          />
        </div>
        <div className="content-container">
          <label htmlFor="agp-quantity" className="content-container__label">
            How Many Piece You Have
          </label>
          <input
            type="number"
            placeholder="Product Quantity"
            className="content-container__input"
            id="agp-quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div className="content-container">
          <label htmlFor="agp-category" className="content-container__label">
            Select Category
          </label>
          <select
            id="agp-category"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="content-container__input"
          >
            <option value="">..</option>
            {createCategoryList(categories) &&
              createCategoryList(categories).map((option) => (
                <option
                  value={option.value}
                  key={option.value}
                  className="options-style"
                >
                  {option.name}
                </option>
              ))}
          </select>
        </div>
        <div className="content-container">
          <label
            htmlFor="agp-description"
            className="content-container__label require"
          >
            Description
          </label>
          <textarea
            name="description"
            id="agp-description"
            cols="30"
            className="content-container__textarea"
            rows="4"
            // style={{ fontSize: "12px" }}
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="content-container">
          <span className="content-container__label">Products Place</span>
          <div className="productLocation">
            <FormControlLabel
              label="In Turkey"
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
              label="In Iraq"
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
            Specifications (if there or leave empty)
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
                placeholder="Origin:Turkey"
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
            Sub Product (if there or leave empty)
          </span>
          <div>
            <div
              style={{
                padding: "4px",
                border: "1px solid black",
                marginBottom: "2px",
                fontSize: "12px",
              }}
            >
              <label htmlFor={`sub-prod-subname`} className="subprodLabel">
                Name of Sub Product like color or size
              </label>
              <input
                className="subprodInput"
                placeholder="ex:Size,Color"
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
                          Specific Name
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
                          Product in Stock
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
                          Price if different
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
            Product Images
          </span>
          <div className="productImages-container">
            <PhotoProvider>
              {productPicturesPreview.length > 0 ? (
                productPicturesPreview.map((item, index) => (
                  <div className="productImage-item" key={index}>
                    <PhotoView src={item}>
                      <img
                        src={item}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "auto",
                        }}
                        alt="Product"
                      />
                    </PhotoView>

                    <HighlightOff
                      onClick={() => handleDeleteImageformProductImages(index)}
                    />
                  </div>
                ))
              ) : (
                <div className="productImage-item">
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/picture-sharing-sites-filled/32/No_Image-512.png"
                    style={{ objectFit: "cover", width: "20%", height: "auto" }}
                    alt="Product"
                  />
                </div>
              )}
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
            Details Images (if there or leave empty)
          </span>
          <div className="productImages-container">
            <PhotoProvider>
              {productDetailPicturesPreview.length > 0 ? (
                productDetailPicturesPreview.map((item, index) => (
                  <div className="productImage-item" key={index}>
                    <PhotoView src={item}>
                      <img
                        src={item}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "auto",
                        }}
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
              ) : (
                <div className="productImage-item">
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/picture-sharing-sites-filled/32/No_Image-512.png"
                    style={{ objectFit: "cover", width: "20%", height: "auto" }}
                    alt="Product"
                  />
                </div>
              )}
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
            className="content-container__button  content-container__button-create "
            type="submit"
            disabled={loading ? true : false}
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerCreateProduct;
