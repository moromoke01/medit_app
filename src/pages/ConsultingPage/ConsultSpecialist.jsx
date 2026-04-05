import ConsultingForm from './ConsultingForm'
import doctorImage from '../../assets/consult_doctor.png' 

const ConsultSpecialist = () => {
  return (
    <div className="flex flex-row w-full h-screen mt-4  shadow-md shadow-gray-400 ">
      <div className="w-full flex-1">
         <ConsultingForm />
      </div>

      <div className="flex-1 relative bg-white ">
        <img src={doctorImage} alt="Doctor" className=" md:w-full h-full absolute object-fit cover"/>
      </div>
    </div>
  )
}

export default ConsultSpecialist
