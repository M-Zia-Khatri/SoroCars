import React from "react";
import Content from "./Content/Content";
import Topbar from "./Topbar/Topbar";

export default function AuthenticatedAppRoot() {
  return (
    <>
      <Topbar />
      <Content />
    </>
  );
}
