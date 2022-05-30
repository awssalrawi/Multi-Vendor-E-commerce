import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './styles/admin-get-product.scss';
import 'react-photo-view/dist/react-photo-view.css';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { ArrowBack, Backup, HighlightOff } from '@material-ui/icons';
import { toast } from 'react-toastify';
import {
  clearErrors,
  adminDeleteProductById,
  adminUpdateProductById,
} from '../../../redux/actions/productAction';
import { useDispatch } from 'react-redux';
//*imported from product details

//*agp for this function
const AdminGetProduct = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  //*Declare variables
  const [cardImage, setCardImage] = useState('');
  const [cardImagePreview, setCardImagePreview] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [specifications, setSpecifications] = useState('');
  const [priceAfterDiscount, setPriceAfterDiscount] = useState('');
  const [availableSpecific, setAvailableSpecific] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  const [productPicturesPreview, setProductPicturesPreview] = useState([]);
  const [productDetailPictures, setProductDetailPictures] = useState([]);
  const [productDetailPicturesPreview, setProductDetailPicturesPreview] =
    useState([]);

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
    setCardImage('');
    setCardImagePreview('');
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

    if (cardImage !== '') form.append('cardPicture', cardImage);
    if (name) form.append('name', name);
    if (price) form.append('price', price);
    if (quantity && quantity > 0) form.append('quantity', quantity);
    if (description) form.append('description', description);
    if (specifications) form.append('specification', specifications);
    if (availableSpecific) form.append('availableSpecific', availableSpecific);
    if (priceAfterDiscount) {
      if (
        (!price && priceAfterDiscount > product.price) ||
        (price && priceAfterDiscount > price)
      ) {
        return toast.error(
          'Discount price Cannot be bigger then previous price'
        );
      }

      form.append('priceAfterDiscount', priceAfterDiscount);
    }

    if (productPictures.length > 0) {
      if (productPictures.length < 3)
        return toast.error('Product pictures must be at least 3 images');

      productPictures.forEach((image) => {
        form.append('productPictures', image);
      });
    }

    if (productDetailPictures.length > 0) {
      productDetailPictures.forEach((image) => {
        form.append('detailsPictures', image);
      });
    }

    //*Continuo
    const pr = dispatch(adminUpdateProductById(params.productId, form));

    toast
      .promise(pr, {
        loading: 'Loading',
        success: 'Product Updated successfully',
        error: 'Error happened',
      })
      .then(() => navigate('/admin/product'));
  };

  const submitDeleteProduct = () => {
    console.log(params);
    const promise = dispatch(adminDeleteProductById(params.productId));

    toast
      .promise(promise, {
        loading: 'Loading',
        success: 'Product Deleted successfully',
        error: 'Error happened',
      })
      .then(() => navigate('/admin/product'));
  };

  return (
    <div className="agp-body">
      <ArrowBack onClick={() => navigate(-1)} />
      <div className="agp-exists">
        <span className="agp-exists__header">Product overview</span>
        <div className="content-container">
          <img
            src={product.cardPicture}
            alt="Product"
            className="content-container__cardImage"
          />
        </div>
        <div className="content-container">
          <TextDetail header="name" content={product.name} />
        </div>
        <div className="content-container">
          <TextDetail header="Price" content={product.price} />
        </div>
        <div className="content-container">
          <TextDetail header="Quantity" content={product.quantity} />
        </div>
        <div className="content-container">
          <TextDetail header="Description" content={product.description} />
        </div>
        {product.availableSpecific && (
          <div className="content-container">
            <span className="content-container__general-header">
              available Items
            </span>
            <table className="availableSpecific">
              <tbody className="availableSpecific__body">
                <tr className="availableSpecific__body-tr">
                  <th className="av-th">N</th>
                  <th className="av-th">Option</th>
                  <th className="av-th">Count in stock</th>
                </tr>
                {product.availableSpecific.map((item, index) => (
                  <tr className="availableSpecific__body-tr" key={index}>
                    <td className="av-td">{index + 1}</td>
                    <td className="av-td">{item.option}</td>
                    <td className="av-td">{item.inStockCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {product.specification && (
          <div className="content-container">
            <span className="content-container__general-header">
              Specifications
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
            Product Images
          </span>
          <div className="productImages-container">
            <PhotoProvider>
              {product.productPictures &&
                product.productPictures.map((item, index) => (
                  <div className="productImage-item" key={index}>
                    <PhotoView src={item.img}>
                      <img
                        src={item.img}
                        style={{ objectFit: 'cover', width: '100%' }}
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
              Product Detail Images
            </span>
            <div className="productImages-container">
              <PhotoProvider>
                {product.detailsPictures &&
                  product.detailsPictures.map((item, index) => (
                    <div className="productImage-item" key={index}>
                      <PhotoView src={item.img}>
                        <img
                          src={item.img}
                          style={{ objectFit: 'cover', width: '100%' }}
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
            header="Created At"
            content={new Date(product.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          />
          <TextDetail
            header="Updated At"
            content={new Date(product.updatedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          />
        </div>

        <div className="content-container">
          <TextDetail header="Seller" content={product.shop} />
        </div>
        <div className="content-container">ratings</div>
        <div className="content-container">Reviews</div>

        <div className="content-container">
          <button
            className="content-container__button content-container__button-delete"
            onClick={() => submitDeleteProduct()}
          >
            Delete Product
          </button>
        </div>
      </div>
      <div className="agp-exists">
        <span className="agp-exists__header">Product Update</span>
        <span className="agp-exists__header">
          fields that you don't want to update leave them empty
        </span>

        <div className="content-container">
          <img
            src={cardImagePreview ? cardImagePreview : product.cardPicture}
            alt="Product"
            className="content-container__cardImage"
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
            placeholder={product.name}
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
            placeholder={product.price}
            className="content-container__input"
            id="agp-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="content-container">
          <label htmlFor="agp-price" className="content-container__label">
            new Price (Discount) if there
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
            Product Quantity
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
          <label htmlFor="agp-description" className="content-container__label">
            Description
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
          <label htmlFor="agp-av" className="content-container__label">
            available Items
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
            Specifications
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
              {productPicturesPreview.length > 0
                ? productPicturesPreview.map((item, index) => (
                    <div className="productImage-item" key={index}>
                      <PhotoView src={item}>
                        <img
                          src={item}
                          style={{ objectFit: 'cover', width: '100%' }}
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
                          style={{ objectFit: 'cover', width: '100%' }}
                          alt="Product"
                        />
                      </PhotoView>
                    </div>
                  ))}
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
            Details Images
          </span>
          <div className="productImages-container">
            <PhotoProvider>
              {productDetailPicturesPreview.length > 0
                ? productDetailPicturesPreview.map((item, index) => (
                    <div className="productImage-item" key={index}>
                      <PhotoView src={item}>
                        <img
                          src={item}
                          style={{ objectFit: 'cover', width: '100%' }}
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
                          style={{ objectFit: 'cover', width: '100%' }}
                          alt="Product"
                        />
                      </PhotoView>
                    </div>
                  ))}
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
            className="content-container__button content-container__button-update"
            onClick={() => submitUpdateProduct()}
          >
            Update Product
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminGetProduct;
