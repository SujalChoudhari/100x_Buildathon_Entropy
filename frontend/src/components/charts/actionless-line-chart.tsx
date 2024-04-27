"use client";

import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  height?: number;
  colors: string[];
  strokeWidth?: number;
  chartSeries: { name: string; data: number[] }[];
}

const ActionLineChart = (props: Props) => {
  const { colors, height = 330, strokeWidth = 2, chartSeries } = props;

  // REACT CHART OPTIONS
  const chartOptions = {
    colors: colors,
    tooltip: { enabled: false },
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    grid: {
      show: false,
      padding: {
        top: -30,
        right: 0,
        bottom: -10,
        left: 0,
      },
    },
    stroke: {
      width: strokeWidth,
      curve: "smooth",
    },

    xaxis: {
      labels: {
        show: false,
      },
      crosshairs: {
        show: false,
      },
    },

    yaxis: {
      show: false,
    },
  } as ApexOptions;

  return (
    <div className="actionLessLineChart">
      <Chart
        type="line"
        width="100%"
        height={height}
        series={chartSeries}
        options={chartOptions}
      />
    </div>
  );
};

export default ActionLineChart;
