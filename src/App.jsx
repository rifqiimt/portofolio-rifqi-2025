import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, X, FileText, Mail, ArrowUpRight, Zap, 
  MousePointer2, Github, Instagram, Linkedin, 
  Phone, Terminal, Figma, Code, Image as ImageIcon 
} from 'lucide-react';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Data
import { projectsData, experiencesList, certsData, internshipsList } from './data/portfolioData';

// Hooks
import { useAutoScroll } from './hooks';

// Components
import { Reveal } from './components/ui/Reveal';
import { ProjectCard, CertCard, VisualExperienceCard, TechStackCard, InternshipCard } from './components/ui/Cards';
import { SocialLink, QuoteIcon } from './components/ui/Misc';

// Modals
import { CVModal } from './components/modals/CVModal';
import { CaseStudyModal } from './components/modals/CaseStudyModal';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaseData, setSelectedCaseData] = useState(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllExp, setShowAllExp] = useState(false);

  const certScrollRef = useRef(null);
  useAutoScroll(certScrollRef, 0.6);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Certifications', id: 'certs' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const sections = navLinks.map(link => document.getElementById(link.id));
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const openCaseModal = (data) => {
    setSelectedCaseData(data);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCaseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const openCVModal = () => {
    setIsCVModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeCVModal = () => {
    setIsCVModalOpen(false);
    document.body.style.overflow = 'unset';
  };

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const categories = ['ALL', 'WEB DEV', 'UI/UX', 'AR / VR', 'IOT'];
  
  const filteredProjects = selectedCategory === 'ALL'
    ? projectsData
    : projectsData.filter(item => {
        if (selectedCategory === 'WEB DEV') return item.category === 'Web Development';
        if (selectedCategory === 'UI/UX') return item.category === 'UI/UX Design';
        if (selectedCategory === 'AR / VR') return item.category === 'AR / VR';
        if (selectedCategory === 'IOT') return item.category === 'IoT Solution';
        return true;
      });

  const displayedProjects = (selectedCategory === 'ALL' && !showAllProjects) 
    ? filteredProjects.slice(0, 6) 
    : filteredProjects;

  const displayedExp = showAllExp ? experiencesList : experiencesList.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#fffdf5] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* GLOBAL STYLES */}
      <style>{`
        ::-webkit-scrollbar {
          width: 12px;
          height: 12px;
        }
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-left: 2px solid black;
        }
        ::-webkit-scrollbar-thumb {
          background: #22c55e;
          border: 2px solid black;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #16a34a;
        }

        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>

      {/* Background Dot Pattern */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* NAVBAR */}
      <Navbar
        scrolled={scrolled}
        activeSection={activeSection}
        navLinks={navLinks}
        scrollTo={scrollTo}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        openCVModal={openCVModal}
      />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-1/4 -left-10 w-40 h-40 bg-purple-400 rounded-full border-2 border-black mix-blend-multiply filter blur-xl opacity-50"></div>
        <div className="absolute bottom-1/4 -right-10 w-60 h-60 bg-yellow-300 rounded-full border-2 border-black mix-blend-multiply filter blur-xl opacity-50"></div>
        
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-16 flex flex-col-reverse lg:flex-row items-center justify-between gap-16 relative z-10">
          <Reveal className="lg:w-7/12 text-center lg:text-left space-y-6">
            <div className="inline-block bg-white border-2 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
              <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse border border-black"></span> 
                Status: Available for work
              </span> 
            </div>
            
            <div className="relative">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-2 text-transparent bg-clip-text bg-black" style={{WebkitTextStroke: '2px black'}}>
                  RIFQI M.
                </h1>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-black absolute top-1 left-1 -z-10 opacity-0 lg:opacity-100 text-stroke">
                    RIFQI M.
                </h1>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-yellow-300 inline-block px-3 border-2 border-black transform rotate-1 mt-1">
                    TAMPENG
                </p>
            </div>
            
            <div className="bg-white border-2 border-black p-4 lg:mr-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl relative">
                <div className="absolute -top-3 -right-3 bg-blue-400 border-2 border-black p-1.5 rounded-full z-10">
                    <Terminal size={20} className="text-white"/>
                </div>
                <p className="text-sm sm:text-base font-medium leading-relaxed">
                  Bachelor of Engineering (S.T.) in Computer Engineering - Universitas Syiah Kuala (GPA 3.55). Specializing in: <span className="font-bold underline decoration-pink-500 decoration-4">UI/UX Design</span>, <span className="font-bold underline decoration-blue-500 decoration-4">Web Development</span>, & <span className="font-bold underline decoration-green-500 decoration-4">Low-Code Dev</span>.
                </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <button onClick={() => scrollTo('projects')} className="group px-7 py-3.5 bg-black text-white text-xs sm:text-sm font-bold uppercase border-2 border-black rounded-lg shadow-[6px_6px_0px_0px_#22d3ee] hover:shadow-[2px_2px_0px_0px_#22d3ee] hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center gap-2">
                View Projects <MousePointer2 size={18} className="group-hover:rotate-12 transition-transform" />
              </button>
              <button onClick={() => scrollTo('experience')} className="px-7 py-3.5 bg-white text-black text-xs sm:text-sm font-bold uppercase border-2 border-black rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
                Experience
              </button>
              <button
                onClick={openCVModal}
                className="px-7 py-3.5 bg-yellow-300 text-black text-xs sm:text-sm font-black uppercase border-2 border-black rounded-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-yellow-400 transition-all flex items-center gap-2"
              >
                <FileText size={18} /> View CV / Resume
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 pt-6">
               <span className="font-mono text-xs font-bold bg-black text-white px-2 py-1 transform -rotate-3">CONNECT:</span>
               {[
                 { icon: <Github size={18}/>, href: "https://github.com/rifqiimt" },
                 { icon: <Instagram size={18}/>, href: "https://www.instagram.com/rifqiimt/" },
                 { icon: <Linkedin size={18}/>, href: "https://www.linkedin.com/in/rifqiimt/" },
                 { icon: <Mail size={18}/>, href: "mailto:tampengrifqmubarak@gmail.com" },
                 { icon: <Phone size={18}/>, href: "https://wa.me/85214006701" }
               ].map((social, idx) => (
                 <SocialLink key={idx} href={social.href} icon={social.icon} />
               ))}
            </div>
          </Reveal>

          <Reveal delay={200} className="lg:w-5/12 flex justify-center relative">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-[26rem] lg:h-[26rem]">
              <div className="absolute top-0 right-0 w-full h-full bg-blue-400 border-2 border-black rounded-full mix-blend-normal z-0 translate-x-4 translate-y-4"></div>
              
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] z-10 hover:scale-105 transition-transform duration-500">
                 <img 
                  src="pp.jpeg" 
                  alt="Rifqi Mubarak" 
                  className="w-full h-full object-cover"
                  onError={(e) => {e.target.src = "https://api.dicebear.com/9.x/avataaars/svg?seed=Rifqi"}} 
                />
              </div>

              <div className="absolute -right-4 top-10 bg-white border-2 border-black p-3 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 flex items-center gap-2 transform rotate-3 hover:scale-105 transition-transform">
                 <Figma size={20} className="text-black"/>
                 <span className="font-black text-[11px] sm:text-xs uppercase">UI/UX<br/>MASTER</span>
              </div>
              
              <div className="absolute -left-2 bottom-12 bg-yellow-300 border-2 border-black p-3 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 flex items-center gap-2 transform -rotate-2 hover:scale-105 transition-transform">
                 <Code size={20} className="text-black"/>
                 <span className="font-black text-[11px] sm:text-xs uppercase">WEB DEV<br/>REACT & TAILWIND</span>
              </div>
            </div>
          </Reveal>
        </div>
        
        <div className="absolute bottom-8 left-0 w-full bg-black border-y-2 border-black py-2 transform -rotate-1 scale-105 z-20 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-white font-mono font-bold text-base sm:text-lg mx-4 flex items-center gap-4">
                        DESIGN <Zap size={16} className="text-yellow-400"/> CODE <Zap size={16} className="text-yellow-400"/> CREATE <Zap size={16} className="text-yellow-400"/>
                    </span>
                ))}
            </div>
        </div>
      </section>

      {/* About & Skills */}
      <section id="about" className="py-28 bg-purple-50 border-t-4 border-black relative">
        <div className="absolute top-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,black,black_10px,transparent_10px,transparent_20px)] opacity-20"></div>
        
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-16">
          <Reveal>
             <div className="flex flex-col items-center mb-16">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-center bg-white border-2 border-black px-6 py-2 shadow-[6px_6px_0px_0px_#f472b6] transform -rotate-1">
                    About Me
                </h2>
             </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-7">
               <Reveal delay={100}>
                  <div className="bg-white border-2 border-black p-6 md:p-8 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                    <QuoteIcon className="absolute -top-4 -left-4 w-10 h-10 bg-yellow-400 border-2 border-black text-black p-2 rounded-full z-10" />
                    <div className="text-black font-medium text-sm sm:text-base leading-relaxed space-y-5">
                        <p>
                        I am a Bachelor of Engineering (S.T.) graduate in Computer Engineering from Universitas Syiah Kuala with a <span className="bg-green-200 px-1.5 py-0.5 border border-black font-bold">GPA of 3.55/4.00</span>. I have a strong passion for creating aesthetic and functional digital solutions.
                        </p>
                        <p>
                        My expertise ranges from intuitive User Interface (UI/UX) design and modern Web Development to IoT-based system development and Low-Code Full Stack applications.
                        </p>
                        <p>
                        Beyond technical skills, I have proven leadership abilities, having led a team of up to <span className="bg-blue-200 px-1.5 py-0.5 border border-black font-bold">120 people</span> as the Project Lead for a national-level event (CMD 2025).
                        </p>
                    </div>
                  </div>
               </Reveal>
               
               <Reveal delay={200} className="mt-8">
                 <div className="grid grid-cols-3 gap-5">
                   {[
                     { val: "3.55", label: "GPA Score", color: "bg-pink-300" },
                     { val: "120+", label: "Team Led", color: "bg-blue-300" },
                     { val: "6+", label: "Projects Done", color: "bg-green-300" }
                   ].map((stat, i) => (
                     <div key={i} className={`p-4 border-2 border-black text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${stat.color} rounded-lg`}>
                         <h3 className="text-2xl sm:text-3xl font-black text-black">{stat.val}</h3>
                         <p className="text-[11px] font-bold uppercase border-t-2 border-black mt-1 pt-1">{stat.label}</p>
                     </div>
                   ))}
                 </div>
               </Reveal>
            </div>

            <div className="lg:col-span-5">
               <Reveal delay={300}>
                 <div className="bg-gray-100 border-2 border-black p-6 rounded-xl relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 text-xs sm:text-sm font-bold uppercase rounded border-2 border-white transform skew-x-12">
                         My Arsenal
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-4">
                      <TechStackCard icon="figma.png" name="Figma" desc="UI/UX Design" />
                      <TechStackCard icon="react.png" name="React.js" desc="Frontend Web" />
                      <TechStackCard icon="tailwind.png" name="Tailwind CSS" desc="Styling" />
                      <TechStackCard icon="unity.png" name="Unity 3D" desc="AR / VR Engine" />
                      <TechStackCard icon="blender.png" name="Blender 3D" desc="3D Modeling" />
                      <TechStackCard icon="arduino.png" name="ESP32 / Arduino" desc="IoT Systems" />
                      <TechStackCard icon="firebase.png" name="Firebase" desc="Cloud / DB" />
                      <TechStackCard icon="mesh.png" name="WebAR / Meshroom" desc="3D Photogrammetry" />
                    </div>
                 </div>
               </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="py-28 bg-[#fffdf5] border-t-4 border-black overflow-hidden">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-16">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
               <div>
                 <div className="flex items-center gap-2 mb-2">
                    <div className="h-1 w-12 bg-black"></div>
                    <span className="font-mono font-bold uppercase text-xs sm:text-sm">Selected Works</span>
                 </div>
                 <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-black tracking-tight leading-none">
                    FEATURED <br/>
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500" style={{WebkitTextStroke: '1px black'}}>
                     PROJECTS ({filteredProjects.length})
                   </span>
                 </h2>
               </div>
               
               <div className="flex flex-wrap gap-2">
                 {categories.map((cat, i) => {
                   const isActive = selectedCategory === cat;
                   return (
                     <button
                       key={i}
                       onClick={() => {
                         setSelectedCategory(cat);
                         setShowAllProjects(false);
                       }}
                       className={`px-4 py-2 border-2 border-black font-black text-xs uppercase rounded-lg transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                         isActive 
                           ? 'bg-yellow-300 text-black translate-x-[1px] translate-y-[1px] shadow-none' 
                           : 'bg-white text-gray-700 hover:bg-gray-100'
                       }`}
                     >
                       {cat}
                     </button>
                   );
                 })}
               </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProjects.map((project, idx) => (
              <Reveal key={idx} delay={(idx % 3) * 100}>
                <ProjectCard 
                  title={project.title}
                  category={project.category}
                  images={project.gallery}
                  color={project.color}
                  onOpenModal={() => openCaseModal(project)}
                />
              </Reveal>
            ))}
          </div>

          {selectedCategory === 'ALL' && filteredProjects.length > 6 && (
            <div className="text-center mt-14">
              <button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="bg-white border-2 border-black px-8 py-3.5 font-black uppercase text-xs sm:text-sm rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {showAllProjects 
                  ? "↑ Show Fewer Projects" 
                  : `↓ View All Projects (${filteredProjects.length - 6} More)`
                }
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-28 bg-blue-50 border-y-4 border-black">
        <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-16">
          <Reveal>
            <div className="mb-16 flex flex-col items-center text-center">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-black tracking-tight mb-2 uppercase border-b-4 border-black pb-2">
                Experience Highlight
              </h2>
              <p className="text-gray-600 font-medium text-xs sm:text-sm mt-2">
                Proof of leadership & real-world field contributions (Click photo for details)
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">
            {internshipsList.map((internship, idx) => (
              <Reveal key={idx} delay={100 + (idx * 50)}>
                <InternshipCard 
                  data={internship}
                  onOpenModal={openCaseModal}
                />
              </Reveal>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {displayedExp.map((exp, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <VisualExperienceCard
                  title={exp.title}
                  role={exp.role}
                  year={exp.year}
                  image={exp.image}
                  categoryBadgeColor={exp.categoryBadgeColor}
                  onClickDetail={() => openCaseModal(exp)}
                />
              </Reveal>
            ))}
          </div>

          {experiencesList.length > 3 && (
            <div className="text-center mt-14">
              <button
                onClick={() => setShowAllExp(!showAllExp)}
                className="bg-white border-2 border-black px-8 py-3.5 font-black uppercase text-xs sm:text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                {showAllExp 
                  ? "↑ Show Less" 
                  : `↓ View More Experiences (${experiencesList.length - 3} Photos)`
                }
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Certifications */}
      <section id="certs" className="py-28 bg-yellow-50 relative overflow-hidden">
         <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px'}}></div>

         <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-16 relative z-10">
            <Reveal>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tight text-center mb-16 bg-white border-2 border-black inline-block px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-auto block transform rotate-1">
                CERTIFICATIONS & TRAINING
              </h2>
            </Reveal>
            
            <div 
                ref={certScrollRef}
                className="w-full overflow-x-auto pb-16 pt-4 px-4 -mx-4 responsive-scrollbar"
            >
              <div className="flex gap-8 w-max">
                {certsData.map((cert, index) => (
                  <div key={index} className="w-[320px] md:w-[360px] flex-shrink-0">
                    <CertCard 
                      title={cert.title}
                      subtitle={cert.subtitle}
                      images={cert.gallery}
                      onOpenModal={() => openCaseModal(cert)}
                    />
                  </div>
                ))}
              </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* POP-UP MODALS */}
      <CaseStudyModal 
        isOpen={isModalOpen} 
        data={selectedCaseData} 
        onClose={closeCaseModal} 
      />
      <CVModal
        isOpen={isCVModalOpen}
        onClose={closeCVModal}
      />
    </div>
  );
};

export default App;
