import React from "react";
import HMSNavbar from "../Component/HMSNavbar";
import { Outlet } from "react-router-dom";
import HMSFooter from "../Component/HMSFooter";

export default function UserLayout() {
  return (
    <div>
      <HMSNavbar />
      <Outlet />
      <HMSFooter />
    </div>
  );
}
