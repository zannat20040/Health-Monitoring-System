import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@material-tailwind/react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UserHealthTrack() {
  const { user } = useContext(AuthContext);

  const { isLoading, error, data } = useQuery({
    queryKey: ["my-health-data"],
    queryFn: () =>
      axios
        .get(`http://localhost:5000/api/healthdata/${user?.uid}`)
        .then((res) => res.data),
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  // Get the last data entry directly
  const latestData = data ? data[data.length - 1] : null;

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="text-center mt-6">
      <h1 className="text-2xl font-bold mb-8">Health Monitoring System</h1>
      <h1>Patient Id: {user?.uid}</h1>
      {latestData ? (
        <div>
          <p>Temperature: {latestData?.temperature} °F</p>
          <p>Oxygen Level: {latestData?.oxygenLevel}</p>
          <p>Blood Pressure: {latestData?.bloodPressure}</p>
          <div>
            <p>
              Body Temperature: {latestData?.pulseOximeter?.bodyTemperature} °F
            </p>
            <p>Device Battery: {latestData?.pulseOximeter?.deviceBattery}%</p>
            <p>
              Heart Rate Variability:{" "}
              {latestData?.pulseOximeter?.heartRateVariability}
            </p>
            <p>Perfusion Index: {latestData?.pulseOximeter?.perfusionIndex}</p>
            <p>Pulse Rate: {latestData?.pulseOximeter?.pulseRate}</p>
            <p>
              Respiration Rate: {latestData?.pulseOximeter?.respirationRate}
            </p>
            <p>Signal Quality: {latestData?.pulseOximeter?.signalQuality}</p>
            <p>SpO2: {latestData?.pulseOximeter?.spo2}%</p>
          </div>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
