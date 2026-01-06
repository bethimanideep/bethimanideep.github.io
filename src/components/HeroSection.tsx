import { ArrowDown, Github, Linkedin, Twitter } from "lucide-react";
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

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/8 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/6 rounded-full blur-3xl animate-pulse-glow animation-delay-400" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-primary font-body tracking-widest uppercase text-sm mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            Welcome to my portfolio
          </p>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold mb-6 animate-fade-up opacity-0" style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}>
            <RollingText text={"I'm Manideep"} className="text-gradient" />
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground font-body font-light mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-up opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
            A passionate <span className="text-foreground">Full-Stack Developer</span> specializing in modern web technologies and AI-powered solutions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-up opacity-0" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
            <Button variant="hero" size="xl" asChild>
              <a href="#projects">View My Work</a>
            </Button>
            <Button variant="heroOutline" size="xl" asChild>
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6 animate-fade-up opacity-0" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
            {[
              { icon: Github, href: "https://bethimanideep.github.io/", label: "GitHub" },
              { icon: Linkedin, href: "https://in.linkedin.com/in/manideepbethi", label: "LinkedIn" },
              { icon: Twitter, href: "#", label: "Twitter" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                className="p-3 rounded-full border border-border text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110"
                aria-label={label}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-float"
      >
        <ArrowDown size={24} />
      </a>
    </section>
  );
}
