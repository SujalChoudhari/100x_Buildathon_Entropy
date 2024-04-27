import { cn } from "@/lib/utils";
import { DivProps } from "react-html-props";
import worldMap from "@/__fakeData__/map/worldMap.json";
import { VectorMap } from "@south-paw/react-vector-maps";
import { Progress } from "@/components/ui/progress";
import SingleDot from "@/components/icons/single-dot";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

const SalesCountry = ({ className, ...props }: DivProps) => {
  return (
    <div
      className={cn("shadow border border-border rounded-2xl p-6", className)}
      {...props}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <h6 className="text-lg font-medium mb-2">Sales by Country</h6>
          <p className="text-sm text-secondary-foreground">Average Positions</p>
        </div>

        <Button variant="secondary" size="icon" className="w-8 h-8">
          <MoreHorizontal className="w-4 h-4 text-icon" />
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-9">
        <div className="w-full lg:w-[270px] flex flex-col gap-6">
          {queries.map((item, ind) => (
            <div
              key={ind}
              className="w-full lg:w-[270px] group flex items-center justify-between text-sm font-medium text-secondary-foreground hover:text-primary"
            >
              <div className="w-[100px] flex items-center">
                <SingleDot className="w-2 h-2 mr-2" />
                <span>{item.name}</span>
              </div>

              <div className="w-[calc(100%-100px)] flex items-center justify-between">
                <Progress
                  value={item.progress}
                  className="w-[calc(100%-40px)] h-2 bg-card [&>div]:bg-icon-muted group-hover:[&>div]:bg-primary"
                />

                <p className="w-10 text-right">{item.progress}%</p>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full h-full vectorMap relative">
          <VectorMap {...worldMap} />
        </div>
      </div>
    </div>
  );
};

const queries = [
  { name: "Australia", progress: 72 },
  { name: "USA", progress: 62 },
  { name: "RSA", progress: 92 },
  { name: "Brazil", progress: 7 },
  { name: "Japan", progress: 40 },
  { name: "UAE", progress: 55 },
  { name: "Thailand", progress: 50 },
];

export default SalesCountry;
