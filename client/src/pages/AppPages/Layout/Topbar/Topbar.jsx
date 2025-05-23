import React from "react";
import NavMenu from "./components/NavMenu";
import Settings from "@/components/settingCom/Settings";


export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6 bg-white shadow-sm">
      <h1 className="text-lg font-semibold text-gray-800">Soro Cars</h1>
      <NavMenu />

      {/* Sheet Example */}
      <Settings />
      
    </header>
  );
}
