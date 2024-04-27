"use client";

import merge from "lodash.merge";
import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { ApexOptions } from "apexcharts";
import { baseChartOptions } from "@/lib/base-chart-options";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  width?: string;
  height?: number;
  colors: string[];
  labels: string[];
  legend?: boolean;
  strokeWidth?: number;
  dataIndicator?: boolean;
  donutSize?: string;
  chartSeries: number[];
}

const DonutChart = (props: Props) => {
  const { theme } = useTheme();
  const {
    colors,
    legend = false,
    labels,
    height = 200,
    width = "100%",
    strokeWidth = 2,
    donutSize = "80%",
    dataIndicator = true,
    chartSeries,
  } = props;

  const chartOptions = merge(baseChartOptions(), {
    stroke: {
      width: strokeWidth,
      colors: [theme === "dark" ? "#1f2937" : "#fff"],
    },
    labels: labels,
    colors: colors,
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: donutSize,

          labels: {
            show: true,
            total: {
              show: dataIndicator,
              showAlways: true,
              fontSize: "14px",
              fontWeight: 500,
              color: "hsl(var(--secondary-foreground))",
              formatter: function (w) {
                return (
                  w.globals.seriesTotals.reduce(
                    (a: number, b: number) => a + b
                  ) + "%"
                );
              },
            },
            name: { offsetY: 23 },
            value: {
              show: true,
              offsetY: -15,
              fontSize: "20px",
              fontWeight: 600,
              color: "hsl(var(--secondary-foreground))",
            },
          },
        },
      },
    },
    tooltip: {
      style: { fontSize: "14px" },
      y: { title: (name: string) => name, formatter: (val) => `${val}` },
    },

    legend: { show: legend, position: "bottom", fontSize: "14px" },
  } as ApexOptions);

  return (
    <div>
      <Chart
        type="donut"
        width={width}
        height={height}
        series={chartSeries}
        options={chartOptions}
      />
    </div>
  );
};

export default DonutChart;
