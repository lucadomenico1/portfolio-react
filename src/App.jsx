import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  MotionConfig,
  useInView,
  animate,
  useMotionValue,
  useTransform,
  useSpring,
  useScroll,
} from "framer-motion";
import {
  Code2,
  Server,
  Gauge,
  Mail,
  ChevronDown,
  ArrowRight,
  Files,
  Search,
  GitBranch,
  Sparkles,
} from "lucide-react";

const EMAIL_URL = "mailto:lucadomenico.chiappetta@gmail.com";
const WHATSAPP_URL =
  "https://wa.me/3314075188?text=Hi%20Lucadomenico%2C%20vorrei%20contattarti%20per%20un%20progetto.";

const NAV_LINKS = ["Servizi", "Skills", "Collaborazioni"];

const CODE_LINES = [
  { text: "import { Developer } from './types';", delay: 500 },
  { text: "", delay: 1000 },
  { text: "const luca: Developer = {", delay: 1200 },
  { text: "  role: 'Full-Stack Developer',", delay: 1800, indent: 1 },
  { text: "  skills: ['React', 'Node.js', 'Tailwind'],", delay: 2500, indent: 1 },
  { text: "  status: 'Building cool things',", delay: 3200, indent: 1 },
  { text: "  coffeeCups: Infinity,", delay: 3800, indent: 1 },
  { text: "};", delay: 4500 },
  { text: "", delay: 4800 },
  { text: "export default luca;", delay: 5200 },
];

const STATS = [
  { num: 24, label: "Mesi di studio", suffix: "+" },
  { num: 3, label: "Aree di specializzazione", suffix: "" },
  { num: 14, label: "Tecnologie", suffix: "" },
];

const SERVICES = [
  {
    icon: Code2,
    number: "01",
    title: "Sviluppo Frontend",
    desc: "Interfacce pixel-perfect, accessibili e animate per dare valore immediato al tuo brand.",
  },
  {
    icon: Server,
    number: "02",
    title: "Logica Backend",
    desc: "Architetture solide, database e API RESTful che supportano il tuo prodotto senza frizioni.",
  },
  {
    icon: Gauge,
    number: "03",
    title: "Ottimizzazione",
    desc: "Performance, usabilità e velocità di caricamento pensate per migliorare esperienza e conversione.",
  },
];

const TOOLS = [
  "HTML",
  "Java",
  "C",
  "React",
  "JavaScript",
  "Flutter",
  "Node.js",
  "Tailwind CSS",
  "Figma",
  "Git",
  "SQL",
];

const TIMELINE_EVENTS = [
  {
    year: "2023",
    title: "Inizio Studi Universitari",
    desc: "Iscrizione a Informatica (L-31) per approfondire lo sviluppo software.",
  },
  {
    year: "2024",
    title: "Primi esperimenti pratici",
    desc: "Approfondimento su applicazioni web e strumenti moderni per lo sviluppo.",
  },
  {
    year: "Oggi",
    title: "Aspirante Programmatore",
    desc: "Studio, sviluppo e miglioro costantemente le mie competenze tecniche.",
  },
];

const COLLABORATION_OPTIONS = [
  {
    title: "Landing Page",
    desc: "Un sito professionale pensato per presentare il tuo brand, comunicare chiaramente e generare contatti reali.",
    badge: "Brand presence",
    whatsappText: "Ciao, vorrei discutere una Landing Page personalizzata.",
  },
  {
    title: "Web App",
    desc: "Soluzioni digitali più complesse, dove logica, UX e automazioni si uniscono in un prodotto completo.",
    badge: "Product build",
    whatsappText: "Ciao, vorrei parlare di una Web App su misura.",
  },
  {
    title: "Collaborazione su misura",
    desc: "Per progetti custom, obiettivi specifici e una soluzione progettata in base alle tue esigenze reali.",
    badge: "Custom work",
    whatsappText: "Ciao, vorrei iniziare una collaborazione su misura.",
  },
];

const FAQ_ITEMS = [
  {
    q: "Che tipo di progetti realizzi?",
    a: "Mi occupo soprattutto di siti web, landing page, interfacce moderne e applicazioni web con attenzione all'esperienza utente e alle performance.",
  },
  {
    q: "Lavori anche con piccoli progetti o startup?",
    a: "Sì, mi piace collaborare con chi ha una visione chiara ma ha bisogno di supporto tecnico e creativo per trasformarla in qualcosa di concreto.",
  },
  {
    q: "Come lavoriamo insieme?",
    a: "Inizio comprendendo l'obiettivo, poi struttura il prodotto, definisco la UX e sviluppo una soluzione pensata per essere chiara, veloce e facile da usare.",
  },
];

/* =============================================================================
   HOOKS PERSONALIZZATI
============================================================================= */

function usePointerGlow() {
  const ref = useRef(null);
  const frame = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateGlow = (event) => {
      cancelAnimationFrame(frame.current);
      const { clientX, clientY } = event;
      frame.current = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        element.style.setProperty("--pointer-x", `${clientX - rect.left}px`);
        element.style.setProperty("--pointer-y", `${clientY - rect.top}px`);
      });
    };

    element.addEventListener("pointermove", updateGlow, { passive: true });
    return () => {
      cancelAnimationFrame(frame.current);
      element.removeEventListener("pointermove", updateGlow);
    };
  }, []);

  return ref;
}

function useTypingEffect(text, speed = 30, delay = 0) {
  const [displayedText, setDisplayedText] = useState("");
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStart(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!start) return;
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayedText(text.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, speed);
    return () => clearInterval(typingInterval);
  }, [text, speed, start]);

  return displayedText;
}

function colorizeCode(code) {
  return code
    .replace(/[{}[\]]/g, '<span class="text-[#abb2bf]">$&</span>')
    .replace(/import|from|const|export|default/g, '<span class="text-[#c678dd]">$&</span>')
    .replace(/Developer/g, '<span class="text-[#e5c07b]">$&</span>')
    .replace(/'[^']*'/g, '<span class="text-[#98c379]">$&</span>')
    .replace(/Infinity/g, '<span class="text-[#d19a66]">$&</span>')
    .replace(/role:|skills:|status:|coffeeCups:/g, '<span class="text-[#e06c75]">$&</span>');
}

function GitHubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.27 3.44 9.76 8.2 11.34.6.11.82-.26.82-.58v-2.02c-3.34.72-4.04-1.42-4.04-1.42-.54-1.38-1.34-1.75-1.34-1.75-1.1-.75.08-.74.08-.74 1.22.09 1.87 1.25 1.87 1.25 1.08 1.85 2.81 1.31 3.5.99.11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.26-.12-.3-.54-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.3-1.55 3.3-1.23 3.3-1.23.66 1.65.24 2.87.12 3.17.77.85 1.23 1.94 1.23 3.26 0 4.63-2.8 5.65-5.48 5.95.43.38.81 1.1.81 2.22v3.3c0 .32.22.7.83.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.5A1.56 1.56 0 1 1 6.94 5.4a1.56 1.56 0 0 1 0 3.1ZM5.5 10.3h2.8v7.7H5.5v-7.7Zm4.7 0h2.68v1.05h.04c.37-.7 1.28-1.43 2.63-1.43 2.81 0 3.33 1.85 3.33 4.25V18h-2.8v-7.07c0-1.68-.03-3.84-2.33-3.84-2.34 0-2.7 1.83-2.7 3.72V18h-2.8v-7.7Z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12.04 2.08C6.53 2.08 2.11 6.39 2.11 11.8c0 1.82.49 3.58 1.42 5.13L2 22l5.27-1.5a9.58 9.58 0 0 0 4.78 1.3h.01c5.51 0 9.93-4.31 9.93-9.7s-4.4-9.72-9.99-9.72Zm5.68 13.53c-.24.67-1.39 1.27-1.92 1.35-.49.07-1.12.08-3.62-.77-3.07-1.05-5.05-3.7-5.2-3.87-.15-.17-1.25-1.67-1.25-3.18 0-1.52.8-2.27 1.09-2.58.29-.3.62-.38.82-.38h.59c.19 0 .45.01.71.54.29.6.99 2.1 1.08 2.24.09.15.15.33.03.53-.12.2-.18.33-.36.52-.18.19-.38.43-.54.59-.18.18-.37.38-.16.74.2.35 1.06 1.74 2.28 2.82 1.57 1.4 2.9 1.83 3.31 2.04.42.22.67.18.91-.11.25-.3.98-1.15 1.24-1.54.26-.4.53-.33.9-.2.38.13 2.4 1.13 2.82 1.34.42.21.7.31.82.49.12.18.12 1.04-.13 1.72Z" />
    </svg>
  );
}

/* =============================================================================
   COMPONENTI CORE E UI
============================================================================= */

function Loader({ onComplete }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[200] bg-[#050507] flex flex-col items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="font-code text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#8b5cf6] via-[#22d3ee] to-[#f472b6]"
      >
        {"<L/>"}
      </motion.div>
      <motion.div className="w-48 h-[2px] bg-[#1e1e26] mt-6 rounded-full overflow-hidden relative">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          onAnimationComplete={onComplete}
          className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee]"
        />
      </motion.div>
    </motion.div>
  );
}

/* =============================================================================
   APP PRINCIPALE
============================================================================= */

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {loading ? (
          <Loader key="loader" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen text-[#f5f5f7] antialiased selection:bg-[#8b5cf6]/30 relative overflow-x-hidden"
          >
            <div className="bg-noise" />
            <FloatingNav />
            <main>
              <Hero />
              <SocialProof />
              <Services />
              <Skills />
              <Timeline />
              <Collaborazioni />
              <FAQ />
              <CommentsSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

/* =============================================================================
   SEZIONI DELLA PAGINA
============================================================================= */

function FloatingNav() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 100], [0, -10]);
  const width = useTransform(scrollY, [0, 100], ["100%", "85%"]);
  const br = useTransform(scrollY, [0, 100], ["0px", "24px"]);
  const bg = useTransform(scrollY, [0, 100], ["rgba(5,5,7,0)", "rgba(13,13,19,0.7)"]);
  const border = useTransform(scrollY, [0, 100], ["rgba(30,30,38,0)", "rgba(30,30,38,1)"]);

  return (
    <motion.header
      style={{ y, width, borderRadius: br, backgroundColor: bg, borderColor: border }}
      className="fixed top-0 inset-x-0 mx-auto z-50 backdrop-blur-xl border-b transition-all duration-300 mt-0 sm:mt-4 max-w-6xl"
    >
      <div className="px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-code font-bold text-lg text-[#f5f5f7] group">
          <span className="text-[#8b5cf6] group-hover:text-[#22d3ee] transition-colors">{"<"}</span>
          L
          <span className="text-[#22d3ee] group-hover:text-[#f472b6] transition-colors">{"/>"}</span>
        </a>
        <nav className="hidden md:flex gap-8 text-sm text-[#8f8fa3]">
          {NAV_LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="hover:text-[#f5f5f7] transition-colors relative group">
              {l}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={EMAIL_URL}
            className="inline-flex relative overflow-hidden group bg-white/5 border border-white/10 px-5 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-all"
          >
            <span className="relative z-10 text-gradient group-hover:text-white transition-colors">Email</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex relative overflow-hidden group bg-white/5 border border-white/10 px-5 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-all"
          >
            <span className="relative z-10 text-gradient group-hover:text-white transition-colors">WhatsApp</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
          </a>
          <a
            href="#contatti"
            className="inline-flex relative overflow-hidden group bg-white/5 border border-white/10 px-5 py-2 rounded-full text-sm font-medium hover:bg-white/10 transition-all"
          >
            <span className="relative z-10 text-gradient group-hover:text-white transition-colors">Let's Talk</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee] opacity-0 group-hover:opacity-100 transition-opacity blur-lg" />
          </a>
        </div>
      </div>
    </motion.header>
  );
}

function Hero() {
  const glowRef = usePointerGlow();
  
  return (
    <section
      ref={glowRef}
      className="relative min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 flex items-center overflow-hidden hero-shell"
    >
      <div className="absolute inset-0 bg-grid opacity-30" />
      <motion.div
        className="hero-orb absolute top-1/4 -left-32 w-56 h-56 sm:w-96 sm:h-96 bg-[#8b5cf6] rounded-full mix-blend-screen filter blur-[120px] sm:blur-[150px] opacity-20 sm:opacity-30"
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="hero-orb absolute bottom-1/4 -right-32 w-56 h-56 sm:w-96 sm:h-96 bg-[#22d3ee] rounded-full mix-blend-screen filter blur-[120px] sm:blur-[150px] opacity-20 sm:opacity-30"
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="hero-orb absolute left-1/2 top-20 h-40 w-40 sm:h-64 sm:w-64 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hero-orb absolute right-[12%] top-[18%] h-20 w-20 sm:h-32 sm:w-32 rounded-full border border-[#22d3ee]/30 bg-[#22d3ee]/5 blur-3xl"
        animate={{ scale: [1.1, 1.3, 1.1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div
        className="pointer-glow pointer-events-none absolute inset-0 z-0 hidden md:block"
      />

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center w-full">
        <div>
          <motion.div
            initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-[#22d3ee] mb-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <Sparkles size={14} /> Frontend • UX • Web
            </span>
            <h1 className="hero-title font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight">
              Creo <span className="text-gradient">esperienze</span><br />
              digitali che<br />
              aiutano a crescere.
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-6 text-base sm:text-lg text-[#8f8fa3] max-w-lg leading-relaxed"
          >
            Sono Lucadomenico, un giovane sviluppatore che combina logica, design e cura dei dettagli per creare siti e applicazioni facili da usare, veloci e davvero efficaci.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <motion.a
              href="#contatti"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2 bg-[#f5f5f7] text-[#050507] px-6 py-3 rounded-xl font-medium shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
            >
              Contattami
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-[#8f8fa3]"
            >
              <span className="block h-px w-10 bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee]" />
              Scroll
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateY: -15, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          style={{ transformPerspective: 1000 }}
          className="float-slow relative rounded-xl border border-[#1e1e26] bg-[#09090b] shadow-2xl shadow-[#8b5cf6]/10 overflow-hidden hidden md:block"
        >
          <div className="flex items-center justify-between px-4 py-2 bg-[#18181b] border-b border-[#27272a]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ed6a5e]" />
              <div className="w-3 h-3 rounded-full bg-[#f4bf4f]" />
              <div className="w-3 h-3 rounded-full bg-[#61c554]" />
            </div>
            <div className="text-xs font-code text-[#a1a1aa]">App.tsx — Profile</div>
            <div className="w-10" />
          </div>
          
          <div className="flex h-[350px]">
            <div className="w-12 bg-[#18181b] border-r border-[#27272a] flex flex-col items-center py-4 gap-6 text-[#71717a]">
              <Files size={20} className="text-white" />
              <Search size={20} />
              <GitBranch size={20} />
            </div>
            
            <div className="flex-1 p-4 font-code text-sm leading-6 text-[#d4d4d8] overflow-hidden relative">
              <div className="absolute left-0 top-4 bottom-4 w-10 text-right pr-4 text-[#52525b] select-none space-y-0">
                {CODE_LINES.map((line, index) => <div key={`${line.delay}-number`}>{index + 1}</div>)}
              </div>
              <div className="pl-8">
                {CODE_LINES.map((line) => <CodeLine key={line.delay} {...line} />)}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CodeLine({ text, delay, indent = 0 }) {
  const typed = useTypingEffect(text, 40, delay);

  return (
    <div style={{ marginLeft: `${indent * 1.5}rem` }}>
      <span dangerouslySetInnerHTML={{ __html: colorizeCode(typed) }} />
      {typed === text ? "" : <span className="animate-pulse text-[#22d3ee]">|</span>}
    </div>
  );
}

function SocialProof() {
  return (
    <section className="py-16 border-y border-[#1e1e26] bg-[#050507]/50 backdrop-blur-xl relative z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="group text-center sm:text-left"
          >
            <div className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#f5f5f7] group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#8b5cf6] group-hover:to-[#22d3ee] transition-all">
              <Counter from={0} to={s.num} />{s.suffix}
            </div>
            <div className="mt-2 text-[10px] sm:text-sm text-[#8f8fa3] uppercase tracking-wider">{s.label}</div>
          </motion.div>
        ))}
        
        <div className="col-span-2 md:col-span-1 flex items-center overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
           <motion.div 
             animate={{ x: ["0%", "-50%"] }} 
             transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
             className="flex gap-8 whitespace-nowrap text-[#8f8fa3] font-code text-xs sm:text-sm"
           >
             <span>React</span><span>Tailwind</span><span>Node.js</span><span>Framer</span><span>Flutter</span>
             <span>React</span><span>Tailwind</span><span>Node.js</span><span>Framer</span><span>Flutter</span>
           </motion.div>
        </div>
      </div>
    </section>
  );
}

function Counter({ from, to }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(from);
  const rounded = useTransform(count, (value) => Math.floor(value));

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(count, to, {
      duration: 1.8,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [count, isInView, to]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}

function Services() {
  return (
    <section id="servizi" className="py-32 px-6 max-w-6xl mx-auto">
      <SectionHeader title="Expertise" subtitle="Servizi" />
      <p className="mt-6 max-w-2xl text-[#8f8fa3] text-base leading-relaxed">
        Mi occupo di trasformare idee, brand e obiettivi in esperienze digitali chiare, efficaci e facili da usare.
      </p>
      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {SERVICES.map((s, i) => (
          <TiltCard key={s.number} delay={i * 0.1}>
            <div className="group relative h-full overflow-hidden rounded-2xl border border-[#1e1e26] bg-[#0d0d13] p-8 transition-all duration-300 hover:border-[#8b5cf6]/60 hover:shadow-[0_18px_50px_rgba(108,92,231,0.15)] glass-panel hover-lift">
              <div className="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/12 via-transparent to-[#22d3ee]/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#22d3ee]/30 bg-[#22d3ee]/6 text-[#22d3ee]">
                    <s.icon size={24} />
                  </div>
                  <span className="font-code text-xs tracking-[0.25em] text-[#8f8fa3]">{s.number}</span>
                </div>
                <h3 className="mb-3 text-xl font-display font-semibold text-white">{s.title}</h3>
                <div className="mb-5 h-px w-12 bg-gradient-to-r from-[#8b5cf6] to-[#22d3ee]" />
                <p className="text-sm leading-relaxed text-[#8f8fa3]">{s.desc}</p>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}

function TiltCard({ children, delay }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [5, -5]));
  const rotateY = useSpring(useTransform(x, [-100, 100], [-5, 5]));

  function handleMouse(e) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-32 bg-[#050507] border-y border-[#1e1e26] relative overflow-hidden">
       <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <SectionHeader title="Tech Stack" subtitle="Tecnologie" center />
          <div className="mt-16 flex flex-wrap justify-center gap-4">
             {TOOLS.map((t, i) => (
                <motion.div
                  key={t}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="px-6 py-3 bg-[#0d0d13] border border-[#1e1e26] rounded-full text-sm font-code hover:border-[#22d3ee]/50 transition-all soft-glow"
                >
                  {t}
                </motion.div>
             ))}
          </div>
       </div>
    </section>
  );
}

function Timeline() {
  return (
    <section id="timeline" className="py-32 px-6 max-w-4xl mx-auto relative">
      <SectionHeader title="Il mio percorso" subtitle="Timeline" />
      <div className="mt-20 relative pl-8 border-l-2 border-[#1e1e26]">
         {TIMELINE_EVENTS.map((e, i) => (
           <motion.div 
             key={e.year}
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-100px" }}
             transition={{ duration: 0.5, delay: i * 0.1 }}
             className="mb-12 relative"
           >
             <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#050507] border-2 border-[#8b5cf6] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#22d3ee]" />
             </div>
             <div className="font-code text-[#8b5cf6] mb-1">{e.year}</div>
             <h3 className="text-xl font-display font-semibold mb-2">{e.title}</h3>
             <p className="text-[#8f8fa3] text-sm leading-relaxed">{e.desc}</p>
           </motion.div>
         ))}
      </div>
    </section>
  );
}

function Collaborazioni() {
  return (
    <section id="collaborazioni" className="py-32 px-6 max-w-6xl mx-auto">
      <SectionHeader title="Collaborazioni" subtitle="Approccio" center />
      <div className="mt-16 grid md:grid-cols-3 gap-6">
        {COLLABORATION_OPTIONS.map((item, i) => {
          const whatsappUrl = `https://wa.me/3314075188?text=${encodeURIComponent(item.whatsappText)}`;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative h-full overflow-hidden rounded-2xl border border-[#1e1e26] bg-[#0d0d13] p-8 transition-all duration-300 hover:border-[#22d3ee]/50 hover:shadow-[0_18px_50px_rgba(34,211,238,0.12)] glass-panel"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#22d3ee]/8 via-transparent to-[#8b5cf6]/8 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative z-10 flex h-full flex-col">
                <span className="inline-flex rounded-full border border-[#22d3ee]/30 bg-[#22d3ee]/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[#22d3ee]">{item.badge}</span>
                <h3 className="mt-6 text-xl font-display font-semibold text-white">{item.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-[#8f8fa3]">{item.desc}</p>
                <div className="mt-8 pt-6 border-t border-[#1e1e26]">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#050507] transition-transform hover:scale-[1.02]"
                  >
                    Parliamone
                  </a>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="py-32 px-6 max-w-3xl mx-auto border-t border-[#1e1e26]">
      <SectionHeader title="Domande Frequenti" subtitle="FAQ" center />
      <div className="mt-12 space-y-4">
        {FAQ_ITEMS.map((qa) => (
          <FAQItem key={qa.q} question={qa.q} answer={qa.a} />
        ))}
      </div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="border border-[#1e1e26] bg-[#0d0d13] rounded-xl overflow-hidden glass-panel">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-medium text-white">{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }}><ChevronDown size={20} className="text-[#8f8fa3]"/></motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            <p className="px-6 pb-6 text-sm text-[#8f8fa3]">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CommentsSection() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const feedbackTimer = useRef(null);

  useEffect(() => () => clearTimeout(feedbackTimer.current), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    clearTimeout(feedbackTimer.current);
    setSubmitted(true);
    setName("");
    setComment("");
    feedbackTimer.current = setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <section className="py-12 px-6 max-w-4xl mx-auto">
      <div className="rounded-3xl border border-[#1e1e26] bg-[#0d0d13] p-6 sm:p-8 shadow-[0_20px_50px_rgba(139,92,246,0.08)]">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.3em] text-[#22d3ee] font-code">Feedback</p>
          <h3 className="mt-3 text-3xl font-display font-semibold text-white">Lascia un commento</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-2 block text-sm text-[#c4c4d2]">Nome</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Il tuo nome"
              className="w-full rounded-xl border border-[#1e1e26] bg-[#050507] px-4 py-3 text-white placeholder:text-[#71717a] outline-none transition focus:border-[#8b5cf6]/60"
            />
          </div>

          <div>
            <label htmlFor="comment" className="mb-2 block text-sm text-[#c4c4d2]">Commento</label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Scrivi il tuo feedback, un pensiero o una richiesta..."
              rows="5"
              required
              className="w-full rounded-xl border border-[#1e1e26] bg-[#050507] px-4 py-3 text-white placeholder:text-[#71717a] outline-none transition focus:border-[#22d3ee]/60 resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#050507] transition hover:scale-[1.02]"
            >
              Invia commento
            </button>

            {submitted && (
              <span role="status" className="text-sm text-[#22d3ee]">Commento inviato.</span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contatti" className="pt-32 pb-10 border-t border-[#1e1e26] bg-[#050507] relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-[#8b5cf6]/10 to-transparent pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight">
          Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22d3ee] to-[#f472b6]">amazing.</span>
        </h2>
        <p className="text-[#8f8fa3] mb-10 max-w-xl mx-auto">
          Hai un'idea, un brand da far crescere o un problema da trasformare in prodotto? Parlami di quello che vuoi costruire.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          <a href={EMAIL_URL} className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_15px_30px_rgba(255,255,255,0.15)]">
            <Mail size={20} /> Email
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition-transform shadow-[0_15px_30px_rgba(37,211,102,0.25)]">
            <WhatsAppIcon className="w-5 h-5" /> WhatsApp
          </a>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-[#1e1e26] text-sm text-[#8f8fa3]">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
             <span className="text-[#8b5cf6] font-bold font-code">{"<L/>"}</span> © {new Date().getFullYear()} Lucadomenico
          </div>
          <div className="flex gap-3">
            <a href="https://github.com/lucadomenico1" target="_blank" rel="noreferrer" aria-label="GitHub" className="w-10 h-10 rounded-full border border-[#1e1e26] bg-[#0d0d13] hover:border-[#22d3ee]/50 hover:text-white transition-colors flex items-center justify-center">
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/lucadomenico-chiappetta/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full border border-[#1e1e26] bg-[#0d0d13] hover:border-[#8b5cf6]/50 hover:text-white transition-colors flex items-center justify-center">
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a href="https://instagram.com/_.lucad__" target="_blank" rel="noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-[#1e1e26] bg-[#0d0d13] hover:border-[#f472b6]/50 hover:text-white transition-colors flex items-center justify-center">
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="w-10 h-10 rounded-full border border-[#1e1e26] bg-[#0d0d13] hover:border-[#25D366]/50 hover:text-white transition-colors flex items-center justify-center">
              <WhatsAppIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SectionHeader({ title, subtitle, center = false }) {
  return (
    <div className={center ? "text-center" : ""}>
      <motion.div 
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="font-code text-sm text-[#22d3ee] mb-3 uppercase tracking-widest"
      >
        // {subtitle}
      </motion.div>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight"
      >
        {title}
      </motion.h2>
    </div>
  );
}