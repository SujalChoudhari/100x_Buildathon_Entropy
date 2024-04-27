import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { nanoid } from "nanoid";
  import { Card } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { MoreHorizontal } from "lucide-react";
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
  import { cn } from "@/lib/utils";
  import { HTMLAttributes } from "react";
  
  type Props = HTMLAttributes<HTMLDivElement>;
  
  const RecentLeads = ({ className, ...props }: Props) => {
    return (
      <Card className={cn("", className)} {...props}>
        <div className="p-6 pb-1 flex items-center justify-between">
          <p className="text-lg font-medium">Recent Leads</p>
  
          <Button variant="secondary" size="icon" className="w-8 h-8 rounded-md">
            <MoreHorizontal className="w-4 h-4 text-icon" />
          </Button>
        </div>
  
        <Table>
          <TableHeader>
            <TableRow className="text-sm font-medium text-secondary-foreground">
              <TableHead className="py-6 px-6">NAME</TableHead>
              <TableHead className="py-6 px-6">EMAIL OR PHONE</TableHead>
              <TableHead className="py-6 px-6">STATUS</TableHead>
              <TableHead className="py-6 px-6 text-end">ACTION</TableHead>
            </TableRow>
          </TableHeader>
  
          <TableBody>
            {deals.map((item) => (
              <TableRow
                key={item.id}
                className="text-sm font-medium border-border"
              >
                <TableCell className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-9 h-9">
                      <AvatarImage src={item.user.image} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{item.user.name}</p>
                      <p className="text-xs mt-1">{item.user.designation}</p>
                    </div>
                  </div>
                </TableCell>
  
                <TableCell className="px-6 py-4">{item.email}</TableCell>
  
                <TableCell className="px-6 py-4">${item.dealValue}</TableCell>
  
                <TableCell className="px-6 py-4 text-end">
                  <span
                    className={cn(
                      "px-1 py-0.5 rounded-sm bg-card text-xs text-icon-active",
                      item.status_type === "success"
                        ? "text-emerald-500"
                        : item.status_type === "error" && "text-red-500"
                    )}
                  >
                    {item.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  };
  
  // CUSTOM DUMMY DATA SET
  const deals = [
    {
      id: nanoid(),
      dealValue: 203500,
      status: "Deal won",
      status_type: "success",
      email: "astole@gmail.com",
      user: {
        name: "Astole Banne",
        designation: "Sales Manager",
        image: "/assets/avatars/Ellipse-1.png",
      },
    },
    {
      id: nanoid(),
      dealValue: 283500,
      status: "Stuck",
      status_type: "error",
      email: "taslon@gmail.com",
      user: {
        name: "Lisa Bee",
        designation: "Sales Manager",
        image: "/assets/avatars/Ellipse-2.png",
      },
    },
    {
      id: nanoid(),
      dealValue: 243500,
      status: "Pending",
      status_type: "warning",
      email: "tofan@gmail.com",
      user: {
        name: "Stuward Canne",
        designation: "Sales Manager",
        image: "/assets/avatars/Ellipse-3.png",
      },
    },
  ];
  
  export default RecentLeads;
  