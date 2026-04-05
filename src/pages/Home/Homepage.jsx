
import HeroSection from './HomeComponents/HeroSection'
import ConsultationSegment from './HomeComponents/ConsultationSegment'
import ConsultProcess from './HomeComponents/ConsultProcess'
import MeetDoc from './HomeComponents/MeetDoc'
import FeaturesSection from './HomeComponents/FeaturesSection'
import TestimonialsSection from './HomeComponents/TestimonialsSection'
import FAQSection from './HomeComponents/FAQSection'
import CTASection from './HomeComponents/CTASection'


function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <ConsultationSegment />
      <ConsultProcess />
      <MeetDoc />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}

export default Home
