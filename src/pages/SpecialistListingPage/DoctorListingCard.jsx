import {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllDoctors } from '../../features/doctorSlice';
import avatar from "../../assets/female-avatar.png"

const DoctorListingCard = () => {

    const dispatch = useDispatch();
    const {specialties, doctors, loading, error} = useSelector((state) => state.doctors);


    useEffect(()=> {
      dispatch(fetchAllDoctors());
    }, [dispatch]);

    if(loading) return <div className='text-center py-8'> Loading Doctors...</div>
    if(error) return <div className='text-center text-red-500 py-8'>{error} </div>
    if (!doctors || doctors.length === 0) return <div className='text-center py-8'> No doctor found </div>;
  
  
    return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6'>
      { doctors.map((doctor) => (
        <div key={doctor._id} className='bg-white shadow-md rounded-lg p-4 flex flex-col items-center'>
            <img src={doctor.picture || avatar} alt={doctor.name} className='w-24 h-24 rounded-full object-cover mb -3'/>
            <h3 className='text-lg font-semibold mt-2 text-center'>{doctor.fname} {doctor.lname}</h3>
             <p className='text-gray-600 mb-2'>{doctor.specialty}</p>
             <div className='flex flex-row gap-6'>
                <button className='bg-blue-500 text-white px-2 py-1 rounded transition-colors duration-200 hover:bg-blue-700'>Details</button>
                <button className='bg-green-500 text-white px-2 py-1 rounded transition-colors duration-200  hover:bg-white hover:text-green-600 hover:border hover:border-green-600">'>Chat</button>
        </div>
        </div>
      ))}

        
    </div>
  )
}

export default DoctorListingCard