import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 border-t border-border bg-card/30">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Brand Section */}
            <div className="space-y-4">
              <a
                href="#"
                className="inline-block font-display text-2xl font-bold text-foreground hover:text-primary transition-colors"
              >
                Manideep Bethi
              </a>
              <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xs">
                Full-Stack Developer passionate about creating exceptional digital experiences and AI-powered solutions.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Quick Links</h3>
              <div className="flex flex-col gap-3">
                {["About", "Skills", "Projects", "Contact"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors font-body w-fit group"
                  >
                    <span className="relative">
                      {link}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-semibold text-foreground mb-4">Connect</h3>
              <div className="flex items-center gap-3">
                {[
                  { icon: Github, href: "https://github.com/bethimanideep", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/manideepbethi/", label: "LinkedIn" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
                    aria-label={label}
                  >
                    <Icon size={20} />
                    <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground font-body flex items-center gap-2">
                © {currentYear} Made with <Heart size={14} className="text-primary animate-pulse" /> by Manideep Bethi. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground font-body">
                Built with React, TypeScript & Tailwind CSS
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
