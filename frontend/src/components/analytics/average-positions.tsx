import { cn } from "@/lib/utils";
import LineChart from "@/components/charts/line-chart";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { DivProps } from "react-html-props";

const AveragePositions = ({ className, ...props }: DivProps) => {
  return (
    <div
      className={cn("shadow border border-border rounded-2xl", className)}
      {...props}
    >
      <div className="p-6 flex items-start justify-between mb-[30px]">
        <div>
          <div className="flex items-center gap-2">
            <h6 className="font-semibold">5.8</h6>
            <p className="text-sm font-medium">+2.5%</p>
          </div>
          <p className="text-sm text-secondary-foreground">Average Positions</p>
        </div>

        <Button variant="secondary" size="icon" className="w-8 h-8">
          <MoreHorizontal className="w-4 h-4 text-icon" />
        </Button>
      </div>

      <LineChart
        colors={["hsl(var(--primary))"]}
        chartSeries={[{ name: "Sales", data: [6, 15, 10, 17] }]}
        chartCategories={["Sep 20", "Sep 21", "Sep 22", "Sep 23"]}
      />
    </div>
  );
};

export default AveragePositions;
