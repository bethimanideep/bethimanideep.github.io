import { Code, Database, Cloud, Brain, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    icon: Code,
    title: "Frontend",
    color: "from-blue-500/20 to-cyan-500/20",
    borderColor: "border-blue-500/30",
    skills: [
      { name: "React", level: 95 },
      { name: "HTML/CSS", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 90 },
    ],
  },
  {
    icon: Database,
    title: "Backend",
    color: "from-purple-500/20 to-pink-500/20",
    borderColor: "border-purple-500/30",
    skills: [
      { name: "Node.js", level: 92 },
      { name: "Express.js", level: 90 },
      { name: "Python", level: 85 },
      { name: "Flask/Django", level: 82 },
    ],
  },
  {
    icon: Cloud,
    title: "Databases & Cloud",
    color: "from-emerald-500/20 to-teal-500/20",
    borderColor: "border-emerald-500/30",
    skills: [
      { name: "MongoDB", level: 90 },
      { name: "MySQL", level: 88 },
      { name: "Azure/AWS", level: 85 },
      { name: "Firebase", level: 82 },
    ],
  },
  {
    icon: Brain,
    title: "AI/LLM & Tools",
    color: "from-orange-500/20 to-red-500/20",
    borderColor: "border-orange-500/30",
    skills: [
      { name: "LangChain", level: 88 },
      { name: "Vector DB (Weaviate)", level: 85 },
      { name: "Docker", level: 85 },
      { name: "Git", level: 95 },
    ],
  },
];

function SkillBar({ skill, delay }: { skill: { name: string; level: number }; delay: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, []);

  return (
    <div ref={barRef} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-body text-sm font-medium text-foreground">
          {skill.name}
        </span>
        <span className="font-body text-sm font-semibold text-primary">
          {skill.level}%
        </span>
      </div>
      <div className="relative h-2.5 bg-secondary rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 bg-gradient-primary rounded-full transition-all duration-1000 ease-out ${
            isVisible ? "w-full" : "w-0"
          }`}
          style={{
            width: isVisible ? `${skill.level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        >
          <div className="absolute inset-0 bg-white/20 animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-card/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles size={14} className="text-primary" />
              <p className="text-primary font-body tracking-widest uppercase text-sm font-medium">
                My Expertise
              </p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">Skills & Technologies</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-lg">
              A comprehensive toolkit built through years of hands-on experience 
              with modern web technologies
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className="group relative p-6 rounded-2xl bg-card/50 border border-border hover:border-primary/50 transition-all duration-500 hover-lift overflow-hidden"
              >
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 ${category.borderColor} rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                      <category.icon size={24} />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground">
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <SkillBar
                        key={skill.name}
                        skill={skill}
                        delay={(categoryIndex * 4 + skillIndex) * 100}
                      />
                    ))}
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
