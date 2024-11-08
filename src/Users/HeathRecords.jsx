import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
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

  // Fetch health records
  const {
    isLoading: healthDataLoading,
    error: healthDataError,
    data: healthData,
  } = useQuery({
    queryKey: ["my-health-data"],
    queryFn: () =>
      axios
        .get(
          `http://localhost:5000/api/healthrecords/${user?.uid}?period=6months`
        )
        .then((res) => res.data),
    refetchInterval: 5000,
  });

  // Fetch health conditions
  const {
    isLoading: healthConditionLoading,
    error: healthConditionError,
    data: healthCondition,
  } = useQuery({
    queryKey: ["my-condition-data"],
    queryFn: () =>
      axios
        .get(
          `http://localhost:5000/api/healthcondition/${user?.uid}?period=6months`
        )
        .then((res) => res.data),
    refetchInterval: 5000,
  });

  // Combined loading and error handling
  const isLoading = healthDataLoading || healthConditionLoading;
  const error = healthDataError || healthConditionError;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  if (!healthData || Object.keys(healthData).length === 0) {
    return <div>No health records available.</div>;
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
      {
        label: "Heart Rate Variability (ms)",
        data: healthData.heartRateVariability,
        borderColor: "blue",
        backgroundColor: "blue",
        fill: true,
      },
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
      {
        label: "Respiration Rate (breaths/min)",
        data: healthData.respirationRate,
        borderColor: "orange",
        backgroundColor: "orange",
        fill: true,
      },
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
      <h2 className="mb-5 py-8">Records of Your Health</h2>
      <div className="min-w-7xl overflow-x-scroll">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
