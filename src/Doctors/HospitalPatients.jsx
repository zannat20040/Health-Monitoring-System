import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function HospitalPatients() {
  const location = useLocation();
  const navigate = useNavigate();

  // Access the data sent through the state
  const data = location.state?.data;

  const handleDeviceDetails = (item) => {
    console.log(item);
    navigate("/doctors/details", { state: { data: item } });
  };

  console.log("=>", data);
  return (
    <div className="grid grid-cols-5 justify-between items-center gap-5 px-4 py-3">
      {data?.map((item) => (
        <div
          className="shadow-lg rounded p-5"
          onClick={() => handleDeviceDetails(item)}
        >
          <img
            src="https://img.freepik.com/premium-vector/default-female-user-profile-icon-vector-illustration_276184-169.jpg"
            alt=""
            srcset=""
          />
          <p>DeviceMail: {item?.email}</p>
        </div>
      ))}
    </div>
  );
}
