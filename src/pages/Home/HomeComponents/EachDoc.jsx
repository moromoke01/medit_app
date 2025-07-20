import React from 'react'
import 'animate.css';

const EachDoc = (Props) => {
  return (
    <div className='eachDoc animate__bounceInUp'>
        <img src={Props.img} alt='meetDoc' id='styleDoc' />
        <h5 className='animate__fadeIn'>{Props.name}</h5>
        <p className='animate__fadeIn'>{Props.dept}</p>
        {/* <p>{Props.contact}</p> */}
        
    </div>
  )
}

export default EachDoc