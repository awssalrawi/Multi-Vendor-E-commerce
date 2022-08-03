import React from 'react';
import './styles/category-header.scss';
import { Link } from 'react-router-dom';
const CategoryHeader = ({ categories }) => {
  // const renderCategories = (categories) => {
  //   let myCategories = [];
  //   for (let category of categories) {
  //     myCategories.push(
  //       <li key={category.name}>
  //         {category.parentId ? (
  //           <a href={category.slug}>{category.name}</a>
  //         ) : (
  //           <span>{category.name}</span>
  //         )}

  //         {category.children.length > 0 ? (
  //           <ul>{renderCategories(category.children)}</ul>
  //         ) : null}
  //       </li>
  //     );
  //   }
  //   return myCategories;
  // };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push(
        <li key={category.name}>
          {category.parentId && category.children.length === 0 ? (
            <Link to={`/${category.slug}`}>{category.name}</Link>
          ) : (
            <span style={{ fontSize: '.9rem' }}>{category.name}</span>
          )}

          {category.children.length > 0 ? (
            <ul>{renderCategories(category.children)}</ul>
          ) : null}
        </li>
      );
    }
    return myCategories;
  };

  return (
    <div className="menu-header">
      <ul>{categories.length > 0 && renderCategories(categories)}</ul>
    </div>
  );
};

export default CategoryHeader;
