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
    <section className="py-10 md:py-10 relative overflow-hidden">
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

          <div className="max-w-5xl mx-auto mb-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mb-16">
              {/* Photo Column */}
              <div className="col-span-1 md:col-span-5 flex justify-center order-1 md:order-1">
                <div className="relative group w-full max-w-[260px] sm:max-w-[290px] md:max-w-full">
                  {/* Subtle ambient glow behind image */}
                  <div className="absolute -inset-4 bg-gradient-primary rounded-3xl opacity-15 blur-2xl group-hover:opacity-30 transition-opacity duration-500" />
                  <div className="relative aspect-square rounded-3xl bg-secondary/30 overflow-hidden border border-border/50 backdrop-blur-sm shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
                    <img
                      src="/Mani.jpg"
                      alt="Manideep Bethi"
                      className="relative z-10 w-full h-full object-cover rounded-2xl transform group-hover:scale-103 transition-transform duration-700"
                    />
                    {/* Decorative corner highlights */}
                    <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-primary/30 rounded-tl-xl z-20" />
                    <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-accent/30 rounded-br-xl z-20" />
                  </div>
                </div>
              </div>

              {/* Bio Text Column */}
              <div className="col-span-1 md:col-span-7 space-y-6 text-center md:text-left order-2 md:order-2">
                <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed">
                  As a <span className="text-foreground font-semibold">Software Engineer</span> at Reva Solutions, I specialize in building
                  full-stack applications with modern technologies including React, Next.js, Node.js, and AI/LLM frameworks.
                  My expertise spans frontend development, backend engineering, cloud solutions, and AI-powered applications.
                </p>
                <p className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed">
                  I have hands-on experience with GIS solutions, SharePoint integrations, document management systems,
                  and AI-powered document processing. I'm passionate about solving complex technical challenges and
                  delivering scalable, secure solutions that create real business value.
                </p>
              </div>
            </div>

            {/* Stats Block underneath */}
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
