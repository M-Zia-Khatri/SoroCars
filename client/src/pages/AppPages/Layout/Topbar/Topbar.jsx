import * as React from "react";
import NavMenu from "./components/NavMenu";
export default function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b">
      <h1>Soro Cars</h1>
      <NavMenu />
      <div>some things</div>
    </header>
  );
}
