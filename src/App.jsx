import React, { useState, useEffect, useRef } from 'react';
// Mengimpor ikon-ikon dari library 'lucide-react'. 
// Anda bisa mencari ikon lain di website lucide.dev dan menambahkannya di sini.
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
  MousePointer2
} from 'lucide-react';

/* --- HOOKS & UTILS (ALAT BANTU) --- */

// Hook kustom untuk mendeteksi apakah suatu elemen sedang terlihat di layar (viewport).
// Digunakan untuk memicu animasi saat pengguna melakukan scroll ke bawah.
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Berhenti mengamati setelah elemen terlihat sekali
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

/* --- KOMPONEN-KOMPONEN KECIL (REUSABLE COMPONENTS) --- */

// Komponen FadeIn: Membungkus konten agar muncul perlahan (animasi fade-in + naik ke atas)
// Ubah 'delay' untuk mengatur jeda kemunculan.
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });
  
  return (
    <div 
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Komponen Modal Galeri: Menampilkan gambar dalam ukuran besar (Lightbox)
// Memiliki tombol Next/Prev jika gambar lebih dari satu.
const ImageGalleryModal = ({ isOpen, images, initialIndex, onClose }) => {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex, isOpen]);

  // Fungsi untuk ganti gambar berikutnya
  const nextImage = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  // Fungsi untuk ganti gambar sebelumnya
  const prevImage = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 animate-in fade-in duration-300" onClick={onClose}>
      {/* Tombol Close (X) */}
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 transition-colors z-50"
      >
        <X size={32} />
      </button>

      <div className="relative w-full max-w-6xl h-full max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        {/* Tombol navigasi Kiri/Kanan (hanya muncul jika gambar > 1) */}
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage} 
              className="absolute left-2 md:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all z-10 backdrop-blur-md"
            >
              <ChevronLeft size={32} />
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-2 md:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all z-10 backdrop-blur-md"
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}

        {/* Gambar Utama yang ditampilkan */}
        <img 
          src={images[activeIndex]} 
          alt={`Gallery ${activeIndex}`} 
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-fade-in"
          // Fallback jika gambar gagal dimuat
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80"; }}
        />

        {/* Indikator titik-titik (Dots) di bawah gambar */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full p-2 hide-scrollbar">
          {images.map((_, idx) => (
            <button
              key={idx} 
              onClick={(e) => { e.stopPropagation(); setActiveIndex(idx); }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'bg-purple-500 w-8' : 'bg-white/30 hover:bg-white/60'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Komponen Kartu Proyek (Project Card)
// Digunakan di bagian "Proyek Unggulan". Menerima props seperti title, description, tags, dll.
const ProjectCard = ({ title, category, description, tags, icon, color, images, heightClass = "h-64", aspectClass = "aspect-video", onOpenGallery }) => (
  <div className="group relative bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col h-full">
    {/* Efek gradient background saat hover */}
    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${color.replace('border-', 'from-').replace('hover:border-', '')} to-transparent pointer-events-none`} />
    
    <div className="p-6 relative z-10 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-800 rounded-2xl text-white group-hover:scale-110 transition-transform duration-300 border border-white/5">
          {icon}
        </div>
        <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-400">
          {category}
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{title}</h3>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-3">{description}</p>
      
      <div className="mt-auto">
        {/* Container Gambar Thumbnail Proyek */}
        <div className="mb-5 relative group/img overflow-hidden rounded-2xl border border-white/10">
          {images && images.length > 0 ? (
            <div 
              className={`${aspectClass} ${heightClass} w-full cursor-pointer bg-slate-800`}
              onClick={() => onOpenGallery(images, 0)}
            >
               {/* Overlay Icon External Link saat hover */}
               <div className="absolute inset-0 bg-black/20 group-hover/img:bg-black/40 transition-colors z-10 flex items-center justify-center opacity-0 group-hover/img:opacity-100 duration-300">
                  <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 transform translate-y-4 group-hover/img:translate-y-0 transition-transform duration-300">
                    <ExternalLink className="text-white" size={24} />
                  </div>
               </div>
               <img 
                 src={images[0]} 
                 alt={title} 
                 className="w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-700 ease-out" 
                 onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80"; }}
               />
               {/* Indikator jumlah gambar (+2, +3, dst) */}
               {images.length > 1 && (
                 <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/10">
                   <ImageIcon size={12} /> 
                   <span>+{images.length - 1}</span>
                 </div>
               )}
            </div>
          ) : (
             <div className={`${heightClass} flex items-center justify-center text-slate-600 bg-slate-800/50`}>
               No Image
             </div>
          )}
        </div>
        
        {/* Tags Teknologi (cth: React, Figma) */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="text-[10px] uppercase tracking-wider font-semibold px-2 py-1 bg-slate-800 rounded-md text-slate-400 border border-white/5">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// Komponen Kartu Tech Stack (Keahlian)
const TechStackCard = ({ icon, name, desc }) => (
  <div className="group p-2 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/30 hover:bg-white/10 transition-all duration-300 flex items-center gap-2">
    <div className="w-12 h-12 flex items-center justify-center bg-slate-800 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-purple-500/20 overflow-hidden shrink-0">
       <img 
        src={icon} 
        alt={name} 
        className="w-8 h-8 object-contain" 
        onError={(e) => {
          // Fallback ke ikon generik jika gambar ikon tidak ditemukan
          e.target.style.display = 'none';
          e.target.parentElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`;
        }}
      /> 
    </div>
    <div>
      <h4 className="text-white font-bold text-sm group-hover:text-purple-400 transition-colors">{name}</h4>
      <p className="text-slate-500 text-xs">{desc}</p>
    </div>
  </div>
);

// Komponen Timeline (Pengalaman Kerja/Kepanitiaan)
const TimelineCard = ({ role, org, date, desc, highlight, evidenceLabel, images, onOpenGallery }) => (
  <div className={`relative pl-8 pb-8 border-l-2 ${highlight ? 'border-purple-500' : 'border-slate-800'} transition-colors duration-300 group`}>
    {/* Titik Point pada Timeline */}
    <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${highlight ? 'bg-purple-500 border-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.6)]' : 'bg-slate-900 border-slate-600 group-hover:border-purple-400 group-hover:bg-slate-800'} transition-all duration-300`}></div>
    
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
      <h4 className={`text-lg font-bold ${highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400' : 'text-white group-hover:text-purple-200'} transition-colors`}>{role}</h4>
      <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded-md border border-white/5">{date}</span>
    </div>
    
    <div className="flex items-center gap-2 mb-3">
       <Building2 size={14} className="text-slate-500" />
       <p className="text-sm font-semibold text-slate-300">{org}</p>
    </div>
    
    <p className="text-slate-400 text-sm leading-relaxed mb-4">{desc}</p>
    
    {/* Menampilkan bukti (gambar) jika ada */}
    {evidenceLabel && images && images.length > 0 && (
      <div className="mt-3">
         <div 
           className="h-32 w-48 bg-slate-800 rounded-xl overflow-hidden border border-white/10 cursor-pointer hover:border-purple-500/50 transition-all relative group/img shadow-lg"
           onClick={() => onOpenGallery(images, 0)}
         >
           <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/20 transition-colors z-10 flex items-center justify-center opacity-0 group-hover/img:opacity-100">
              <ExternalLink className="text-white" size={20} />
           </div>
           <img src={images[0]} alt="Bukti" className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-500" 
              onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80"; }}
           />
           {images.length > 1 && (
             <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
               <ImageIcon size={10} /> +{images.length - 1}
             </div>
           )}
         </div>
      </div>
    )}
  </div>
);

// Komponen Kartu Organisasi (Grid Layout)
const OrgCard = ({ role, period, desc, images, onOpenGallery }) => (
  <div className="bg-slate-900/40 p-6 rounded-3xl border border-white/5 hover:border-purple-500/30 hover:bg-slate-900/20 transition-all duration-300 group flex flex-col h-full hover:-translate-y-1 hover:shadow-xl">
    <div className="flex justify-between items-start mb-4">
       <div>
          <h5 className="font-bold text-white text-base leading-snug group-hover:text-purple-300 transition-colors">{role}</h5>
          <span className="text-xs text-slate-500 mt-1 block">{period}</span>
       </div>
    </div>
    <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">{desc}</p>
    
    <div className="mt-auto pt-4 border-t border-white/5">
      {images && images.length > 0 ? (
        <div 
          className="h-32 w-full bg-slate-950 rounded-2xl overflow-hidden relative cursor-pointer group/img border border-white/5 group-hover:border-white/10 transition-colors"
          onClick={() => onOpenGallery(images, 0)}
        >
           <div className="absolute inset-0 bg-black/0 group-hover/img:bg-black/30 transition-colors z-10 flex items-center justify-center opacity-0 group-hover/img:opacity-100">
              <ExternalLink className="text-white" size={16} />
           </div>
           <img 
            src={images[0]} 
            alt={role} 
            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700" 
            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80"; }}
           />
           {images.length > 1 && (
             <div className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded-md flex items-center gap-1 backdrop-blur-md">
               <ImageIcon size={10} /> +{images.length - 1}
             </div>
           )}
        </div>
      ) : (
        <div className="h-32 w-full bg-slate-950 rounded-2xl border border-dashed border-slate-800 flex items-center justify-center">
           <span className="text-xs text-slate-700 flex flex-col items-center gap-1"><Camera size={16}/> No Doc</span>
        </div>
      )}
    </div>
  </div>
);

// Komponen Kartu Sertifikasi (Horizontal Scroll)
const CertCard = ({ title, subtitle, desc, color, icon, images, onOpenGallery }) => {
    // Peta warna untuk tema kartu (hijau, oranye, biru, kuning)
    const colorMap = {
        green: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
        orange: "text-orange-400 bg-orange-500/10 border-orange-500/20",
        blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
        yellow: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
    };

    return (
        <div className={`p-6 rounded-3xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex flex-col h-full min-w-[320px] md:min-w-[360px] bg-slate-900/60 ${colorMap[color].replace('text-', 'border-').split(' ')[2]} hover:bg-slate-800/60`}>
            <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-2xl ${colorMap[color]}`}>
                    {icon}
                </div>
                <div>
                    <h4 className="text-lg font-bold text-white leading-tight">{title}</h4>
                    <p className="text-xs text-slate-400 mt-1">{subtitle}</p>
                </div>
            </div>
            <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">{desc}</p>
            
            <div className="mt-auto">
                <div 
                    className="w-full h-40 bg-slate-950 rounded-2xl overflow-hidden border border-white/5 group cursor-pointer relative"
                    onClick={() => images && images.length > 0 && onOpenGallery(images, 0)}
                >
                    {images && images.length > 0 ? (
                        <>
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <ExternalLink className="text-white transform scale-75 group-hover:scale-100 transition-transform" />
                            </div>
                            <img 
                                src={images[0]} 
                                alt={title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?w=400&q=80"; }}
                            />
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                           <Award className="text-slate-700" size={24}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// Komponen Link Sosial Media (Bulat)
const SocialLink = ({ href, icon, color }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noreferrer" 
    className={`w-14 h-14 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 ${color} hover:text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 shadow-lg`}
  >
    {icon}
  </a>
);

/* --- MAIN APP (KOMPONEN UTAMA) --- */

const App = () => {
  // STATE MANAGEMENT (Penyimpanan Data Sementara)
  const [activeSection, setActiveSection] = useState('home'); // Bagian mana yang sedang aktif
  const [isMenuOpen, setIsMenuOpen] = useState(false);        // Apakah menu mobile terbuka
  const [scrolled, setScrolled] = useState(false);            // Apakah user sudah scroll ke bawah (untuk navbar effect)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);  // Apakah modal galeri terbuka
  const [currentGalleryImages, setCurrentGalleryImages] = useState([]); // Gambar yang sedang ditampilkan di galeri
  const [currentImageIndex, setCurrentImageIndex] = useState(0);        // Indeks gambar aktif

  // Efek untuk mendeteksi scroll window
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fungsi membuka galeri gambar
  const openGallery = (images, startIndex = 0) => {
    if (!images || images.length === 0) return;
    setCurrentGalleryImages(images);
    setCurrentImageIndex(startIndex);
    setIsGalleryOpen(true);
    document.body.style.overflow = 'hidden'; // Mencegah background scroll saat modal terbuka
  };

  // Fungsi menutup galeri
  const closeGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Fungsi scroll halus ke bagian tertentu (Smooth Scroll)
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  // DAFTAR LINK NAVIGASI
  // Ubah 'name' untuk mengganti teks menu, 'id' harus sesuai dengan id section di bawah
  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Experience', id: 'experience' },
    { name: 'Certifications', id: 'certs' },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-slate-200 font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      {/* GLOBAL STYLES (CSS Kustom) */}
      <style>{`
        /* Animasi Blob (Bulatan warna-warni di background) */
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        /* PENGATURAN SCROLLBAR (Batang Scroll) */
        
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
        
        /* Utility class untuk menyembunyikan scrollbar sepenuhnya */
        .hide-scrollbar::-webkit-scrollbar {
            display: none;
        }
        .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>

      {/* BACKGROUND ANIMASI (Efek Blur Warna-Warni) */}
      <div className="fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-blob" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-500/20 rounded-full mix-blend-screen filter blur-[128px] opacity-30 animate-blob animation-delay-4000" />
        {/* Overlay Noise Texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      </div>

      {/* NAVBAR (Navigasi Atas) */}
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-2xl py-3 rounded-full' : 'py-5'}`}>
        <div className="px-6 flex justify-between items-center">
          {/* LOGO NAMA: Ubah nama Anda di sini */}
          <div className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent cursor-pointer" onClick={() => scrollTo('home')}>
            Rifqi<span className="text-white">.MT</span>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeSection === link.id ? 'bg-white/10 text-white shadow-lg' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Tombol Hamburger Menu (Mobile) */}
          <button className="md:hidden text-white p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Dropdown (Mobile) */}
        {isMenuOpen && (
          <div className="absolute top-full mt-2 left-0 w-full bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col space-y-2 shadow-2xl animate-in slide-in-from-top-5">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => { scrollTo(link.id); setIsMenuOpen(false); }}
                className="text-left px-4 py-3 rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* --- SECTION HERO (BERANDA UTAMA) --- */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-24 relative">
        <div className="container mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          <FadeIn className="lg:w-1/2 text-center lg:text-left space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"/> Available for work
            </div>
            
            {/* Judul Utama / Nama */}
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              Hi, I'm <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
                Rifqi Mubarak Tampeng
              </span>
            </h1>
            
            {/* Deskripsi Singkat */}
            <p className="text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed pt-4">
              Mahasiswa Teknik Komputer (IPK 3.50) dengan spesialisasi di <span className="text-white font-medium">UI/UX Design</span>, <span className="text-white font-medium">3D Modeling</span>, dan <span className="text-white font-medium">Low-Code Dev</span>.
            </p>
            
            {/* Tombol Aksi (CTA) */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-6">
              <button onClick={() => scrollTo('projects')} className="group px-8 py-3.5 bg-white text-black rounded-full font-bold transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-2">
                Lihat Proyek <MousePointer2 size={18} className="group-hover:translate-x-1 transition-transform"/>
              </button>
              <button onClick={() => scrollTo('experience')} className="px-8 py-3.5 bg-white/5 border border-white/10 hover:border-white/30 text-white rounded-full font-medium transition-all hover:bg-white/10 hover:scale-105">
                Pengalaman
              </button>
            </div>

            {/* Ikon Sosial Media di Hero */}
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-8">
               {[
                 { icon: <Github size={22}/>, href: "#" },
                 { icon: <Instagram size={22}/>, href: "https://www.instagram.com/rifqiimt/" },
                 { icon: <Linkedin size={22}/>, href: "https://www.linkedin.com/in/rifqiimt/" },
                 { icon: <Mail size={22}/>, href: "mailto:tampengrifqmubarak@gmail.com" },
                 { icon: <Phone size={22}/>, href: "https://wa.me/85214006701" }
               ].map((social, idx) => (
                 <a key={idx} href={social.href} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white hover:scale-110 transition-all duration-300">
                   {social.icon}
                 </a>
               ))}
            </div>
          </FadeIn>

          {/* Bagian Foto Profil */}
          <FadeIn delay={200} className="lg:w-1/2 flex justify-center relative">
            <div className="left-20 relative w-72 h-72 lg:w-96 lg:h-96 group">
              {/* Spinning Glow Ring (Cincin Berputar) */}
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              
              {/* Gambar Profil Utama */}
              {/* Ganti 'pp.jpeg' dengan file foto Anda sendiri */}
              <div className="relative w-full h-full rounded-full border-4 border-slate-800/80 overflow-hidden shadow-2xl">
                 <img 
                  src="pp.jpeg" 
                  alt="Rifqi Mubarak" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {e.target.src = "https://api.dicebear.com/9.x/avataaars/svg?seed=Rifqi"}} // Fallback avatar kartun jika foto tidak ada
                />
              </div>

              {/* Lencana Mengambang (Floating Icons) */}
              <div className="absolute top-8 right-4 p-3 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <Figma className="text-pink-400" size={24} />
              </div>
              <div className="absolute top-1/2 -left-8 p-3 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl animate-bounce" style={{ animationDuration: '4s' }}>
                <Box className="text-blue-400" size={24} />
              </div>
              <div className="absolute bottom-8 right-2 p-3 bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl animate-bounce" style={{ animationDuration: '5s' }}>
                <Cpu className="text-purple-400" size={24} />
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Indikator Panah Bawah */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden lg:block text-slate-500">
          <ChevronDown size={24} />
        </div>
      </section>

      {/* --- SECTION ABOUT & SKILLS (TENTANG SAYA) --- */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Tentang <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Saya</span></h2>
              <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto rounded-full"></div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <FadeIn delay={100}>
              <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                <p>
                  Saya adalah mahasiswa S1 Teknik Komputer berprestasi dengan <strong>IPK 3.50/4.00</strong>. Saya memiliki passion yang kuat dalam menciptakan solusi digital yang estetis dan fungsional.
                </p>
                <p>
                  Keahlian saya mencakup perancangan antarmuka pengguna (UI/UX) yang intuitif, pemodelan 3D, hingga pengembangan sistem berbasis IoT dan aplikasi Full Stack Low-Code.
                </p>
                <p>
                  Selain teknis, saya memiliki jiwa kepemimpinan yang teruji, pernah memimpin tim hingga <strong>120 orang</strong> sebagai Ketua Pelaksana acara tingkat nasional (CMD 2025).
                </p>

                {/* Statistik Singkat */}
                <div className="flex gap-6 pt-4">
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white">3.50</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">GPA</p>
                  </div>
                  <div className="w-px bg-white/10 h-10"></div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white">120+</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Tim Dipimpin</p>
                  </div>
                  <div className="w-px bg-white/10 h-10"></div>
                  <div className="text-center">
                    <h3 className="text-3xl font-bold text-white">6+</h3>
                    <p className="text-xs text-slate-500 uppercase tracking-wider">Proyek</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Grid Tech Stack (Keahlian/Software) */}
            <FadeIn delay={300}>
              <div className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
                <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                  <Zap className="text-yellow-400 fill-yellow-400" size={24}/> Tech Stack
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <TechStackCard icon="figma.png" name="Figma" desc="Design" />
                  <TechStackCard icon="https://cdn.simpleicons.org/unity/FFFFFF" name="Unity" desc="Game" />
                  <TechStackCard icon="https://cdn.simpleicons.org/blender/E87D0D" name="Blender" desc="3D" />
                  <TechStackCard icon="mesh.png" name="Meshroom" desc="Scan" />
                  <TechStackCard icon="mendix.jpeg" name="Mendix" desc="Low-Code" />
                  <TechStackCard icon="canva.png" name="Canva" desc="Graphic" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* --- SECTION PROJECTS (PROYEK - HORIZONTAL SLIDER) --- */}
      <section id="projects" className="py-24 relative">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-5xl font-bold mb-4">Proyek <span className="text-blue-400">Unggulan</span></h2>
               <p className="text-slate-400 max-w-2xl mx-auto text-lg">
               Geser untuk melihat bukti nyata kompetensi saya dalam pengembangan aplikasi, desain UI/UX, dan sistem IoT.
               </p>
            </div>
          </FadeIn>

          {/* SLIDER WRAPPER - Kontainer Scroll Horizontal */}
          <div className="w-full overflow-x-auto pb-12 responsive-scrollbar snap-x snap-mandatory">
            <div className="flex gap-4 w-max">
              
              {/* Item Proyek 1 */}
              <div className="w-[320px] md:w-[450px] snap-center">
                <ProjectCard 
                  title="Lifegen - Health Tracker"
                  category="UI/UX Design"
                  description="Aplikasi pelacak kesehatan dan kalori harian dengan antarmuka bersih untuk memotivasi gaya hidup sehat."
                  tags={['Figma', 'Mobile App', 'Health']}
                  icon={<Smartphone className="text-pink-400" size={28} />}
                  color="border-pink-500"
                  images={["life.png"]} // Masukkan nama file gambar di sini
                  onOpenGallery={openGallery}
                  heightClass="h-72"
                />
              </div>

              {/* Item Proyek 2 */}
              <div className="w-[320px] md:w-[450px] snap-center">
                <ProjectCard 
                  title="LandConnect Marketplace"
                  category="Marketplace UI/UX"
                  description="Platform jual beli lahan strategis dengan fitur peta interaktif untuk memudahkan pencarian lokasi."
                  tags={['Figma', 'Web', 'Marketplace']}
                  icon={<Briefcase className="text-purple-400" size={28} />}
                  color="border-purple-500"
                  images={["land.png"]}
                  onOpenGallery={openGallery}
                  heightClass="h-72"
                />
              </div>

              {/* Item Proyek 3 */}
              <div className="w-[320px] md:w-[450px] snap-center">
                <ProjectCard 
                  title="WeatherFit App"
                  category="Full Stack App"
                  description="Aplikasi rekomendasi olahraga berbasis cuaca real-time menggunakan API cuaca dan geolokasi."
                  tags={['Mendix', 'API', 'Low-Code']}
                  icon={<ExternalLink className="text-blue-400" size={28} />}
                  color="border-blue-500"
                  images={["https://images.unsplash.com/photo-1592210454359-9043f067919b?w=400&q=80"]}
                  onOpenGallery={openGallery}
                  heightClass="h-72"
                />
              </div>

              {/* Item Proyek 4 */}
              <div className="w-[320px] md:w-[450px] snap-center">
                <ProjectCard 
                  title="Smart Water Metering"
                  category="Embedded System"
                  description="Sistem monitoring penggunaan air berbasis Arduino Uno untuk mencegah pemborosan air rumah tangga."
                  tags={['Arduino', 'C++', 'IoT']}
                  icon={<Cpu className="text-cyan-400" size={28} />}
                  color="border-cyan-500"
                  images={["swms.jpeg", "swm1.jpeg", "swm2.jpeg", "swm3.jpeg"]} // Contoh multiple images
                  onOpenGallery={openGallery}
                  heightClass="h-72"
                />
              </div>

              {/* Item Proyek 5 */}
              <div className="w-[320px] md:w-[450px] snap-center">
                <ProjectCard 
                  title="BridgeGuard System"
                  category="IoT Solution"
                  description="Perangkat pendeteksi getaran jembatan dini menggunakan ESP32 dan sensor akselerometer ADXL."
                  tags={['ESP32', 'Safety', 'Hardware']}
                  icon={<ExternalLink className="text-green-400" size={28} />}
                  color="border-green-500"
                  images={["https://images.unsplash.com/photo-1513828583688-601bf3925e2e?w=400&q=80"]}
                  onOpenGallery={openGallery}
                  heightClass="h-72"
                />
              </div>

              {/* Item Proyek 6 */}
              <div className="w-[320px] md:w-[450px] snap-center">
                <ProjectCard 
                  title="AR BMKG Tools"
                  category="Augmented Reality"
                  description="Aplikasi edukasi AR markerless untuk visualisasi alat-alat meteorologi BMKG secara interaktif 3D."
                  tags={['AR', 'Unity', 'Education']}
                  icon={<Box className="text-orange-400" size={28} />}
                  color="border-orange-500"
                  images={["https://images.unsplash.com/photo-1626379953822-baec19c3accd?w=400&q=80"]}
                  onOpenGallery={openGallery}
                  heightClass="h-72"
                />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION EXPERIENCE (PENGALAMAN) --- */}
      <section id="experience" className="py-24 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Pengalaman & <span className="text-pink-400">Jejak Langkah</span></h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Kolom Kiri: Timeline Kepanitiaan */}
            <FadeIn delay={200}>
              <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                  <span className="p-2 bg-purple-500/20 rounded-lg text-purple-400"><Users size={24}/></span>
                  Kepanitiaan (Event)
                </h3>
                <div className="space-y-2">
                   {/* Item Timeline */}
                   <TimelineCard 
                      role="Ketua Pelaksana" 
                      org="CMD 2025" 
                      date="Okt 2025" 
                      desc="Memimpin acara nasional (UI/UX, Hackathon) & 120 panitia."
                      highlight={true} // Memberi warna ungu sebagai highlight
                      evidenceLabel="Dokumentasi"
                      images={["cmd.png", "cmd1.jpeg", "cmd2.jpeg", "cmd3.jpeg", "cmd4.jpeg", "cmd5.jpeg"]}
                      onOpenGallery={openGallery}
                    />
                    <TimelineCard 
                      role="Wakil Ketua Pelaksana" 
                      org="PBMT 2024" 
                      date="2024" 
                      desc="Mengelola bakti sosial teknik di desa Luthu Lamwu."
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
            </FadeIn>

            {/* Kolom Kanan: Organisasi */}
            <FadeIn delay={400}>
              <div>
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white px-2">
                  <span className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Building2 size={24}/></span>
                  Organisasi
                </h3>

                <div className="space-y-8">
                   {/* HIMATEKKOM */}
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 px-2 opacity-80">
                         <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                            <img src="himatekkom.png" alt="logo" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'}/>
                         </div>
                         <h4 className="font-bold text-white">Himpunan Mahasiswa Teknik Komputer</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <OrgCard role="Wakadiv Kesma" period="2024" desc="Aspirasi & Kesejahteraan." images={["kesma.jpg"]} onOpenGallery={openGallery} />
                         <OrgCard role="Anggota Mikat" period="2025" desc="Minat & Bakat." />
                         <OrgCard role="Anggota Kesma" period="2023" desc="Staff Muda." images={["kesma1.png"]} onOpenGallery={openGallery} />
                      </div>
                   </div>

                   {/* BEM FT */}
                   <div className="space-y-4">
                      <div className="flex items-center gap-3 px-2 opacity-80">
                         <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                            <img src="bem.png" alt="logo" className="w-full h-full object-cover" onError={(e) => e.target.style.display='none'}/>
                         </div>
                         <h4 className="font-bold text-white">BEM Fakultas Teknik</h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <OrgCard role="Staf Humas" period="2024" desc="Branding Fakultas." images={["humas.png"]} onOpenGallery={openGallery} />
                      </div>
                   </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* --- SECTION CERTIFICATIONS (SERTIFIKASI) --- */}
      <section id="certs" className="py-24">
         <div className="container mx-auto px-6">
            <FadeIn>
              <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">Sertifikasi & <span className="text-green-400">Pendidikan</span></h2>
            </FadeIn>
            
            {/* Horizontal Scroll untuk Sertifikat */}
            <div className="w-full overflow-x-auto pb-12 responsive-scrollbar snap-x snap-mandatory">
              <div className="flex gap-6 w-max">
                 
                 <div className="w-[300px] md:w-[350px] snap-center">
                    <CertCard 
                      title="Bangkit Academy 2024" 
                      subtitle="Google, GoTo, Traveloka" 
                      desc="Studi Independen Machine Learning. Capstone Project AI."
                      color="green" 
                      icon={<BookOpen size={24}/>} 
                      images={["bangkit.jpg", "bangkit1.jpg", "bangkit2.jpg"]}
                      onOpenGallery={openGallery}
                    />
                 </div>
                 
                 <div className="w-[300px] md:w-[350px] snap-center">
                    <CertCard 
                      title="IoT Device Engineering" 
                      subtitle="BNSP / LSP TDI" 
                      desc="Sertifikasi kompetensi bidang IoT dan Jaringan."
                      color="yellow" 
                      icon={<Cpu size={24}/>} 
                      images={["iot.jpg", "iot1.jpg"]}
                      onOpenGallery={openGallery}
                    />
                 </div>

                 <div className="w-[300px] md:w-[350px] snap-center">
                    <CertCard 
                      title="Skill Academy CAMP" 
                      subtitle="Ruangguru" 
                      desc="Bootcamp intensif UI/UX Design & Prototyping."
                      color="orange" 
                      icon={<Award size={24}/>} 
                      images={["camp.jpg", "camp1.jpg"]}
                      onOpenGallery={openGallery}
                    />
                 </div>

                 <div className="w-[300px] md:w-[350px] snap-center">
                    <CertCard 
                      title="Webinar AI Weather" 
                      subtitle="KORIKA" 
                      desc="Pemanfaatan AI untuk prakiraan cuaca."
                      color="blue" 
                      icon={<ExternalLink size={24}/>} 
                      images={["korika.jpg"]}
                      onOpenGallery={openGallery}
                    />
                 </div>
                 
                 <div className="w-[300px] md:w-[350px] snap-center">
                    <CertCard 
                      title="Olimpiade Sains (OSN)" 
                      subtitle="Kemdikbud" 
                      desc="Juara Tingkat Kota Bidang Informatika."
                      color="yellow" 
                      icon={<Award size={24}/>} 
                      images={["osn.jpg"]}
                      onOpenGallery={openGallery}
                    />
                 </div>

              </div>
            </div>
         </div>
      </section>

      {/* --- FOOTER (BAGIAN BAWAH) --- */}
      <footer className="py-12 bg-slate-950 border-t border-white/5 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-white mb-8">Mari Terhubung</h2>
          {/* Link Sosial Media Footer */}
          <div className="flex justify-center gap-6 mb-8 flex-wrap">
             <SocialLink href="mailto:tampengrifqmubarak@gmail.com" icon={<Mail size={24}/>} color="hover:bg-red-500" />
             <SocialLink href="https://wa.me/85214006701" icon={<Phone size={24}/>} color="hover:bg-green-500" />
             <SocialLink href="https://www.linkedin.com/in/rifqiimt/" icon={<Linkedin size={24}/>} color="hover:bg-blue-600" />
             <SocialLink href="https://www.instagram.com/rifqiimt/" icon={<Instagram size={24}/>} color="hover:bg-pink-500" />
             <SocialLink href="#" icon={<Github size={24}/>} color="hover:bg-slate-700" />
          </div>
          <p className="text-slate-600 text-sm">© 2025 Rifqi Mubarak Tampeng. All rights reserved</p>
        </div>
      </footer>

      {/* --- MODAL GALERI GAMBAR (LIGHTBOX) --- */}
      {/* Jangan dihapus, ini komponen yang muncul saat gambar diklik */}
      <ImageGalleryModal 
        isOpen={isGalleryOpen} 
        images={currentGalleryImages} 
        initialIndex={currentImageIndex}
        onClose={closeGallery} 
      />

    </div>
  );
};

export default App;