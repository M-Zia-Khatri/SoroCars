import React, { useState } from "react";
import SearchInput from "@/components/SearchInput/SearchInput";
import ViewTable from "@/components/ViewTable/ViewTable";

export default function ViewStock() {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="text-xl font-semibold mb-2">View Stock</div>
      <SearchInput onChange={(val) => setSearch(val)} />
      <ViewTable val={search} saleType="Stock" />
    </>
  );
}
