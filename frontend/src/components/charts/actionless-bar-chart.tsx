"use client";

import merge from "lodash.merge";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { baseChartOptions } from "@/lib/base-chart-options";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  height?: number;
  colors: string[];
  chartSeries: { name: string; data: number[] }[];
  chartCategories: string[];
}

const ActionlessBarChart = (props: Props) => {
  const { height = 120, colors, chartSeries, chartCategories } = props;

  const barChartOptions = merge(baseChartOptions(), {
    chart: { offsetY: 30 },
    stroke: { show: false },
    xaxis: { categories: chartCategories },
    colors: colors,
    grid: {
      padding: {
        top: -40,
        right: 10,
        bottom: 20,
        left: 10,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 7,
        columnWidth: "45%",
        distributed: true,
        borderRadiusApplication: "end",
      },
    },
    tooltip: {
      y: {
        formatter: function (val: number, { dataPointIndex, w }) {
          return `${w.globals.labels[dataPointIndex]} : ${val}`;
        },
      },
    },
  } as ApexOptions);

  return (
    <Chart
      type="bar"
      height={height}
      series={chartSeries}
      options={barChartOptions}
    />
  );
};

export default ActionlessBarChart;
