import HeroSection from "./components/Hero";
import Features from "./components/Feature";
import HowItWorks from "./components/HowItWork";
import Footer from "./components/Footer";
import Benefits from "./components/Benefits";
import Testimonials from "./components/Testimonial";
import MarqueeCarousel from "./components/Marque";
import Header from "./components/Header";
import Webstats from "./components/Webstats";
const LandingPage = () => {
  return (
    <div>
      <Header/>
      <HeroSection />
      <MarqueeCarousel/>
      {/* <Features /> */}
      <HowItWorks />
      <Benefits />
      {/* <Testimonials /> */}
      <Webstats/>
      <Footer />
    </div>
  );
};

export default LandingPage;
