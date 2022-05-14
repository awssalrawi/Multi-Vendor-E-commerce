import React, { Fragment, useEffect, useState } from 'react';
import './admin-category.scss';
import {
  getAllCategories,
  adminCreateCategory,
  clearErrors,
} from '../../../redux/actions/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
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
import { toast } from 'react-toastify';
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

const AdminCategory = () => {
  //!for create new category
  const [enterCategoryName, setEnterCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  //!for create new category
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };
  //!for display categories

  //!for display categories

  const { categories, error } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getAllCategories());
  }, [dispatch, error]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  // const handleCreateCategoryImage = (e) => {
  //   // setCategoryImage(e.target.files[0]);
  //   // console.log(e.target.files[0]);
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       //*0:is creating
  //       //*1:is processing
  //       //*2: is done
  //       setCategoryImage(reader.result);
  //     }
  //   };
  //   console.log(e.target.files[0]);
  //   console.log(reader);
  //   reader.readAsDataURL(e.target.files[0]);
  //   console.log(e.target.files[0].name);
  // };

  const handleSubmitCategory = (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append('name', enterCategoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', categoryImage);
    console.log(parentCategoryId);
    dispatch(adminCreateCategory(form));
    setOpen(false);
  };
  return (
    <Fragment>
      <div className="admin-cat">
        <div className="name-add-btn">
          <span className="cat-title">Categories</span>

          <div>
            <Button
              variant="outlined"
              onClick={handleClickOpen}
              className="add-cat-btn"
            >
              Add Category
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
                Modal title
              </BootstrapDialogTitle>
              <DialogContent dividers>
                <form onSubmit={handleSubmitCategory}>
                  <input
                    type="text"
                    placeholder="Enter category name"
                    value={enterCategoryName}
                    onChange={(e) => setEnterCategoryName(e.target.value)}
                  />
                  <select
                    onChange={(e) => setParentCategoryId(e.target.value)}
                    value={parentCategoryId}
                  >
                    <option>Chose Parent</option>
                    {createCategoryList(categories) &&
                      createCategoryList(categories).map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.name}
                        </option>
                      ))}
                  </select>

                  <input
                    type="file"
                    name="category"
                    id="customFile"
                    accept="images/*"
                    value={categoryImage && categoryImage.value}
                    onChange={(e) => setCategoryImage(e.target.files[0])}
                    //  onChange={handleCreateCategoryImage}

                    // onChange={(e) => setCategoryImage(e.target.files[0])}
                    //onChange={onChangePicture}
                    // onChange={(e) => {
                    //   console.log(categoryImage, e.target.files[0]);
                    //   setCategoryImage(e.target.files[0]);
                    // }}
                  />
                  <button type="submit">Create </button>
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
        <div className="categories_container">
          <ul>{categories && renderCategories(categories)}</ul>

          <li className="main-category-list"></li>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminCategory;
