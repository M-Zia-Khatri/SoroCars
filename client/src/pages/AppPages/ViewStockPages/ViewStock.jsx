import React, { useState } from "react";
import SearchInput from "@/components/SearchInput/SearchInput";
import ViewTable from "@/components/ViewTable/ViewTable";

export default function ViewStock() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">View Stock</h2>
      <SearchInput onChange={(val) => setSearch(val)} />
      <ViewTable val={search} saleType="Stock" />
    </div>
  );
}
