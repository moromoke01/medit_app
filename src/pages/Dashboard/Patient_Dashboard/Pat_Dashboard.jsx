
import Sidebar from './Sidebar.jsx';
import Record_Dashboard from './Record_Dashboard.jsx';



const Pat_Dashboard = () => {
 
 

  return (
    <div className='flex min-h-screen bg-gray-50'>

      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <Record_Dashboard />
    </div>
  );
};

export default Pat_Dashboard