import { cn } from "@/lib/utils";
import { DivProps } from "react-html-props";
import ActionlessAreaChart from "@/components/charts/actionless-area-chart";

const CompletedGoals = ({ className, analytics, ...props }: any) => {
  return (
    <div
      className={cn("shadow border border-border rounded-2xl px-2 pb-2" , className)}
      {...props}
    >
      <div className="p-6 pb-2">
        <div className="flex items-center gap-2 mb-1">
          <h6 className="text-xl font-semibold">{analytics?.number}</h6>
          <span className="text-xs font-medium text-emerald-500 px-1 py-0.5 rounded-sm bg-card">
            +2.5%
          </span>
        </div>
        <p className="text-sm text-secondary-foreground">Completed Goals</p>
      </div>

      <ActionlessAreaChart
        height={130}
        colors={["hsl(var(--primary))"]}
        chartCategories={["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri","Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]}
        chartSeries={[{ name: "Tasks", data: analytics?.total }]}
      />
    </div>
  );
};

export default CompletedGoals;
