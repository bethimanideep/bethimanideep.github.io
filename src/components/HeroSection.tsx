import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function RollingText({ text, className }: { text: string; className?: string }) {
  const chars = text.split("");
  return (
    <span className="inline-flex items-center">
      {chars.map((ch, i) => (
        <span key={i} className="rolling-char">
          <span
            className={`char-inner ${className ?? ""}`}
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        </span>
      ))}
    </span>
  );
}

// Floating particles component
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-primary/20 blur-sm"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-particle ${15 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [rollKey, setRollKey] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Replay rolling animation every 2 seconds
  useEffect(() => {
    const id = setInterval(() => setRollKey((k) => k + 1), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="min-h-[85vh] flex items-center justify-center relative overflow-hidden py-12">
      {/* Enhanced Background Elements - Made transparent to show StarField */}
      <div className="absolute inset-0 bg-transparent" />


      {/* Animated gradient orbs that follow mouse */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow transition-all duration-1000 ease-out"
        style={{
          transform: `translate(${(mousePosition.x - 25) * 0.1}px, ${(mousePosition.y - 25) * 0.1}px)`,
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/8 rounded-full blur-3xl animate-pulse-glow animation-delay-400 transition-all duration-1000 ease-out"
        style={{
          transform: `translate(${(mousePosition.x - 75) * -0.1}px, ${(mousePosition.y - 75) * -0.1}px)`,
        }}
      />
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-glow animation-delay-600" />

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30" />

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl mx-auto">
          {/* Name Header */}
          <h1
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-6 animate-fade-up opacity-0 leading-tight"
            style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}
          >
            <RollingText key={rollKey} text="I'm Manideep" className="text-gradient" />
          </h1>

          {/* Subtitle with Custom Floating and Shining Underline */}
          <div
            className="animate-fade-up opacity-0 mt-8 flex justify-center"
            style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
          >
            <div className="relative inline-block pb-4 group">
              {/* Text: Vivid Violet → Fuchsia → Rose */}
              <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-rose-400">
                Full Stack Developer
              </p>

              {/* Floating Underline Element */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[3px] sm:h-[4px] rounded-full overflow-hidden"
                style={{
                  background: "linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(190 100% 45%) 100%)",
                  boxShadow: "0 0 12px 1px hsl(var(--primary) / 0.4)",
                }}
                animate={{
                  y: [-2, 2, -2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* Shining Shimmer Effect sliding across the line */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                  style={{ width: "30%" }}
                  animate={{
                    left: ["-30%", "110%"],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2.2,
                    ease: "easeInOut",
                    repeatDelay: 0.8,
                  }}
                />
              </motion.div>
            </div>
          </div>



          {/* Bio blurb */}
          <motion.p
            className="hero-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            I turn complex ideas into polished digital products — from pixel-perfect UIs
            to robust APIs. Passionate about performance, clean code, and delightful
            user experiences.
          </motion.p>

          {/* Skill badges */}
          <motion.div
            className="hero-badges"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { label: "⚡ Clean Code", color: "badge-cyan" },
              { label: "🧩 Problem Solver", color: "badge-blue" },
              { label: "🤝 Team Player", color: "badge-green" },
              { label: "🚀 Fast Learner", color: "badge-yellow" },
              { label: "🎯 Detail-Oriented", color: "badge-purple" },
              { label: "🌐 Open Source", color: "badge-teal" },
            ].map(({ label, color }) => (
              <span key={label} className={`hero-badge ${color}`}>{label}</span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="hero-cta-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.28, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              className="hero-btn-primary"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View My Work
            </button>
            <button
              className="hero-btn-ghost"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Let's Connect
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
