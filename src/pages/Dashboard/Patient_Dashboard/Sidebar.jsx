import React from 'react'
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className='flex min-h-screen bg-gray-50'>
        <aside className='w-64 text-left bg-white shadow-md p-6 hidden md:block'>
        <h2 className='text-2xl font-bold mb-8 text-blue-600'>Patient Panel</h2>
        <nav>
          <ul className='space-y-4'>
            <li>
               <Link to="/symptoms-checker" className='text-gray-700 hover:text-blue-600'>Check Symptom Urgency</Link>
            </li>
            <li>
               <Link to="/recommend-doctor" className='text-gray-700 hover:text-blue-600'>Recommend Doctor</Link>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:text-blue-600'>Appointments</a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:text-blue-600'>Doctors</a>
            </li>
            <li>
              <a href='#profile' className='text-gray-700 hover:text-blue-600'>Profile</a>
            </li>
            <li>
              <a href='#' className='text-gray-700 hover:text-blue-600'>Settings</a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  )
}
