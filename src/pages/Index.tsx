
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SchoolSection from '@/components/SchoolSection';
import EventsSection from '@/components/EventsSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import FeedbackForm from '@/components/FeedbackForm';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const Index = () => {
  const [feedbackRef, feedbackVisible] = useScrollAnimation();

  console.log("Index page is rendering");
  console.log("All components imported successfully");
  
  return (
    <div className="min-h-screen bg-background overflow-x-hidden" style={{ scrollBehavior: 'smooth' }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SchoolSection />
        <EventsSection />
        <TestimonialsSection />

        {/* Feedback Form Section */}
        <section 
          ref={feedbackRef}
          className="py-20"
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={feedbackVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 text-primary relative">
                Share Your Experience
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110 opacity-100"></div>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto"></div>
            </motion.div>
            <FeedbackForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
