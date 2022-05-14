import React from 'react';
import './styles/chart.scss';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Chart = ({ title, data, dataKey, grid }) => {
  return (
    <div className="chart">
      <h3 className="chart__title">{title}</h3>
      <ResponsiveContainer with="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="#5550bd" />
          <YAxis />
          <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
          <Tooltip />

          {grid && <CartesianGrid stroke="#e0dfdf" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
