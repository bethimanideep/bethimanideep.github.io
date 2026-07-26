import { Code, Database, Cloud, Brain, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const skillCategories = [
  {
    icon: Code,
    title: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "HTML/CSS", level: 95 },
      { name: "Angular", level: 85 },
    ],
  },
  {
    icon: Database,
    title: "Backend",
    skills: [
      { name: "Node.js", level: 92 },
      { name: "Express.js / Nest.js", level: 90 },
      { name: "Python (Flask/Django)", level: 85 },
      { name: "C# / ASP.NET", level: 82 },
      { name: "WebSockets & APIs", level: 90 },
    ],
  },
  {
    icon: Cloud,
    title: "Databases & Cloud",
    skills: [
      { name: "MongoDB & PostgreSQL", level: 90 },
      { name: "MySQL & MariaDB", level: 88 },
      { name: "Prisma & Mongoose", level: 90 },
      { name: "Azure / AWS / GCP", level: 85 },
      { name: "Docker & GitHub Actions", level: 88 },
    ],
  },
  {
    icon: Brain,
    title: "AI/LLM & Tools",
    skills: [
      { name: "LangChain & CrewAI", level: 88 },
      { name: "Pinecone & Weaviate", level: 85 },
      { name: "Git & Linux", level: 95 },
      { name: "OpenText & SharePoint", level: 85 },
    ],
  },
];

/* ─── Extended tool ticker ─── */
const tickerTools = [
  "Linux", "Redis", "GraphQL", "Figma", "Jest", "Playwright",
  "Postman", "Swagger", "Nginx", "Webpack", "Vite", "Tailwind CSS",
  "SASS", "JWT", "OAuth 2.0", "REST APIs", "Jira", "GitHub Actions",
  "CI/CD", "Serverless", "Microservices", "WebSockets", "Cron Jobs",
  "Excel.JS", "PDF Generation", "Nodemailer", "Axios", "Zustand",
  "Redux", "React Query", "Framer Motion", "SPFx", "ArcGIS",
  "Box Cloud", "AWS Lambda", "Webhooks", "Quidlo APIs", "Prisma ORM",
];

function SkillBar({ skill, delay }: { skill: { name: string; level: number }; delay: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (barRef.current) observer.observe(barRef.current);
    return () => { if (barRef.current) observer.unobserve(barRef.current); };
  }, []);

  return (
    <div ref={barRef} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-body text-sm font-medium text-foreground">{skill.name}</span>
        <span className="font-body text-sm font-semibold text-cyan-400">{skill.level}%</span>
      </div>
      <div className="relative h-2.5 bg-secondary rounded-full overflow-hidden">
        <div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out`}
          style={{
            width: isVisible ? `${skill.level}%` : "0%",
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
    </div>
  );
}

export function SkillsSection() {
  /* Duplicate ticker items for seamless infinite loop */
  const allTools = [...tickerTools, ...tickerTools];

  return (
    <section className="py-10 md:py-10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute  bg-card/20" />
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
                className="relative p-6 rounded-2xl bg-card/50 border border-border overflow-hidden"
              >
                <div className="relative z-10">
                  {/* Category Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
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

          {/* ─── Infinite Scrolling Tech Ticker ─── */}
          <div className="mt-14">
            <p className="text-center text-xs font-body uppercase tracking-widest text-muted-foreground mb-5 font-medium">
              Also proficient in
            </p>

            <div className="relative marquee-container">
              {/* Fade edge masks */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-background to-transparent" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-background to-transparent" />

              <div className="overflow-hidden">
                <div className="animate-marquee flex gap-3 w-max">
                  {allTools.map((tool, i) => (
                    <span
                      key={`${tool}-${i}`}
                      className="shrink-0 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-card/60 border border-border/60 text-xs font-body font-semibold text-muted-foreground whitespace-nowrap"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 shrink-0" />
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
