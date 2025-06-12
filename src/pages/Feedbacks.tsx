
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeedbackForm from '@/components/FeedbackForm';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { gsap } from 'gsap';
import { useGSAPScrollTrigger } from '@/hooks/useGSAPAnimation';

interface Testimonial {
  id: string;
  name: string;
  feedback: string;
  rating?: number;
  position?: string;
  created_at: string;
  approved: boolean;
  email?: string;
}

const Feedbacks = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Hero section animation
  const heroRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    const cards = element.querySelectorAll('.hero-card');
    
    gsap.fromTo(cards,
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }
    );
  }, { start: "top 80%" });

  // Main content animation
  const contentRef = useGSAPScrollTrigger<HTMLDivElement>((element) => {
    const cards = element.querySelectorAll('.feedback-card');
    
    gsap.fromTo(cards,
      {
        opacity: 0,
        y: 80,
        rotationX: 45,
        scale: 0.8
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: "back.out(1.7)"
      }
    );
  }, { start: "top 75%" });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="hero-card text-4xl md:text-6xl font-orbitron font-bold mb-4 relative heading-glow">
              <span className="text-cyber relative z-10">Community Feedbacks</span>
            </h1>
            <div className="hero-card w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
            <p className="hero-card text-xl font-fira text-foreground/80 max-w-3xl mx-auto">
              Discover what our community members have to say about their journey with WarP Computer Club.
            </p>
          </div>
        </div>
      </section>

      {/* Feedbacks Grid */}
      <section ref={contentRef} className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="feedback-card bg-card/50 cyber-border animate-pulse p-6 h-80">
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
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-foreground/60 font-fira text-lg">
                No feedbacks available yet. Be the first to share your experience!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  className="feedback-card bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 p-6 h-80 flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar className="w-12 h-12 bg-primary/20 flex-shrink-0">
                      <AvatarFallback className="bg-primary/20 text-primary font-medium">
                        {getInitials(testimonial.name)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-orbitron text-primary truncate">{testimonial.name}</h4>
                      {testimonial.position && (
                        <p className="text-sm text-muted-foreground font-fira truncate">
                          {testimonial.position}
                        </p>
                      )}
                      {testimonial.rating && (
                        <div className="flex items-center mt-1">
                          {renderStars(testimonial.rating)}
                        </div>
                      )}
                    </div>
                  </div>
                  <p className="text-foreground/80 font-fira text-sm leading-relaxed flex-1 overflow-hidden">
                    "{testimonial.feedback}"
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Feedback Form */}
      <section className="py-20 bg-muted/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-primary">
                Share Your Experience
              </h2>
              <p className="text-lg font-fira text-foreground/80">
                Help us improve and inspire others by sharing your feedback about WarP Computer Club.
              </p>
            </div>
            <FeedbackForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Feedbacks;
