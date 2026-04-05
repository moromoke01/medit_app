import React from 'react'
import DoctorListingCard from './DoctorListingCard'

const DoctorListing = () => {
  return (
    <div className='mt-10 '>
        <h2 className='text-center text-2xl font-bold mb-6'>Meet Our Specialist</h2>
    
    <div className='p-6'>
        <DoctorListingCard />
    </div>

  </div>
  )
}

export default DoctorListing;