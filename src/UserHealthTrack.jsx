import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function UserHealthTrack() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["my-health-data"],
    queryFn: () =>
      axios
        .get("https://health-monitoring-system-backend.vercel.app/api/get-data")
        .then((res) => res.data), // Return res.data here
  });

  console.log(data);
  const sortedData = data ? data.sort((a, b) => b.timestamp - a.timestamp) : [];
  const my_data = sortedData?.length > 0 ? sortedData[0] : null;

  console.log(my_data);
  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Health Monitoring System</h1>
      {my_data ? (
        <div>
          <p>Temperature: {my_data.temperature} °F</p>
          <p>Oxygen Level: {my_data.oxygenLevel}</p>
          <p>Blood Pressure: {my_data.bloodPressure}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
