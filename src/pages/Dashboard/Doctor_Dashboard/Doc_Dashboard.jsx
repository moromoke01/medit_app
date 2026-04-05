// src/components/DoctorDashboard/Doc_Dashboard.jsx
import React from "react";
import DocDashboard_sidebar from "./DocDashboard_sidebar";
import DoctorDashboardBody from "./DoctorDashboardBody";

const Doc_Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DocDashboard_sidebar />
      <DoctorDashboardBody />
    </div>
  );
};

export default Doc_Dashboard;
