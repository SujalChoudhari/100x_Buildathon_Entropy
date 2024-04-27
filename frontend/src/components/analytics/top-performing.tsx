import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { DivProps } from "react-html-props";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { nanoid } from "nanoid";

const TopPerforming = ({ className, ...props }: DivProps) => {
  return (
    <div
      className={cn("shadow border border-border rounded-2xl", className)}
      {...props}
    >
      <div className="p-6 flex items-start justify-between">
        <div>
          <h6 className="text-lg font-medium mb-1">Top performing pages</h6>
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
            <TableHead className="py-2 px-6">VIEWS</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {performings.map((item) => (
            <TableRow
              key={item.id}
              className="text-sm font-medium border-border"
            >
              <TableCell className="px-6 py-5 text-secondary-foreground">
                {item.page}
              </TableCell>
              <TableCell className="px-6 py-5">
                <span className="mr-2">{item.click}</span>
                <span
                  className={
                    item.click2 > 0 ? "text-red-500" : "text-emerald-500"
                  }
                >
                  {item.click2}
                </span>
              </TableCell>
              <TableCell className="px-6 py-5">{item.views}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

const performings = [
  {
    id: nanoid(),
    page: "https://onion.com",
    click: 1369,
    views: "50M",
    click2: -165,
  },
  {
    id: nanoid(),
    page: "https://onion/analytic.com",
    click: 1003,
    views: "28M",
    click2: 528,
  },
  {
    id: nanoid(),
    page: "https://onion/ecommerce.com",
    click: 1987,
    views: "63M",
    click2: 898,
  },
  {
    id: nanoid(),
    page: "https://onion/crm.com",
    click: 1462,
    views: "50M",
    click2: -369,
  },
  {
    id: nanoid(),
    page: "https://onion/finance.com",
    click: 986,
    views: "70M",
    click2: -479,
  },
  {
    id: nanoid(),
    page: "https://onion/projectm.com",
    click: 1028,
    views: "75M",
    click2: 669,
  },
  {
    id: nanoid(),
    page: "https://onion/logistics.com",
    click: 369,
    views: "25M",
    click2: 215,
  },
];

export default TopPerforming;
