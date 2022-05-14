import React, { Fragment } from 'react';
import './styles/categoryinsideslider.scss';
const CategoryInsideSlider = () => {
  return (
    <div className="cat-card">
      <div className="cat-pictures">
        <img
          className="catImageShow"
          src="./img/house-6.jpeg"
          alt="Category Show"
        />
      </div>
      <p className="cat-name">Shorts</p>
    </div>
  );
};

export default CategoryInsideSlider;
