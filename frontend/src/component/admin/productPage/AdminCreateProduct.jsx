import React, { useState, useEffect } from 'react';

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
//*imported from product details

const AdminCreateProduct = () => {
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
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

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

    const promise = dispatch(adminCreateProduct(form));

    toast
      .promise(promise, {
        loading: 'Loading',
        success: 'Product created successfully',
        error: 'Error happened',
      })
      .then(() => navigate('/admin/product'))
      .catch((error) => toast.error(error));

    //*Create form data and set content inside
  };
  //*functions for update
  return (
    <div className="agp-body">
      <form
        className="agp-exists"
        onSubmit={handleProductInfoAndSubmit}
        encType="multipart/form-data"
      >
        <span className="agp-exists__header">Product Update</span>
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
          <label htmlFor="agp-description" className="content-container__label">
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
