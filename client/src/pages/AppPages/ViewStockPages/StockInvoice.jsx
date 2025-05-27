import { fetchCarsCalculation } from "@/API/cars";
import ViewTable from "@/components/ViewTable/ViewTable";
import useSetting from "@/stores/settingStore";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";

export default function StockInvoice() {
  const { DollarValue: dollar } = useSetting();
  const saleType = useMemo(() => "Stock Invoice", []);
  const THColumns = useMemo(
    () => ["Invoice Id", "Stock Id", "Status", "Adjustment", "Amount", "Total"],
    []
  );
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cars-details", dollar],
    queryFn: fetchCarsCalculation,
    enabled: !!dollar,
  });

  if (isLoading) return <div className="p-4">Loading...</div>;
  if (isError)
    return <div className="p-4 text-red-500">Failed to load data.</div>;

  return (
    <>
      <div className="text-xl font-semibold mb-4">Stock Invoice</div>
      <ViewTable data={data} THColumns={THColumns} saleType={saleType} />
    </>
  );
}
