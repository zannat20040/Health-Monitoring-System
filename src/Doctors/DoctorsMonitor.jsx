import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function DoctorsMonitor() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["my-health-data"],
    queryFn: () =>
      axios.get(`http://localhost:5000/api/get-data`).then((res) => res.data),
    refetchInterval: 5000,
  });

  return <div></div>;
}
