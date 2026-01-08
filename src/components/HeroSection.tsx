import { ArrowDown, Github, Linkedin, Twitter, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

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

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      
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
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-primary/20 mb-8 animate-fade-up opacity-0" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            <Sparkles size={14} className="text-primary" />
            <p className="text-primary font-body tracking-widest uppercase text-xs font-medium">
              Welcome to my portfolio
            </p>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-up opacity-0 leading-tight" style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}>
            ✨<RollingText text={" I'm Manideep"} className="text-gradient" />
          </h1>
          
          <div className="relative inline-block mb-4">
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-body font-light mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}>
              A passionate <span className="text-foreground font-medium relative">
                Full-Stack Developer
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-primary opacity-60" />
              </span>{" "}
              specializing in modern web technologies and AI-powered solutions
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-fade-up opacity-0" style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}>
            <Button variant="hero" size="xl" asChild className="group relative overflow-hidden">
              <a href="#projects">
                <span className="relative z-10">View My Work</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild className="group">
              <a href="#contact" className="relative z-10">
                Get in Touch
              </a>
            </Button>
          </div>
          
          {/* Enhanced Social Links */}
          <div className="flex justify-center gap-4 animate-fade-up opacity-0" style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}>
            {[
              { icon: Github, href: "https://github.com/bethimanideep", label: "GitHub" },
              { icon: Linkedin, href: "https://in.linkedin.com/in/manideepbethi", label: "LinkedIn" },
              { icon: Twitter, href: "#", label: "Twitter" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-4 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/20"
                aria-label={label}
              >
                <Icon size={20} className="relative z-10" />
                <span className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300" />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
      >
        <span className="text-xs font-body tracking-wider uppercase opacity-70 group-hover:opacity-100 transition-opacity">
          Scroll
        </span>
        <div className="relative">
          <ArrowDown size={24} className="animate-float" />
          <div className="absolute inset-0 animate-ping opacity-20">
            <ArrowDown size={24} />
          </div>
        </div>
      </a>
    </section>
  );
}
