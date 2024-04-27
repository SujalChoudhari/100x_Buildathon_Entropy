"use client";

import merge from "lodash.merge";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { baseChartOptions } from "@/lib/base-chart-options";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  height?: number;
  colors: string[];
  strokeWidth?: number;
  chartSeries: { name: string; data: number[] }[];
  chartCategories: string[];
}

const ActionlessAreaChart = (props: Props) => {
  const {
    height = 120,
    colors,
    strokeWidth = 2,
    chartSeries,
    chartCategories,
  } = props;

  const areaChartOptions = merge(baseChartOptions(), {
    stroke: { show: true, width: strokeWidth },
    colors: colors,
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.8,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    xaxis: {
      categories: chartCategories,
      crosshairs: { show: true },
    },
  } as ApexOptions);

  return (
    <Chart
      type="area"
      height={height}
      series={chartSeries}
      options={areaChartOptions}
    />
  );
};

export default ActionlessAreaChart;
