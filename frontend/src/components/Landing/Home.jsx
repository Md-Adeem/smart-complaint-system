import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";
import HowItWorksSection from "./HowItWorksSection";
import StudentTestimonials from "./StudentTestimonials";
import CTASection from "./CTASection";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <StudentTestimonials />
      <CTASection />
    </div>
  );
};

export default Home;
