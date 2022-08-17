import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './styles/categoryinsideslider.scss';
const CategoryInsideSlider = ({ category }) => {
  const [load, setLoad] = useState(false);
  const onLoadedImage = () => {
    setLoad(true);
  };
  return (
    <Link className="cat-card" to={`/${category.slug}`}>
      <div className="cat-pictures">
        <img
          className="catImageShow"
          src={category.categoryImage}
          alt="Category"
          onLoad={onLoadedImage}
        />
        {!load && (
          <div className="cat-no-img">
            <span className="cat-no-img__text">Ltreda</span>
          </div>
        )}
      </div>
      <p className="cat-name">{category.name}</p>
    </Link>
  );
};

export default CategoryInsideSlider;
