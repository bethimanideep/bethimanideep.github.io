import { Code2, Palette, Rocket } from "lucide-react";

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
    description: "Optimizing for speed",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-gradient-subtle opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image/Visual Side */}
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-secondary overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-gradient-primary opacity-20 blur-2xl" />
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* <span className="font-display text-8xl text-primary/30">MB</span> */}

                  <img
                    src="https://lh3.googleusercontent.com/d/1nm39eC6WZJAWDFEVdsTGEbyhUp83l9o9"
                    alt="My photo"
                    className="w-full h-full object-cover rounded-2xl"
                  />

                </div>
              </div>


            </div>

            {/* Content Side */}
            <div>
              <p className="text-primary font-body tracking-widest uppercase text-sm mb-4">
                About Me
              </p>
              <h2 className="font-display text-4xl md:text-4xl font-semibold mb-6">

                <span className="text-gradient block">Transform Ideas Into Reality</span>
              </h2>

              <div className="space-y-4 text-muted-foreground font-body leading-relaxed mb-8">
                <p>
                  As a Software Engineer at Reva Solutions, I specialize in building
                  full-stack applications with modern technologies including React, Next.js, Node.js, and AI/LLM frameworks.
                  My expertise spans frontend development, backend engineering, cloud solutions, and AI-powered applications.
                </p>
                <p>
                  I have hands-on experience with GIS solutions, SharePoint integrations, document management systems,
                  and AI-powered document processing. I'm passionate about solving complex technical challenges and
                  delivering scalable, secure solutions that create real business value.
                </p>
              </div>

              {/* Highlights */}
              <div className="grid gap-6">
                {highlights.map((item, index) => (
                  <div
                    key={item.title}
                    className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-medium text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
