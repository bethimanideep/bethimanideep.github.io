import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, User, Zap, Layers, Mail, FileText } from "lucide-react";

/* ─── Sections ─── */
const SECTIONS = [
  { id: "hero",     label: "Home",     Icon: Home   },
  { id: "about",    label: "About",    Icon: User   },
  { id: "skills",   label: "Skills",   Icon: Zap    },
  { id: "projects", label: "Projects", Icon: Layers },
  { id: "contact",  label: "Contact",  Icon: Mail   },
];

/* ─── Active section hook ─── */
export function useActiveSection() {
  const [active, setActive] = useState("hero");
  const ref = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const ratios: Record<string, number> = {};
    ref.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { ratios[e.target.id] = e.intersectionRatio; });
        const top = Object.entries(ratios).sort((a, b) => b[1] - a[1])[0];
        if (top?.[1] > 0) setActive(top[0]);
      },
      { threshold: Array.from({ length: 21 }, (_, i) => i * 0.05) },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) ref.current?.observe(el);
    });
    return () => ref.current?.disconnect();
  }, []);

  return active;
}

const scrollTo = (id: string) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/* ─── Bottom Nav ─── */
export function BottomNav() {
  const active = useActiveSection();
  const [mounted, setMounted] = useState(false);
  const [prevActive, setPrevActive] = useState(active);
  const [switchKey, setSwitchKey] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(t);
  }, []);

  // Track tab switches for burst animation
  useEffect(() => {
    if (active !== prevActive) {
      setSwitchKey((k) => k + 1);
      setPrevActive(active);
    }
  }, [active, prevActive]);

  return (
    <motion.div
      className="bottom-nav-wrapper"
      initial={{ y: 80, opacity: 0, scale: 0.92 }}
      animate={
        mounted
          ? { y: 0, opacity: 1, scale: 1 }
          : { y: 80, opacity: 0, scale: 0.92 }
      }
      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <nav aria-label="Navigation" className="bottom-nav-glass">
        {/* Logo icon — first item, scrolls to top */}
        <motion.button
          onClick={() => document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })}
          aria-label="Go to top"
          className="bottom-nav-btn"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: mounted ? 0 : 0.1, duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.85, y: 0 }}
        >
          <div className="w-7 h-7 rounded-lg bg-gradient-primary/20 border border-primary/40 overflow-hidden flex items-center justify-center group-hover:border-primary/80 transition-all duration-300">
            <img src="/favicon.ico" alt="Logo" className="w-5 h-5 object-contain" />
          </div>
        </motion.button>

        {/* Divider */}
        <span className="h-5 w-px bg-border/60 rounded-full self-center mx-1" />

        {SECTIONS.map((sec, i) => {

          const isActive = active === sec.id;
          const { Icon } = sec;

          return (
            <motion.button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              aria-label={`Go to ${sec.label}`}
              aria-current={isActive ? "page" : undefined}
              className="bottom-nav-btn"
              data-active={isActive || undefined}
              /* Staggered pop-in */
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: mounted ? 0 : 0.15 + i * 0.06,
                duration: 0.45,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.85, y: 0 }}
            >
              {/* Active glow backdrop */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    key={`glow-${switchKey}`}
                    className="bottom-nav-active-bg"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 320,
                      damping: 24,
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Icon with spring pop on active */}
              <motion.span
                className="bottom-nav-icon"
                animate={{
                  color: isActive
                    ? "hsl(var(--primary-foreground))"
                    : "hsl(var(--muted-foreground))",
                }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  key={`icon-${isActive ? "on" : "off"}-${sec.id}`}
                  initial={isActive ? { scale: 0.4, rotateZ: -20 } : false}
                  animate={{ scale: 1, rotateZ: 0 }}
                  transition={
                    isActive
                      ? { type: "spring", stiffness: 500, damping: 15 }
                      : { duration: 0.2 }
                  }
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <Icon size={19} strokeWidth={isActive ? 2.3 : 1.7} />
                </motion.span>
              </motion.span>

              {/* Bottom indicator line */}
              {isActive && (
                <motion.span
                  className="bottom-nav-indicator"
                  layoutId="nav-indicator"
                  transition={{
                    type: "spring",
                    stiffness: 440,
                    damping: 30,
                  }}
                />
              )}
            </motion.button>
          );
        })}

        {/* Resume link — last item */}
        <motion.a
          href="https://drive.google.com/file/d/1N6ymRfrGlAjYNSuUumhj6nBNBBXsSj17/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Resume"
          className="bottom-nav-btn"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: mounted ? 0 : 0.15 + SECTIONS.length * 0.06,
            duration: 0.45,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.85, y: 0 }}
        >
          <motion.span
            className="bottom-nav-icon"
            style={{ color: "hsl(var(--muted-foreground))" }}
            whileHover={{ color: "hsl(var(--primary))" }}
            transition={{ duration: 0.2 }}
          >
            <FileText size={19} strokeWidth={1.7} />
          </motion.span>
        </motion.a>
      </nav>
    </motion.div>
  );
}
