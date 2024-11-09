import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import Loading from "../Component/Loading";
import CustomError from "../Component/CustomError";

// Register required components with Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function HealthRecords() {
  const { user } = useContext(AuthContext);
  const [selectedDuration, setSelectedDuration] = useState("7days");

  // Fetch health records
  const {
    isLoading,
    error,
    refetch,
    data: healthData,
  } = useQuery({
    queryKey: ["my-health-data", selectedDuration],
    queryFn: () =>
      axios
        .get(
          `http://localhost:5000/api/healthrecords/${user?.email}?period=${selectedDuration}`
        )
        .then((res) => res.data),
    refetchInterval: 5000,
  });

  const handleSelection = (e) => {
    setSelectedDuration(e.target.value);
    refetch;
  };

  // Combined loading and error handling
  // const isLoading = healthDataLoading || healthConditionLoading;
  // const error = healthDataError || healthConditionError;

  if (isLoading) return <Loading />;
  if (error) return <CustomError errormsg={error.message} />;

  if (!healthData || Object.keys(healthData).length === 0) {
    return <div className="p-4 text-center">No health records available.</div>;
  }

  const chartData = {
    labels: Array.from(
      { length: healthData?.bloodPressure?.length },
      (_, i) => `Entry ${i + 1}`
    ),
    datasets: [
      {
        label: "Blood Pressure (mmHg)",
        data: healthData.bloodPressure,
        borderColor: "red",
        backgroundColor: "red",
        fill: true,
      },
      // {
      //   label: "Heart Rate Variability (ms)",
      //   data: healthData.heartRateVariability,
      //   borderColor: "blue",
      //   backgroundColor: "blue",
      //   fill: true,
      // },
      {
        label: "Oxygen Level (%)",
        data: healthData.oxygenLevel,
        borderColor: "green",
        backgroundColor: "green",
        fill: true,
      },
      {
        label: "SpO2 (%)",
        data: healthData.spo2,
        borderColor: "black",
        backgroundColor: "black",
        fill: true,
      },
      {
        label: "Pulse Rate (bpm)",
        data: healthData.pulseRate,
        borderColor: "purple",
        backgroundColor: "purple",
        fill: true,
      },
      // {
      //   label: "Respiration Rate (breaths/min)",
      //   data: healthData.respirationRate,
      //   borderColor: "orange",
      //   backgroundColor: "orange",
      //   fill: true,
      // },
      {
        label: "Temperature (°F)",
        data: healthData.temperature,
        borderColor: "cyan",
        backgroundColor: "cyan",
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const label = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div className="text-center mt-6 max-w-7xl mx-auto px-5">
      <div className="flex justify-between items-center mb-9">
        <h2 className="mb-5 py-8 text-lg font-bold text-primary">
          Records of Your Health
        </h2>
        <select
          className="border-primary border  px-5 py-2 rounded-md"
          name="duration"
          value={selectedDuration}
          onChange={(e) => handleSelection(e)}
        >
          <option value="7days">7 Days</option>
          <option value="1months">1 Month</option>
          <option value="2months">2 Months</option>
          <option value="3months">3 Months</option>
          <option value="6months">6 Months</option>
        </select>
      </div>
      <div className="min-w-7xl overflow-x-scroll">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
