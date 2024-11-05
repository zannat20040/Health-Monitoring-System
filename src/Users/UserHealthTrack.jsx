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
    <div className="text-center mt-6 max-w-7xl mx-auto px-5">
      <h1 className="text-2xl font-bold mb-8 text-violet capitalize">
        Continously monitor your health
      </h1>
      {latestData ? (
        <div className="overflow-x-auto">
          <table className="table lg:w-1/2 mx-auto">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* temp */}
              <tr>
                <th className="flex justify-end">
                  <CiTempHigh className="text-yellow-900 text-3xl " />
                </th>
                <td className="text-start">
                  Temparature:
                  <span className="font-normal">
                    {latestData?.temperature} °F
                  </span>{" "}
                </td>
              </tr>
              {/* oxygen level */}
              <tr>
                <th className="flex justify-end">
                  <SiOxygen className="text-green-700 text-xl " />
                </th>
                <td className="text-start">
                  Oxygen Level:
                  <span className="font-normal">
                    {latestData?.oxygenLevel}
                  </span>{" "}
                </td>
              </tr>
              {/* bloodPressure */}
              <tr>
                <th className="flex justify-end">
                  <FaDroplet className="text-red-700 text-xl " />
                </th>
                <td className="text-start">
                  Blood Pressure:
                  <span className="font-normal">
                    {latestData?.bloodPressure}
                  </span>{" "}
                </td>
              </tr>
              {/* body temparature */}
              <tr>
                <th className="flex justify-end">
                  <CiTempHigh className="text-yellow-900 text-3xl" />
                </th>
                <td className="text-start">
                  Body Temperature:
                  <span className="font-normal">
                    {latestData?.pulseOximeter?.bodyTemperature} °F
                  </span>{" "}
                </td>
              </tr>
              {/* Heart Rate Variability */}
              <tr>
                <th className="flex justify-end">
                  <FaHeartbeat className="text-red-700 text-xl" />
                </th>
                <td className="text-start">
                  Heart Rate Variability:
                  <span className="font-normal">
                    {latestData?.pulseOximeter?.heartRateVariability}
                  </span>{" "}
                </td>
              </tr>
              {/* Perfusion */}
              <tr>
                <th className="flex justify-end">
                  <IoIosPulse className="text-red-700 text-xl" />
                </th>
                <td className="text-start">
                  Perfusion Index:
                  <span className="font-normal">
                    {latestData?.pulseOximeter?.perfusionIndex}
                  </span>{" "}
                </td>
              </tr>
              {/* pulseRate */}
              <tr>
                <th className="flex justify-end">
                  <IoIosPulse className="text-red-700 text-xl" />
                </th>
                <td className="text-start">
                  Pulse Rate:
                  <span className="font-normal">
                    {latestData?.pulseOximeter?.pulseRate}
                  </span>
                </td>
              </tr>
              {/*  Respiration Rate */}
              <tr>
                <th className="flex justify-end">
                  <RiLungsLine className="text-blue-300 text-xl" />
                </th>
                <td className="text-start">
                  Respiration Rate:
                  <span className="font-normal">
                    {latestData?.pulseOximeter?.respirationRate}
                  </span>
                </td>
              </tr>
              {/* SpO2 */}
              <tr>
                <th className="flex justify-end">
                  <RiLungsLine className="text-yellow-900 text-xl" />
                </th>
                <td className="text-start">
                  SpO2:
                  <span className="font-normal">
                    {latestData?.pulseOximeter?.spo2}
                  </span>
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
