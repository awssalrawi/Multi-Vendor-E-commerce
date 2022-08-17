import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoaderSpinner from '../component/utilis/LoaderSpinner';
import './style/categories.scss';
const Categories = () => {
  const { categories, loading } = useSelector((state) => state.category);
  const [load, setLoad] = useState(false);
  const onLoadedImage = () => {
    setLoad(true);
  };

  // const createCategoryList = (categories) => {
  //   let options = [];
  //   for (let category of categories) {
  //     if (category.children.length === 0) {
  //       options.push(category);
  //     }

  //     if (category.children.length > 0) {
  //       createCategoryList(category.children, options);
  //     }
  //   }

  //   return options;
  // };
  const createCategoryList = (categories, options = []) => {
    for (let category of categories) {
      if (category.categoryImage.length > 0 && category.children.length === 0) {
        options.push({
          value: category._id,
          name: category.name,
          categoryImage: category.categoryImage,
          slug: category.slug,
        });
      }
      //console.log(category.categoryImage.length);
      if (category.children.length > 0) {
        createCategoryList(category.children, options);
      }
    }

    return options;
  };
  return (
    <Fragment>
      {loading ? (
        <LoaderSpinner />
      ) : (
        <div className="category-home">
          <div className="category-home__container">
            {categories.length > 0 &&
              createCategoryList(categories).map((cat, i) => (
                <Link
                  className="category-home__item link"
                  to={`/${cat.slug}`}
                  key={i}
                  //   state={product}
                >
                  <div className="category-home__item__img-container">
                    {!load && (
                      <div className="prod-no-img">
                        <span className="prod-no-img__text">Ltreda</span>
                      </div>
                    )}
                    <img
                      src={
                        cat.categoryImage
                          ? cat.categoryImage
                          : 'https://cdn.dribbble.com/users/844846/screenshots/2855815/no_image_to_show_.jpg'
                      }
                      alt="product"
                      className="product-image"
                      onLoad={onLoadedImage}
                    />
                  </div>
                  <div className="category-home__details">
                    <span className="category-home__item__name">
                      {cat.name}
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Categories;
