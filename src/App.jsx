import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  Palette, 
  Box, 
  Cpu, 
  Smartphone, 
  Award,
  BookOpen,
  Users,
  Briefcase,
  ChevronDown,
  Menu,
  X,
  Image as ImageIcon,
  Camera,
  Instagram,
  Figma,
  ChevronLeft,
  ChevronRight,
  Building2,
  Phone,
  Zap,
  MousePointer2,
  MapPin,
  Terminal,
  ArrowUpRight,
  CloudSun,
  Youtube, // Import icon Youtube
  Globe    // Import icon Globe untuk website/demo
} from 'lucide-react';

/* --- HOOKS & UTILS --- */

const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [ref, isVisible];
};

// Hook Kustom untuk Auto-Scroll
const useAutoScroll = (ref, speed = 1) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animationId;
    let isPaused = false;

    const animate = () => {
      if (!isPaused) {
        // Jika sudah mencapai ujung kanan, kembalikan ke awal (looping sederhana)
        if (element.scrollLeft >= element.scrollWidth - element.clientWidth - 1) {
           element.scrollLeft = 0; 
        } else {
           element.scrollLeft += speed;
        }
      }
      animationId = requestAnimationFrame(animate);
    };

    // Event Listeners untuk Pause saat interaksi
    const handleMouseEnter = () => isPaused = true;
    const handleMouseLeave = () => isPaused = false;
    const handleTouchStart = () => isPaused = true;
    const handleTouchEnd = () => {
      // Delay sedikit sebelum lanjut scroll setelah sentuhan selesai
      setTimeout(() => { isPaused = false; }, 1000);
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);

    // Mulai animasi
    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [ref, speed]);
};

/* --- KOMPONEN --- */

// REVEAL ANIMATION: Slide up with bounce
const Reveal = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-700 cubic-bezier(0.175, 0.885, 0.32, 1.275) transform ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ImageGalleryModal = ({ isOpen, images, initialIndex, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex, isOpen]);

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-yellow-300/90 backdrop-blur-md p-4 animate-in fade-in duration-300" onClick={onClose}>
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 bg-black text-white p-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] transition-all z-50 rounded-lg"
      >
        <X size={24} />
      </button>

      <div className="relative w-full max-w-5xl h-full max-h-[85vh] flex items-center justify-center p-4" onClick={(e) => e.stopPropagation()}>
        <div className="relative bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-2 rounded-xl max-h-full max-w-full flex flex-col">
            <div className="flex justify-between items-center mb-2 px-2 border-b-2 border-black pb-2 bg-gray-100 rounded-t-lg">
                <span className="font-mono font-bold text-sm">GALLERY_VIEWER.EXE</span>
                <span className="font-mono text-xs">{activeIndex + 1} / {images.length}</span>
            </div>

            <div className="relative overflow-hidden bg-gray-100 border-2 border-black rounded-lg flex-grow flex items-center justify-center">
                {images.length > 1 && (
                <>
                    <button 
                    onClick={prevImage} 
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all z-10 rounded-full"
                    >
                    <ChevronLeft size={24} />
                    </button>
                    <button 
                    onClick={nextImage} 
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all z-10 rounded-full"
                    >
                    <ChevronRight size={24} />
                    </button>
                </>
                )}

                <img 
                src={images[activeIndex]} 
                alt={`Gallery ${activeIndex}`} 
                className="max-h-[70vh] w-auto object-contain mx-auto"
                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"; }}
                />
            </div>

            <div className="flex gap-2 overflow-x-auto max-w-full p-4 hide-scrollbar justify-center">
            {images.map((_, idx) => (
                <button
                key={idx} 
                onClick={(e) => { e.stopPropagation(); setActiveIndex(idx); }}
                className={`w-3 h-3 border-2 border-black transition-all duration-300 ${idx === activeIndex ? 'bg-black scale-125' : 'bg-white hover:bg-gray-200'}`}
                />
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

// STYLE CHANGE: Neo-Brutalist Card
// Added 'links' prop
const ProjectCard = ({ title, category, description, tags, icon, color, images, heightClass = "h-64", aspectClass = "aspect-video", onOpenGallery, links }) => {
  const accentColor = color.includes('pink') ? 'bg-pink-400' : 
                      color.includes('purple') ? 'bg-purple-400' :
                      color.includes('blue') ? 'bg-blue-400' :
                      color.includes('green') ? 'bg-green-400' :
                      color.includes('orange') ? 'bg-orange-400' : 'bg-yellow-400';

  return (
    <div className="group relative h-full">
      {/* Background Shadow Block */}
      <div className={`absolute top-2 left-2 w-full h-full bg-black rounded-xl transition-all duration-300 group-hover:top-3 group-hover:left-3`}></div>
      
      <div className="relative bg-white border-2 border-black rounded-xl overflow-hidden h-full flex flex-col transition-transform duration-300 group-hover:-translate-y-1 group-hover:-translate-x-1">
        {/* Header Bar */}
        <div className="border-b-2 border-black px-4 py-2 flex justify-between items-center bg-gray-50">
            <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full border-2 border-black bg-red-400"></div>
                <div className="w-3 h-3 rounded-full border-2 border-black bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full border-2 border-black bg-green-400"></div>
            </div>
            <div className={`px-2 py-0.5 border-2 border-black text-[10px] font-bold uppercase tracking-wider ${accentColor} rounded`}>
                {category}
            </div>
        </div>

        {/* Image Area */}
        <div className="relative overflow-hidden border-b-2 border-black bg-gray-100 group/img">
            {images && images.length > 0 ? (
                <div 
                    className={`${aspectClass} ${heightClass} w-full cursor-pointer relative`}
                    onClick={() => onOpenGallery(images, 0)}
                >
                    <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors z-10 flex items-center justify-center">
                        <div className="bg-white border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] opacity-0 group-hover/img:opacity-100 transition-all duration-200 transform scale-75 group-hover/img:scale-100 rotate-3 group-hover/img:rotate-0">
                            <span className="font-bold text-sm">VIEW PROJECT</span>
                        </div>
                    </div>
                    <img 
                        src={images[0]} 
                        alt={title} 
                        className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all duration-500" 
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80"; }}
                    />
                    {images.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-white border-2 border-black px-2 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                            <ImageIcon size={12} /> +{images.length - 1}
                        </div>
                    )}
                </div>
            ) : (
                <div className={`${heightClass} flex items-center justify-center border-dashed border-2 border-gray-300 m-4 rounded`}>
                    <span className="font-mono text-gray-400">NO_IMAGE_DATA</span>
                </div>
            )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-black text-black leading-tight uppercase">{title}</h3>
                <div className="bg-black text-white p-1.5 rounded border-2 border-transparent group-hover:border-black group-hover:bg-white group-hover:text-black transition-colors">
                    {icon}
                </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 font-medium leading-relaxed border-l-4 border-gray-200 pl-3 flex-grow">
                {description}
            </p>

            <div className="mt-auto">
                {/* TAGS SECTION */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag, index) => (
                        <span key={index} className="text-[10px] font-bold px-2 py-1 bg-gray-100 border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* BUTTON LINKS SECTION (Moved to Bottom) */}
                {links && links.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-3 border-t-2 border-dashed border-gray-300">
                        {links.map((link, i) => (
                            <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noreferrer"
                                className={`flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all ${link.className || 'bg-white hover:bg-gray-50'}`}
                            >
                                {link.icon}
                                {link.text}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

// STYLE CHANGE: Sticker Style
const TechStackCard = ({ icon, name, desc }) => (
  <div className="group relative">
    <div className="absolute inset-0 bg-black rounded-lg translate-x-1 translate-y-1"></div>
    <div className="relative bg-white p-3 rounded-lg border-2 border-black flex items-center gap-3 hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-200 cursor-default">
        <div className="w-10 h-10 flex items-center justify-center bg-gray-100 border-2 border-black rounded p-1">
            <img 
                src={icon} 
                alt={name} 
                className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all" 
                onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-black"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;
                }}
            /> 
        </div>
        <div>
            <h4 className="font-black text-sm uppercase">{name}</h4>
            <span className="text-[10px] bg-yellow-300 px-1 border border-black font-bold">{desc}</span>
        </div>
    </div>
  </div>
);

// STYLE CHANGE: Checklist / Connected Line Style
const TimelineCard = ({ role, org, date, desc, highlight, evidenceLabel, images, onOpenGallery }) => (
  <div className="flex gap-4 group">
    {/* Custom Bullet Line */}
    <div className="flex flex-col items-center">
        <div className={`w-6 h-6 rounded-none border-2 border-black ${highlight ? 'bg-purple-500' : 'bg-white group-hover:bg-gray-200'} flex items-center justify-center z-10 transition-colors`}>
            {highlight && <div className="w-2 h-2 bg-white"></div>}
        </div>
        <div className="w-0.5 bg-black h-full border-l-2 border-dashed border-black min-h-[80px]"></div>
    </div>

    <div className="pb-8 flex-grow">
        <div className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg transition-transform hover:-translate-y-1">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                <div>
                    <h4 className="text-lg font-black uppercase leading-none">{role}</h4>
                    <div className="flex items-center gap-2 mt-1">
                        <Building2 size={14} className="text-black" />
                        <span className="font-bold text-sm bg-gray-100 px-1 border border-black">{org}</span>
                    </div>
                </div>
                <span className="text-xs font-mono font-bold bg-black text-white px-2 py-1 rounded self-start sm:self-auto transform -rotate-2">
                    {date}
                </span>
            </div>
            
            <p className="text-sm font-medium text-gray-700 mt-3 mb-4">{desc}</p>
            
            {evidenceLabel && images && images.length > 0 && (
                <div 
                    onClick={() => onOpenGallery(images, 0)}
                    className="inline-flex items-center gap-2 bg-yellow-300 border-2 border-black px-3 py-1.5 rounded cursor-pointer hover:bg-yellow-400 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-[2px] active:shadow-none"
                >
                    <ImageIcon size={14}/>
                    <span className="text-xs font-bold uppercase underline decoration-2">Lihat Bukti</span>
                    <span className="bg-white border border-black text-[10px] px-1 rounded-full">{images.length}</span>
                </div>
            )}
        </div>
    </div>
  </div>
);

// STYLE CHANGE: Grid Block Style
const OrgCard = ({ role, period, desc, images, onOpenGallery }) => (
  <div className="bg-white border-2 border-black p-0 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200 flex flex-col h-full rounded-lg overflow-hidden">
    <div className="bg-blue-300 border-b-2 border-black p-3 flex justify-between items-center">
        <span className="font-mono text-xs font-bold">[ORG_DATA]</span>
        <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full border border-black bg-white"></div>
            <div className="w-2 h-2 rounded-full border border-black bg-white"></div>
        </div>
    </div>
    
    <div className="p-5 flex-grow">
        <h5 className="font-black text-lg mb-1 leading-tight">{role}</h5>
        <span className="inline-block bg-black text-white text-[10px] font-mono px-1 mb-4">{period}</span>
        <p className="text-sm font-medium text-gray-700 leading-snug">{desc}</p>
    </div>
    
    {images && images.length > 0 && (
        <button 
            onClick={() => onOpenGallery(images, 0)}
            className="w-full py-2 bg-gray-100 hover:bg-yellow-300 border-t-2 border-black text-xs font-bold uppercase transition-colors flex items-center justify-center gap-2"
        >
            <Camera size={14}/> Dokumentasi
        </button>
    )}
  </div>
);

// STYLE CHANGE: Ticket / Coupon Style
const CertCard = ({ title, subtitle, desc, color, icon, images, onOpenGallery }) => {
    // Map simplified colors
    const bgClass = color === 'green' ? 'bg-green-200' : 
                    color === 'orange' ? 'bg-orange-200' : 
                    color === 'blue' ? 'bg-blue-200' : 'bg-yellow-200';

    return (
        <div className="group relative min-w-[320px] h-full">
            <div className={`absolute inset-0 border-2 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl`}></div>
            
            <div className={`relative h-full flex flex-col p-5 border-2 border-black bg-white rounded-xl transition-transform duration-200 group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-none`}>
                {/* Dashed Line Decoration */}
                <div className="absolute top-0 right-8 w-0.5 h-full border-r-2 border-dashed border-gray-300 z-0"></div>
                
                <div className="relative z-10">
                    <div className="flex items-start gap-3 mb-3">
                        <div className={`p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${bgClass} rounded-lg`}>
                            {React.cloneElement(icon, { size: 20, strokeWidth: 2.5 })}
                        </div>
                        <div className="pr-4">
                            <h4 className="font-black text-base leading-tight uppercase">{title}</h4>
                            <span className="text-xs font-bold bg-gray-100 px-1 mt-1 inline-block border border-black">{subtitle}</span>
                        </div>
                    </div>
                    
                    <p className="text-sm font-medium text-gray-600 mb-4 line-clamp-3 pr-4">{desc}</p>
                </div>

                <div className="mt-auto relative z-10 pr-4">
                    <div 
                        className="w-full h-32 border-2 border-black bg-gray-100 rounded-lg overflow-hidden relative cursor-pointer group/img"
                        onClick={() => images && images.length > 0 && onOpenGallery(images, 0)}
                    >
                        {images && images.length > 0 ? (
                            <>
                                <div className="absolute inset-0 bg-yellow-400/80 border-2 border-black translate-y-full group-hover/img:translate-y-0 transition-transform duration-300 z-10 flex items-center justify-center">
                                    <span className="font-black text-black uppercase tracking-wider">View Cert</span>
                                </div>
                                <img 
                                    src={images[0]} 
                                    alt={title} 
                                    className="w-full h-full object-cover filter grayscale group-hover/img:grayscale-0 transition-all"
                                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=400&q=80"; }}
                                />
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-gray-50 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:8px_8px]">
                               <Award size={24}/>
                               <span className="text-[10px] font-mono mt-1">NO_PREVIEW</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SocialLink = ({ href, icon }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer" 
    className="w-12 h-12 bg-white border-2 border-black flex items-center justify-center text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all rounded-lg group"
  >
    {React.cloneElement(icon, { className: "group-hover:scale-110 transition-transform" })}
  </a>
);

/* --- MAIN APP --- */

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGalleryImages, setCurrentGalleryImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Refs untuk Auto-Scroll
  const projectScrollRef = useRef(null);
  const certScrollRef = useRef(null);

  // Implementasi Hook Auto-Scroll untuk kedua kolom
  useAutoScroll(projectScrollRef, 0.5); // Kecepatan scroll 0.5
  useAutoScroll(certScrollRef, 0.5);    // Kecepatan scroll 0.5

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openGallery = (images, startIndex = 0) => {
    if (!images || images.length === 0) return;
    setCurrentGalleryImages(images);
    setCurrentImageIndex(startIndex);
    setIsGalleryOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = () => {
    setIsGalleryOpen(false);
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

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Certifications', id: 'certs' },
  ];

  return (
    <div className="min-h-screen bg-[#fffdf5] text-black font-sans selection:bg-black selection:text-white overflow-x-hidden">
      
      {/* GLOBAL STYLES */}
      <style>{`
        /* CUSTOM SCROLLBAR - BLOCKY */
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

        /* Hide Scrollbar util */
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }

        /* Marquee Animation */
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>

      {/* Background decoration: Dot Pattern */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-none opacity-10" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Navbar - Retro Floating Box */}
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 transition-all duration-300 ${scrolled ? 'top-2' : 'top-6'}`}>
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg px-4 py-3 flex justify-between items-center">
          <div className="text-xl font-black italic tracking-tighter cursor-pointer flex items-center gap-1 hover:-rotate-2 transition-transform" onClick={() => scrollTo('home')}>
            RIFQI<span className="bg-black text-white px-1 ml-1 not-italic transform -skew-x-12 inline-block">.MT</span>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-1.5 text-sm font-bold uppercase border-2 transition-all duration-200 rounded ${activeSection === link.id ? 'bg-yellow-300 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' : 'border-transparent hover:border-black hover:bg-gray-100'}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
             <a href="mailto:tampengrifqmubarak@gmail.com" className="hidden sm:flex bg-pink-400 border-2 border-black text-black font-bold text-sm px-3 py-1.5 rounded items-center gap-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <Mail size={16}/> Hire Me!
             </a>
             <button className="md:hidden p-2 border-2 border-black rounded bg-gray-100 active:bg-black active:text-white transition-colors" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full mt-2 left-0 w-full bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-lg overflow-hidden animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => { scrollTo(link.id); setIsMenuOpen(false); }}
                className="w-full text-left px-6 py-4 font-bold uppercase hover:bg-yellow-300 border-b-2 border-black last:border-b-0 flex justify-between items-center group"
              >
                {link.name}
                <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" size={20}/>
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex flex-col justify-center pt-24 pb-12 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 -left-10 w-40 h-40 bg-purple-400 rounded-full border-2 border-black mix-blend-multiply filter blur-xl opacity-50"></div>
        <div className="absolute bottom-1/4 -right-10 w-60 h-60 bg-yellow-300 rounded-full border-2 border-black mix-blend-multiply filter blur-xl opacity-50"></div>
        
        <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12 relative z-10">
          <Reveal className="lg:w-1/2 text-center lg:text-left space-y-6">
            <div className="inline-block bg-white border-2 border-black px-4 py-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
              <span className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse border border-black"></span> 
                Status: Available for work
              </span> 
            </div>
            
            <div className="relative">
                <h1 className="text-5xl lg:text-8xl font-black leading-none tracking-tighter mb-2 text-transparent bg-clip-text bg-black" style={{WebkitTextStroke: '2px black'}}>
                  RIFQI M.
                </h1>
                <h1 className="text-5xl lg:text-8xl font-black leading-none tracking-tighter text-black absolute top-1 left-1 -z-10 opacity-0 lg:opacity-100 text-stroke">
                   RIFQI M.
                </h1>
                <p className="text-2xl lg:text-4xl font-bold bg-yellow-300 inline-block px-2 border-2 border-black transform rotate-1">
                   TAMPENG
                </p>
            </div>
            
            <div className="bg-white border-2 border-black p-4 lg:mr-12 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-xl relative">
                <div className="absolute -top-3 -right-3 bg-blue-400 border-2 border-black p-1.5 rounded-full z-10">
                    <Terminal size={20} className="text-white"/>
                </div>
                <p className="text-lg font-medium leading-relaxed">
                Mahasiswa Teknik Komputer (IPK 3.50). Spesialisasi: <span className="font-bold underline decoration-pink-500 decoration-4">UI/UX Design</span>, <span className="font-bold underline decoration-blue-500 decoration-4">3D Modeling</span>, & <span className="font-bold underline decoration-green-500 decoration-4">Low-Code Dev</span>.
                </p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <button onClick={() => scrollTo('projects')} className="group px-8 py-4 bg-black text-white text-lg font-bold uppercase border-2 border-black rounded shadow-[6px_6px_0px_0px_#22d3ee] hover:shadow-[2px_2px_0px_0px_#22d3ee] hover:translate-x-[4px] hover:translate-y-[4px] transition-all flex items-center gap-2">
                Lihat Proyek <MousePointer2 size={20} className="group-hover:rotate-12 transition-transform" />
              </button>
              <button onClick={() => scrollTo('experience')} className="px-8 py-4 bg-white text-black text-lg font-bold uppercase border-2 border-black rounded shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all">
                Pengalaman
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 pt-6">
               <span className="font-mono text-xs font-bold bg-black text-white px-2 py-1 transform -rotate-3">CONNECT:</span>
               {[
                 { icon: <Github size={20}/>, href: "https://github.com/rifqiimt" },
                 { icon: <Instagram size={20}/>, href: "https://www.instagram.com/rifqiimt/" },
                 { icon: <Linkedin size={20}/>, href: "https://www.linkedin.com/in/rifqiimt/" },
                 { icon: <Mail size={20}/>, href: "mailto:tampengrifqmubarak@gmail.com" },
                 { icon: <Phone size={20}/>, href: "https://wa.me/85214006701" }
               ].map((social, idx) => (
                 <SocialLink key={idx} href={social.href} icon={social.icon} />
               ))}
            </div>
          </Reveal>

          <Reveal delay={200} className="lg:w-1/2 flex justify-center relative">
            <div className="relative w-80 h-80 lg:w-[28rem] lg:h-[28rem]">
              {/* Brutalist Abstract Shapes */}
              <div className="absolute top-0 right-0 w-full h-full bg-blue-400 border-2 border-black rounded-full mix-blend-normal z-0 translate-x-4 translate-y-4"></div>
              
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] z-10 hover:scale-105 transition-transform duration-500">
                 <img 
                  src="pp.jpeg" 
                  alt="Rifqi Mubarak" 
                  className="w-full h-full object-cover"
                  onError={(e) => {e.target.src = "https://api.dicebear.com/9.x/avataaars/svg?seed=Rifqi"}} 
                />
              </div>

              {/* Floating Elements */}
              <div className="absolute -right-4 top-10 bg-white border-2 border-black p-3 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 flex items-center gap-2 transform rotate-3 animate-bounce" style={{animationDuration: '3s'}}>
                 <Figma size={24} className="text-black"/>
                 <span className="font-black text-xs uppercase">UI/UX<br/>MASTER</span>
              </div>
              
              <div className="absolute -left-2 bottom-12 bg-yellow-300 border-2 border-black p-3 rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-20 flex items-center gap-2 transform -rotate-2 animate-bounce" style={{animationDuration: '4s'}}>
                 <Box size={24} className="text-black"/>
                 <span className="font-black text-xs uppercase">3D<br/>ARTIST</span>
              </div>
            </div>
          </Reveal>
        </div>
        
        {/* Infinite Marquee Banner */}
        <div className="absolute bottom-8 left-0 w-full bg-black border-y-2 border-black py-2 transform -rotate-1 scale-105 z-20 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(10)].map((_, i) => (
                    <span key={i} className="text-white font-mono font-bold text-lg mx-4 flex items-center gap-4">
                        DESIGN <Zap size={16} className="text-yellow-400"/> CODE <Zap size={16} className="text-yellow-400"/> CREATE <Zap size={16} className="text-yellow-400"/>
                    </span>
                ))}
            </div>
        </div>
      </section>

      {/* About & Skills */}
      <section id="about" className="py-24 bg-purple-50 border-t-4 border-black relative">
        <div className="absolute top-0 left-0 w-full h-4 bg-[repeating-linear-gradient(45deg,black,black_10px,transparent_10px,transparent_20px)] opacity-20"></div>
        
        <div className="container mx-auto px-6">
          <Reveal>
             <div className="flex flex-col items-center mb-16">
                <h2 className="text-5xl md:text-6xl font-black uppercase text-center bg-white border-2 border-black px-6 py-2 shadow-[6px_6px_0px_0px_#f472b6] transform -rotate-1">
                    Tentang Saya
                </h2>
             </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Text Content */}
            <div className="lg:col-span-7">
               <Reveal delay={100}>
                  <div className="bg-white border-2 border-black p-6 md:p-8 rounded-xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                    <QuoteIcon className="absolute -top-4 -left-4 w-10 h-10 bg-yellow-400 border-2 border-black text-black p-2 rounded-full z-10" />
                    <div className="prose prose-lg text-black font-medium leading-relaxed space-y-4">
                        <p>
                        Saya adalah mahasiswa S1 Teknik Komputer berprestasi dengan <span className="bg-green-200 px-1 border border-black font-bold">IPK 3.50/4.00</span>. Saya memiliki passion yang kuat dalam menciptakan solusi digital yang estetis dan fungsional.
                        </p>
                        <p>
                        Keahlian saya mencakup perancangan antarmuka pengguna (UI/UX) yang intuitif, pemodelan 3D, hingga pengembangan sistem berbasis IoT dan aplikasi Full Stack Low-Code.
                        </p>
                        <p>
                        Selain teknis, saya memiliki jiwa kepemimpinan yang teruji, pernah memimpin tim hingga <span className="bg-blue-200 px-1 border border-black font-bold">120 orang</span> sebagai Ketua Pelaksana acara tingkat nasional (CMD 2025).
                        </p>
                    </div>
                  </div>
               </Reveal>
               
               <Reveal delay={200} className="mt-8">
                 <div className="grid grid-cols-3 gap-4">
                    {[
                      { val: "3.50", label: "GPA Score", color: "bg-pink-300" },
                      { val: "120+", label: "Tim Dipimpin", color: "bg-blue-300" },
                      { val: "6+", label: "Proyek Selesai", color: "bg-green-300" }
                    ].map((stat, i) => (
                      <div key={i} className={`p-4 border-2 border-black text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${stat.color} rounded-lg`}>
                         <h3 className="text-3xl font-black text-black">{stat.val}</h3>
                         <p className="text-xs font-bold uppercase border-t-2 border-black mt-1 pt-1">{stat.label}</p>
                      </div>
                    ))}
                 </div>
               </Reveal>
            </div>

            {/* Tech Stack Grid - Sticker Layout */}
            <div className="lg:col-span-5">
               <Reveal delay={300}>
                 <div className="bg-gray-100 border-2 border-black p-6 rounded-xl relative">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 text-sm font-bold uppercase rounded border-2 border-white transform skew-x-12">
                         My Arsenal
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <TechStackCard icon="figma.png" name="Figma" desc="Design" />
                      <TechStackCard icon="unity.png" name="Unity" desc="Augmented Reality" />
                      <TechStackCard icon="blender.png" name="Blender" desc="3D" />
                      <TechStackCard icon="mesh.png" name="Meshroom" desc="Photogrammetry" />
                      <TechStackCard icon="mendix.jpeg" name="Mendix" desc="Low-Code" />
                      <TechStackCard icon="canva.png" name="Canva" desc="Graphic" />
                    </div>
                 </div>
               </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-24 bg-[#fffdf5] overflow-hidden">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
               <div>
                 <div className="flex items-center gap-2 mb-2">
                    <div className="h-1 w-12 bg-black"></div>
                    <span className="font-mono font-bold uppercase text-sm">Selected Works</span>
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black text-black leading-none">PROYEK <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500" style={{WebkitTextStroke: '1px black'}}>UNGGULAN</span></h2>
               </div>
               
               <div className="hidden md:flex gap-2">
                  <div className="px-4 py-2 border-2 border-black font-bold text-xs uppercase bg-gray-100">Auto Scroll Active</div>
               </div>
            </div>
          </Reveal>

          {/* Menambahkan ref={projectScrollRef} dan menghapus 'snap-x snap-mandatory' untuk scroll halus */}
          <div 
             ref={projectScrollRef}
             className="w-full overflow-x-auto pb-16 pt-4 px-4 -mx-4 responsive-scrollbar"
          >
            <div className="flex gap-8 w-max">
              
              <div className="w-[340px] md:w-[400px] flex-shrink-0">
                <ProjectCard 
                  title="Lifegen App"
                  category="UI/UX Design"
                  description="Aplikasi pelacak kesehatan dan kalori harian dengan antarmuka bersih untuk memotivasi gaya hidup sehat."
                  tags={['Figma', 'Mobile', 'Health']}
                  icon={<Smartphone className="text-white" size={20} />}
                  color="pink"
                  images={["life.png"]} 
                  onOpenGallery={openGallery}
                  heightClass="h-56"
                  links={[
                    { text: "Figma Prototype", url: "https://www.figma.com/proto/MIYprCXiJ8d9SDMZA5kMYT/Lifegen?node-id=48-3636&p=f&t=vXSOTZWg6oxs5i8D-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=48%3A3636&show-proto-sidebar=1", icon: <Figma size={12}/> },
                  ]}
                />
              </div>

              <div className="w-[340px] md:w-[400px] flex-shrink-0">
                <ProjectCard 
                  title="LandConnect"
                  category="Marketplace"
                  description="Platform jual beli lahan strategis dengan fitur peta interaktif untuk memudahkan pencarian lokasi."
                  tags={['Figma', 'Web', 'Map']}
                  icon={<Briefcase className="text-white" size={20} />}
                  color="purple"
                  images={["land.png"]}
                  onOpenGallery={openGallery}
                  heightClass="h-56"
                  links={[
                    { text: "Figma Prototype", url: "https://www.figma.com/proto/OGf7IzSdu9WjrTlVOI0xP9/LandConnect?node-id=747-3006&t=dyPSPDRSZXDFVWfj-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=747%3A3006", icon: <Figma size={12}/> },
                  ]}
                />
              </div>

              <div className="w-[340px] md:w-[400px] flex-shrink-0">
                <ProjectCard 
                  title="WeatherFit"
                  category="Full Stack"
                  description="Aplikasi rekomendasi olahraga berbasis cuaca real-time menggunakan API cuaca dan geolokasi."
                  tags={['Mendix', 'API', 'Code']}
                  icon={<ExternalLink className="text-white" size={20} />}
                  color="blue"
                  images={["https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&q=80"]}
                  onOpenGallery={openGallery}
                  heightClass="h-56"
                  links={[
                    { text: "Mendix App", url: "#", icon: <ExternalLink size={12}/>, className: "bg-blue-100 hover:bg-blue-200" }
                  ]}
                />
              </div>

              <div className="w-[340px] md:w-[400px] flex-shrink-0">
                <ProjectCard 
                  title="Smart Meter"
                  category="Embedded"
                  description="Sistem monitoring penggunaan air berbasis Arduino Uno untuk mencegah pemborosan air rumah tangga."
                  tags={['Arduino', 'C++', 'IoT']}
                  icon={<Cpu className="text-white" size={20} />}
                  color="green"
                  images={["swms.jpeg", "swm1.jpeg", "swm2.jpeg", "swm3.jpeg"]} 
                  onOpenGallery={openGallery}
                  heightClass="h-56"
                  links={[
                    { text: "Arduino Code", url: "#", icon: <Code size={12}/> },
                    { text: "Demo", url: "#", icon: <Youtube size={12}/>, className: "bg-red-100 hover:bg-red-200" }
                  ]}
                />
              </div>

              <div className="w-[340px] md:w-[400px] flex-shrink-0">
                <ProjectCard 
                  title="BridgeGuard"
                  category="IoT Solution"
                  description="Perangkat pendeteksi getaran jembatan dini menggunakan ESP32 dan sensor akselerometer ADXL."
                  tags={['ESP32', 'Safety', 'HW']}
                  icon={<ExternalLink className="text-white" size={20} />}
                  color="green"
                  images={["bg.jpeg"]}
                  onOpenGallery={openGallery}
                  heightClass="h-56"
                  links={[
                    { text: "Github", url: "https://github.com/rifqiimt/BridgeGuard.git", icon: <Github size={12}/> },
                    { text: "Demo Video", url: "https://youtube.com/@muhammadabiyyu3010?si=cWjiHW9ce7i0kfPy", icon: <Youtube size={12}/>, className: "bg-red-100 hover:bg-red-200" }
                  ]}
                />
              </div>

              <div className="w-[340px] md:w-[400px] flex-shrink-0">
                <ProjectCard 
                  title="AR BMKG Tools"
                  category="AR / VR"
                  description="Aplikasi edukasi AR markerless untuk visualisasi alat-alat meteorologi BMKG secara interaktif 3D."
                  tags={['AR', 'Unity', 'Edu']}
                  icon={<Box className="text-white" size={20} />}
                  color="orange"
                  images={["https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=400&q=80"]}
                  onOpenGallery={openGallery}
                  heightClass="h-56"
                  links={[
                    { text: "Download APK", url: "#", icon: <Smartphone size={12}/>, className: "bg-green-100 hover:bg-green-200" },
                    { text: "Preview", url: "#", icon: <Youtube size={12}/>, className: "bg-red-100 hover:bg-red-200" }
                  ]}
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-blue-50 border-y-4 border-black">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="mb-16 flex flex-col items-center">
              <h2 className="text-4xl font-black text-black mb-2 uppercase border-b-4 border-black pb-2">Pengalaman</h2>
            </div>
          </Reveal>

          {/* SUB BAB BARU: KERJA PRAKTIK BMKG */}
          <Reveal delay={100} className="mb-20">
            <div className="relative max-w-5xl mx-auto">
                <div className="absolute -top-5 -left-2 md:-left-4 bg-green-400 border-2 border-black px-4 py-1.5 font-black uppercase text-sm transform -rotate-1 z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Kerja Praktik (Internship)
                </div>
                
                <div className="bg-white border-2 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-lg relative overflow-hidden group">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
                    
                    <div className="flex flex-col md:flex-row gap-8 relative z-10">
                        {/* Logo / Icon Area - MODIFIED to use Image from Directory */}
                        <div className="w-24 h-24 shrink-0 bg-white border-2 border-black flex items-center justify-center p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-2 group-hover:rotate-0 transition-transform overflow-hidden">
                            {/* GANTI 'bmkg_logo.png' DENGAN NAMA FILE LOGO ANDA */}
                            <img 
                                src="bmkg.png" 
                                alt="BMKG Logo" 
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    // Fallback ke icon CloudSun jika gambar tidak ditemukan
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-black"><path d="M17.5 19c0-1.7-1.3-3-3-3h-1.1c-.2-2.3-2.1-4-4.4-4-2.5 0-4.5 1.8-4.9 4.2C2.3 16.5 1 17.9 1 19.5c0 1.9 1.6 3.5 3.5 3.5h13c1.9 0 3.5-1.6 3.5-3.5z"/><path d="M12 2v3"/><path d="M12 10v2"/><path d="M12 14v.01"/><path d="M4.93 4.93l1.41 1.41"/><path d="M19.07 4.93l-1.41 1.41"/></svg>`;
                                }}
                            />
                        </div>
                        
                        <div className="flex-grow">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                                <div>
                                    <h3 className="text-3xl font-black uppercase leading-none mb-2">BMKG Aceh</h3>
                                    <div className="inline-block bg-gray-100 border border-black px-2 py-0.5">
                                        <p className="font-bold text-sm text-gray-800">Stasiun Meteorologi Kelas I Sultan Iskandar Muda</p>
                                    </div>
                                </div>
                                <span className="font-mono font-bold bg-black text-white px-4 py-2 transform rotate-2 text-sm shadow-[3px_3px_0px_0px_#22c55e] border border-transparent">
                                    2024
                                </span>
                            </div>

                            <div className="bg-green-50 border-l-4 border-black p-5 mb-4 relative">
                                <div className="absolute -left-[5px] top-0 w-2 h-2 bg-black"></div>
                                <div className="absolute -left-[5px] bottom-0 w-2 h-2 bg-black"></div>
                                
                                <span className="text-xs font-black uppercase tracking-widest text-green-700 mb-2 block border-b-2 border-green-200 w-fit pb-1">
                                    Judul Proyek Akhir
                                </span>
                                <h4 className="font-bold text-lg md:text-xl leading-tight text-black">
                                    "Pemanfaatan Augmented Reality Terhadap Pengenalan Alat Kerja Pada Stasiun Meteorologi Kelas I Sultan Iskandar Muda Banda Aceh"
                                </h4>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mt-2">
                                <p className="text-gray-700 font-medium text-sm leading-relaxed max-w-2xl">
                                    Mengembangkan media interaktif berbasis AR untuk memvisualisasikan alat meteorologi secara 3D, meningkatkan pemahaman teknis bagi staf dan pengunjung stasiun.
                                </p>
                            </div>

                            {/* DOCUMENTATION GALLERY SECTION */}
                            <div className="mt-6 border-t-2 border-black pt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] font-bold px-2 py-1 bg-white border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">#AugmentedReality</span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-white border-2 border-black rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">#Unity3D</span>
                                </div>
                                
                                <button 
                                    // MASUKKAN NAMA FILE FOTO DOKUMENTASI ANDA DI DALAM ARRAY DI BAWAH INI
                                    onClick={() => openGallery(["bmkg1.jpg"], 0)} 
                                    className="group relative inline-flex items-center gap-2 bg-yellow-300 border-2 border-black px-5 py-2 rounded font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-400 transition-all"
                                >
                                    <ImageIcon size={16} />
                                    Lihat Galeri
                                    {/* Badge jumlah foto */}
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-black transform group-hover:scale-110 transition-transform">
                                        3
                                    </span>
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Column 1: Event */}
            <Reveal delay={200}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 bg-purple-400 border-2 border-black px-4 py-1 font-black uppercase text-sm transform -rotate-3 z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Kepanitiaan
                </div>
                <div className="border-l-4 border-black pl-8 pt-8 space-y-6">
                   <TimelineCard 
                      role="Ketua Pelaksana" 
                      org="CMD 2025" 
                      date="Okt 2025" 
                      desc="Memimpin acara tahunan dengan menghadirkan serangkaian kompetisi seperti, Hackathon, Research Paper Competition, Indonesian Debate, ⁠UI/UX Design Competition, Computer Olympiad, kemudian diramaikan dengan berbagai agenda inspiratif seperti Seminar Nasional, Tekkom Learning Bootcamp, dan Workshop Mobile Development"
                      highlight={true} 
                      evidenceLabel="Dokumentasi"
                      images={["cmd.png", "cmd1.jpeg", "cmd2.jpeg", "cmd3.jpeg", "cmd4.jpeg", "cmd5.jpeg"]}
                      onOpenGallery={openGallery}
                    />
                    <TimelineCard 
                      role="Wakil Ketua Pelaksana" 
                      org="PBMT XI-KKN" 
                      date="2024" 
                      desc="Mengelola bakti sosial teknik di desa Luthu Lamwu, salah satu program unggulan dalam kegiatan ini adalah pengembangan sistem air isi ulang yang langsung dapat diminum, yang diharapkan dapat meningkatkan aksesibilitas terhadap air bersih secara lebih efisien dan merata"
                      evidenceLabel="Dokumentasi"
                      images={["pbmt.png"]}
                      onOpenGallery={openGallery}
                    />
                    <TimelineCard 
                      role="Koordinator Acara" 
                      org="BIOS (Ospek Maba)" 
                      date="2025" 
                      desc="Merancang konsep orientasi mahasiswa baru."
                    />
                    <TimelineCard 
                      role="Wakil Ketua Merchandise" 
                      org="RCA 2024" 
                      date="2024" 
                      desc="Strategi penjualan merchandise acara."
                    />
                    <TimelineCard 
                      role="Koordinator Acara" 
                      org="BINER 7.0" 
                      date="2023" 
                      desc="Mengatur rundown acara pengenalan jurusan."
                    />
                </div>
              </div>
            </Reveal>

            {/* Column 2: Organization */}
            <Reveal delay={400}>
              <div className="relative mt-12 lg:mt-0">
                <div className="absolute -top-4 -right-4 bg-blue-400 border-2 border-black px-4 py-1 font-black uppercase text-sm transform rotate-2 z-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    Organisasi
                </div>
                <div className="pt-8 grid gap-8">
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 border-b-2 border-black pb-2">
                         <div className="w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center overflow-hidden p-1">
                            <img src="himatekkom.png" alt="logo" className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'}/>
                         </div>
                         <h4 className="font-bold text-black uppercase">Himpunan Mahasiswa Teknik Komputer</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <OrgCard role="Wakadiv Kesma" period="2024" desc="Aspirasi & Kesejahteraan." images={["kesma.jpg"]} onOpenGallery={openGallery} />
                         <OrgCard role="Anggota Mikat" period="2025" desc="Minat & Bakat." />
                         <OrgCard role="Anggota Kesma" period="2023" desc="Staff Muda." images={["kesma1.png"]} onOpenGallery={openGallery} />
                      </div>
                   </div>

                   <div className="space-y-4">
                      <div className="flex items-center gap-3 border-b-2 border-black pb-2">
                         <div className="w-10 h-10 rounded-full bg-white border-2 border-black flex items-center justify-center overflow-hidden p-1">
                            <img src="bem.png" alt="logo" className="w-full h-full object-contain" onError={(e) => e.target.style.display='none'}/>
                         </div>
                         <h4 className="font-bold text-black uppercase">BEM Fakultas Teknik</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                         <OrgCard role="Staf Humas" period="2024" desc="Branding Fakultas." images={["humas.png"]} onOpenGallery={openGallery} />
                      </div>
                   </div>
                </div>
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certs" className="py-24 bg-yellow-50 relative overflow-hidden">
         {/* Background pattern */}
         <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000), linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px'}}></div>

         <div className="container mx-auto px-6 relative z-10">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-black text-center mb-12 bg-white border-2 border-black inline-block px-8 py-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mx-auto block transform rotate-1">
                SERTIFIKASI & PELATIHAN
              </h2>
            </Reveal>
            
            {/* Menambahkan ref={certScrollRef} dan menghapus 'snap-x snap-mandatory' */}
            <div 
                ref={certScrollRef}
                className="w-full overflow-x-auto pb-16 pt-4 px-4 -mx-4 responsive-scrollbar"
            >
              <div className="flex gap-8 w-max">
                 
                 <div className="w-[320px] md:w-[360px] flex-shrink-0">
                    <CertCard 
                      title="Bangkit Academy 2024"  
                      subtitle="Google, GoTo, Traveloka" 
                      desc="Studi Independen Machine Learning. Capstone Project AI."
                      color="green" 
                      icon={<BookOpen className="text-black" />} 
                      images={["bangkit.jpg", "bangkit1.jpg", "bangkit2.jpg"]}
                      onOpenGallery={openGallery}
                    />
                 </div>
                 
                 <div className="w-[320px] md:w-[360px] flex-shrink-0">
                    <CertCard 
                      title="IoT Device Engineering" 
                      subtitle="BNSP / LSP TDI" 
                      desc="Sertifikasi kompetensi bidang IoT dan Jaringan."
                      color="yellow" 
                      icon={<Cpu className="text-black" />} 
                      images={["iot.jpg", "iot1.jpg"]}
                      onOpenGallery={openGallery}
                    />
                 </div>

                 <div className="w-[320px] md:w-[360px] flex-shrink-0">
                    <CertCard 
                      title="Skill Academy CAMP" 
                      subtitle="Ruangguru" 
                      desc="Bootcamp intensif UI/UX Design & Prototyping."
                      color="orange" 
                      icon={<Award className="text-black" />} 
                      images={["camp.jpg", "camp1.jpg"]}
                      onOpenGallery={openGallery}
                    />
                 </div>

                 <div className="w-[320px] md:w-[360px] flex-shrink-0">
                    <CertCard 
                      title="Webinar AI Weather" 
                      subtitle="KORIKA" 
                      desc="Pemanfaatan AI untuk prakiraan cuaca."
                      color="blue" 
                      icon={<ExternalLink className="text-black" />} 
                      images={["korika.jpg"]}
                      onOpenGallery={openGallery}
                    />
                 </div>
                 
                 <div className="w-[320px] md:w-[360px] flex-shrink-0">
                    <CertCard 
                      title="Olimpiade Sains (OSN)" 
                      subtitle="Kemdikbud" 
                      desc="Juara Tingkat Kota Bidang Informatika."
                      color="yellow" 
                      icon={<Award className="text-black" />} 
                      images={["osn.jpg"]}
                      onOpenGallery={openGallery}
                    />
                 </div>

              </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-black text-white border-t-8 border-yellow-400">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-black mb-8 uppercase tracking-widest">Siap Kolaborasi?</h2>
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
             {[
                 { icon: <Github size={24}/>, href: "https://github.com/rifqiimt" },
                 { icon: <Instagram size={24}/>, href: "https://www.instagram.com/rifqiimt/" },
                 { icon: <Linkedin size={24}/>, href: "https://www.linkedin.com/in/rifqiimt/" },
                 { icon: <Mail size={24}/>, href: "mailto:tampengrifqmubarak@gmail.com" },
                 { icon: <Phone size={24}/>, href: "https://wa.me/85214006701" }
             ].map((social, idx) => (
                 <a key={idx} href={social.href} className="w-14 h-14 bg-white text-black border-2 border-white flex items-center justify-center rounded hover:bg-black hover:text-white hover:border-white transition-colors">
                     {social.icon}
                 </a>
             ))}
          </div>
          <div className="w-24 h-2 bg-yellow-400 mx-auto mb-8"></div>
          <p className="text-gray-400 text-sm font-mono">© 2025 Rifqi Mubarak Tampeng. <br/>Made with <span className="text-red-500">♥</span> & Neo-Brutalism Style.</p>
        </div>
      </footer>

      <ImageGalleryModal 
        isOpen={isGalleryOpen} 
        images={currentGalleryImages} 
        initialIndex={currentImageIndex}
        onClose={closeGallery} 
      />

    </div>
  );
};

// Helper component for Quote Icon
const QuoteIcon = ({className}) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
        <path d="M14.017 21L14.017 18C14.017 16.896 14.353 15.925 15.025 15.088C15.697 14.252 16.637 13.833 17.845 13.833H19V9H17.291C16.427 9 15.635 9.176 14.915 9.528C14.195 9.88 13.835 10.592 13.835 11.664V21H14.017ZM7.017 21L7.017 18C7.017 16.896 7.353 15.925 8.025 15.088C8.697 14.252 9.637 13.833 10.845 13.833H12V9H10.291C9.427 9 8.635 9.176 7.915 9.528C7.195 9.88 6.835 10.592 6.835 11.664V21H7.017Z"/>
    </svg>
);

export default App;