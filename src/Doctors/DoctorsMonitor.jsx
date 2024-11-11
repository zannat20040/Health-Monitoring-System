import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Outlet } from "react-router-dom";
import HMSNavbar from "../Component/HMSNavbar";
import HMSFooter from "../Component/HMSFooter";

export default function DoctorsMonitor() {
  return (
    <div>
      <HMSNavbar />
      <Outlet />
      <HMSFooter />
    </div>
  );
}
