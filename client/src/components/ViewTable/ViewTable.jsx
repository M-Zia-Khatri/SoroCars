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
import { APIUrls } from "@/constants/urlConstants";

// Fetch cars data and filter by sale_type

export default function ViewTable({ val, saleType }) {
  const fetchCars = async ({ queryKey }) => {
    const [_key, saleType] = queryKey;

    const response = await fetch(
      `${APIUrls.CARS_DETAILS_URL}/?sale_type=${saleType}${`&search=${val}`}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }

    return response.json(); // Expected to return an array
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cars-details", saleType, val],
    queryFn: fetchCars,
    enabled: !!saleType,
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Failed to load data.</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">
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
            <TableHead>Ajency</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <TableRow key={item.id || index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.User.Name || "-"}</TableCell>
                <TableCell>{item.Invoice_Id || "-"}</TableCell>
                <TableCell>{item.Stock_Id || "-"}</TableCell>
                <TableCell>{item.Adjustment || "-"}</TableCell>
                <TableCell>{item.Amount || "-"}</TableCell>
                <TableCell>{item.Status || "-"}</TableCell>
                <TableCell>{item.Sale_type || "-"}</TableCell>
                <TableCell>{item.Agency || "-"}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={8}
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
