
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import SkillsDisplay from '@/components/SkillsDisplay';
import { gsap } from 'gsap';
import { useGSAPScrollTrigger } from '@/hooks/useGSAPAnimation';

interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  profileImage?: string;
  github?: string;
  linkedin?: string;
  portfolio?: string;
  joinedYear: number;
}

const Members = () => {
  const [members, setMembers] = useState<Member[]>([]);

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
    const cards = element.querySelectorAll('.member-card');
    
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

  useEffect(() => {
    // Sample member data - replace with actual data fetching
    const sampleMembers: Member[] = [
      {
        id: "1",
        name: "Soustin Singh",
        role: "President",
        bio: "Leading WarP Computer Club with passion for innovative technology and competitive programming. Focused on creating opportunities for students to excel in the digital world.",
        skills: ["Leadership", "Python", "JavaScript", "React", "Competitive Programming"],
        profileImage: "/SOUSTIN.jpg",
        joinedYear: 2023
      },
      {
        id: "2", 
        name: "Deeptanshu Dubey",
        role: "Vice President",
        bio: "Passionate about web development and AI/ML. Supporting the club's mission to foster innovation and technical excellence among students.",
        skills: ["Web Development", "AI/ML", "Python", "Node.js", "Database Management"],
        profileImage: "/DEEPTANSHU.jpeg",
        joinedYear: 2023
      },
      {
        id: "3",
        name: "Girisha Mandal",
        role: "Technical Lead",
        bio: "Expert in full-stack development and system architecture. Dedicated to mentoring members and organizing technical workshops.",
        skills: ["Full-Stack Development", "System Design", "Cloud Computing", "DevOps", "Mentoring"],
        profileImage: "/GIRISHA.jpeg",
        joinedYear: 2023
      }
    ];
    setMembers(sampleMembers);
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="py-20 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="hero-card text-4xl md:text-6xl font-orbitron font-bold mb-4 relative heading-glow">
              <span className="text-cyber relative z-10">Our Team</span>
            </h1>
            <div className="hero-card w-32 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6"></div>
            <p className="hero-card text-xl font-fira text-foreground/80 max-w-3xl mx-auto">
              Meet the passionate individuals driving innovation at WarP Computer Club. 
              Together, we're building the future of technology.
            </p>
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section ref={contentRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member) => (
              <Card 
                key={member.id} 
                className="member-card bg-card/50 cyber-border hover:border-primary/60 transition-all duration-300 overflow-hidden group"
              >
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                  {member.profileImage ? (
                    <img 
                      src={member.profileImage} 
                      alt={member.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary/30 group-hover:border-primary/60 transition-colors duration-300"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-full bg-primary/20 border-4 border-primary/30 group-hover:border-primary/60 transition-colors duration-300 flex items-center justify-center">
                      <span className="text-3xl font-orbitron text-primary">
                        {getInitials(member.name)}
                      </span>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-orbitron font-bold text-primary mb-1">
                      {member.name}
                    </h3>
                    <p className="text-secondary font-fira text-sm uppercase tracking-wider">
                      {member.role}
                    </p>
                    <div className="text-xs text-muted-foreground font-fira mt-1">
                      Member since {member.joinedYear}
                    </div>
                  </div>
                  
                  <p className="text-foreground/80 font-fira text-sm leading-relaxed mb-4 text-center">
                    {member.bio}
                  </p>
                  
                  <div className="space-y-3">
                    <h4 className="font-orbitron font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                      Skills & Expertise:
                    </h4>
                    <SkillsDisplay skills={member.skills} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-muted/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-orbitron font-bold mb-4 text-primary">
              Join Our Team
            </h2>
            <p className="text-lg font-fira text-foreground/80 mb-8">
              Are you passionate about technology and innovation? We're always looking for 
              dedicated individuals to join our growing community of digital creators and problem solvers.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-card/50 cyber-border p-6">
                <h3 className="font-orbitron font-semibold text-primary mb-3">Learn & Grow</h3>
                <p className="font-fira text-sm text-foreground/80">
                  Expand your technical skills through workshops, mentorship, and hands-on projects.
                </p>
              </Card>
              <Card className="bg-card/50 cyber-border p-6">
                <h3 className="font-orbitron font-semibold text-secondary mb-3">Collaborate</h3>
                <p className="font-fira text-sm text-foreground/80">
                  Work with like-minded peers on exciting projects and competitions.
                </p>
              </Card>
              <Card className="bg-card/50 cyber-border p-6">
                <h3 className="font-orbitron font-semibold text-accent mb-3">Lead</h3>
                <p className="font-fira text-sm text-foreground/80">
                  Take initiative, organize events, and make a real impact in the tech community.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Members;
