import { cn } from "@/lib/utils";
import { DivProps } from "react-html-props";
import ActionlessBarChart from "@/components/charts/actionless-bar-chart";

const CompletedRates = ({ className, analytics, ...props }: any) => {
  return (
    <div
      className={cn("shadow border border-border rounded-2xl", className)}
      {...props}
    >
      <div className="p-6 pb-0">
        <div className="flex items-center gap-2 mb-1">
          <h6 className="text-xl font-semibold">{analytics?.number}</h6>
          <span className="text-xs font-medium text-emerald-500 px-1 py-0.5 rounded-sm bg-card">
            {analytics?.smallNo}
          </span>
        </div>
        <p className="text-sm text-secondary-foreground">Completed Rates</p>
      </div>

      <ActionlessBarChart
        height={100}
        colors={["hsl(var(--primary))"]}
        chartCategories={["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]}
        chartSeries={[{ name: "Tasks", data: analytics?.perday }]}
      />
    </div>
  );
};

export default CompletedRates;
