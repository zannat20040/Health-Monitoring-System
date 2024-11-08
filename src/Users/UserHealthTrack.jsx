import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { CiTempHigh } from "react-icons/ci";
import { SiOxygen } from "react-icons/si";
import { FaDroplet } from "react-icons/fa6";
import { FaHeartbeat } from "react-icons/fa";
import { IoIosPulse } from "react-icons/io";
import { RiLungsLine } from "react-icons/ri";

// Helper function to determine risk level and color
const getRiskColor = (parameter, value) => {
  switch (parameter) {
    case "temperature":
      return value < 97 || value > 99 ? "text-red-500" : "text-green-500";
    case "oxygenLevel":
    case "spo2":
      return value < 92
        ? "text-red-500"
        : value < 95
        ? "text-yellow-500"
        : "text-green-500";
    case "bloodPressure":
      return value < 90
        ? "text-red-500"
        : value > 120
        ? "text-yellow-500"
        : "text-green-500";
    case "heartRateVariability":
      return value < 20
        ? "text-red-500"
        : value > 40
        ? "text-yellow-500"
        : "text-green-500";
    case "pulseRate":
      return value < 60 || value > 100 ? "text-red-500" : "text-green-500";
    case "respirationRate":
      return value < 12 || value > 20 ? "text-red-500" : "text-green-500";
    default:
      return "text-gray-500";
  }
};

// Function to determine health condition based on value
const getHealthCondition = (parameter, value) => {
  switch (parameter) {
    case "temperature":
      return value < 97 || value > 99 ? "Abnormal" : "Normal";
    case "oxygenLevel":
    case "spo2":
      if (value < 92) return "Critical";
      if (value < 95) return "Low";
      return "Normal";
    case "bloodPressure":
      if (value < 90) return "Low Blood Pressure";
      if (value > 120) return "High Blood Pressure";
      return "Normal";
    case "heartRateVariability":
      if (value < 20) return "Very Low";
      if (value > 40) return "Normal";
      return "Low";
    case "pulseRate":
      return value < 60 || value > 100 ? "Abnormal" : "Normal";
    case "respirationRate":
      return value < 12 || value > 20 ? "Abnormal" : "Normal";
    default:
      return "Unknown";
  }
};

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

  const latestData = data ? data[data.length - 1] : null;

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="text-center mt-6 max-w-7xl mx-auto px-5">
      <h1 className="text-2xl font-bold mb-8 text-violet capitalize">
        Continuously monitor your health
      </h1>
      {latestData ? (
        <div className="overflow-x-auto">
          <table className="table lg:w-1/2 mx-auto">
            <thead>
              <tr>
                <th></th>
                <th>Parameter</th>
                <th className="text-center">Result</th>
                <th className="text-center">Health Condition</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <CiTempHigh className="text-yellow-900 text-3xl" />
                </th>
                <td>Temperature</td>
                <td className="text-center">{latestData?.temperature} °F</td>
                <td className={`${getRiskColor("temperature", latestData?.temperature)} text-center`}>
                  ● {getHealthCondition("temperature", latestData?.temperature)}
                </td>
              </tr>
              <tr>
                <th>
                  <SiOxygen className="text-green-700 text-xl" />
                </th>
                <td>Oxygen Level</td>
                <td className="text-center">{latestData?.oxygenLevel}</td>
                <td className={`${getRiskColor("oxygenLevel", latestData?.oxygenLevel)} text-center`}>
                  ● {getHealthCondition("oxygenLevel", latestData?.oxygenLevel)}
                </td>
              </tr>
              <tr>
                <th>
                  <FaDroplet className="text-red-700 text-xl" />
                </th>
                <td>Blood Pressure</td>
                <td className="text-center">{latestData?.bloodPressure}</td>
                <td className={`${getRiskColor("bloodPressure", latestData?.bloodPressure)} text-center`}>
                  ● {getHealthCondition("bloodPressure", latestData?.bloodPressure)}
                </td>
              </tr>
              <tr>
                <th>
                  <FaHeartbeat className="text-red-700 text-xl" />
                </th>
                <td>Heart Rate Variability</td>
                <td className="text-center">
                  {latestData?.pulseOximeter?.heartRateVariability}
                </td>
                <td className={`${getRiskColor("heartRateVariability", latestData?.pulseOximeter?.heartRateVariability)} text-center`}>
                  ● {getHealthCondition("heartRateVariability", latestData?.pulseOximeter?.heartRateVariability)}
                </td>
              </tr>
              <tr>
                <th>
                  <IoIosPulse className="text-red-700 text-xl" />
                </th>
                <td>Pulse Rate</td>
                <td className="text-center">
                  {latestData?.pulseOximeter?.pulseRate}
                </td>
                <td className={`${getRiskColor("pulseRate", latestData?.pulseOximeter?.pulseRate)} text-center`}>
                  ● {getHealthCondition("pulseRate", latestData?.pulseOximeter?.pulseRate)}
                </td>
              </tr>
              <tr>
                <th>
                  <RiLungsLine className="text-blue-300 text-xl" />
                </th>
                <td>Respiration Rate</td>
                <td className="text-center">
                  {latestData?.pulseOximeter?.respirationRate}
                </td>
                <td className={`${getRiskColor("respirationRate", latestData?.pulseOximeter?.respirationRate)} text-center`}>
                  ● {getHealthCondition("respirationRate", latestData?.pulseOximeter?.respirationRate)}
                </td>
              </tr>
              <tr>
                <th>
                  <RiLungsLine className="text-yellow-900 text-xl" />
                </th>
                <td>SpO2</td>
                <td className="text-center">
                  {latestData?.pulseOximeter?.spo2}
                </td>
                <td className={`${getRiskColor("spo2", latestData?.pulseOximeter?.spo2)} text-center`}>
                  ● {getHealthCondition("spo2", latestData?.pulseOximeter?.spo2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
