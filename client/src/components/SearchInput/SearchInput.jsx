import React from "react";
import { Input } from "../ui/input";

const SearchInput = ({ onChange }) => {
  return (
    <Input
      type="text"
      placeholder="Search..."
      className="border p-2 w-full"
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchInput;
