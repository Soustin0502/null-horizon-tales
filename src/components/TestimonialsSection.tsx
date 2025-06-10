import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar'; // Add AvatarFallback
import { supabase } from '@/integrations/supabase/client';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface Testimonial {
  id: string;
  created_at: string;
  name: string;
  image_url: string;
  testimonial: string;
  designation: string;
  rating: number; // Add this for star rating
}

const TestimonialsSection = () => {
  // Previous state and functions remain the same

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Title section remains the same */}

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
                      <Avatar className="w-12 h-12 bg-primary/20">
                        <AvatarFallback className="bg-primary/20 text-primary font-medium">
                          {getInitials(testimonial.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-orbitron text-primary">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground font-fira">
                          {testimonial.designation}
                        </p>
                        {/* Add star rating */}
                        <div className="flex items-center mt-1">
                          {[...Array(testimonial.rating || 5)].map((_, i) => (
                            <span key={i} className="text-yellow-500">★</span>
                          ))}
                        </div>
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

        {/* View All Button - Updated with pink color */}
        <div className="text-center">
          <Button 
            asChild 
            variant="ghost" 
            className="text-pink-500 font-orbitron hover:text-pink-400 hover:bg-pink-500/20 transition-colors"
          >
            <Link to="/testimonials">View All Testimonials <ArrowRight size={16} /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
