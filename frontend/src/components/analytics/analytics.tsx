"use client";
import { cn } from "@/lib/utils";
import LineChart from "@/components/charts/line-chart";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DivProps } from "react-html-props";

const Analytics = ({ className, ...props }: DivProps) => {
  return (
    <div
      className={cn("shadow border border-border rounded-2xl", className)}
      {...props}
    >
      <div className="flex items-center justify-between mb-10">
        <div className="flex flex-wrap">
          {analytics.map((item, ind) => (
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
          chartSeries={[{ name: "Sales", data: [6, 15, 10, 17, 20, 10, 15] }]}
          chartCategories={["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]}
        />
      </div>
    </div>
  );
};

const analytics = [
  { title: "Users", count: "12,060", result: 12.5 },
  { title: "Sessions", count: "30,000", result: 5.56 },
  { title: "Bounce Rate", count: "53%", result: -1.5 },
  { title: "Session Duration", count: "3m 10s", result: -10.5 },
];

export default Analytics;
