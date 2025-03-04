
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface Column<T> {
  header: string;
  accessorKey: keyof T;
  cell?: (info: { row: T }) => ReactNode;
}

interface DataTableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  className?: string;
  isLoading?: boolean;
}

export function DataTable<T>({
  title,
  columns,
  data,
  className,
  isLoading = false,
}: DataTableProps<T>) {
  return (
    <Card className={cn("glass-card overflow-hidden p-6", className)}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-medium">{title}</h3>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="h-8 w-full animate-pulse rounded-md bg-gray-100"></div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 w-full animate-pulse rounded-md bg-gray-50"></div>
          ))}
        </div>
      ) : (
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column.header} className="font-medium">
                    {column.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length > 0 ? (
                data.map((row, i) => (
                  <TableRow key={i} className="group transition-colors hover:bg-muted/30">
                    {columns.map((column) => (
                      <TableCell key={column.header}>
                        {column.cell ? column.cell({ row }) : String(row[column.accessorKey] || "")}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}
