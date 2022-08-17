import React, { useEffect, useRef, useState } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const Chart = ({ filter, chartId, height, width }) => {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-natours-app-rikes",
  });
  const chartDiv = useRef();
  const [rendered, setRendered] = useState(false);
  //   const [chart] = useState(
  //     sdk.createChart({
  //       chartId: chartId,
  //       height: height,
  //       width: width,
  //       theme: "light",
  //     })
  //   );
  const chart = sdk.createChart({
    chartId: chartId,
    height: height,
    width: width,
    theme: "light",
  });
  useEffect(() => {
    chart
      .render(chartDiv.current)
      .then(() => chart.setFilter({ shop: { $eq: filter.slug } }))
      .then(() => setRendered(true))
      .catch((err) => console.log("Error during Charts rendering.", err));
  }, [chart]);

  //   useEffect(() => {
  //     if (rendered === true) {
  //       chart
  //         .setFilter({ shop: { $eq: filter.slug } })
  //         .catch((err) => console.log("Error while filtering.", err));
  //     }
  //   }, [rendered]);

  return (
    <>
      <div className="chart" ref={chartDiv}></div>
    </>
  );
};

export default Chart;
