"use client";
import { cn } from "@/lib/utils";
import LineChart from "@/components/charts/line-chart";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DivProps } from "react-html-props";

const Analytics = ({ className, analytics, ...props }: any) => {
  return (
    <div
      className={cn("shadow border border-border rounded-2xl", className)}
      {...props}
    >
      <div className="flex items-center justify-between mb-10">
        <div className="flex flex-wrap">
          {analytics?.details.map((item:any, ind:number) => (
            <div key={ind} className="p-6 hover:bg-card">
              <p className="text-sm font-medium text-secondary-foreground">
                {item.title}
              </p>
              <p className="text-xl font-semibold">{item.count}</p>
              <p
                className={cn(
                  "text-sm font-medium mt-2",
                  item.result > 0 ? "text-emerald-500" : "text-red-500"
                )}
              >
                {item.result > 0 ? "+" : ""}
                {item.result + "%"}
              </p>
            </div>
          ))}
        </div>

        <div className="p-6">
          <Button variant="secondary" size="icon" className="w-8 h-8">
            <MoreHorizontal className="w-4 h-4 text-icon" />
          </Button>
        </div>
      </div>

      <div className="pr-3">
        <LineChart
          height={300}
          colors={["hsl(var(--primary))"]}
          chartSeries={analytics?.chartSeries}
          chartCategories={analytics?.chartCategories}
        />
      </div>
    </div>
  );
};


export default Analytics;
