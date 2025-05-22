import React from "react";
import { Input } from "../ui/input";

const SearchInput = ({ inputRef }) => {
  return (
    <Input
      type="text"
      placeholder="Search..."
      className="border p-2 w-full"
      ref={inputRef} // forward ref here
    />
  );
};

export default SearchInput;
