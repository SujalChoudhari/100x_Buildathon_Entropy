import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { nanoid } from "nanoid";
import { MoreHorizontal } from "lucide-react";
import { DivProps, SVGProps } from "react-html-props";
import ActionlessLineChart from "@/components/charts/actionless-line-chart";
import Dribble from "@/components/icons/dribble";
import Linkedin from "@/components/icons/linkedin";
import Twitter from "@/components/icons/twitter";
import { Button } from "@/components/ui/button";

const Visitor = ({ className, analytics, ...props }: any) => {


  interface visitorsProps {
    id: string;
    title: string;
    category: string;
    rate: number;
    visit: number;
    Icon: (props: SVGProps) => JSX.Element;
    chart: { series: any[] };
  }

  const visitors: visitorsProps[] = [
    {
      id: nanoid(),
      Icon: Dribble,
      title: "Dribbble",
      category: "Community",
      rate: 70,
      visit: 12350,
      chart: {
        series: [analytics?.chartSeries] || [],
      },
    },
    {
      id: nanoid(),
      Icon: Linkedin,
      title: "Linked In",
      category: "Social Media",
      rate: 60,
      visit: 10275,
      chart: {
        series: [analytics?.chartSeries2] || [],
      },
    },
    {
      id: nanoid(),
      Icon: Twitter,
      title: "Twitter",
      category: "Social Media",
      rate: 50,
      visit: 20348,
      chart: {
        series: [analytics?.chartSeries3] || [],
      },
    },
  ];

  return (
    <div
      className={cn("shadow border border-border rounded-2xl", className)}
      {...props}
    >
      <div className="p-6 pb-2 flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h6 className="font-semibold">{analytics?.total}</h6>
            <span className="text-xs font-medium text-emerald-500 px-1 py-0.5 rounded-sm bg-card">
              {analytics?.inPercent}
            </span>
          </div>
          <p className="text-sm text-secondary-foreground">Average Positions</p>
        </div>

        <Button variant="secondary" size="icon" className="w-8 h-8">
          <MoreHorizontal className="w-4 h-4 text-icon" />
        </Button>
      </div>

      <Table className="mb-6">
        <TableHeader>
          <TableRow className="text-sm font-medium text-secondary-foreground">
            <TableHead className="h-[76px] px-6">REFERRAL SOURCE</TableHead>
            <TableHead className="h-[76px] px-6 text-center">
              BOUNDCE RATE (%)
            </TableHead>
            <TableHead className="h-[76px] px-6 text-center">VISIT</TableHead>
            <TableHead className="h-[76px] px-6 text-right">CHART</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {analytics && visitors.map((invoice) => (
            <TableRow
              key={invoice.id}
              className="text-sm font-medium border-border"
            >
              <TableCell className="px-5 py-5 flex items-center">
                <invoice.Icon />
                <div className="ml-3">
                  <p className="font-semibold">{invoice.title}</p>
                  <p className="text-xs text-secondary-foreground">
                    {invoice.category}
                  </p>
                </div>
              </TableCell>

              <TableCell className="px-5 py-5 text-center">
                {invoice.rate}%
              </TableCell>
              <TableCell className="px-5 py-5 text-center">
                {invoice.visit}
              </TableCell>

              <TableCell className="px-5 py-5 max-w-[60px]">
                <ActionlessLineChart
                  height={20}
                  colors={["#10B981"]}
                  strokeWidth={1}
                  chartSeries={invoice?.chart?.series}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Visitor;
