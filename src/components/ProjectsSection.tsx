import { ExternalLink, Github, ShoppingCart, FileUp, Bot, Clock, MapPin, Eye } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";

/* ─── Tag Color Palette (Olentra-style deterministic) ─── */
const TAG_PALETTE = [
  "bg-blue-500/10 border-blue-400/30 text-blue-300 group-hover:border-blue-400/55 group-hover:text-blue-200",
  "bg-indigo-500/10 border-indigo-400/30 text-indigo-300 group-hover:border-indigo-400/55 group-hover:text-indigo-200",
  "bg-sky-500/10 border-sky-400/30 text-sky-300 group-hover:border-sky-400/55 group-hover:text-sky-200",
  "bg-violet-500/10 border-violet-400/30 text-violet-300 group-hover:border-violet-400/55 group-hover:text-violet-200",
  "bg-fuchsia-500/10 border-fuchsia-400/30 text-fuchsia-300 group-hover:border-fuchsia-400/55 group-hover:text-fuchsia-200",
  "bg-emerald-500/10 border-emerald-400/30 text-emerald-300 group-hover:border-emerald-400/55 group-hover:text-emerald-200",
  "bg-teal-500/10 border-teal-400/30 text-teal-300 group-hover:border-teal-400/55 group-hover:text-teal-200",
  "bg-cyan-500/10 border-cyan-400/30 text-cyan-300 group-hover:border-cyan-400/55 group-hover:text-cyan-200",
  "bg-rose-500/10 border-rose-400/30 text-rose-300 group-hover:border-rose-400/55 group-hover:text-rose-200",
  "bg-orange-500/10 border-orange-400/30 text-orange-300 group-hover:border-orange-400/55 group-hover:text-orange-200",
  "bg-amber-500/10 border-amber-400/30 text-amber-300 group-hover:border-amber-400/55 group-hover:text-amber-200",
  "bg-lime-500/10 border-lime-400/30 text-lime-300 group-hover:border-lime-400/55 group-hover:text-lime-200",
  "bg-purple-500/10 border-purple-400/30 text-purple-300 group-hover:border-purple-400/55 group-hover:text-purple-200",
  "bg-pink-500/10 border-pink-400/30 text-pink-300 group-hover:border-pink-400/55 group-hover:text-pink-200",
];

function getTagClasses(tag: string) {
  let hash = 0;
  for (let i = 0; i < tag.length; i++) {
    hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  }
  return TAG_PALETTE[Math.abs(hash) % TAG_PALETTE.length];
}

/* ─── Projects Data ─── */
const projects = [
  {
    title: "DailySupply - Hyperlocal eCommerce",
    description: "Hyperlocal Supply Chain & eCommerce Platform connecting vendors with residents in high-rise societies. Engineered multi-role authorization (RBAC), store-to-society routing logic, catalog management, and vendor analytics.",
    tags: ["Node.js", "Prisma ORM", "TypeScript", "Express.js", "MariaDB", "JWT"],
    folder: "dailysupply",
    Icon: ShoppingCart,
    liveUrl: "https://dailysupply.co.in/",
    liveLabel: "Live Platform",
    githubUrl: "https://github.com/bethimanideep",
  },
  {
    title: "SharePoint - Aconex Connector",
    description: "High-performance enterprise file transfer solution supporting stream-based uploads of files up to 250GB. Features chunked uploads, queue processing, parallel execution, and real-time progress updates via WebSockets.",
    tags: ["Node.js", "TypeScript", "Express.js", "MySQL", "SharePoint", "WebSockets"],
    folder: "sharepoint-aconex",
    Icon: FileUp,
    liveUrl: "https://marketplace.oracle.com/listings/sharepoint-connector-for-aconex/ocid1.mktpublisting.oc1.iad.amaaaaaaiue7m7qarvlr6cj4t5dbse6t7xkhroejlgpreqnczzjvaest7t6a",
    liveLabel: "Oracle Marketplace",
    githubUrl: "https://github.com/bethimanideep",
  },
  {
    title: "DocBot-AI",
    description: "AI-powered document chat application enabling users to interact with PDFs & Google Drive files through natural language queries. Converts documents to embeddings via Gemini Embedding Model, stored in Pinecone Cloud Vector DB with Groq LLM orchestration.",
    tags: ["Next.js", "Node.js", "Pinecone", "Groq LLM", "LangChain", "TypeScript"],
    folder: "docbot-ai",
    Icon: Bot,
    liveUrl: "https://doc-bot-ai-chat.vercel.app/",
    liveLabel: "Live Demo",
    githubUrl: "https://github.com/bethimanideep/DocBot-AI-Chat",
  },
  {
    title: "SharePoint - Brava Connector",
    description: "Document viewing integration enhancing session longevity and security via SharePoint Framework client-to-server token migration. Integrates Opentext Brava! Viewer with customizable dark/light theme options.",
    tags: ["C#", "DotNet", "Brava! Viewer", "SharePoint Online", "SPFx", "OAuth"],
    folder: "sharepoint-brava",
    Icon: Eye,
    liveUrl: "https://www.revasolutions.com/solutions-index/enhanced-document-viewing-for-microsoft-sharepoint/",
    liveLabel: "View Solution",
    githubUrl: "https://github.com/bethimanideep",
  },
  {
    title: "Timesheet Automation System",
    description: "Automated timesheet auditing system sending weekly reminders and compliance reports. Integrates Quidlo APIs to track productivity, validate minimum hours, and auto-generate Excel reports using Excel.JS.",
    tags: ["Node.js", "Cron Jobs", "Nodemailer", "TypeScript", "Excel.JS", "Quidlo APIs"],
    folder: "timesheet-automation",
    Icon: Clock,
    liveUrl: "#",
    githubUrl: "https://github.com/bethimanideep",
  },
  {
    title: "ArcGIS Survey123 - Box Integration",
    description: "GIS-based automation system converting survey coordinates and inputs into detailed PDF/DOCX spatial reports within 2 seconds. Powered by serverless AWS Lambda and webhooks with automatic metadata-based Box Cloud uploads.",
    tags: ["Node.js", "AWS Lambda", "TypeScript", "Webhooks", "ArcGIS", "Box Cloud"],
    folder: "arcgis-box",
    Icon: MapPin,
    liveUrl: "#",
    githubUrl: "https://github.com/bethimanideep",
  },
];

/* ─── Timeline Card (Olentra-style) ─── */
function TimelineCard({
  project,
  index,
  isRightColumn,
}: {
  project: typeof projects[0];
  index: number;
  isRightColumn: boolean;
}) {
  const Icon = project.Icon;
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const res = await fetch(`/projects/${project.folder}/images.json`);
        if (res.ok) {
          const data = await res.json();
          if (data.images?.length > 0) {
            setImage(`/projects/${project.folder}/${data.images[0]}`);
          }
        }
      } catch { /* silent */ }
    };
    loadImage();
  }, [project.folder]);

  return (
    <div
      className={[
        "relative w-full mb-12 md:mb-0",
        isRightColumn ? "md:pl-14" : "md:pr-14",
      ].join(" ")}
    >
      {/* Connector Line (Desktop) */}
      <div
        className={[
          "hidden md:block absolute top-1/2 -translate-y-1/2 h-px bg-primary/30 z-0 w-10",
          isRightColumn ? "left-0" : "right-0",
        ].join(" ")}
      />

      {/* Card Content */}
      <motion.div
        initial={{ opacity: 0, x: isRightColumn ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full"
      >
        <article className="relative bg-slate-900/60 backdrop-blur-xl border border-white/[0.08] rounded-xl overflow-hidden">
          {/* Project Screenshot */}
          {image && (
            <div className="relative aspect-video overflow-hidden bg-[#020617]">
              <img
                src={image}
                alt={project.title}
                className="w-full h-full object-cover brightness-[0.95]"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70" />

              {/* Floating Project Number */}
              <span className="absolute top-4 right-4 text-foreground/20 font-mono text-xs tracking-widest font-bold">
                0{index + 1}
              </span>
            </div>
          )}

          {/* Card Body */}
          <div className="p-6 md:p-7">
            {/* Icon + Title Header */}
            <div className="flex items-center gap-3.5 mb-4">
              <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20 text-primary shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                <Icon size={20} strokeWidth={2} />
              </div>
              <h3 className="text-lg md:text-xl font-display font-bold text-foreground uppercase tracking-tight">
                {project.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-muted-foreground font-body font-medium leading-relaxed mb-5 text-[13px] md:text-[14px]">
              {project.description}
            </p>

            {/* Tags (Olentra-style colorful) */}
            <div className="flex flex-wrap gap-1.5 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2.5 py-1 rounded-md border text-[9px] md:text-[10px] font-bold uppercase tracking-widest ${getTagClasses(tag)}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {project.liveUrl !== "#" && (
                <Button variant="hero" size="sm" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink size={14} />
                    {(project as any).liveLabel ?? "Live Demo"}
                  </a>
                </Button>
              )}
              <Button variant="outline" size="sm" asChild className="border border-white/10">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github size={14} />
                  Code
                </a>
              </Button>
            </div>
          </div>
        </article>
      </motion.div>

      {/* Timeline Node */}
      <div
        className={[
          "absolute -left-8 top-0 -translate-x-1/2 z-20",
          isRightColumn ? "md:left-0" : "md:left-full",
          "md:top-1/2 md:-translate-y-1/2",
        ].join(" ")}
      >
        <div className="w-8 h-8 md:w-10 md:h-10 bg-background border-2 border-primary/30 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)]">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-primary rounded-full animate-pulse shadow-[0_0_12px_rgba(99,102,241,0.5)]" />
        </div>
      </div>
    </div>
  );
}

/* ─── Main Section (Olentra ServicesTimeline style) ─── */
export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header (Olentra-style) */}
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-body font-bold text-[10px] md:text-xs tracking-[0.4em] uppercase mb-3"
          >
            Project Portfolio
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[clamp(1.6rem,4vw,3.25rem)] font-display font-bold text-foreground uppercase tracking-wide leading-[0.95]"
          >
            Systems built{" "}
            <span className="text-gradient">to drive impact</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-muted-foreground text-[0.95rem] md:text-[1.05rem] font-body leading-relaxed max-w-3xl mx-auto"
          >
            From enterprise connectors to AI-powered platforms — production-ready
            systems with performance and measurable outcomes.
          </motion.p>
        </div>

        {/* Timeline Layout */}
        <div ref={containerRef} className="relative mt-16">
          <div className="relative pl-14 md:pl-0">
            {/* Vertical Central Line (static) */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-border/30 md:-translate-x-1/2" />

            {/* Animated Progress Line */}
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-primary via-blue-400 to-transparent md:-translate-x-1/2 z-10 shadow-[0_0_12px_rgba(99,102,241,0.4)]"
            />

            {/* Project Cards in Alternating Layout */}
            <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-2 md:gap-y-16">
              {projects.map((project, index) => (
                <TimelineCard
                  key={project.title}
                  project={project}
                  index={index}
                  isRightColumn={index % 2 === 1}
                />
              ))}
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/bethimanideep"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 text-[12px] sm:text-[13px] font-bold text-foreground bg-primary uppercase tracking-[0.2em] hover:bg-primary/90 shadow-[0_0_25px_hsl(var(--primary)/0.35)] rounded-sm"
          >
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
