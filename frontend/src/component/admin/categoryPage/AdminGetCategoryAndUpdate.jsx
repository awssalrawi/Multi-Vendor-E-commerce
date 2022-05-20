import React, { useEffect, Fragment, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './get-categoryand-update.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  adminGetCategoryById,
  adminDeleteCategoryById,
  adminUpdateCategory,
  clearErrors,
} from '../../../redux/actions/categoryAction';
import { toast } from 'react-toastify';
import LoaderSpinner from '../../utilis/LoaderSpinner';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { ArrowBack } from '@material-ui/icons';

const AdminGetCategoryAndUpdate = () => {
  const [open, setOpen] = useState(false);

  const { category, loading, error } = useSelector(
    (state) => state.categoryConfig
  );

  const { categories } = useSelector((state) => state.category);

  const [parentCategoryId, setParentCategoryId] = useState(
    category.parentId ? category.parentId : ''
  );
  const [catName, setCatName] = useState('');
  const [updateCatImage, setUpdateCatImage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(adminGetCategoryById(params.categoryId));
  }, [dispatch, params, error]);

  const handleDeleteCategory = () => {
    dispatch(adminDeleteCategoryById(params.categoryId));

    toast.success('Category deleted successfully');
    setOpen(false);

    navigate('/admin/categories');
  };

  const [updateCatImagePrev, setUpdateCatImagePrev] = useState('');

  const handleUpdatedImage = (e) => {
    setUpdateCatImage(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUpdateCatImagePrev(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
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

  const handleUpdateCategory = (e) => {
    e.preventDefault();

    if (parentCategoryId === 'Main Category') setParentCategoryId(null);

    const form = new FormData();

    form.append('name', catName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', updateCatImage);
    dispatch(adminUpdateCategory(params.categoryId, form));

    navigate('/admin/categories');
  };
  return (
    <Fragment>
      {!category && loading ? (
        <LoaderSpinner text="Getting Category" />
      ) : (
        <Fragment>
          <div className="adminGetCat">
            <div className="adminGetCat__cat-info">
              <ArrowBack
                className="arrowBackStyle"
                onClick={() => navigate(-1)}
              />
              <div className="existsCat">
                {category.categoryImage ? (
                  <img
                    src={category.categoryImage}
                    alt="Category"
                    className="existsCat__img"
                  />
                ) : (
                  <span className="existsCat__no-img">
                    Category has no Image
                  </span>
                )}

                <span className="existsCat__name">{category.name}</span>
                {category.parentId ? (
                  <span className="existsCat__main">Sub Category</span>
                ) : (
                  <span className="existsCat__main">Main Category</span>
                )}
                <Button
                  variant="outlined"
                  onClick={handleClickOpen}
                  className="existsCat__delete-btn"
                >
                  Delete Category
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {'You are going to delete category'}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you Sure You want to Delete Category? After this
                      action you will not be able to get this category unless
                      you created another one
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleDeleteCategory} autoFocus>
                      Delete Category
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>

            <div className="adminGetCat__cat-form">
              <form className="updateCat" onSubmit={handleUpdateCategory}>
                <div className="updateCat__field">
                  <img
                    src={
                      updateCatImagePrev
                        ? updateCatImagePrev
                        : category.categoryImage
                    }
                    alt="Category"
                    className="updateCat__field-existImage"
                  />
                  <input
                    type="file"
                    className="updateCat__field-upload-btn"
                    accept="images/*"
                    onChange={(e) => handleUpdatedImage(e)}
                  />
                </div>
                <div className="updateCat__field">
                  <label
                    htmlFor="exists-category-id"
                    className="updateCat__field-label"
                  >
                    Category Name
                  </label>
                  <input
                    type="text"
                    id="exists-category-id"
                    className="updateCat__field-input"
                    placeholder={category.name}
                    value={catName}
                    onChange={(e) => setCatName(e.target.value)}
                  />
                </div>
                <div className="updateCat__field">
                  <label
                    htmlFor="cat-select-parent"
                    className="updateCat__field-label"
                  >
                    Select Parent Category if there
                  </label>
                  <select
                    id="cat-select-parent"
                    onChange={(e) => setParentCategoryId(e.target.value)}
                    value={parentCategoryId}
                    className="updateCat__field-input"
                  >
                    <option>Main Category</option>
                    {createCategoryList(categories) &&
                      createCategoryList(categories).map((option) => (
                        <option value={option.value} key={option.value}>
                          {option.name}
                        </option>
                      ))}
                  </select>
                </div>
                <button type="submit" className="updateCat__submit-btn">
                  UPDATE CATEGORY
                </button>
              </form>
              <span>Cannot update from Sub to main</span>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default AdminGetCategoryAndUpdate;
