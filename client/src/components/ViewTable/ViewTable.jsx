import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchCars } from "@/api/cars";

export default function ViewTable({ val, saleType }) {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cars-details", saleType, val],
    queryFn: fetchCars,
    enabled: !!saleType,
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Failed to load data.</div>;

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-semibold">
        Car Details (Sale Type: <span className="capitalize">{saleType}</span>)
      </h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.No</TableHead>
            <TableHead>Agent Name</TableHead>
            <TableHead>Invoice Id</TableHead>
            <TableHead>Stock Id</TableHead>
            <TableHead>Adjustment</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sale Type</TableHead>
            <TableHead>Agency</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={item.id ?? index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item?.User?.Name ?? "-"}</TableCell>
                <TableCell>{item?.Invoice_Id ?? "-"}</TableCell>
                <TableCell>{item?.Stock_Id ?? "-"}</TableCell>
                <TableCell>{item?.Adjustment ?? "-"}</TableCell>
                <TableCell>{item?.Amount ?? "-"}</TableCell>
                <TableCell>{item?.Status ?? "-"}</TableCell>
                <TableCell>{item?.Sale_type ?? "-"}</TableCell>
                <TableCell>{item?.Agency ?? "-"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={9}
                className="text-center text-muted-foreground"
              >
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
