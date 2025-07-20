
import pic1 from '../../../assets/Home/general-consultation.jpg';
import pic2 from '../../../assets/Home/ginecologia.jpg';
import pic3 from '../../../assets/Home/dermatologist.jpg';
import pic4 from '../../../assets/Home/sexology.png';

const ConsultationSegment = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 pb-8 bg-white shadow-lg rounded-lg my-8">
      <h2 className="text-center text-2xl font-bold mb-8">Consultation Segments</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        <div className="text-center">
          <h5 className="text-l font-semibold mb-4">General Medicine</h5>
          <div className="h-35 w-full ">
          <img src={pic1} alt="general-consultation" className="w-full cover mb-4 animate__fadeInLeft" />
          </div>
          <p className="text-sm text-justify">General consultation addressing human health, treatment plan and therapeutic Intervention.</p>
        </div>
        
      <div className="text-center">
        <h5 className="text-l font-semibold mb-4">Gynecology and Obstetrics</h5>
          <div className="h-35 w-full ">
            <img src={pic2} alt="ginecologia" className="w-full mb-4 animate__fadeInLeft" />
          </div>
              <p className="text-sm text-justify">Consultation on diseases specific to women and girls, especially those affecting the reproductive system.</p>
        </div>

        <div className="text-center animate__fadeInRight">
          <h5 className="text-l font-semibold mb-4">Dermatology</h5>
           <div className="h-35 w-full ">
            <img src={pic3} alt="dermatologist" className="w-full mb-4 animate__fadeInRight" />
          </div>
          <p className="text-sm text-justify">Consultation for the diagnosis and treatment of skin disorders.</p>
        </div>

        <div className="text-center animate__fadeInRight">
          <h5 className="text-l font-semibold mb-4">Sexology</h5>
            <div className="h-35 w-full ">
             <img src={pic4} alt="sexology" className="w-full mb-4 animate__fadeInRight" />
            </div>
              <p className="text-sm text-justify">Consultation on Sexual Interaction, sexual health, and reproduction.</p>
        </div>
      </div>
    </div>
  );
};

export default ConsultationSegment;