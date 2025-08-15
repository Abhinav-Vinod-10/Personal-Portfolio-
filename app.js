const { useState, useEffect, useRef } = React;

// Portfolio data
const portfolioData = {
  personal: {
    name: "ABHINAV V",
    phone: "+91 9497152515",
    linkedin: "www.linkedin.com/in/abhinav-vinod-261b3a236",
    title: "Computer Science Student & Developer",
    subtitle: "Aspiring Product Manager | Cybersecurity Enthusiast "
  },
  education: {
    degree: "Bachelor of Technology in Computer Science and Engineering",
    duration: "2022-2026",
    progress: 75
  },
  objective: "Motivated and Enthusiastic Computer Science student with strong front-end development skills (HTML, CSS, JavaScript, React) and a foundational understanding of cybersecurity, including network security, threat analysis, and ethical hacking principles. Known for strong analytical thinking, effective communication, and the ability to coordinate across teams to deliver secure, high-quality digital solutions. Eager to contribute technical and interpersonal strengths in a challenging, fast-paced environment while continuously learning and improving.",
  experience: [
    {
      title: "Telecom Operations Experience",
      duration: "March 2024 - June 2024",
      points: [
        "Applied foundational concepts of computer networks, fault detection, and data flow analysis in real-world telecom operations",
        "Observed integration of hardware, software, and protocols in service delivery, maintenance, and fault resolution processes"
      ]
    }
  ],
  projects: [
    {
      title: "Full-Stack Hotel Booking Platform",
      description: "Designed and developed a full-stack hotel booking platform allowing users to register, search, book, and manage reservations.",
      technologies: ["HTML", "CSS", "JavaScript", "React"],
      features: ["User Authentication", "Booking System", "Payment Integration", "Admin Dashboard"],
      status: "Completed"
    },
    {
      title: "Machine Learning Rainfall Prediction",
      description: "Built a machine learning model to predict rainfall using historical weather data, cleaning and analyzing the dataset with Pandas and training models with scikit-learn for reliable forecasts. Evaluated performance with clear metrics (like accuracy and MAE) and tuned the model to improve results.",
      technologies: ["Python", "Pandas", "scikit-learn", "Machine Learning", "Data Analysis"],
      features: ["Data Cleaning", "Model Training", "Performance Metrics", "Real-world Application"],
      status: "Completed"
    }
  ],
  skills: {
    frontend: [
      { name: "HTML", level: 90 },
      { name: "CSS", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 75 }
    ],
    cybersecurity: [
      { name: "Network Security", level: 70 },
      { name: "Threat Analysis", level: 65 },
      { name: "Ethical Hacking", level: 60 }
    ],
    dataScience: [
      { name: "Python", level: 80 },
      { name: "Pandas", level: 75 },
      { name: "scikit-learn", level: 70 },
      { name: "Machine Learning", level: 65 }
    ],
    soft: [
      { name: "Analytical Thinking", level: 90 },
      { name: "Communication", level: 85 },
      { name: "Team Coordination", level: 80 }
    ]
  },
  certifications: [
    {
      title: "AWS Academy Graduate- AWS Academy Cloud Developing",
      issuer: "AWS Academy",
      year: "2024",
      credentialId: "AWS-CLD-DEV-2024"
    }
  ],
  stats: {
    projectsCompleted: 3,
    technologiesLearned: 12,
    yearsOfStudy: 3,
    certifications: 4
  }
};

// Utility function for smooth scrolling
const smoothScrollTo = (targetId) => {
  const element = document.getElementById(targetId);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.offsetTop;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Particle System
const ParticleSystem = () => {
  useEffect(() => {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 6 + 2;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const duration = Math.random() * 20 + 10;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      
      container.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, duration * 1000);
    };

    const particleInterval = setInterval(createParticle, 300);
    
    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(createParticle, i * 100);
    }

    return () => {
      clearInterval(particleInterval);
    };
  }, []);

  return null;
};

// Cursor Trail Effect
const CursorTrail = () => {
  useEffect(() => {
    const trail = document.getElementById('cursor-trail');
    if (!trail) return;

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    const updateTrail = () => {
      const dx = mouseX - trailX;
      const dy = mouseY - trailY;
      
      trailX += dx * 0.1;
      trailY += dy * 0.1;
      
      trail.style.left = `${trailX - 10}px`;
      trail.style.top = `${trailY - 10}px`;
      
      requestAnimationFrame(updateTrail);
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      trail.style.opacity = '0.8';
      trail.style.transform = 'scale(1)';
    };

    const handleMouseLeave = () => {
      trail.style.opacity = '0';
      trail.style.transform = 'scale(0)';
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    updateTrail();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return null;
};

// Loading Screen Component
const LoadingScreen = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(onComplete, 800);
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return null;
};

// Typing Animation Component
const TypingAnimation = ({ texts, speed = 100, deleteSpeed = 50, delay = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    
    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < currentText.length) {
          setDisplayText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        if (charIndex > 0) {
          setDisplayText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex, texts, speed, deleteSpeed, delay]);

  return (
    <span className="typing-animation">
      {displayText}
    </span>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          
          setTimeout(() => {
            let startTime = null;
            const animate = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const progress = Math.min((timestamp - startTime) / duration, 1);
              setCount(Math.floor(progress * end));
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              }
            };
            requestAnimationFrame(animate);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, delay, isVisible]);

  return <span ref={ref}>{count}</span>;
};

// Skill Progress Bar Component
const SkillProgressBar = ({ skill, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`skill-bar ${isVisible ? 'animate' : ''}`}>
      <div className="skill-bar__header">
        <span className="skill-bar__name">{skill.name}</span>
        <span className="skill-bar__percentage">{skill.level}%</span>
      </div>
      <div className="skill-bar__track">
        <div 
          className="skill-bar__fill"
          style={{ '--skill-percentage': `${skill.level}%` }}
        />
      </div>
    </div>
  );
};

// Progress Circle Component
const ProgressCircle = ({ progress, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`progress-circle ${isVisible ? 'animate' : ''}`} style={{ '--progress': progress }}>
      <svg className="progress-circle__svg">
        <circle className="progress-circle__track" cx="60" cy="60" r="45" />
        <circle className="progress-circle__fill" cx="60" cy="60" r="45" />
      </svg>
      <div className="progress-circle__text">{progress}%</div>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section
      const sections = ['home', 'about', 'education', 'experience', 'projects', 'skills', 'certifications', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId, event) => {
    event.preventDefault();
    smoothScrollTo(sectionId);
  };

  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'education', label: 'Education' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar__container">
          <a 
            href="#home" 
            className="navbar__logo" 
            onClick={(e) => handleNavClick('home', e)}
          >
            AV
          </a>
          
          <ul className="navbar__nav">
            {sections.slice(1).map(section => (
              <li key={section.id}>
                <a 
                  href={`#${section.id}`} 
                  className="navbar__link"
                  onClick={(e) => handleNavClick(section.id, e)}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        {sections.map(section => (
          <div 
            key={section.id}
            className={`scroll-indicator__dot ${activeSection === section.id ? 'active' : ''}`}
            onClick={() => smoothScrollTo(section.id)}
            title={section.label}
          />
        ))}
      </div>
    </>
  );
};

// Hero Section Component
const HeroSection = () => {
  const typingTexts = [
    portfolioData.personal.subtitle,
    "Building Amazing Web Experiences",
    "Securing Digital Solutions",
    "Analyzing Data with ML"
  ];

  return (
    <section id="home" className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__greeting">Hello, I'm</div>
          <h1 className="hero__name">{portfolioData.personal.name}</h1>
          <h2 className="hero__title">
            <TypingAnimation texts={typingTexts} speed={80} deleteSpeed={40} delay={3000} />
          </h2>
          <p className="hero__description">
            {portfolioData.objective.substring(0, 200)}...
          </p>
          <div className="hero__actions">
            <button 
              className="btn btn--primary"
              onClick={() => smoothScrollTo('projects')}
            >
              <i className="fas fa-rocket"></i>
              View My Work
            </button>
            <button 
              className="btn btn--outline"
              onClick={() => smoothScrollTo('contact')}
            >
              <i className="fas fa-envelope"></i>
              Get In Touch
            </button>
          </div>
        </div>
        
        <div className="hero__image">
          <div className="hero__avatar">
            <i className="fas fa-user-astronaut"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

// About Section Component
const AboutSection = () => {
  return (
    <section id="about" className="section">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">About Me</h2>
          <p className="section__subtitle">
            Passionate about technology and innovation
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <div>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.7', marginBottom: '2rem' }}>
              {portfolioData.objective}
            </p>
            
            {/* Stats Counter */}
            <div className="stats-counter">
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter end={portfolioData.stats.projectsCompleted} delay={200} />+
                </div>
                <div className="stat-label">Projects Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter end={portfolioData.stats.technologiesLearned} delay={400} />+
                </div>
                <div className="stat-label">Technologies</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter end={portfolioData.stats.yearsOfStudy} delay={600} />+
                </div>
                <div className="stat-label">Years of Study</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter end={portfolioData.stats.certifications} delay={800} />+
                </div>
                <div className="stat-label">Certifications</div>
              </div>
            </div>
          </div>
          
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ 
                  width: '48px', height: '48px', background: 'var(--purple-gradient)', 
                  borderRadius: '12px', display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', color: 'white', fontSize: '1.5rem' 
                }}>
                  <i className="fas fa-code"></i>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Frontend Development</h3>
              </div>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Crafting beautiful and responsive user interfaces with modern technologies.
              </p>
            </div>
            
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ 
                  width: '48px', height: '48px', background: 'var(--purple-gradient)', 
                  borderRadius: '12px', display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', color: 'white', fontSize: '1.5rem' 
                }}>
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Cybersecurity</h3>
              </div>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Protecting digital assets through security analysis and ethical practices.
              </p>
            </div>
            
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ 
                  width: '48px', height: '48px', background: 'var(--purple-gradient)', 
                  borderRadius: '12px', display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', color: 'white', fontSize: '1.5rem' 
                }}>
                  <i className="fas fa-brain"></i>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Machine Learning</h3>
              </div>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                Building intelligent systems that learn from data to solve real-world problems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Education Section Component
const EducationSection = () => {
  return (
    <section id="education" className="section">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Education</h2>
          <p className="section__subtitle">
            Academic journey in Computer Science and Engineering
          </p>
        </div>
        
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <ProgressCircle progress={portfolioData.education.progress} />
            </div>
            <div style={{ 
              width: '64px', height: '64px', background: 'var(--purple-gradient)', 
              borderRadius: '16px', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', color: 'white', fontSize: '2rem',
              margin: '0 auto 1.5rem'
            }}>
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
              {portfolioData.education.degree}
            </h3>
            <p style={{ color: 'var(--purple-light)', fontWeight: '500', fontSize: '1.125rem' }}>
              {portfolioData.education.duration}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Experience Section Component
const ExperienceSection = () => {
  return (
    <section id="experience" className="section">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Experience</h2>
          <p className="section__subtitle">
            Professional journey and practical applications
          </p>
        </div>
        
        <div className="timeline">
          {portfolioData.experience.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="card">
                <h3 style={{ 
                  fontSize: '1.5rem', fontWeight: '600', 
                  color: 'var(--purple-light)', marginBottom: '0.5rem' 
                }}>
                  {exp.title}
                </h3>
                <p style={{ 
                  color: 'var(--color-text-secondary)', 
                  marginBottom: '1.5rem', fontWeight: '500' 
                }}>
                  {exp.duration}
                </p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {exp.points.map((point, pointIndex) => (
                    <li key={pointIndex} style={{ 
                      position: 'relative', paddingLeft: '2rem', 
                      marginBottom: '1rem', lineHeight: '1.6' 
                    }}>
                      <span style={{ 
                        position: 'absolute', left: '0', top: '0.5rem',
                        color: 'var(--purple-primary)', fontSize: '0.75rem'
                      }}>
                        ▶
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3D Flip Card Component
const FlipCard = ({ project, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleProjectAction = (title, action) => {
    alert(`${action} for "${title}" - ${action === 'View Project' ? 'Demo' : 'Source code'} coming soon!`);
  };

  return (
    <div 
      className="flip-card"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ 
              width: '64px', height: '64px', background: 'var(--purple-gradient)', 
              borderRadius: '16px', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', color: 'white', fontSize: '2rem',
              marginBottom: '1.5rem'
            }}>
              <i className={index === 0 ? "fas fa-hotel" : "fas fa-cloud-rain"}></i>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
              {project.title}
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
              {project.description.substring(0, 150)}...
            </p>
            <div style={{ 
              display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' 
            }}>
              {project.technologies.slice(0, 3).map((tech, techIndex) => (
                <span key={techIndex} style={{ 
                  background: 'rgba(139, 92, 246, 0.2)', 
                  color: 'var(--purple-light)', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '9999px', 
                  fontSize: '0.875rem',
                  border: '1px solid rgba(139, 92, 246, 0.3)'
                }}>
                  {tech}
                </span>
              ))}
            </div>
            <div style={{ 
              background: 'var(--purple-primary)', 
              color: 'white', 
              padding: '0.5rem 1rem', 
              borderRadius: '20px', 
              fontSize: '0.875rem',
              alignSelf: 'flex-start',
              fontWeight: '500'
            }}>
              {project.status}
            </div>
          </div>
        </div>
        <div className="flip-card-back">
          <div style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: 'white' }}>
              Key Features
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
              {project.features.map((feature, featureIndex) => (
                <li key={featureIndex} style={{ 
                  color: 'white', marginBottom: '0.75rem', 
                  display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}>
                  <i className="fas fa-check-circle" style={{ color: 'rgba(255, 255, 255, 0.8)' }}></i>
                  {feature}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                className="btn btn--outline"
                
                style={{ flex: 1, border: '2px solid white', color: 'white' }}
                onClick={() => handleProjectAction(project.title, 'View Project')}
              >
                <i className="fas fa-external-link-alt"></i>
                Demo
              </button>
              <button 
                className="btn btn--outline"
                style={{ flex: 1, border: '2px solid white', color: 'white' }}
                onClick={() => window.open("https://github.com/Abhinav-Vinod-10/Hotel-Booking.git", "_blank", "noopener,noreferrer")}
              >
                <i className="fab fa-github"></i>
                Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Projects Section Component
const ProjectsSection = () => {
  return (
    <section id="projects" className="section">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Projects</h2>
          <p className="section__subtitle">
            Showcasing creativity and technical expertise
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
          gap: '2rem' 
        }}>
          {portfolioData.projects.map((project, index) => (
            <FlipCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Skills Section Component
const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      icon: "fas fa-laptop-code",
      skills: portfolioData.skills.frontend
    },
    {
      title: "Cybersecurity",
      icon: "fas fa-shield-alt",
      skills: portfolioData.skills.cybersecurity
    },
    {
      title: "Data Science & ML",
      icon: "fas fa-chart-bar",
      skills: portfolioData.skills.dataScience
    },
    {
      title: "Soft Skills",
      icon: "fas fa-users",
      skills: portfolioData.skills.soft
    }
  ];

  return (
    <section id="skills" className="section">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Skills & Expertise</h2>
          <p className="section__subtitle">
            Technologies and capabilities that drive innovation
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {skillCategories.map((category, index) => (
            <div key={index} className="card">
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <div style={{ 
                  width: '64px', height: '64px', background: 'var(--purple-gradient)', 
                  borderRadius: '16px', display: 'flex', alignItems: 'center', 
                  justifyContent: 'center', color: 'white', fontSize: '2rem',
                  margin: '0 auto 1rem'
                }}>
                  <i className={category.icon}></i>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                  {category.title}
                </h3>
              </div>
              
              <div>
                {category.skills.map((skill, skillIndex) => (
                  <SkillProgressBar 
                    key={skillIndex} 
                    skill={skill} 
                    delay={index * 200 + skillIndex * 100} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Certifications Section Component
const CertificationsSection = () => {
  return (
    <section id="certifications" className="section">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Certifications</h2>
          <p className="section__subtitle">
            Professional achievements and validated expertise
          </p>
        </div>
        
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {portfolioData.certifications.map((cert, index) => (
            <div key={index} className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{ 
                width: '80px', height: '80px', 
                background: 'linear-gradient(135deg, #ff9500, #ff6b35)', 
                borderRadius: '20px', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', color: 'white', fontSize: '2.5rem',
                margin: '0 auto 1.5rem'
              }}>
                <i className="fab fa-aws"></i>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                {cert.title}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem', marginBottom: '0.5rem' }}>
                {cert.issuer}
              </p>
              <p style={{ color: 'var(--purple-light)', fontWeight: '500' }}>
                {cert.year}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section Component
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setShowSuccess(false), 5000);
  };

  const handleLinkedInClick = () => {
    window.open(`https://${portfolioData.personal.linkedin}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contact" className="section">
      <div className="section__container">
        <div className="section__header">
          <h2 className="section__title">Get In Touch</h2>
          <p className="section__subtitle">
            Let's connect and create something amazing together
          </p>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '3rem' 
        }}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                width: '48px', height: '48px', background: 'var(--purple-gradient)', 
                borderRadius: '12px', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', color: 'white', fontSize: '1.25rem'
              }}>
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>
                  Phone
                </div>
                <div>
                  <a 
                    href={`tel:${portfolioData.personal.phone}`}
                    style={{ color: 'var(--purple-light)', textDecoration: 'none', fontWeight: '500' }}
                  >
                    {portfolioData.personal.phone}
                  </a>
                </div>
              </div>
            </div>
            
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                width: '48px', height: '48px', background: 'var(--purple-gradient)', 
                borderRadius: '12px', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', color: 'white', fontSize: '1.25rem'
              }}>
                <i className="fab fa-linkedin"></i>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>
                  LinkedIn
                </div>
                <div>
                  <button 
                    onClick={handleLinkedInClick}
                    style={{
                      background: 'none', border: 'none', color: 'var(--purple-light)', 
                      cursor: 'pointer', textDecoration: 'underline', padding: 0, 
                      fontSize: 'inherit', fontWeight: '500'
                    }}
                  >
                    Connect with me →
                  </button>
                </div>
              </div>
            </div>
            
            <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ 
                width: '48px', height: '48px', background: 'var(--purple-gradient)', 
                borderRadius: '12px', display: 'flex', alignItems: 'center', 
                justifyContent: 'center', color: 'white', fontSize: '1.25rem'
              }}>
                <i className="fas fa-envelope"></i>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>
                  Email
                </div>
                <div>
                  <a 
                    href="mailto:abhinavvinod.work.v@gmail.com"
                    style={{ color: 'var(--purple-light)', textDecoration: 'none', fontWeight: '500' }}
                  >
                    abhinavvinod.work.v@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', textAlign: 'center' }}>
              Send me a message
            </h3>
            
            {showSuccess && (
              <div style={{
                background: 'rgba(139, 92, 246, 0.1)', color: 'var(--purple-light)', 
                border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '8px', 
                padding: '0.75rem', marginBottom: '1rem', display: 'flex', 
                alignItems: 'center', gap: '0.5rem', fontWeight: '500'
              }}>
                <i className="fas fa-check-circle"></i>
                Thank you! I'll get back to you soon.
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', marginBottom: '0.5rem', 
                  fontWeight: '500', fontSize: '0.875rem' 
                }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%', padding: '0.75rem', borderRadius: '8px',
                    border: '1px solid rgba(139, 92, 246, 0.3)', 
                    background: 'rgba(17, 17, 17, 0.5)', color: 'white',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', marginBottom: '0.5rem', 
                  fontWeight: '500', fontSize: '0.875rem' 
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%', padding: '0.75rem', borderRadius: '8px',
                    border: '1px solid rgba(139, 92, 246, 0.3)', 
                    background: 'rgba(17, 17, 17, 0.5)', color: 'white',
                    fontSize: '1rem'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', marginBottom: '0.5rem', 
                  fontWeight: '500', fontSize: '0.875rem' 
                }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  style={{
                    width: '100%', padding: '0.75rem', borderRadius: '8px',
                    border: '1px solid rgba(139, 92, 246, 0.3)', 
                    background: 'rgba(17, 17, 17, 0.5)', color: 'white',
                    fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical'
                  }}
                />
              </div>
              
              <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
                <i className="fas fa-paper-plane"></i>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Scroll to Top Button
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button 
      className={`btn--floating ${isVisible ? '' : 'hidden'}`}
      onClick={scrollToTop}
      style={{ display: isVisible ? 'flex' : 'none' }}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

// Main Portfolio App Component
const PortfolioApp = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll('.section');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, [isLoaded]);

  const handleLoadingComplete = () => {
    setIsLoaded(true);
  };

  return (
    <div className="portfolio-app">
      <LoadingScreen onComplete={handleLoadingComplete} />
      <ParticleSystem />
      <CursorTrail />
      
      {isLoaded && (
        <>
          <Navigation />
          <HeroSection />
          <AboutSection />
          <EducationSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillsSection />
          <CertificationsSection />
          <ContactSection />
          <ScrollToTopButton />
        </>
      )}
    </div>
  );
};

// Render the app
ReactDOM.render(<PortfolioApp />, document.getElementById('root'));