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
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DivProps } from "react-html-props";

const TopQueries = ({ className, ...props }: DivProps) => {
  return (
    <div
      className={cn("shadow border border-border rounded-2xl", className)}
      {...props}
    >
      <div className="p-6 flex items-start justify-between">
        <div>
          <h6 className="text-lg font-medium mb-1">Top Queries</h6>
          <p className="text-sm text-secondary-foreground">
            Counted in Millions
          </p>
        </div>

        <Button variant="secondary" size="icon" className="w-8 h-8">
          <MoreHorizontal className="w-4 h-4 text-icon" />
        </Button>
      </div>

      <Table className="mb-6">
        <TableHeader>
          <TableRow className="text-sm font-medium text-secondary-foreground">
            <TableHead className="py-2 px-6">PAGES</TableHead>
            <TableHead className="py-2 px-6">CLICKS</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {queries.map((item) => (
            <TableRow
              key={item.id}
              className="text-sm font-medium border-border"
            >
              <TableCell className="px-6 py-5 text-secondary-foreground">
                {item.keyword}
              </TableCell>

              <TableCell className="px-6 py-5 min-w-[240px] max-w-[240px]">
                <div className="flex items-center justify-between">
                  <p className="w-16 font-semibold">{item.click}</p>

                  <Progress
                    value={item.value}
                    className="w-[calc(100%-64px)] h-2 bg-card [&>div]:bg-icon-muted"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const queries = [
  { id: nanoid(), keyword: "Admin Dashboard", click: 1369, value: 90 },
  { id: nanoid(), keyword: "Top Admin Dashboard", click: 1003, value: 80 },
  { id: nanoid(), keyword: "Admin Panel", click: 1987, value: 95 },
  { id: nanoid(), keyword: "Analytics Dashboard", click: 1462, value: 85 },
  { id: nanoid(), keyword: "Minimal Dashboard", click: 986, value: 75 },
  { id: nanoid(), keyword: "Clean UI Template", click: 1028, value: 90 },
  { id: nanoid(), keyword: "Logistics Dashboard", click: 369, value: 87 },
];

export default TopQueries;
