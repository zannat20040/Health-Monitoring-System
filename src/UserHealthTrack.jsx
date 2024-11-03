import axios from "axios";
import React, { useEffect, useState } from "react";

export default function UserHealthTrack() {
  const [data, setData] = useState();
  const [revdata, setRevData] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true before the request
      try {
        const response = await axios.get(
          "https://health-monitoring-system-backend.vercel.app/api/get-data"
        );

        // Check if response.data exists and sort it
        const sortedData = response.data
          ? response.data.sort((a, b) => b.timestamp - a.timestamp)
          : [];

        const data = sortedData.length > 0 ? sortedData[0] : null;
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold  mb-8">Health Monitoring System</h1>
      <div>
        <p>Temperature: {data?.temperature} °F</p>
        <p>Oxygen Level: {data?.oxygenLevel}</p>
        <p>Blood Pressure: {data?.bloodPressure}</p>
      </div>
    </div>
  );
}
