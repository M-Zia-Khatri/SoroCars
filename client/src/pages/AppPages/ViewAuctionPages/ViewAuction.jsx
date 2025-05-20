import SearchInput from "@/components/SearchInput/SearchInput";
import ViewTable from "@/components/ViewTable/ViewTable";
import React, { useState } from "react";

export default function ViewAuction() {
  const [search, setSearch] = useState("");

  return (
    <>
      <div>View Auction</div>
      <SearchInput onChange={(val) => setSearch(val)} />
      <ViewTable val={search} saleType={"Auction"} />
    </>
  );
}
