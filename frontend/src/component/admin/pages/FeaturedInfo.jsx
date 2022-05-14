import React, { Fragment } from 'react';
import './styles/featured-info.scss';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
const FeaturedInfo = () => {
  return (
    <Fragment>
      <div className="featured">
        <div className="featuredItem">
          <span className="featuredTitle">Revanue</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$2,547</span>
            <span className="featuredMoneyRate">
              -11
              <ArrowDownward className="featuredIcon" />
            </span>
          </div>
          <div className="featuredSub">Compared to last month</div>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Sale</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$2,547</span>
            <span className="featuredMoneyRate">
              -1.4
              <ArrowDownward className="featuredIcon" />
            </span>
          </div>
          <div className="featuredSub">Compared to last month</div>
        </div>
        <div className="featuredItem">
          <span className="featuredTitle">Cost</span>
          <div className="featuredMoneyContainer">
            <span className="featuredMoney">$4,47</span>
            <span className="featuredMoneyRate">
              +21.4
              <ArrowUpward className="featuredIcon negative" />
            </span>
          </div>
          <div className="featuredSub">Compared to last month</div>
        </div>
      </div>
    </Fragment>
  );
};

export default FeaturedInfo;
