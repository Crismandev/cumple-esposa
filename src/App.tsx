import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart, Stars, Gift, Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react';

// 2. Le decimos a TypeScript que esto es de tipo ': Variants'
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  visible: { transition: { staggerChildren: 0.3 } }
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const photos = useMemo(() => {
    const modules = import.meta.glob('./assets/images/**/*.{jpg,jpeg,png,gif,webp,avif}', {
      eager: true,
      as: 'url',
    }) as Record<string, string>;
    const localPhotos = Object.entries(modules)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([path, url]) => {
        const name = path.split('/').pop() ?? 'Foto';
        const caption = name
          .replace(/\.[^.]+$/, '')
          .replace(/[-_]+/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());
        return { src: url, caption };
      });
    const preferred = localPhotos.slice(0, 4);
    if (preferred.length < 4) {
      const fallback = [
        { src: 'src/assets/Gemini_Generated_Image_6ydrfq6ydrfq6ydr (1).webp', caption: 'Nuestro abrazo que todo lo cura' },
        { src: 'src/assets/Gemini_Generated_Image_27ws6827ws6827ws.png', caption: 'Caminando juntos hacia todos los sueños' },
        { src: 'src/assets/Gemini_Generated_Image_evudhnevudhnevud (1).png', caption: 'Tus manos, mi hogar' },
        { src: 'src/assets/Gemini_Generated_Image_4ig3yx4ig3yx4ig3.png', caption: 'El atardecer que nos prometió eternidad' },
      ];
      return [...preferred, ...fallback.slice(preferred.length, 4)];
    }
    return preferred;
  }, []);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [photos.length]);
  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  const surpriseText = 'Eres mi siempre, mi hogar y mi razón de sonreír.';
  const [typed, setTyped] = useState('');
  useEffect(() => {
    if (!isOpen) {
      setTyped('');
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      setTyped((t) => t + surpriseText[i]);
      i++;
      if (i >= surpriseText.length) clearInterval(id);
    }, 50);
    return () => clearInterval(id);
  }, [isOpen]);

  const launchConfetti = () => {
    setIsOpen(true);
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff69b4', '#ffd700', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff69b4', '#ffd700', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-rose-500 selection:text-white overflow-hidden relative">
      <div className="romance-gradient fixed inset-0 -z-20 pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        {useMemo(() =>
          Array.from({ length: 14 }).map((_, i) => {
            const left = Math.floor(Math.random() * 90) + 5;
            const size = Math.floor(Math.random() * 18) + 18;
            const delay = Math.random() * 6;
            const duration = Math.random() * 12 + 10;
            return (
              <motion.div
                key={`heart-bg-${i}`}
                className="absolute"
                style={{ left: `${left}%`, bottom: -60 }}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -900, opacity: [0, 0.6, 0] }}
                transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
              >
                <Heart className="text-rose-500/50 fill-rose-500/30" size={size} />
              </motion.div>
            );
          }),
        [])}
        {useMemo(() =>
          Array.from({ length: 10 }).map((_, i) => {
            const left = Math.floor(Math.random() * 90) + 5;
            const top = Math.floor(Math.random() * 70) + 10;
            const delay = Math.random() * 2;
            return (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute"
                style={{ left: `${left}%`, top: `${top}%` }}
                initial={{ opacity: 0.2, scale: 0.8 }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1, 0.8] }}
                transition={{ duration: 2, delay, repeat: Infinity }}
              >
                <Sparkles className="text-rose-200" size={14} />
              </motion.div>
            );
          }),
        [])}
      </div>
      {/* Fondo ambiental */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-600/20 rounded-full blur-[128px] animate-pulse-slow" />
        <div className="absolute bottom-[10%] right-[-5%] w-80 h-80 bg-indigo-600/20 rounded-full blur-[128px] animate-pulse-slow" />
      </div>

      {/* Contenedor Principal */}
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20 flex flex-col items-center justify-center min-h-screen text-center">
        
        {/* Sección Hero */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-8"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-sm tracking-widest uppercase backdrop-blur-sm">
              <Stars size={14} className="mr-2" /> Edición Especial
            </span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-rose-100 to-rose-300"
          >
            Feliz Cumpleaños, <br />
            <span className="italic font-serif text-rose-400">Mi Vida</span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-400 max-w-lg mx-auto leading-relaxed"
          >
            Hoy no celebramos solo un año más, celebramos la luz que traes a mi mundo cada día.
          </motion.p>
        </motion.div>

        {/* Separador */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1.5 }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-rose-500 to-transparent my-12"
        />

        {/* Carta */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-2xl p-8 md:p-12 bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl"
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 p-3 rounded-full border border-white/10 shadow-lg">
            <Heart className="text-rose-500 fill-rose-500 animate-pulse" size={32} />
          </div>

          <div className="mt-4 space-y-6 text-left">
            <p className="text-slate-300 text-lg leading-loose">
              A veces las palabras no alcanzan para describir lo agradecido que estoy de tenerte. Eres mi compañera, mi paz y mi inspiración.
            </p>
            <p className="text-slate-300 text-lg leading-loose">
              No necesitamos miles de fotos para recordar nuestra historia, porque los mejores momentos los llevamos guardados en el corazón. Que este nuevo año te traiga tanta felicidad como la que tú me das a mí.
            </p>
            <p className="font-serif text-2xl text-rose-300 text-right pt-4">
              — Con amor eterno.
            </p>
          </div>
        </motion.div>

        {/* Carrusel de Fotos */}
        <section className="w-full max-w-3xl mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-2xl bg-slate-800/40">
            <div className="relative h-80 md:h-[28rem]">
              {photos.map((p, i) => (
                <motion.img
                  key={p.src}
                  src={p.src}
                  alt={p.caption}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: i === index ? 1 : 0, scale: i === index ? 1 : 1.02 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ))}
            </div>
            <div className="absolute inset-x-0 top-0 flex justify-between p-4">
              <button
                onClick={prev}
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white/80 hover:text-white border border-white/10 backdrop-blur-md"
                aria-label="Anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white/80 hover:text-white border border-white/10 backdrop-blur-md"
                aria-label="Siguiente"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/70 text-rose-200 px-4 py-2 rounded-full text-sm border border-white/10 backdrop-blur-md">
              {photos[index].caption}
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
              {photos.map((_, i) => (
                <div
                  key={`dot-${i}`}
                  className={`h-1.5 w-6 rounded-full ${i === index ? 'bg-rose-500' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </div>
        </section>

      {/* Frase romántica */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-12 flex items-center gap-3 text-rose-200"
      >
        <Sparkles size={18} className="" />
        <p className="italic font-serif text-xl md:text-2xl">
          Contigo, cada detalle se vuelve eterno.
        </p>
      </motion.div>

        {/* Botón */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="mt-16"
        >
          {!isOpen ? (
            <button 
              onClick={launchConfetti}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(225,29,72,0.5)] hover:shadow-[0_0_30px_rgba(225,29,72,0.8)] hover:scale-105 cursor-pointer"
            >
              <Gift size={20} className="group-hover:rotate-12 transition-transform" />
              <span className="font-medium tracking-wide">Presiona para una sorpresa</span>
            </button>
          ) : (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="p-6 bg-white/5 rounded-2xl border border-white/10"
            >
              <p className="text-2xl text-rose-300 font-serif">¡Te Amo!</p>
              <p className="text-sm text-slate-400 mt-2">Prepárate para celebrar.</p>
            </motion.div>
          )}
        </motion.div>

      </main>
      
      <footer className="absolute bottom-4 w-full text-center text-xs text-slate-600">
        Desarrollado con el ❤️ solo para ti.
      </footer>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="romance-gradient absolute inset-0" />
            <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-md" />
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-[90%] max-w-3xl mx-auto p-8 md:p-12 bg-slate-800/60 border border-white/10 rounded-3xl shadow-2xl text-center"
            >
              <div className="absolute right-4 top-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white/80 hover:text-white border border-white/10"
                  aria-label="Cerrar sorpresa"
                >
                  <X size={16} />
                </button>
              </div>
              <motion.div
                initial={{ rotate: -6, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 18 }}
                className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-rose-500/30 bg-rose-500/10 text-rose-300 text-sm tracking-widest uppercase backdrop-blur-sm mb-6"
              >
                <Stars size={14} /> Sorpresa Especial
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-100 via-white to-rose-300"
              >
                Para ti, mi amor
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mt-6 text-rose-200 text-lg md:text-2xl font-serif min-h-[2.5rem]"
              >
                {typed}
                <span className="animate-pulse">▌</span>
              </motion.p>
              <div className="mt-10 grid grid-cols-3 gap-4">
                {Array.from({ length: 9 }).map((_, i) => (
                  <motion.div
                    key={`love-card-${i}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="p-4 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-2 text-rose-300">
                      <Heart className="text-rose-500 fill-rose-500/40" size={18} />
                      <span className="text-sm">Contigo #{i + 1}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10"
              >
                <p className="text-slate-300">Siempre, hoy y todos los días.</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
