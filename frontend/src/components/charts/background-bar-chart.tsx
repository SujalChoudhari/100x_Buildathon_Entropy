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

const BackgroundBarChart = (props: Props) => {
  const { height = 275, colors, chartSeries, chartCategories } = props;

  // REACT CHART OPTIONS
  const chartOptions = merge(baseChartOptions(), {
    stroke: { width: 0 },
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: "hsl(var(--border))",
    },
    colors: colors,
    xaxis: {
      categories: chartCategories,
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

    plotOptions: {
      bar: {
        borderRadius: 9,
        columnWidth: "17%",
        borderRadiusApplication: "end",
        colors: {
          backgroundBarRadius: 9,
          backgroundBarOpacity: 0.4,
          backgroundBarColors: ["hsl(var(--icon-muted))"],
        },
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
      width="100%"
      height={height}
      options={chartOptions}
      series={chartSeries}
    />
  );
};

export default BackgroundBarChart;
