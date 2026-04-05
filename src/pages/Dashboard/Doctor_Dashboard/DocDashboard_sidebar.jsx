// src/components/DoctorDashboard/DoctorSidebar.jsx
import React from "react";

const DocDashboard_sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
      <h2 className="text-2xl font-bold mb-8 text-blue-600">
        Doctor Dashboard
      </h2>
      <nav className="text-left">
        <ul className="space-y-4">
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Consultations
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Patient
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Schedule
            </a>
          </li>
          <li>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Settings
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default DocDashboard_sidebar;
