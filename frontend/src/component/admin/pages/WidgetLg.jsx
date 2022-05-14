import React from 'react';
import './styles/widget-lg.scss';
const WidgetLg = () => {
  const Button = ({ type }) => (
    <button className={'widgetLgTr__btn ' + type}>{type}</button>
  );
  return (
    <div className="widget-lg">
      <h3 className="widget-lg__title">Latests transactions</h3>
      <table className="widget-lg__table">
        <tbody className="widget-lg-body">
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">data</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh status"> Status</th>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgTr__user">
              <img
                src="https://picsum.photos/200"
                alt="user"
                className="widgetLgTr__user-img"
              />
              <span className="widgetLgTr__user-name">Susan karal</span>
            </td>
            <td className="widgetLgTr__data">2 Apr 2022</td>
            <td className="widgetLgTr__amount">$122.5</td>
            <td className="widgetLgTr__status">
              <Button type="Pending" />
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgTr__user">
              <img
                src="https://picsum.photos/200"
                alt="user"
                className="widgetLgTr__user-img"
              />
              <span className="widgetLgTr__user-name">Susan karal</span>
            </td>
            <td className="widgetLgTr__data">2 Apr 2022</td>
            <td className="widgetLgTr__amount">$122.5</td>
            <td className="widgetLgTr__status">
              <Button type="Declined" />
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgTr__user">
              <img
                src="https://picsum.photos/200"
                alt="user"
                className="widgetLgTr__user-img"
              />
              <span className="widgetLgTr__user-name">Susan karal</span>
            </td>
            <td className="widgetLgTr__data">2 Apr 2022</td>
            <td className="widgetLgTr__amount">$122.5</td>
            <td className="widgetLgTr__status">
              <Button type="Approved" />
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgTr__user">
              <img
                src="https://picsum.photos/200"
                alt="user"
                className="widgetLgTr__user-img"
              />
              <span className="widgetLgTr__user-name">Susan karal</span>
            </td>
            <td className="widgetLgTr__data">2 Apr 2022</td>
            <td className="widgetLgTr__amount">$122.5</td>
            <td className="widgetLgTr__status">
              <Button type="Pending" />
            </td>
          </tr>
          <tr className="widgetLgTr">
            <td className="widgetLgTr__user">
              <img
                src="https://picsum.photos/200"
                alt="user"
                className="widgetLgTr__user-img"
              />
              <span className="widgetLgTr__user-name">Susan karal</span>
            </td>
            <td className="widgetLgTr__data">2 Apr 2022</td>
            <td className="widgetLgTr__amount">$122.5</td>
            <td className="widgetLgTr__status">
              <Button type="Pending" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WidgetLg;
