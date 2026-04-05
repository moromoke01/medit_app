import React from 'react'

const EachDoc = (Props) => {
  return (
    <div className='group cursor-pointer'>
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={Props.img}
          alt='doctor'
          id='styleDoc'
          className="w-full h-auto group-hover:scale-110 transition duration-300"
        />
      </div>
      <h5 className='font-bold text-lg mt-3 text-gray-900'>{Props.name}</h5>
      <p className='text-blue-600 font-semibold'>{Props.dept}</p>
    </div>
  )
}

export default EachDoc