import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

interface Testimonial {
  id: string;
  created_at: string;
  name: string;
  image_url: string;
  testimonial: string;
  designation: string;
}

const TestimonialsSection = () => {
  const [sectionRef, sectionVisible] = useScrollAnimation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Keep your existing fetchTestimonials function here
  const fetchTestimonials = async () => {
    // Your existing testimonials fetching logic
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div 
          ref={sectionRef}
          className={`text-center mb-16 scroll-fade-in ${sectionVisible ? 'animate' : ''}`}
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative">
            <span className="text-cyber relative z-10">Testimonials</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto">
            Hear from our valued members about their journey with us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="mb-12">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <Card key={i} className="bg-card/50 cyber-border animate-pulse p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-muted"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-muted rounded w-24 mb-2"></div>
                      <div className="h-3 bg-muted rounded w-16"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              animate={sectionVisible ? "visible" : "hidden"}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="w-12 h-12">
                        <img src={testimonial.image_url} alt={testimonial.name} className="object-cover" />
                      </Avatar>
                      <div>
                        <h4 className="font-orbitron text-primary">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground font-fira">
                          {testimonial.designation}
                        </p>
                      </div>
                    </div>
                    <p className="text-foreground/80 font-fira text-sm leading-relaxed">
                      {testimonial.testimonial}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button asChild variant="ghost" className="text-primary font-orbitron hover:text-primary/80 hover:bg-primary/20">
            <Link to="/testimonials">View All Testimonials →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
