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
  Figma
} from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            <p className="text-lg text-slate-400 max-w-lg mx-auto lg:mx-0">
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
              
              {/* Floating Icons */}
              <div className="absolute top-0 right-0 p-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-white/10 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <Figma className="text-pink-400 mb-1" size={20} />
                <span className="text-xs font-bold block">Figma Expert</span>
              </div>
              <div className="absolute top-12 -left-12 p-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-white/10 shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
                <Smartphone className="text-green-400 mb-1" size={20} />
                <span className="text-xs font-bold block">Augmented Reality</span>
              </div>
              <div className="absolute bottom-3 -left-4 p-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-white/10 shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
                <Box className="text-blue-400 mb-1" size={20} />
                <span className="text-xs font-bold block">3D Modeling</span>
              </div>
               <div className="absolute top-1/2 -right-8 p-3 bg-slate-800/80 backdrop-blur-md rounded-xl border border-white/10 shadow-xl animate-bounce" style={{ animationDuration: '5s' }}>
                <Cpu className="text-purple-400 mb-1" size={20} />
                <span className="text-xs font-bold block">IoT Dev</span>
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
            <div className="space-y-6 text-slate-300 leading-relaxed">
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
                 <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-purple-500">
                    <h3 className="font-bold text-white text-lg">3.50 GPA</h3>
                    <p className="text-sm text-slate-400">Teknik Komputer</p>
                 </div>
                 <div className="p-4 bg-slate-800 rounded-lg border-l-4 border-pink-500">
                    <h3 className="font-bold text-white text-lg">120+</h3>
                    <p className="text-sm text-slate-400">Anggota Dipimpin</p>
                 </div>
              </div>
            </div>

            <div className="bg-slate-800/50 p-8 rounded-2xl border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Code size={20} className="text-purple-400"/> Tech Stack
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2 text-sm font-medium text-slate-400">
                    <span>UI/UX Design (Figma)</span>
                    <span>95%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2 text-sm font-medium text-slate-400">
                    <span>Full Stack Low-Code (Mendix)</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2 text-sm font-medium text-slate-400">
                    <span>3D Modeling (Blender, AutoCAD)</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2 text-sm font-medium text-slate-400">
                    <span>Coding (Python, HTML, CSS, IoT)</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2.5">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2.5 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Proyek <span className="text-blue-400">Unggulan</span></h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Bukti nyata kompetensi dalam pengembangan aplikasi, desain UI/UX, dan sistem IoT.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* CONTOH KUSTOMISASI:
                - gridClass: 'grid-cols-1' (satu kolom besar)
                - heightClass: 'h-64' (tinggi besar)
                - aspectClass: 'aspect-video' (melebar seperti video)
            */}
            <ProjectCard 
              title="Lifegen"
              category="UI/UX Design"
              description="Aplikasi pelacak kesehatan dan kalori harian. Fokus pada antarmuka yang bersih."
              tags={['Figma', 'Mobile App', 'Health']}
              icon={<Smartphone className="text-pink-400" size={40} />}
              color="border-pink-500/30 hover:border-pink-500"
              images={["life.png"]}
              gridClass="grid-cols-1"      // Kustom: Cuma 1 gambar lebar
              heightClass="h-64"           // Kustom: Gambar tinggi
              aspectClass="aspect-square"   // Kustom: Rasio video
            />

            {/* CONTOH KUSTOMISASI:
                - gridClass: 'grid-cols-3' (tiga kolom kecil)
                - heightClass: 'h-32' (tinggi sedang)
                - aspectClass: 'aspect-square' (kotak)
            */}
            <ProjectCard 
              title="LandConnect"
              category="Marketplace UI/UX"
              description="Platform jual beli lahan strategis dengan fitur peta interaktif."
              tags={['Figma', 'Marketplace', 'Web']}
              icon={<Briefcase className="text-purple-400" size={32} />}
              color="border-purple-500/30 hover:border-purple-500"
              images={[
                "land.png"
              ]}
              gridClass="grid-cols-1"      // Kustom: 3 Kolom
              heightClass="h-64"           // Kustom: Gambar kecil
              aspectClass="aspect-square"
            />

            {/* CONTOH KUSTOMISASI:
                - gridClass: 'grid-cols-2' (dua kolom)
            */}
            <ProjectCard 
              title="WeatherFit"
              category="Full Stack App"
              description="Aplikasi perencanaan olahraga berbasis cuaca real-time."
              tags={['Mendix', 'Weather API', 'Low-Code']}
              icon={<ExternalLink className="text-blue-400" size={32} />}
              color="border-blue-500/30 hover:border-blue-500"
              images={[
                "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&q=80",
                "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80"
              ]}
              gridClass="grid-cols-2"      // Kustom: 2 Kolom
              heightClass="h-32"
            />

             <ProjectCard 
              title="Smart Water Metering"
              category="Embedded System"
              description="Alat pemantau penggunaan air berbasis Arduino Uno."
              tags={['Arduino', 'C++', 'Hardware']}
              icon={<Cpu className="text-cyan-400" size={32} />}
              color="border-cyan-500/30 hover:border-cyan-500"
              images={[
                "swm.jpeg",
                "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&q=80"
              ]}
              gridClass="grid-cols-2"
              heightClass="h-40"
            />

             <ProjectCard 
              title="BridgeGuard"
              category="IoT Solution"
              description="Sistem pemantau getaran jembatan menggunakan ESP32."
              tags={['IoT', 'ESP32', 'Safety']}
              icon={<ExternalLink className="text-green-400" size={32} />}
              color="border-green-500/30 hover:border-green-500"
              images={[
                "https://images.unsplash.com/photo-1513828583688-601bf3925e2e?w=400&q=80",
                "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400&q=80"
              ]}
              gridClass="grid-cols-2"
            />

             <ProjectCard 
              title="AR BMKG"
              category="Augmented Reality"
              description="Aplikasi AR markerless untuk alat kerja BMKG."
              tags={['AR', 'Education', '3D']}
              icon={<Box className="text-orange-400" size={32} />}
              color="border-orange-500/30 hover:border-orange-500"
              images={[
                "https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=400&q=80",
                "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&q=80"
              ]}
              gridClass="grid-cols-2"
            />
          </div>
        </div>
      </section>

      {/* Experience & Organization Section */}
      <section id="experience" className="py-20 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pengalaman & <span className="text-pink-400">Kepemimpinan</span></h2>
            <p className="text-slate-400 text-sm">Dokumentasi kegiatan dan peran aktif dalam organisasi/kepanitiaan.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Kepanitiaan */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Users className="text-purple-400"/> Kepanitiaan (Event)
              </h3>
              <div className="space-y-12 pl-4 border-l-2 border-slate-700">
                
                <TimelineItem 
                  role="Ketua Pelaksana"
                  org="Computer Multi-Challenge Day (CMD) 2025"
                  date="Oktober 2025"
                  desc="Memimpin acara UI/UX, Hackathon, & Olimpiade Nasional."
                  highlight
                  evidenceLabel="Dokumentasi Acara"
                  images={[
                    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80",
                    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80"
                  ]}
                />

                <TimelineItem 
                  role="Wakil Ketua Pelaksana"
                  org="Pekan Bakti Mahasiswa Teknik (PBMT)"
                  date="2024"
                  desc="Mengelola kegiatan pengabdian masyarakat teknik."
                  evidenceLabel="Dokumentasi Bakti Sosial"
                  images={[
                    "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=400&q=80",
                    "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80"
                  ]}
                />

                 <TimelineItem 
                  role="Koordinator Acara"
                  org="Basic Implementation of Organizational Strategy (BIOS)"
                  date="2025"
                  desc="Merancang konsep acara orientasi mahasiswa baru."
                  evidenceLabel="Dokumentasi Acara"
                  images={[
                    "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80"
                  ]}
                />

                <TimelineItem 
                  role="Wakil Ketua Merchandise"
                  org="Reuni Cinta Almamater (RCA)"
                  date="2024"
                  desc="Strategi penjualan dan desain merchandise acara."
                  evidenceLabel="Merchandise"
                  images={[
                    "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&q=80"
                  ]}
                />

                <TimelineItem 
                  role="Koordinator Acara"
                  org="Bina Islami Aneuk Komputer (BINER) 7.0"
                  date="2023"
                  desc="Mengatur rundown acara pengenalan jurusan."
                  evidenceLabel="Dokumentasi"
                  images={[
                    "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&q=80"
                  ]}
                />
              </div>
            </div>

            {/* Organisasi */}
            <div>
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Briefcase className="text-blue-400"/> Organisasi
              </h3>
              <div className="space-y-12 pl-4 border-l-2 border-slate-700">
                
                <TimelineItem 
                  role="Anggota Divisi Minat dan Bakat"
                  org="Himpunan Mahasiswa Teknik Komputer USK"
                  date="2025"
                  desc="Mengembangkan minat dan bakat mahasiswa teknik komputer."
                  evidenceLabel="Dokumentasi Kegiatan"
                  images={[
                    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&q=80",
                    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&q=80"
                  ]}
                />

                 <TimelineItem 
                  role="Wakil Ketua Divisi Kesejahteraan Mahasiswa"
                  org="Himpunan Mahasiswa Teknik Komputer USK"
                  date="2024"
                  desc="Menjembatani aspirasi dan kesejahteraan mahasiswa."
                  evidenceLabel="Rapat Divisi"
                  images={[
                    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&q=80"
                  ]}
                />

                <TimelineItem 
                  role="Staf Humas"
                  org="Badan Eksekutif Mahasiswa Fakultas Teknik"
                  date="2024"
                  desc="Hubungan masyarakat dan branding fakultas."
                  evidenceLabel="Dokumentasi Proker"
                  images={[
                    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80",
                    "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&q=80"
                  ]}
                />

                 <TimelineItem 
                  role="Anggota Divisi Kesejahteraan Mahasiswa"
                  org="Himpunan Mahasiswa Teknik Komputer USK"
                  date="2023"
                  desc="Awal karir organisasi di himpunan jurusan."
                  evidenceLabel="Kegiatan Himpunan"
                  images={[
                    "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80"
                  ]}
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Certifications & Education */}
      <section id="certs" className="py-20">
         <div className="container mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Sertifikasi & <span className="text-green-400">Pendidikan</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <CertCard 
                  title="Bangkit Academy 2024"
                  subtitle="By Google, GoTo, Traveloka"
                  desc="Studi Independen Machine Learning. Capstone Project: Aplikasi AI deteksi penyakit kulit."
                  color="green"
                  icon={<BookOpen size={24}/>}
                  image="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400&q=80"
                />
                <CertCard 
                  title="Skill Academy CAMP"
                  subtitle="Batch 3 (Dec 2022)"
                  desc="UI/UX Design untuk Pemula. Mempelajari dasar design thinking dan prototyping."
                  color="orange"
                  icon={<Award size={24}/>}
                  image="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=400&q=80"
                />
                <CertCard 
                  title="Webinar AI Weather"
                  subtitle="Jan 2024"
                  desc="Pengembangan dan Pemanfaatan AI dalam Prakiraan Cuaca."
                  color="blue"
                  icon={<ExternalLink size={24}/>}
                  image="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=80"
                />
                 <CertCard 
                  title="Olimpiade Sains Nasional"
                  subtitle="Tingkat Kota (2020)"
                  desc="Peserta OSN Bidang Sains Informatika tingkat Kota Banda Aceh."
                  color="yellow"
                  icon={<Award size={24}/>}
                  image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80"
                />
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-10 bg-slate-950 border-t border-white/10 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-6">Let's Work Together</h2>
          <div className="flex justify-center gap-6 mb-8">
             <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-purple-600 transition-colors"><Mail size={18}/></a>
             <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"><Linkedin size={18}/></a>
             <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Github size={18}/></a>
          </div>
          <p className="text-slate-500 text-sm">© 2025 Rifqi Mubarak Tampeng. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

/* --- Helper Components --- */

// MODIFIED: Added gridClass, heightClass, aspectClass support
const ProjectCard = ({ 
  title, 
  category, 
  description, 
  tags, 
  icon, 
  color, 
  images, 
  gridClass = "grid-cols-3", // Default value
  heightClass = "h-32",      // Default value
  aspectClass = "aspect-square" // Default value
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
    <p className="text-slate-400 text-sm mt-3 mb-6 leading-relaxed">
      {description}
    </p>
    
    {/* Evidence Grid for Projects (UPDATED TO USE CUSTOM CLASSES) */}
    <div className="mt-auto">
      <div className="mb-4">
        {/* Dynamic Grid Class */}
        <div className={`grid ${gridClass} gap-2`}>
          {images && images.map((img, i) => (
             // Dynamic Height and Aspect Ratio
             <div key={i} className={`${aspectClass} rounded overflow-hidden cursor-pointer bg-slate-800/30`}>
               <img src={img} alt={title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
             </div>
          ))}
        </div>
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

// Updated TimelineItem
const TimelineItem = ({ role, org, date, desc, highlight, evidenceLabel, images }) => (
  <div className="relative pl-8 pb-4 group">
    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-2 ${highlight ? 'bg-purple-500 border-purple-300 shadow-[0_0_10px_rgba(168,85,247,0.5)]' : 'bg-slate-900 border-slate-500 group-hover:border-purple-400'} transition-colors z-10`}></div>
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
      <h4 className={`text-lg font-bold ${highlight ? 'text-purple-400' : 'text-white group-hover:text-purple-300'} transition-colors`}>{role}</h4>
      <span className="text-xs font-mono text-slate-500 bg-slate-800/50 px-2 py-1 rounded border border-white/5">{date}</span>
    </div>
    <p className="text-sm font-semibold text-slate-400 mb-2">{org}</p>
    <p className="text-sm text-slate-500 leading-relaxed mb-4">{desc}</p>
    
    {/* Evidence Slot for Experience */}
    {evidenceLabel && (
      <div className="grid grid-cols-2 gap-3 mt-3">
        {images && images.map((img, idx) => (
             <div key={idx} className="h-32 bg-slate-800/30 rounded overflow-hidden border border-slate-700 cursor-pointer hover:opacity-80 transition-opacity">
               <img src={img} alt={`Bukti ${idx+1}`} className="w-full h-full object-cover" />
             </div>
        ))}
        {/* Placeholder if no images provided */}
        {(!images || images.length === 0) && (
          <div className="h-32 bg-slate-800/30 rounded border border-dashed border-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-800/50 transition-colors">
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

const CertCard = ({ title, subtitle, desc, color, icon, image }) => {
    const colorClasses = {
        green: "text-green-400 bg-green-500/20",
        orange: "text-orange-400 bg-orange-500/20",
        blue: "text-blue-400 bg-blue-500/20",
        yellow: "text-yellow-400 bg-yellow-500/20"
    };

    return (
        <div className="bg-slate-800/40 p-6 rounded-xl border border-white/5 hover:bg-slate-800/60 transition-colors flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
                    {icon}
                </div>
                <div>
                    <h4 className="text-xl font-bold text-slate-200">{title}</h4>
                    <p className="text-sm text-slate-400">{subtitle}</p>
                </div>
            </div>
            <p className="text-slate-300 mb-6 flex-grow">{desc}</p>
            
            {/* Certificate Image Area */}
            <div className="mt-auto pt-4 border-t border-white/5">
                <div className="w-full h-40 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700 group cursor-pointer relative">
                    {image ? (
                        <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
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