import { Mail, Github, Linkedin, FileText, ArrowUpRight, Twitter } from "lucide-react";

const connectOptions = [
  {
    icon: Mail,
    label: "Email",
    href: "mailto:bethimanideep@gmail.com",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/manideepbethi/",
  },
  {
    icon: Github,
    label: "GitHub",
    href: "https://github.com/bethimanideep",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    href: "https://x.com/ManideepBethi",
  },
  {
    icon: FileText,
    label: "Resume",
    href: "https://drive.google.com/file/d/1N6ymRfrGlAjYNSuUumhj6nBNBBXsSj17/view?usp=sharing",
  },
];

export function ContactSection() {
  return (
    <section className="pt-16 pb-32 md:pt-20 md:pb-40 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-card/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <p className="text-primary font-body tracking-widest uppercase text-xs md:text-sm font-medium">
                Get in Touch
              </p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">Let's Connect</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto text-base md:text-lg">
              Open for new opportunities, technical discussions, and project collaborations.
            </p>
          </div>

          {/* Strict Single Horizontal Line Container */}
          <div className="w-full overflow-x-auto pb-4 pt-1 flex items-center justify-start md:justify-center flex-nowrap gap-2.5 sm:gap-3.5 no-scrollbar">
            {connectOptions.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-card/60 border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 shadow-sm"
                >
                  <div className="p-1 sm:p-1.5 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <Icon size={15} />
                  </div>
                  <span className="text-xs sm:text-sm font-body font-semibold text-foreground group-hover:text-primary transition-colors whitespace-nowrap">
                    {item.label}
                  </span>
                  <ArrowUpRight size={13} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
