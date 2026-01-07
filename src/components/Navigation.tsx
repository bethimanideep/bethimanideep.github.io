import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Scroll listener (optimized)
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll on mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/60 shadow-sm"
            : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="#"
              className="group font-display text-2xl font-bold tracking-tight text-foreground hover:text-primary transition-colors relative"
            >
              <span className="relative z-10">Portfolio</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300" />
            </a>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="group relative text-muted-foreground hover:text-foreground transition-colors text-sm tracking-wide font-medium"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                </a>
              ))}

              <ThemeToggle />

              <Button variant="hero" size="sm" asChild>
                <a
                  href="https://drive.google.com/file/d/1ogtYmgHvA5KvqM93sEZGLnqG3D6i301V/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </Button>
            </div>

            {/* Mobile Icon Toggle */}
            <div className="flex items-center gap-4 md:hidden">
              <ThemeToggle />

              <button
                aria-label="Toggle Navigation Menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-background/60 hover:bg-accent transition-all focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="absolute inset-0 grid place-items-center transition-all duration-300">
                  {isMobileMenuOpen ? (
                    <X size={22} className="transition-all scale-100" />
                  ) : (
                    <Menu size={22} className="transition-all scale-100" />
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          <div
            className={`md:hidden absolute left-0 right-0 top-16 z-50 border-t border-border bg-background shadow-xl transition-all duration-300 ${
              isMobileMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-5 pointer-events-none"
            }`}
          >
            <div className="container mx-auto px-6 py-5 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground bg-muted/40 hover:bg-primary/10 border border-transparent hover:border-primary/20 px-4 py-3 rounded-xl text-sm tracking-wide font-medium text-center transition-all"
                >
                  {link.name}
                </a>
              ))}

              <Button
                variant="hero"
                size="sm"
                className="w-full rounded-xl font-semibold mt-3"
                asChild
              >
                <a
                  href="https://drive.google.com/file/d/1ogtYmgHvA5KvqM93sEZGLnqG3D6i301V/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Resume
                </a>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
