import React, { useMemo, useRef, useState } from "react";
import SearchInput from "@/components/searchInput/SearchInput";
import ViewTable from "@/components/ViewTable/ViewTable";
import { fetchCars } from "@/API/cars";
import { useQuery } from "@tanstack/react-query";

export default function ViewStock() {
  const inputRef = useRef(null); // search input ref
  const [search, setSearch] = useState("");

  const saleType = useMemo(() => "Stock", []);
  const THColumns = useMemo(
    () => [
      "Agent",
      "Invoice Id",
      "Stock Id",
      "Adjustment",
      "Amount",
      "Status",
      "Sale Type",
      "Agency",
    ],
    []
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["cars-details", saleType, search],
    queryFn: fetchCars,
    retry: false,
    enabled: !!saleType,
  });

  const handleSearch = () => {
    const inputValue = inputRef.current?.value || "";
    setSearch(inputValue);
  };

  if (isLoading) return <div className="p-4">Loading...</div>;

  return (
    <div className="space-y-4">
      <div
        className={`flex items-center gap-2 ${isError ? "hidden" : "block"}`}
      >
        <SearchInput inputRef={inputRef} />
        <button
          onClick={handleSearch}
          className="bg-primary text-white rounded px-4 py-2"
        >
          Search
        </button>
      </div>
      <ViewTable THColumns={THColumns} data={data?.cars} saleType={saleType} />
    </div>
  );
}
