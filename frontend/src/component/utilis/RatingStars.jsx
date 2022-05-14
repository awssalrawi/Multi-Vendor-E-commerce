import React, { Fragment } from "react";
import "./styles/ratingStars.scss";

const RatingStars = ({ rating }) => {
  return (
    <Fragment>
      <div className="rating-outer">
        <div className="rating-inner" style={{ width: `${rating}` }}></div>
      </div>
    </Fragment>
  );
};

export default RatingStars;
