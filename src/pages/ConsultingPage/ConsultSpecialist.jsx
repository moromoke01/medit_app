import ConsultingForm from './ConsultingForm'
import doctorImage from '../../assets/Home/tele-consultation-covid-19-patients.jpg' 

const ConsultSpecialist = () => {
  return (
    <div className="flex flex-row w-full mt-4  shadow-md shadow-gray-400 ">
      <div className="w-full flex-1">
         <ConsultingForm />
      </div>

      <div className="flex-1 relative bg-white ">
        <img src={doctorImage} alt="Doctor" className="hidden md:visible md:w-full h-full absolute object-fit cover"/>
      </div>
    </div>
  )
}

export default ConsultSpecialist
