import React, { Fragment } from 'react';
import './admin-category.scss';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

const AdminCategory = () => {
  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.name}
          {category.children.length > 0 ? (
            <ul className="cat-list-all">
              {renderCategories(category.children)}
            </ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };
  //!for display categories

  //!for display categories

  const { categories } = useSelector((state) => state.category);

  return (
    <Fragment>
      <div className="admin-cat">
        <div className="name-add-btn">
          <span className="cat-title">Categories</span>
          <Link to="/admin/create-category" className="add-cat-btn">
            Create New Category
          </Link>
        </div>
        <div className="categories_container">
          <ul className="cat-list-all">
            {categories && renderCategories(categories)}
          </ul>

          <li className="main-category-list"></li>
        </div>
      </div>
    </Fragment>
  );
};

export default AdminCategory;
