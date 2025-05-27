import { fetchCars } from "@/API/cars";
import SearchInput from "@/components/searchInput/SearchInput";
import ViewTable from "@/components/ViewTable/ViewTable";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useRef, useState } from "react";

export default function ViewAuction() {
  const inputRef = useRef(null); // search input ref
  const [search, setSearch] = useState("");

  const saleType = useMemo(() => "Auction", []);
  const THColumns = useMemo(
    () => [
      "Agent Name",
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
  const { data = [], isLoading } = useQuery({
    queryKey: ["cars-details", saleType, search],
    queryFn: fetchCars,
    enabled: !!saleType,
  });

  const handleSearch = () => {
    const inputValue = inputRef.current?.value || "";
    setSearch(inputValue);
  };

  if (isLoading) return <div className="p-4">Loading...</div>;
  return (
    <>
      <div>View Auction</div>
      <div className="flex items-center gap-2">
        <SearchInput inputRef={inputRef} />
        <button
          onClick={handleSearch}
          className="bg-primary text-white rounded px-4 py-2"
        >
          Search
        </button>
      </div>

      <ViewTable data={data?.cars} saleType={"Auction"} THColumns={THColumns} />
    </>
  );
}
