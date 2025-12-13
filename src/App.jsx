import React, { useState, useEffect } from 'react';
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
  Phone
} from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // STATE UNTUK POPUP GALERI (LIGHTBOX)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentGalleryImages, setCurrentGalleryImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi Membuka Galeri
  const openGallery = (images, startIndex = 0) => {
    if (!images || images.length === 0) return;
    setCurrentGalleryImages(images);
    setCurrentImageIndex(startIndex);
    setIsGalleryOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Fungsi Menutup Galeri
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
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      {/* CSS Khusus untuk Scrollbar Responsif */}
      <style>{`
        /* MOBILE: Sembunyikan scrollbar agar swipe lebih bersih */
        @media (max-width: 768px) {
          .responsive-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .responsive-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        }

        /* DESKTOP: Tampilkan scrollbar kustom (Ungu) */
        @media (min-width: 769px) {
          .responsive-scrollbar::-webkit-scrollbar {
            height: 10px; /* Sedikit dipertebal agar lebih mudah diklik */
          }
          .responsive-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.02);
            border-radius: 6px;
            margin: 0 20px;
          }
          .responsive-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(168, 85, 247, 0.3);
            border-radius: 6px;
            border: 2px solid rgba(15, 23, 42, 1); /* Border agar terlihat terpisah */
          }
          .responsive-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(168, 85, 247, 0.8);
          }
        }
      `}</style>

      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px]" />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-pink-600/10 rounded-full blur-[80px]" />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/10 py-3' : 'py-5 bg-transparent'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent cursor-pointer" onClick={() => scrollTo('home')}>
            Rifqi<span className="text-white">.MT</span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className={`text-sm font-medium transition-colors duration-300 hover:text-purple-400 ${activeSection === link.id ? 'text-purple-400' : 'text-slate-400'}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 border-b border-white/10 p-4 flex flex-col space-y-4 shadow-xl">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="text-left text-slate-300 hover:text-purple-400 py-2"
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative">
        <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 text-center lg:text-left space-y-6">
            <div className="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-purple-400 text-sm font-semibold tracking-wider">PORTFOLIO</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              Hi, I'm <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Rifqi Mubarak
              </span>
            </h1>
            <p className="text-lg text-slate-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Mahasiswa Teknik Komputer (IPK 3.50) dengan spesialisasi di UI/UX Design, 3D Modeling, dan Pengembangan Aplikasi Low-Code.
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <button onClick={() => scrollTo('projects')} className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full font-medium transition-all transform hover:scale-105 shadow-lg shadow-purple-500/25">
                Lihat Proyek
              </button>
              <button onClick={() => scrollTo('experience')} className="px-8 py-3 bg-transparent border border-white/20 hover:border-white/50 text-white rounded-full font-medium transition-all hover:bg-white/5">
                Pengalaman
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-slate-400">
              <a href="#" className="hover:text-white transition-colors"><Github size={24} /></a>
              <a href="https://www.instagram.com/rifqiimt/" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors"><Instagram size={24} /></a>
              <a href="https://www.linkedin.com/in/rifqiimt/" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors"><Linkedin size={24} /></a>
              <a href="mailto:tampengrifqmubarak@gmail.com" className="hover:text-red-400 transition-colors"><Mail size={24} /></a>
              <a href="https://wa.me/85214006701" target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors"><Phone size={24} /></a>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center relative">
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full opacity-20 animate-pulse blur-xl"></div>
              
              {/* FOTO PROFIL */}
              <div className="absolute inset-4 bg-slate-900 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
                <img 
                  src="pp.jpeg" 
                  alt="Rifqi Mubarak" 
                  className="w-full h-full object-cover"
                  onError={(e) => {e.target.src = "https://api.dicebear.com/9.x/avataaars/svg?seed=Rifqi"}} 
                />
              </div>
              
              {/* Floating Icons - Adjusted for better spacing */}
              <div className="absolute top-0 right-0 p-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-white/10 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <Figma className="text-pink-400 mb-1" size={20} />
                <span className="text-xs font-bold block">Figma</span>
              </div>
              <div className="absolute top-12 -left-8 p-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-white/10 shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
                <Smartphone className="text-green-400 mb-1" size={20} />
                <span className="text-xs font-bold block">AR/VR</span>
              </div>
              <div className="absolute bottom-3 -left-4 p-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-white/10 shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
                <Box className="text-blue-400 mb-1" size={20} />
                <span className="text-xs font-bold block">3D Art</span>
              </div>
               <div className="absolute top-1/2 -right-8 p-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-white/10 shadow-xl animate-bounce" style={{ animationDuration: '5s' }}>
                <Cpu className="text-purple-400 mb-1" size={20} />
                <span className="text-xs font-bold block">IoT</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block text-slate-500">
          <ChevronDown size={30} />
        </div>
      </section>

      {/* About & Skills Section */}
      <section id="about" className="py-20 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Tentang <span className="text-purple-400">Saya</span></h2>
            <div className="w-20 h-1 bg-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-slate-300 leading-relaxed text-base">
               <p>
                Saya adalah mahasiswa S1 Teknik Komputer berprestasi dengan <strong>IPK 3.50/4.00</strong>. Saya memiliki passion yang kuat dalam menciptakan solusi digital yang estetis dan fungsional.
              </p>
              <p>
                Keahlian saya mencakup perancangan antarmuka pengguna (UI/UX) yang intuitif, pemodelan 3D, hingga pengembangan sistem berbasis IoT dan aplikasi Full Stack Low-Code.
              </p>
              <p>
                Selain teknis, saya memiliki jiwa kepemimpinan yang teruji, pernah memimpin tim hingga <strong>120 orang</strong> sebagai Ketua Pelaksana acara tingkat nasional (CMD 2025).
              </p>
              
              <div className="pt-4 grid grid-cols-2 gap-4">
                 <div className="p-4 bg-slate-800 rounded-2xl border-l-4 border-purple-500">
                    <h3 className="font-bold text-white text-lg">3.50 GPA</h3>
                    <p className="text-sm text-slate-400">Teknik Komputer</p>
                 </div>
                 <div className="p-4 bg-slate-800 rounded-2xl border-l-4 border-pink-500">
                    <h3 className="font-bold text-white text-lg">120+</h3>
                    <p className="text-sm text-slate-400">Anggota Dipimpin</p>
                 </div>
              </div>
            </div>

            {/* Bagian Tech Stack */}
            <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Code size={20} className="text-purple-400"/> Tools & Tech Stack
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 <ToolCard 
                    image="https://cdn.simpleicons.org/figma/F24E1E" 
                    name="Figma" 
                    desc="UI/UX Design" 
                 />
                 <ToolCard 
                    image="https://cdn.simpleicons.org/unity/FFFFFF" 
                    name="Unity Engine" 
                    desc="Game Dev" 
                 />
                 <ToolCard 
                    image="https://cdn.simpleicons.org/blender/E87D0D" 
                    name="3D Blender" 
                    desc="3D Modeling" 
                 />
                 <ToolCard 
                    image="https://upload.wikimedia.org/wikipedia/commons/8/87/AliceVision_Meshroom_Logo.png" 
                    name="Meshroom" 
                    desc="Photogrammetry" 
                 />
                 <ToolCard 
                    image="https://cdn.simpleicons.org/mendix/FFFFFF" 
                    name="Mendix" 
                    desc="Low-Code Dev" 
                 />
                 <ToolCard 
                    image="https://cdn.simpleicons.org/canva/00C4CC" 
                    name="Canva" 
                    desc="Graphic Design" 
                 />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - HORIZONTAL SCROLL SLIDE */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Proyek <span className="text-blue-400">Unggulan</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Bukti nyata kompetensi dalam pengembangan aplikasi, desain UI/UX, dan sistem IoT. 
              (Geser untuk melihat proyek lainnya).
            </p>
          </div>

          <div className="flex overflow-x-auto pb-10 gap-6 responsive-scrollbar snap-x snap-mandatory">
            
            <div className="min-w-[320px] md:min-w-[380px] snap-center">
              <ProjectCard 
                title="Lifegen"
                category="UI/UX Design"
                description="Aplikasi pelacak kesehatan dan kalori harian. Fokus pada antarmuka yang bersih."
                tags={['Figma', 'Mobile App', 'Health']}
                icon={<Smartphone className="text-pink-400" size={40} />}
                color="border-pink-500/30 hover:border-pink-500"
                heightClass="h-64"           
                aspectClass="aspect-video"   
                onOpenGallery={openGallery}
                images={[
                  "life.png",
                  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80"
                ]}
              />
            </div>

            <div className="min-w-[320px] md:min-w-[380px] snap-center">
              <ProjectCard 
                title="LandConnect"
                category="Marketplace UI/UX"
                description="Platform jual beli lahan strategis dengan fitur peta interaktif."
                tags={['Figma', 'Marketplace', 'Web']}
                icon={<Briefcase className="text-purple-400" size={32} />}
                color="border-purple-500/30 hover:border-purple-500"
                heightClass="h-64"
                aspectClass="aspect-video"
                onOpenGallery={openGallery}
                images={[
                  "land.png"
                ]}
              />
            </div>

            <div className="min-w-[320px] md:min-w-[380px] snap-center">
              <ProjectCard 
                title="WeatherFit"
                category="Full Stack App"
                description="Aplikasi perencanaan olahraga berbasis cuaca real-time."
                tags={['Mendix', 'Weather API', 'Low-Code']}
                icon={<ExternalLink className="text-blue-400" size={32} />}
                color="border-blue-500/30 hover:border-blue-500"
                heightClass="h-64"
                aspectClass="aspect-video"
                onOpenGallery={openGallery}
                images={[
                  "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&q=80",
                  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
                  "https://images.unsplash.com/photo-1561624485-0e43bcc1836d?w=400&q=80"
                ]}
              />
            </div>

            <div className="min-w-[320px] md:min-w-[380px] snap-center">
               <ProjectCard 
                title="Smart Water Metering"
                category="Embedded System"
                description="Alat pemantau penggunaan air berbasis Arduino Uno."
                tags={['Arduino', 'C++', 'Hardware']}
                icon={<Cpu className="text-cyan-400" size={32} />}
                color="border-cyan-500/30 hover:border-cyan-500"
                heightClass="h-64"
                aspectClass="aspect-[4/3]"
                onOpenGallery={openGallery}
                images={[
                  "swms.jpeg",
                  "swm1.jpeg",
                  "swm2.jpeg",
                  "swm3.jpeg"
                ]}
              />
            </div>

            <div className="min-w-[320px] md:min-w-[380px] snap-center">
               <ProjectCard 
                title="BridgeGuard"
                category="IoT Solution"
                description="Sistem pemantau getaran jembatan menggunakan ESP32."
                tags={['IoT', 'ESP32', 'Safety']}
                icon={<ExternalLink className="text-green-400" size={32} />}
                color="border-green-500/30 hover:border-green-500"
                heightClass="h-64"
                aspectClass="aspect-video"
                onOpenGallery={openGallery}
                images={[
                  "https://images.unsplash.com/photo-1513828583688-601bf3925e2e?w=400&q=80",
                  "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80"
                ]}
              />
            </div>

            <div className="min-w-[320px] md:min-w-[380px] snap-center">
               <ProjectCard 
                title="AR BMKG"
                category="Augmented Reality"
                description="Aplikasi AR markerless untuk alat kerja BMKG."
                tags={['AR', 'Education', '3D']}
                icon={<Box className="text-orange-400" size={32} />}
                color="border-orange-500/30 hover:border-orange-500"
                heightClass="h-64"
                aspectClass="aspect-video"
                onOpenGallery={openGallery}
                images={[
                  "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=400&q=80",
                  "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&q=80"
                ]}
              />
            </div>
            
            <div className="min-w-[20px]"></div>
          </div>
        </div>
      </section>

      {/* Experience & Organization Section */}
      <section id="experience" className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pengalaman & <span className="text-pink-400">Kepemimpinan</span></h2>
            <p className="text-slate-400 text-sm">Rekam jejak dalam kepanitiaan dan organisasi kemahasiswaan.</p>
          </div>

          <div className="flex flex-col gap-20">
            
            {/* --- KEPANITIAAN (Timeline Mode) --- */}
            <div>
              <h3 className="text-2xl font-bold mb-10 flex items-center gap-3 border-b border-white/10 pb-4">
                <Users className="text-purple-400"/> Pengalaman Kepanitiaan (Event)
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 pl-4 border-l-2 border-slate-700">
                <TimelineItem 
                  role="Ketua Pelaksana"
                  org="Computer Multi-Challenge Day (CMD) 2025"
                  date="Oktober 2025"
                  desc="Memimpin acara UI/UX, Hackathon, & Olimpiade Nasional. Mengoordinasikan 120 panitia."
                  highlight
                  evidenceLabel="Dokumentasi Acara"
                  onOpenGallery={openGallery}
                  images={[
                    "cmd.png",
                    "cmd1.jpeg",
                    "cmd2.jpeg",
                    "cmd3.jpeg",
                    "cmd4.jpeg",
                    "cmd5.jpeg"
                  ]}
                />

                <TimelineItem 
                  role="Wakil Ketua Pelaksana"
                  org="Pekan Bakti Mahasiswa Teknik (PBMT)"
                  date="2024"
                  desc="Mengelola kegiatan pengabdian masyarakat teknik di desa Luthu Lamwu."
                  evidenceLabel="Dokumentasi Bakti Sosial"
                  onOpenGallery={openGallery}
                  images={["pbmt.png"]}
                />

                 <TimelineItem 
                  role="Koordinator Acara"
                  org="BIOS (Ospek Maba Tekkom)"
                  date="2025"
                  desc="Merancang konsep acara orientasi mahasiswa baru."
                  evidenceLabel="Dokumentasi Acara"
                  onOpenGallery={openGallery}
                  images={["https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80"]}
                />

                <TimelineItem 
                  role="Wakil Ketua Merchandise"
                  org="Reuni Cinta Almamater (RCA)"
                  date="2024"
                  desc="Strategi penjualan dan desain merchandise acara."
                  evidenceLabel="Merchandise"
                  onOpenGallery={openGallery}
                  images={["https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&q=80"]}
                />

                <TimelineItem 
                  role="Koordinator Acara"
                  org="BINER 7.0"
                  date="2023"
                  desc="Mengatur rundown acara pengenalan jurusan."
                  evidenceLabel="Dokumentasi"
                  onOpenGallery={openGallery}
                  images={["https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80"]}
                />
              </div>
            </div>

            {/* --- ORGANISASI (Grouped by Instansi Mode) --- */}
            <div>
              <h3 className="text-2xl font-bold mb-10 flex items-center gap-3 border-b border-white/10 pb-4">
                <Building2 className="text-blue-400"/> Pengalaman Organisasi
              </h3>
              
              <div className="space-y-16">
                
                {/* Instansi 1: HIMATEKKOM USK */}
                <div className="relative">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center border border-white/10 overflow-hidden shrink-0">
                         <img 
                            src="himatekkom.png" 
                            alt="HIMATEKKOM Logo" 
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                         />
                         <Briefcase size={24} className="text-blue-400 hidden" />
                      </div>
                      <h4 className="text-xl font-bold text-white">Himpunan Mahasiswa Teknik Komputer</h4>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <OrgRoleCard 
                        role="Wakil Ketua Divisi Kesma"
                        period="2024"
                        desc="Menjembatani aspirasi dan kesejahteraan mahasiswa."
                        onOpenGallery={openGallery}
                        images={["kesma.jpg"]}
                      />
                      <OrgRoleCard 
                        role="Anggota Divisi Mikat"
                        period="2025"
                        desc="Mengembangkan minat dan bakat mahasiswa."
                        onOpenGallery={openGallery}
                        images={["https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=80"]}
                      />
                      <OrgRoleCard 
                        role="Anggota Divisi Kesma"
                        period="2023"
                        desc="Awal karir organisasi di himpunan jurusan."
                        onOpenGallery={openGallery}
                        images={["kesma1.png"]}
                      />
                   </div>
                </div>

                {/* Instansi 2: BEM Fakultas Teknik */}
                <div className="relative">
                   <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center border border-white/10 overflow-hidden shrink-0">
                         <img 
                            src="bem.png" 
                            alt="BEM FT Logo" 
                            className="w-full h-full object-cover" 
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                            }}
                         />
                         <Building2 size={24} className="text-pink-400 hidden" />
                      </div>
                      <h4 className="text-xl font-bold text-white">Badan Eksekutif Mahasiswa Fakultas Teknik</h4>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <OrgRoleCard 
                        role="Staf Humas"
                        period="2024"
                        desc="Hubungan masyarakat dan branding fakultas."
                        onOpenGallery={openGallery}
                        images={["humas.png"]}
                      />
                   </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Certifications & Education Section - HORIZONTAL SCROLL SLIDE */}
      <section id="certs" className="py-20">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Sertifikasi & <span className="text-green-400">Pendidikan</span></h2>
            
            <div className="flex overflow-x-auto pb-10 gap-6 responsive-scrollbar snap-x snap-mandatory">
                
                <div className="min-w-[320px] md:min-w-[380px] snap-center">
                  <CertCard 
                    title="Bangkit Academy 2024"
                    subtitle="By Google, GoTo, Traveloka"
                    desc="Studi Independen Machine Learning. Capstone Project: Aplikasi AI deteksi penyakit kulit."
                    color="green"
                    icon={<BookOpen size={24}/>}
                    onOpenGallery={openGallery}
                    images={[
                      "bangkit.jpg",
                      "bangkit1.jpg",
                      "bangkit2.jpg"
                    ]}
                  />
                </div>

                <div className="min-w-[320px] md:min-w-[380px] snap-center">
                  <CertCard 
                    title="IoT Device Engineering"
                    subtitle="By LSP TDI"
                    desc="Telah kompeten pada bidang Informasi dan Komunikasi."
                    color="yellow"
                    icon={<Award size={24}/>}
                    onOpenGallery={openGallery}
                    images={[
                      "iot.jpg",
                      "iot1.jpg"
                    ]}
                  />
                </div>

                <div className="min-w-[320px] md:min-w-[380px] snap-center">
                  <CertCard 
                    title="Skill Academy CAMP"
                    subtitle="Batch 3 (Dec 2022)"
                    desc="UI/UX Design untuk Pemula. Mempelajari dasar design thinking dan prototyping."
                    color="orange"
                    icon={<Award size={24}/>}
                    onOpenGallery={openGallery}
                    images={[
                      "camp.jpg",
                      "camp1.jpg"
                    ]}
                  />
                </div>

                <div className="min-w-[320px] md:min-w-[380px] snap-center">
                  <CertCard 
                    title="Webinar AI Weather"
                    subtitle="By KORIKA"
                    desc="Pengembangan dan Pemanfaatan AI dalam Prakiraan Cuaca."
                    color="blue"
                    icon={<ExternalLink size={24}/>}
                    onOpenGallery={openGallery}
                    images={[
                      "korika.jpg"
                    ]}
                  />
                </div>

                <div className="min-w-[320px] md:min-w-[380px] snap-center">
                   <CertCard 
                    title="Olimpiade Sains Nasional"
                    subtitle="Tingkat Kota (2020)"
                    desc="Peserta OSN Bidang Sains Informatika tingkat Kota Banda Aceh."
                    color="yellow"
                    icon={<Award size={24}/>}
                    onOpenGallery={openGallery}
                    images={[
                      "osn.jpg"
                    ]}
                  />
                </div>
                
                <div className="min-w-[20px]"></div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-slate-950 border-t border-white/10 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-6">Let's Work Together</h2>
          <div className="flex justify-center gap-6 mb-8">
             <a href="mailto:tampengrifqmubarak@gmail.com" className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-500 transition-colors"><Mail size={24}/></a>
             <a href="https://wa.me/85214006701" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-green-500 transition-colors"><Phone size={24}/></a>
             <a href="https://www.linkedin.com/in/rifqiimt/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-500 transition-colors"><Linkedin size={24}/></a>
             <a href="https://www.instagram.com/rifqiimt/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-500 transition-colors"><Instagram size={24}/></a>
             <a href="#" className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Github size={24}/></a>
          </div>
          <p className="text-slate-500 text-sm">© 2025 Rifqi Mubarak Tampeng. All Rights Reserved.</p>
        </div>
      </footer>

      {/* --- IMAGE GALLERY MODAL (LIGHTBOX) --- */}
      <ImageGalleryModal 
        isOpen={isGalleryOpen} 
        images={currentGalleryImages} 
        initialIndex={currentImageIndex}
        onClose={closeGallery} 
      />

    </div>
  );
};

/* --- Helper Components --- */

// MODAL COMPONENT (LIGHTBOX)
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={onClose}>
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 transition-colors z-50"
      >
        <X size={32} />
      </button>

      <div className="relative w-full max-w-5xl h-full max-h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage} 
              className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all z-10"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all z-10"
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}

        <img 
          src={images[activeIndex]} 
          alt={`Gallery ${activeIndex}`} 
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-fade-in"
        />

        {/* Indicator dots */}
        {images.length > 1 && (
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-2 h-2 rounded-full transition-colors ${idx === activeIndex ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ 
  title, 
  category, 
  description, 
  tags, 
  icon, 
  color, 
  images, 
  heightClass = "h-64",      
  aspectClass = "aspect-video",
  onOpenGallery
}) => (
  <div className={`group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${color} border-white/10 flex flex-col h-full`}>
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
        {icon}
      </div>
      <ExternalLink size={20} className="text-slate-500 group-hover:text-white transition-colors" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide">{category}</span>
    <p className="text-slate-400 text-base mt-3 mb-6 leading-relaxed">
      {description}
    </p>
    
    <div className="mt-auto">
      <div className="mb-4">
        <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider font-bold">Galeri Proyek</p>
        
        {images && images.length > 0 && (
          <div 
            className={`${aspectClass} ${heightClass} w-full rounded-xl overflow-hidden cursor-pointer bg-slate-800/30 group/img relative border border-white/10`}
            onClick={() => onOpenGallery(images, 0)}
          >
             <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors z-10 flex items-center justify-center">
                <ExternalLink className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity scale-125 drop-shadow-lg" />
             </div>
             <img 
                src={images[0]} 
                alt={title} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out" 
                onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80"; // Project Fallback
                }}
             />
             
             {images.length > 1 && (
               <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                 <ImageIcon size={12} /> 
                 <span>+{images.length - 1}</span>
               </div>
             )}
          </div>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
        {tags.map((tag, index) => (
          <span key={index} className="text-xs px-2 py-1 bg-slate-800 rounded text-slate-300">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

// Tool Card
const ToolCard = ({ image, name, desc }) => (
  <div className="bg-slate-900/50 p-4 rounded-2xl border border-white/5 hover:border-purple-500/50 transition-all flex items-center gap-4 group">
    <div className="p-3 bg-slate-800 rounded-lg group-hover:bg-purple-600/20 transition-colors flex items-center justify-center w-12 h-12 shrink-0 overflow-hidden">
      <img src={image} alt={name} className="w-full h-full object-contain" />
    </div>
    <div>
      <h4 className="text-white font-bold text-sm">{name}</h4>
      <p className="text-slate-500 text-xs">{desc}</p>
    </div>
  </div>
);

// Timeline Item
const TimelineItem = ({ role, org, date, desc, highlight, evidenceLabel, images, onOpenGallery }) => (
  <div className="relative pl-8 pb-4 group">
    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${highlight ? 'bg-purple-500 border-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-slate-900 border-slate-500 group-hover:border-purple-400'} transition-colors z-10`}></div>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
      <h4 className={`text-lg font-bold ${highlight ? 'text-purple-400' : 'text-white group-hover:text-purple-300'} transition-colors`}>{role}</h4>
      <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-2 py-1 rounded border border-white/5">{date}</span>
    </div>
    <p className="text-sm font-semibold text-slate-400 mb-2">{org}</p>
    <p className="text-base text-slate-500 leading-relaxed mb-4">{desc}</p>
    
    {/* Evidence Slot for Timeline */}
    {evidenceLabel && (
      <div className="mt-4">
        {images && images.length > 0 ? (
           <div 
             className="h-48 w-full bg-slate-800/30 rounded-2xl overflow-hidden border border-slate-700 cursor-pointer hover:opacity-90 transition-all relative group/img"
             onClick={() => onOpenGallery(images, 0)}
           >
             <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/10 transition-colors z-10 flex items-center justify-center">
                <ExternalLink className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity" />
             </div>
             <img 
                src={images[0]} 
                alt="Bukti" 
                className="w-full h-full object-cover" 
                onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80"; // Event Fallback
                }}
             />
             
             {images.length > 1 && (
               <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                 <ImageIcon size={10} /> +{images.length - 1}
               </div>
             )}
           </div>
        ) : (
          <div className="h-32 bg-slate-800/30 rounded-2xl border border-dashed border-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-800/50 transition-colors">
              <div className="text-center">
                 <Camera size={16} className="mx-auto mb-1 text-slate-600"/>
                 <span className="text-[10px] text-slate-600 uppercase">{evidenceLabel}</span>
              </div>
          </div>
        )}
      </div>
    )}
  </div>
);

// Organization Role Card
const OrgRoleCard = ({ role, period, desc, image, images, onOpenGallery }) => (
  <div className="bg-slate-800/40 p-5 rounded-2xl border border-white/5 hover:border-purple-500/50 transition-all group flex flex-col h-full">
    <div className="flex justify-between items-start mb-3">
      <h5 className="font-bold text-white text-lg leading-tight">{role}</h5>
      <span className="text-xs font-mono text-slate-400 bg-slate-900 px-2 py-1 rounded">{period}</span>
    </div>
    <p className="text-base text-slate-400 mb-4 flex-grow leading-relaxed">{desc}</p>
    
    {/* Image Thumbnail */}
    <div className="mt-auto">
      {images && images.length > 0 ? (
        <div 
          className="h-32 w-full bg-slate-900 rounded-xl overflow-hidden relative cursor-pointer group/img"
          onClick={() => onOpenGallery(images, 0)}
        >
           <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors z-10 flex items-center justify-center">
              <ExternalLink className="text-white opacity-0 group-hover/img:opacity-100 transition-opacity scale-75" />
           </div>
           <img 
            src={images[0]} 
            alt={role} 
            className="w-full h-full object-cover" 
            onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80"; // Org Fallback
            }}
           />
           
           {images.length > 1 && (
             <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1">
               <ImageIcon size={10} /> +{images.length - 1}
             </div>
           )}
        </div>
      ) : (
        <div className="h-32 w-full bg-slate-900 rounded-lg border border-dashed border-slate-700 flex items-center justify-center">
           <Camera size={20} className="text-slate-600"/>
        </div>
      )}
    </div>
  </div>
);

// CertCard
const CertCard = ({ title, subtitle, desc, color, icon, images, onOpenGallery }) => {
    const colorClasses = {
        green: "text-green-400 bg-green-500/20",
        orange: "text-orange-400 bg-orange-500/20",
        blue: "text-blue-400 bg-blue-500/20",
        yellow: "text-yellow-400 bg-yellow-500/20"
    };

    return (
        <div className="bg-slate-800/40 p-6 rounded-2xl border border-white/5 hover:bg-slate-800/60 transition-colors flex flex-col h-full min-w-[320px] md:min-w-[380px]">
            <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    {icon}
                </div>
                <div>
                    <h4 className="text-xl font-bold text-slate-200">{title}</h4>
                    <p className="text-sm text-slate-400">{subtitle}</p>
                </div>
            </div>
            <p className="text-slate-300 mb-6 flex-grow leading-relaxed">{desc}</p>
            
            {/* Certificate Image Area */}
            <div className="mt-auto pt-4 border-t border-white/5">
                <div 
                    className="w-full h-48 bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700 group cursor-pointer relative"
                    onClick={() => images && images.length > 0 && onOpenGallery(images, 0)}
                >
                    {images && images.length > 0 ? (
                        <>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 flex items-center justify-center">
                                <ExternalLink className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <img 
                                src={images[0]} 
                                alt={title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => {
                                    e.target.src = "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=400&q=80"; // Cert Fallback
                                }}
                            />
                            
                            {/* Badge */}
                            {images.length > 1 && (
                               <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                                 <ImageIcon size={10} /> +{images.length - 1}
                               </div>
                             )}
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <Award className="mx-auto mb-2 text-slate-600 group-hover:text-slate-400" size={24}/>
                                <p className="text-xs text-slate-500 group-hover:text-slate-300">Upload Sertifikat</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;