"use client";

import merge from "lodash.merge";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { baseChartOptions } from "@/lib/base-chart-options";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  height?: number;
  colors: string[];
  columnRadius?: number;
  columnWidth?: string;
  chartSeries: { name: string; data: number[] }[];
  chartCategories: string[];
}

const BarChart = (props: Props) => {
  const {
    height = 275,
    colors,
    columnRadius = 4,
    columnWidth = "43%",
    chartSeries,
    chartCategories,
  } = props;

  // REACT CHART OPTIONS
  const chartOptions = merge(baseChartOptions(), {
    colors: colors,
    grid: {
      show: true,
      strokeDashArray: 3,
      borderColor: "hsl(var(--border))",
    },

    xaxis: {
      crosshairs: { show: false },
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

    tooltip: {
      x: { show: false },
      y: { formatter: (val: number) => `$${val}` },
    },

    chart: { stacked: false },
    stroke: {
      show: true,
      width: 3,
      colors: ["transparent"],
    },

    legend: {
      show: true,
      position: "top",
      fontSize: "14px",
      itemMargin: { horizontal: 12 },
      // fontFamily: theme.typography.fontFamily,
      onItemClick: { toggleDataSeries: false },
      onItemHover: { highlightDataSeries: false },
      markers: { radius: 30, width: 8, height: 8 },
    },

    plotOptions: {
      bar: {
        borderRadius: columnRadius,
        columnWidth: columnWidth,
        borderRadiusApplication: "end",
      },
    },

    responsive: [
      {
        breakpoint: 550,
        options: {
          chart: { height: 450 },
          plotOptions: { bar: { horizontal: true } },
          xaxis: {
            min: 0,
            show: true,
            max: 50000,
            tickAmount: 5,
            labels: {
              formatter: (value: number) => value / 1000 + "K",
              style: { colors: "hsl(var(--secondary-foreground))" },
            },
          },
          yaxis: {
            show: true,
            labels: {
              style: {
                fontWeight: 500,
                colors: "hsl(var(--secondary-foreground))",
                // fontFamily: theme.typography.fontFamily,
              },
            },
          },
        },
      },
    ],
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

export default BarChart;
