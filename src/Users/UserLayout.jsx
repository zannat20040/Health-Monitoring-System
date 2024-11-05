import React from "react";
import HMSNavbar from "../Component/HMSNavbar";
import { Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <div>
      <HMSNavbar />
      <Outlet />
    </div>
  );
}