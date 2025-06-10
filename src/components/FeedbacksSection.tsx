import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FeedbackForm from '@/components/FeedbackForm';
import { supabase } from '@/integrations/supabase/client';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

interface Feedback {
  id: string;
  created_at: string;
  name: string;
  image_url: string;
  feedback: string;
  rating: number;
}

const Feedbacks = () => {
  const [feedbacksRef, feedbacksVisible] = useScrollAnimation();
  const [formHeadingRef, formHeadingVisible] = useScrollAnimation(0.2);
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const { data, error } = await supabase
        .from('feedbacks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFeedbacks(data || []);
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Community Feedbacks Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            ref={feedbacksRef}
            className={`text-center mb-16 scroll-fade-in ${feedbacksVisible ? 'animate' : ''}`}
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative">
              <span className="text-cyber relative z-10">Community Feedbacks</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
            <p className="text-xl font-fira text-foreground/80 max-w-3xl mx-auto">
              See what our community members have to say about their experiences.
            </p>
          </motion.div>

          {/* Feedbacks Grid */}
          <div className="mb-20">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
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
                animate={feedbacksVisible ? "visible" : "hidden"}
              >
                {feedbacks.map((feedback, index) => (
                  <motion.div
                    key={feedback.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="w-12 h-12">
                          <img src={feedback.image_url} alt={feedback.name} className="object-cover" />
                        </Avatar>
                        <div>
                          <h4 className="font-orbitron text-primary">{feedback.name}</h4>
                          <div className="flex items-center mt-1">
                            {[...Array(feedback.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-500">★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-foreground/80 font-fira text-sm leading-relaxed">
                        {feedback.feedback}
                      </p>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div 
            ref={formHeadingRef}
            className={`text-center mb-16 scroll-fade-in ${formHeadingVisible ? 'animate' : ''}`}
          >
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold mb-4 relative">
              <span className="text-cyber relative z-10">Give your Feedback</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-xl -z-10 scale-110"></div>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <FeedbackForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Feedbacks;
