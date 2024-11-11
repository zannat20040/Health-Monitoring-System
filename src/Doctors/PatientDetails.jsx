import React from "react";
import { useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PatientDetails() {
  const location = useLocation();
  const data = location.state?.data?.records || [];

  // Prepare data for the chart
  const chartData = {
    labels: data.map((item) => new Date(item.timestamp).toLocaleString()), // Convert timestamp to readable format
    datasets: [
      {
        label: "Blood Pressure",
        data: data.map((item) => parseInt(item.bloodPressure)),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: false,
      },
      {
        label: "Pulse Rate",
        data: data.map((item) => parseInt(item.pulseRate)),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: false,
      },
      {
        label: "Oxygen Level",
        data: data.map((item) => item.oxygenLevel),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: false,
      },
      {
        label: "Temperature",
        data: data.map((item) => item.temperature),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Patient Health Data Over Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Timestamp",
        },
      },
      y: {
        title: {
          display: true,
          text: "Measurement",
        },
      },
    },
  };

  return (
    <div className="px-6 py-2 ">
      <h2 className="text-2xl font-bold mb-4">Patient Health Data</h2>
      {data.length ? (
        <Line data={chartData} options={chartOptions} />
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
