import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center px-3 py-5">
      <div className="w-10 h-10 flex gap-1 items-center justify-center">
        <div className="w-1 h-1 animate-[bounce_.6s_linear_.2s_infinite] bg-primary rounded-full"></div>
        <div className="w-1 h-1 animate-[bounce_.6s_linear_.3s_infinite] bg-primary rounded-full"></div>
        <div className="w-1 h-1 animate-[bounce_.6s_linear_.4s_infinite] bg-primary rounded-full"></div>
      </div>
    </div>
  );
}
