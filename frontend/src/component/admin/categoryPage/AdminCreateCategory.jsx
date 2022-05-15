import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  adminCreateCategory,
  clearErrors,
} from '../../../redux/actions/categoryAction';
import './admin-create-category.scss';
import { toast } from 'react-toastify';
const AdminCreateCategory = () => {
  //!for create new category
  const [enterCategoryName, setEnterCategoryName] = useState('');
  const [parentCategoryId, setParentCategoryId] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  const { categories, error } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      options.push({ value: category._id, name: category.name });
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }
    return options;
  };

  const handleSubmitCategory = (e) => {
    e.preventDefault();

    const form = new FormData();

    form.append('name', enterCategoryName);
    form.append('parentId', parentCategoryId);
    form.append('categoryImage', categoryImage);
    console.log(parentCategoryId);
    dispatch(adminCreateCategory(form));

    setEnterCategoryName("");
    setCategoryImage("")
    setParentCategoryId("")
    
  };
  return (
    <div className="admin-create-category">
      <form
        onSubmit={handleSubmitCategory}
        className="admin-create-category__form"
      >
        <div className="field_container">
          <label htmlFor="category-name" className="field-label">
            Category Name
          </label>
          <input
            className="field-input"
            id="category-name"
            type="text"
            placeholder="Enter category name"
            onChange={(e) => setEnterCategoryName(e.target.value)}
          />
        </div>
        <div className="field_container">
          <label htmlFor="cat-select-parent" className="field-label">
            Select Parent Category if there
          </label>
          <select
            id="cat-select-parent"
            onChange={(e) => setParentCategoryId(e.target.value)}
            value={parentCategoryId}
            className="field-input"
          >
            <option>Choose Parent Category</option>
            {createCategoryList(categories) &&
              createCategoryList(categories).map((option) => (
                <option value={option.value} key={option.value}>
                  {option.name}
                </option>
              ))}
          </select>
        </div>
        <div className="field_container">
          <input
            type="file"
            className="upload-field"
            name="category"
            id="customFile"
            accept="images/*"
            onChange={(e) => setCategoryImage(e.target.files[0])}
          />
        </div>
        <button type="submit" className="create-category-btn">
          Create
        </button>
      </form>
    </div>
  );
};

export default AdminCreateCategory;
