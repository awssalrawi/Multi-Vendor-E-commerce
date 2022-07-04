import React from 'react';
import './styles/widget-sm.scss';
import { Visibility } from '@material-ui/icons';
const WidgetSm = () => {
  return (
    <div className="widget-sm">
      <span className="widget-sm__title">New Join Members</span>
      <ul className="widget-sm__list">
        <li className="widget-sm__list-item">
          <img
            src="https://picsum.photos/200"
            alt="avatar"
            className="widgetSm-img"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUser-name">Aws Nafea</span>
            <span className="widgetSmUser-title">software engine</span>
          </div>
          <button className="widgetSm-btn">
            <Visibility className="widgetSm-icon" />
            display
          </button>
        </li>
      </ul>
      <ul className="widget-sm__list">
        <li className="widget-sm__list-item">
          <img
            src="https://picsum.photos/200"
            alt="avatar"
            className="widgetSm-img"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUser-name">Aws Nafea</span>
            <span className="widgetSmUser-title">software engine</span>
          </div>
          <button className="widgetSm-btn">
            <Visibility className="widgetSm-icon" />
            display
          </button>
        </li>
      </ul>
      <ul className="widget-sm__list">
        <li className="widget-sm__list-item">
          <img
            src="https://picsum.photos/200"
            alt="avatar"
            className="widgetSm-img"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUser-name">Aws Nafea</span>
            <span className="widgetSmUser-title">software engine</span>
          </div>
          <button className="widgetSm-btn">
            <Visibility className="widgetSm-icon" />
            display
          </button>
        </li>
      </ul>
      <ul className="widget-sm__list">
        <li className="widget-sm__list-item">
          <img
            src="https://picsum.photos/200"
            alt="avatar"
            className="widgetSm-img"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUser-name">Aws Nafea</span>
            <span className="widgetSmUser-title">software engine</span>
          </div>
          <button className="widgetSm-btn">
            <Visibility className="widgetSm-icon" />
            display
          </button>
        </li>
      </ul>
      <ul className="widget-sm__list">
        <li className="widget-sm__list-item">
          <img
            src="https://picsum.photos/200"
            alt="avatar"
            className="widgetSm-img"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUser-name">Aws Nafea</span>
            <span className="widgetSmUser-title">software engine</span>
          </div>
          <button className="widgetSm-btn">
            <Visibility className="widgetSm-icon" />
            display
          </button>
        </li>
      </ul>
    </div>
  );
};

export default WidgetSm;
