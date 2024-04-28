"use client";

import merge from "lodash.merge";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { baseChartOptions } from "@/lib/base-chart-options";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  height?: number;
  colors: string[];
  bgColor: string;
  chartSeries: number[];
}

const RadialBarChart = (props: Props) => {
  const { height = 230, colors, bgColor, chartSeries } = props;

  const chartOptions = merge(baseChartOptions(), {
    labels: ["Audits"],
    colors: colors,
    plotOptions: {
      radialBar: {
        track: { show: false },
        dataLabels: { show: false },
        hollow: {
          margin: 15,
          size: "50%",
          background: bgColor,
          dropShadow: { enabled: true, opacity: 0.2 },
        },
      },
    },
    stroke: { lineCap: "round" },
    tooltip: { enabled: true, y: { formatter: (val) => `${val}` }, style: {} },
  } as ApexOptions);

  return (
    <Chart
      type="radialBar"
      height={height}
      series={chartSeries}
      options={chartOptions}
    />
  );
};

export default RadialBarChart;
