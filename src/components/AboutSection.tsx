import { Code2, Palette, Rocket, Award, Users, Briefcase } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable code with best practices",
  },
  {
    icon: Palette,
    title: "Creative Design",
    description: "Crafting intuitive and visually stunning interfaces",
  },
  {
    icon: Rocket,
    title: "Performance",
    description: "Optimizing for speed and efficiency",
  },
];

const stats = [
  { icon: Briefcase, value: "2", label: "Years Experience" },
  { icon: Award, value: "10+", label: "Projects Completed" },
  { icon: Users, value: "100%", label: "Client Satisfaction" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-10 md:py-10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary font-body tracking-widest uppercase text-sm mb-4 inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              About Me
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 mt-4">
              <span className="text-gradient">Transform Ideas Into Reality</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-lg">
              Crafting digital experiences that make a difference
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-20">
            <div className="space-y-12">
              <div className="space-y-6 text-muted-foreground font-body leading-relaxed text-center">
                <p className="text-xl">
                  As a <span className="text-foreground font-semibold">Software Engineer</span> at Reva Solutions, I specialize in building
                  full-stack applications with modern technologies including React, Next.js, Node.js, and AI/LLM frameworks.
                  My expertise spans frontend development, backend engineering, cloud solutions, and AI-powered applications.
                </p>
                <p className="text-xl">
                  I have hands-on experience with GIS solutions, SharePoint integrations, document management systems,
                  and AI-powered document processing. I'm passionate about solving complex technical challenges and
                  delivering scalable, secure solutions that create real business value.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className="text-center p-8 rounded-2xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300 hover-lift group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex justify-center mb-4">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <stat.icon size={24} />
                      </div>
                    </div>
                    <div className="font-display text-3xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground font-body uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights */}
          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="group relative p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/50 transition-all duration-500 hover-lift overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                
                <div className="relative z-10 flex flex-col items-start gap-4">
                  <div className="p-4 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
