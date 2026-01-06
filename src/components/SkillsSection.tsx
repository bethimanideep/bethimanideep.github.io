const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "HTML/CSS", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 90 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 92 },
      { name: "Express.js", level: 90 },
      { name: "Python", level: 85 },
      { name: "Flask/Django", level: 82 },
    ],
  },
  {
    title: "Databases & Cloud",
    skills: [
      { name: "MongoDB", level: 90 },
      { name: "MySQL", level: 88 },
      { name: "Azure/AWS", level: 85 },
      { name: "Firebase", level: 82 },
    ],
  },
  {
    title: "AI/LLM & Tools",
    skills: [
      { name: "LangChain", level: 88 },
      { name: "Vector DB (Weaviate)", level: 85 },
      { name: "Docker", level: 85 },
      { name: "Git", level: 95 },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary font-body tracking-widest uppercase text-sm mb-4">
              My Expertise
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
               <span className="text-gradient">Skills & Technologies</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">
              A comprehensive toolkit built through years of hands-on experience 
              with modern web technologies
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className="p-6 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
              >
                <h3 className="font-display text-xl font-semibold mb-6 text-foreground">
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="font-body text-sm text-foreground">
                          {skill.name}
                        </span>
                        <span className="font-body text-sm text-primary">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: `${skill.level}%`,
                            animationDelay: `${(categoryIndex * 4 + skillIndex) * 100}ms`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
