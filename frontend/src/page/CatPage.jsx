import React, { useState, useEffect } from 'react';
import { clearErrors } from '../redux/actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import GridShow from './GridShow';
import ListShow from './ListShow';
//import './style/bootstrapx.css';

const CatPage = ({ products }) => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.getProductsBySlug);
  const storePage = useSelector((state) => state.storePage);
  useEffect(() => {
    if (error || storePage.error) {
      dispatch(clearErrors());
    }
  }, []);
  const [showType, setShowType] = useState('grid');
  return (
    <div className="row">
      <aside className="col-md-3">
        <div className="card">
          <article className="filter-group">
            <header className="card-header">
              <a
                href="#"
                data-toggle="collapse"
                data-target="#collapse_1"
                aria-expanded="true"
                className=""
              >
                <i className="icon-control fa fa-chevron-down"></i>
                <h6 className="title">Product type</h6>
              </a>
            </header>
            <div className="filter-content collapse show" id="collapse_1">
              <div className="card-body">
                <form className="pb-3">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                    <div className="input-group-append">
                      <button className="btn btn-light" type="button">
                        <i className="fa fa-search"></i>
                      </button>
                    </div>
                  </div>
                </form>

                <ul className="list-menu">
                  <li>
                    <a href="#">People </a>
                  </li>
                  <li>
                    <a href="#">Watches </a>
                  </li>
                  <li>
                    <a href="#">Cinema </a>
                  </li>
                  <li>
                    <a href="#">Clothes </a>
                  </li>
                  <li>
                    <a href="#">Home items </a>
                  </li>
                  <li>
                    <a href="#">Animals</a>
                  </li>
                  <li>
                    <a href="#">People </a>
                  </li>
                </ul>
              </div>
            </div>
          </article>
          <article className="filter-group">
            <header className="card-header">
              <a
                href="#"
                data-toggle="collapse"
                data-target="#collapse_2"
                aria-expanded="true"
                className=""
              >
                <i className="icon-control fa fa-chevron-down"></i>
                <h6 className="title">Brands </h6>
              </a>
            </header>
            <div className="filter-content collapse show" id="collapse_2">
              <div className="card-body">
                <label className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" />
                  <div className="custom-control-label">
                    Mercedes
                    <b className="badge badge-pill badge-light float-right">
                      120
                    </b>{' '}
                  </div>
                </label>
                <label className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" />
                  <div className="custom-control-label">
                    Toyota
                    <b className="badge badge-pill badge-light float-right">
                      15
                    </b>{' '}
                  </div>
                </label>
                <label className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" />
                  <div className="custom-control-label">
                    Mitsubishi
                    <b className="badge badge-pill badge-light float-right">
                      35
                    </b>{' '}
                  </div>
                </label>
                <label className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" />
                  <div className="custom-control-label">
                    Nissan
                    <b className="badge badge-pill badge-light float-right">
                      89
                    </b>{' '}
                  </div>
                </label>
                <label className="custom-control custom-checkbox">
                  <input type="checkbox" className="custom-control-input" />
                  <div className="custom-control-label">
                    Honda
                    <b className="badge badge-pill badge-light float-right">
                      30
                    </b>{' '}
                  </div>
                </label>
              </div>
            </div>
          </article>
          <article className="filter-group">
            <header className="card-header">
              <a
                href="#"
                data-toggle="collapse"
                data-target="#collapse_3"
                aria-expanded="true"
                className=""
              >
                <i className="icon-control fa fa-chevron-down"></i>
                <h6 className="title">Price range </h6>
              </a>
            </header>
            <div className="filter-content collapse show" id="collapse_3">
              <div className="card-body">
                <input
                  type="range"
                  className="custom-range"
                  min="0"
                  max="100"
                  name=""
                />
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Min</label>
                    <input
                      className="form-control"
                      placeholder="$0"
                      type="number"
                    />
                  </div>
                  <div className="form-group text-right col-md-6">
                    <label>Max</label>
                    <input
                      className="form-control"
                      placeholder="$1,0000"
                      type="number"
                    />
                  </div>
                </div>
                <button className="btn btn-block btn-primary">Apply</button>
              </div>
            </div>
          </article>
          <article className="filter-group">
            <header className="card-header">
              <a
                href="#"
                data-toggle="collapse"
                data-target="#collapse_4"
                aria-expanded="true"
                className=""
              >
                <i className="icon-control fa fa-chevron-down"></i>
                <h6 className="title">Sizes </h6>
              </a>
            </header>
            <div className="filter-content collapse show" id="collapse_4">
              <div className="card-body">
                <label className="checkbox-btn">
                  <input type="checkbox" />
                  <span className="btn btn-light"> XS </span>
                </label>

                <label className="checkbox-btn">
                  <input type="checkbox" />
                  <span className="btn btn-light"> SM </span>
                </label>

                <label className="checkbox-btn">
                  <input type="checkbox" />
                  <span className="btn btn-light"> LG </span>
                </label>

                <label className="checkbox-btn">
                  <input type="checkbox" />
                  <span className="btn btn-light"> XXL </span>
                </label>
              </div>
            </div>
          </article>
          <article className="filter-group">
            <header className="card-header">
              <a
                href="#"
                data-toggle="collapse"
                data-target="#collapse_5"
                aria-expanded="false"
                className=""
              >
                <i className="icon-control fa fa-chevron-down"></i>
                <h6 className="title">More filter </h6>
              </a>
            </header>
            <div className="filter-content collapse in" id="collapse_5">
              <div className="card-body">
                <label className="custom-control custom-radio">
                  <input
                    type="radio"
                    name="myfilter_radio"
                    checked=""
                    className="custom-control-input"
                  />
                  <div className="custom-control-label">Any condition</div>
                </label>

                <label className="custom-control custom-radio">
                  <input
                    type="radio"
                    name="myfilter_radio"
                    className="custom-control-input"
                  />
                  <div className="custom-control-label">Brand new </div>
                </label>

                <label className="custom-control custom-radio">
                  <input
                    type="radio"
                    name="myfilter_radio"
                    className="custom-control-input"
                  />
                  <div className="custom-control-label">Used items</div>
                </label>

                <label className="custom-control custom-radio">
                  <input
                    type="radio"
                    name="myfilter_radio"
                    className="custom-control-input"
                  />
                  <div className="custom-control-label">Very old</div>
                </label>
              </div>
            </div>
          </article>
        </div>
      </aside>
      <main className="col-md-9">
        <header className="border-bottom mb-4 pb-3">
          <div className="form-inline">
            <span className="mr-md-auto">32 Items found </span>
            <select className="mr-2 form-control">
              <option>Latest items</option>
              <option>Trending</option>
              <option>Most Popular</option>
              <option>Cheapest</option>
            </select>
            <div className="btn-group">
              <span
                className={`btn  btn-outline-secondary ${
                  showType === 'list' ? 'active' : ''
                }`}
                data-toggle="tooltip"
                title="List view"
                onClick={() => setShowType('list')}
              >
                <i className="fa fa-bars"></i>
              </span>
              <span
                className={`btn  btn-outline-secondary ${
                  showType === 'grid' ? 'active' : ''
                }`}
                data-toggle="tooltip"
                title="Grid view"
                onClick={() => setShowType('grid')}
              >
                <i className="fa fa-th"></i>
              </span>
            </div>
          </div>
        </header>
        {showType === 'grid' ? (
          <GridShow products={products} />
        ) : (
          <ListShow products={products} />
        )}
        {/* <ListShow /> */}
      </main>
    </div>
  );
};

export default CatPage;
