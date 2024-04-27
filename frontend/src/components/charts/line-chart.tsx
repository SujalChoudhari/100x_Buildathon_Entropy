"use client";

import merge from "lodash.merge";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { baseChartOptions } from "@/lib/base-chart-options";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  grid?: boolean;
  height?: number;
  colors: string[];
  gridColor?: string;
  strokeWidth?: number;
  chartSeries: { name: string; data: number[] }[];
  chartCategories: string[];
  isLegend?: boolean;
  legendPosition?: "top" | "right" | "bottom" | "left";
  legendHorizontalPosition?: "left" | "right" | "center";
}

const LineChart = (props: Props) => {
  const {
    grid = true,
    height = 330,
    colors,
    isLegend = true,
    legendPosition = "top",
    legendHorizontalPosition = "center",
    gridColor = "hsl(var(--border-hover))",
    strokeWidth = 2,
    chartSeries,
    chartCategories,
  } = props;

  const chartOptions = merge(baseChartOptions(), {
    colors: colors,
    grid: {
      show: grid,
      strokeDashArray: 3,
      borderColor: gridColor,
      padding: {
        top: 12,
        right: 0,
        bottom: 0,
        left: 0,
      },
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
      tickAmount: 5,
      labels: {
        // formatter: (value) => value / 1000 + "K",
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
      width: strokeWidth,
    },

    legend: {
      show: isLegend,
      position: legendPosition,
      fontSize: "14px",
      horizontalAlign: legendHorizontalPosition,
      itemMargin: { horizontal: 12 },
      // fontFamily: theme.typography.fontFamily,
      onItemClick: { toggleDataSeries: false },
      onItemHover: { highlightDataSeries: false },
      markers: { radius: 30, width: 8, height: 8 },
      labels: {
        colors: colors,
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: "43%",
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
      type="line"
      width="100%"
      height={height}
      series={chartSeries}
      options={chartOptions}
    />
  );
};

export default LineChart;
