import { nanoid } from "nanoid";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";

type Props = HTMLAttributes<HTMLDivElement>;

const ToDoList = ({ className, ...props }: Props) => {
  return (
    <Card className={cn("", className)} {...props}>
      <div className="p-6 pb-5 flex items-center justify-between">
        <p className="text-lg font-medium">Deal Status</p>

        <Button variant="secondary" size="icon" className="w-8 h-8 rounded-md">
          <MoreHorizontal className="w-4 h-4 text-icon" />
        </Button>
      </div>

      <div className="px-6 py-3 flex items-center">
        <p className="font-medium text-secondary-foreground pr-3">75%</p>

        <Progress
          value={65}
          className="w-full h-2 bg-icon-muted [&>div]:bg-emerald-500"
        />
      </div>

      <Table>
        <TableBody>
          {todos.map(({ id, title }) => (
            <TableRow key={id} className="text-sm font-medium border-border">
              <TableCell className="px-6 py-2.5">
                <div className="flex items-center space-x-2">
                  <Checkbox id={id} />
                  <label
                    htmlFor={id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {title}
                  </label>
                </div>
              </TableCell>

              <TableCell className="px-6 py-2.5 text-right">
                <Button
                  size="icon"
                  variant="ghost"
                  className="w-8 h-8 rounded-md"
                >
                  <MoreVertical className="w-4 h-4 text-icon" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

// CUSTOM DUMMY DATA SET
const todos = [
  { id: nanoid(), title: "Design a poster for a company", complete: true },
  { id: nanoid(), title: "Analyze Data", complete: false },
  { id: nanoid(), title: "YouTube campaign", complete: false },
  { id: nanoid(), title: "Assaign employee", complete: false },
];

export default ToDoList;
