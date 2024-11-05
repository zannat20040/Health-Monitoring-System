import React from "react";

export default function HMSFooter() {
  return (
    <footer className="footer mt-11 footer-center bg-gray-200 text-base-content p-4">
      <aside>
        <p>
          Copyright © {new Date().getFullYear()} - All rights reserved by ASH
          Health Monitoring System. Developed by [Abid, Safayet, Hema]
        </p>
      </aside>
    </footer>
  );
}
