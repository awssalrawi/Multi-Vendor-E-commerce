import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Close } from '@mui/icons-material';
import {
  IconButton,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
  Button,
} from '@mui/material';
import './styles/admin-show-products.scss';
import { useSelector, useDispatch } from 'react-redux';
import { adminCreateProduct } from '../../../redux/actions/productAction';

//**Model */
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};
//**Model */
const AdminShowProducts = () => {
  //!for creating new product
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [productPictures, setProductPictures] = useState([]);
  //!for creating new product
  //**Model */
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //**Model */

  const { categories } = useSelector((state) => state.category);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
    console.log(productPictures);
  };

  const dispatch = useDispatch();
  const handleNewProductSubmit = (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', name);
    form.append('price', price);
    form.append('quantity', quantity);
    form.append('category', category);
    form.append('description', description);

    for (let pic of productPictures) {
      form.append('productPictures', pic);
    }

    dispatch(adminCreateProduct(form));
  };
  return (
    <Fragment>
      <div className="ad-show-products__header">
        <span className="show-product-text">View of Products</span>
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add New Product
          </Button>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={handleClose}
            >
              New Product
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <form className="new-prod-form" onSubmit={handleNewProductSubmit}>
                <div className="prod-field">
                  <label htmlFor="prod-name" className="prod-label">
                    Product Name
                  </label>
                  <input
                    id="prod-name"
                    className="prod-input"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="prod-field">
                  <label htmlFor="prod-price" className="prod-label">
                    Product Price
                  </label>
                  <input
                    id="prod-price"
                    className="prod-input"
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="prod-field">
                  <label htmlFor="prod-quantity" className="prod-label">
                    Quantity
                  </label>
                  <input
                    id="prod-quantity"
                    className="prod-input"
                    type="text"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="prod-field">
                  <label htmlFor="prod-description" className="prod-label">
                    Description
                  </label>
                  <input
                    id="prod-description"
                    className="prod-input"
                    type="text"
                    placeholder="Quantity"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="prod-field">
                  <label htmlFor="prod-cat" className="prod-label">
                    Select Category
                  </label>

                  <select
                    className="prod-input"
                    id="prod-cat"
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                  >
                    <option>Chose Parent</option>
                    {categories &&
                      createCategoryList(categories).map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="prod-field">
                  {productPictures.length > 0
                    ? productPictures.map((pic, index) => (
                        <div key={index}>{pic.name}</div>
                      ))
                    : null}
                  <label htmlFor="prod-imgs" className="prod-label">
                    Product Images
                  </label>
                  <input
                    id="prod-imgs"
                    className="prod-input"
                    type="file"
                    onChange={handleProductPictures}
                  />
                </div>
                <button type="submit" className="add-product-btn">
                  Add Product
                </button>
              </form>
            </DialogContent>

            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Save changes
              </Button>
            </DialogActions>
          </BootstrapDialog>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminShowProducts;
