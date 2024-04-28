import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DivProps, SVGProps } from "react-html-props";
import ActionlessDonutChart from "@/components/charts/actionless-donut-chart";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { nanoid } from "nanoid";
import Chrome from "@/components/icons/chrome";
import Opera from "@/components/icons/opera";
import Yahoo from "@/components/icons/yahoo";
import SingleDot from "@/components/icons/single-dot";

const SessionBrowser = ({ className, analytics, ...props }: any) => {
  return (
    <div
      className={cn("shadow border border-border rounded-2xl", className)}
      {...props}
    >
      <div className="p-6 pb-7 flex items-start justify-between">
        <p className="text-lg font-medium">Session by browser</p>

        <Button variant="secondary" size="icon" className="w-8 h-8">
          <MoreHorizontal className="w-4 h-4 text-icon" />
        </Button>
      </div>

      <ActionlessDonutChart
        height={160}
        colors={["#10B981", "#334155", "#94A3B8"]}
        labels={["Chrome", "Opera", "Yahoo!"]}
        chartSeries={[50, 30, 20]}
      />

      <Table className="mb-6 mt-7">
        <TableBody>
          {analytics && analytics.map((invoice: any) => (
            <TableRow
              key={invoice.id}
              className="text-sm font-medium border-border"
            >
              <TableCell className="px-6 py-3.5 flex items-center">
                {
                  invoice.icon == "Chrome" ? <Chrome className="w-5 h-5 mr-3" /> : invoice.icon == "Opera" ? <Opera className="w-5 h-5 mr-3" /> : <Yahoo className="w-5 h-5 mr-3" />
                }
                <p className="text-sm font-medium text-secondary-foreground">
                  {invoice.title}
                </p>
              </TableCell>

              <TableCell className="px-6 py-3.5 text-center">
                <div className="flex items-center">
                  <SingleDot
                    className={cn(
                      "w-2 h-2 mr-2",
                      invoice.title === "Chrome"
                        ? "text-primary"
                        : invoice.title === "Opera"
                          ? "text-emerald-500"
                          : invoice.title === "Yahoo"
                            ? "text-icon-muted"
                            : "text-card"
                    )}
                  />
                  {invoice.rate}%
                </div>
              </TableCell>
              <TableCell
                className={cn(
                  "text-end px-6 py-3.5",
                  invoice.visit > 0 ? "text-emerald-500" : "text-red-500"
                )}
              >
                {invoice.visit}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};


export default SessionBrowser;
