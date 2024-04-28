"use client";

import dynamic from "next/dynamic";
import merge from "lodash.merge";
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

const AreaChart = (props: Props) => {
  const {
    height = 300,
    colors,
    strokeWidth = 2,
    chartSeries,
    chartCategories,
  } = props;

  const areaChartOptions = merge(baseChartOptions(), {
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: "hsl(var(--border))",
    },
    colors: colors,
    stroke: { show: true, width: strokeWidth },
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
      labels: {
        show: true,
        style: { colors: "hsl(var(--secondary-foreground))" },
      },
    },
    yaxis: {
      min: 0,
      show: true,
      max: 50000,
      tickAmount: 5,
      labels: {
        formatter: (value) => value / 1000 + "K",
        style: { colors: "hsl(var(--secondary-foreground))" },
      },
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

export default AreaChart;
