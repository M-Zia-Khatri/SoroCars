import React from "react";
import NavMenu from "./components/NavMenu";

export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6 bg-white shadow-sm">
      <h1 className="text-lg font-semibold text-gray-800">Soro Cars</h1>
      <NavMenu />
      <div className="text-sm text-gray-500">Some info</div>
    </header>
  );
}
