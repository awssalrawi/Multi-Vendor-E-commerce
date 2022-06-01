import React, { useState, useEffect, Fragment } from 'react';

import './styles/admin-get-product.scss';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { Backup, HighlightOff } from '@material-ui/icons';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import {
  adminCreateProduct,
  clearErrors,
} from '../../../redux/actions/productAction';
import { useNavigate } from 'react-router-dom';
import { TextField, IconButton, Icon, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Add, Remove } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    '& MuiTextField.root': {
      margin: theme.spacing(1),
      height: '10px',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const AdminCreateProduct = () => {
  const classes = useStyles();
  //*Declare variables
  const [cardImage, setCardImage] = useState('');
  const [cardImagePreview, setCardImagePreview] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [availableSpecific, setAvailableSpecific] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [productPicturesPreview, setProductPicturesPreview] = useState([]);
  const [productDetailPictures, setProductDetailPictures] = useState([]);
  const [productDetailPicturesPreview, setProductDetailPicturesPreview] =
    useState([]);

  const [subProducts, setSubProducts] = useState({
    subName: '',
    model: [{ name: '', subNumInStock: 0, subPrice: price }],
  });

  const { categories } = useSelector((state) => state.category);
  const { loading, error } = useSelector((state) => state.productsManagement);
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
  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearErrors());
  //   }
  // }, []);

  //*functions for update
  const handleDeleteImage = () => {
    setCardImage('');
    setCardImagePreview('');
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
    //* Validation
    if (cardImage === '' || !cardImage)
      return toast.error('Please Select the Product Image');
    if (!name) return toast.error('Please Enter the Product Name');
    if (price <= 0) return toast.error('Please Enter the Product Price');
    if (quantity <= 0) return toast.error('Please Enter the Product Quantity');
    if (!category || category === '..')
      return toast.error('Please Select the Product Category');
    if (!description)
      return toast.error('Please Enter the Product Description');
    if (productPictures.length < 3)
      return toast.error('Product Images Must be at least 3 images');
    if (productPictures.length > 8)
      return toast.error('Maximum Product Images is 8');
    if (productDetailPictures.length > 8)
      return toast.error('Maximum Product Details Images is 8');

    //* Validation

    //*Create form data and set content inside

    const form = new FormData();
    form.append('name', name);
    form.append('cardPicture', cardImage);
    form.append('description', description);
    form.append('category', category);
    form.append('quantity', quantity);
    form.append('specification', specifications);
    form.append('availableSpecific', availableSpecific);

    form.append('price', price);
    console.log('productPictures', productPictures);
    productPictures.forEach((image, i) => {
      form.append('productPictures', image);
    });
    if (productDetailPictures.length > 0) {
      productDetailPictures.forEach((image, i) => {
        form.append('detailsPictures', image);
      });
    }
    if (subProducts.subName) {
      if (subProducts.model.length <= 1)
        return toast.error(
          'Sub Product Name must be at least 2 item Please delete it if there not'
        );
      subProducts.model.forEach((item) => {
        // Object.values(item).forEach((key) => console.log(key));
        console.log(item);
        if (!item.name || !item.subNumInStock || !item.subPrice)
          return toast.error('Please Enter the Sub Product field correctly');
      });

      form.append('subProducts', JSON.stringify(subProducts));
    }

    //console.log(JSON.stringify(subProducts));
    const promise = dispatch(adminCreateProduct(form));

    toast
      .promise(promise, {
        loading: 'Loading',
        // success: 'Product created successfully',
        // error: 'Error happened',
      })
      .then(() => navigate('/admin/product'))
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
      { name: '', subNumInStock: '', subPrice: price },
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
  return (
    <div className="agp-body">
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
                : 'https://cdn1.iconfinder.com/data/icons/picture-sharing-sites-filled/32/No_Image-512.png'
            }
            alt="Product"
            className="content-container__cardImage"
            style={{ width: '20%', height: 'auto' }}
          />
          <HighlightOff
            className="content-container__cardImage-deleteIcon"
            style={{ display: `${cardImagePreview ? 'block' : 'none'}` }}
            onClick={() => handleDeleteImage()}
          />
          <input
            style={{ display: 'none' }}
            type="file"
            className="content-container__input"
            accept="images/*"
            onChange={(e) => handleCardImage(e)}
            id="agp-cardImage"
          />
          <label
            htmlFor="agp-cardImage"
            className="content-container__label"
            style={{ textAlign: 'center' }}
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
          <label htmlFor="agp-quantity" className="content-container__label">
            Product Quantity
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
            <option>..</option>
            {createCategoryList(categories) &&
              createCategoryList(categories).map((option) => (
                <option value={option.value} key={option.value}>
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
            rows="10"
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div className="content-container">
          <label htmlFor="agp-av" className="content-container__label">
            available Items (if there or leave empty)
          </label>
          <textarea
            name="available-items"
            id="agp-av"
            cols="30"
            className="content-container__textarea"
            rows="2"
            placeholder="please write in this format xxl-8,xxs-1"
            value={availableSpecific}
            onChange={(e) => setAvailableSpecific(e.target.value)}
          ></textarea>
        </div>

        <div className="content-container">
          <label htmlFor="agp-sp" className="content-container__label">
            Specifications (if there or leave empty)
          </label>
          <textarea
            name="available-items"
            id="agp-sp"
            cols="30"
            className="content-container__textarea"
            rows="2"
            placeholder="please write in this format Origin:Turkey,Marke:Nike,garanti:2 year "
            value={specifications}
            onChange={(e) => setSpecifications(e.target.value)}
          ></textarea>
        </div>
        <div className="content-container">
          <span className="content-container__label">
            Sub Product (if there or leave empty)
          </span>
          <div>
            <div
              style={{
                padding: '8px',
                border: '1px solid black',
                marginBottom: '2px',
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
                  display: 'block',
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
                          objectFit: 'cover',
                          width: '100%',
                          height: 'auto',
                        }}
                        alt="Product"
                      />
                    </PhotoView>
                    {/* HighlightOff is Icon like X for delete Image */}
                    <HighlightOff
                      onClick={() => handleDeleteImageformProductImages(index)}
                    />
                  </div>
                ))
              ) : (
                <div className="productImage-item">
                  <img
                    src="https://cdn1.iconfinder.com/data/icons/picture-sharing-sites-filled/32/No_Image-512.png"
                    style={{ objectFit: 'cover', width: '20%', height: 'auto' }}
                    alt="Product"
                  />
                </div>
              )}
            </PhotoProvider>
          </div>
          <input
            style={{ display: 'none' }}
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
            style={{ textAlign: 'center' }}
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
                          objectFit: 'cover',
                          width: '100%',
                          height: 'auto',
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
                    style={{ objectFit: 'cover', width: '20%', height: 'auto' }}
                    alt="Product"
                  />
                </div>
              )}
            </PhotoProvider>
          </div>
          <input
            style={{ display: 'none' }}
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
            style={{ textAlign: 'center' }}
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

export default AdminCreateProduct;
