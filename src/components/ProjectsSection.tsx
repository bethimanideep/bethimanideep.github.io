import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "DocBot-AI",
    description: "AI-powered document chat application enabling users to upload files, connect to Google Drive and interact with documents through natural language queries. Converted documents into embeddings via LangChain and stored in Weaviate Cloud Vector Database.",
    tags: ["Next.js", "Node.js", "LangChain", "Weaviate"],
    folder: "docbot-ai",
    liveUrl: "https://doc-bot-ai-chat.vercel.app/",
    githubUrl: "https://github.com/bethimanideep/DocBot-AI-Chat",
  },
  {
    title: "Grab And Go",
    description: "A clone of a famous e-commerce Website [BigBasket] that aims to replicate its core functionalities and features for users to conveniently browse and purchase groceries online.",
    tags: ["HTML", "CSS", "JavaScript", "API"],
    folder: "grab-and-go",
    liveUrl: "https://friendly-mooncake-7438ee.netlify.app/",
    githubUrl: "https://github.com/bethimanideep/loyal-elbow-6166",
  },
  {
    title: "Legit Lawyer",
    description: "A platform to book appointments with lawyers, engage in video calls and chatting with them, and conveniently schedule time slots for legal consultations.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    folder: "legit-lawyer",
    liveUrl: "https://legit-lawyer-team.vercel.app/",
    githubUrl: "https://github.com/bethimanideep/LegitLawyer-Team",
  },
  {
    title: "Certidigital",
    description: "A platform that makes it easy to send emails to many people in one click. Upload email addresses from a CSV file and send bulk emails with certificates to recipients.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    folder: "certidigital",
    liveUrl: "https://certidigital-five.vercel.app/",
    githubUrl: "https://github.com/masai-builds/Certidigital",
  },
  {
    title: "BSHUB",
    description: "A web application that allows users to upload, save, and delete images with ease. Features user authentication and image management capabilities.",
    tags: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    folder: "bshub",
    liveUrl: "https://whimsical-gecko-94ae27.netlify.app/",
    githubUrl: "https://github.com/bethimanideep/same-eye-4784",
  },
];

const gradientStyles: Record<string, string> = {
  "gradient-1": "from-primary/30 via-primary/10 to-transparent",
  "gradient-2": "from-blue-500/30 via-blue-500/10 to-transparent",
  "gradient-3": "from-emerald-500/30 via-emerald-500/10 to-transparent",
  "gradient-4": "from-purple-500/30 via-purple-500/10 to-transparent",
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [prevImageIndex, setPrevImageIndex] = useState<number | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Load images list from images.json
    const loadImages = async () => {
      try {
        const response = await fetch(`/projects/${project.folder}/images.json`);
        if (response.ok) {
          const data = await response.json();
          if (data.images && Array.isArray(data.images) && data.images.length > 0) {
            const fullImagePaths = data.images.map((img: string) => `/projects/${project.folder}/${img}`);
            setImages(fullImagePaths);
          }
        }
      } catch (error) {
        console.error(`Error loading images for ${project.folder}:`, error);
      }
    };

    loadImages();
  }, [project.folder]);

  // Auto-rotate images
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      // prepare dual-render animation
      setDirection('right');
      setPrevImageIndex(currentImageIndex);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsAnimating(false);
        setPrevImageIndex(null);
      }, 420); // slightly less than CSS animation (600ms) to keep fluid
    }, 4000); // longer delay for production feel

    return () => clearInterval(interval);
  }, [images.length, currentImageIndex]);

  const startTransition = (newIndex: number, dir: 'left' | 'right') => {
    if (isAnimating || newIndex === currentImageIndex) return;
    setDirection(dir);
    setPrevImageIndex(currentImageIndex);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentImageIndex(newIndex);
      setIsAnimating(false);
      setPrevImageIndex(null);
    }, 420);
  };

  const goToPrevious = () => {
    if (images.length > 0 && !isAnimating) {
      const newIndex = (currentImageIndex - 1 + images.length) % images.length;
      startTransition(newIndex, 'left');
    }
  };

  const goToNext = () => {
    if (images.length > 0 && !isAnimating) {
      const newIndex = (currentImageIndex + 1) % images.length;
      startTransition(newIndex, 'right');
    }
  };

  return (
    <div className="group relative rounded-3xl bg-card/50 border border-border overflow-hidden hover:border-primary/50 transition-all duration-500 hover-lift">
      {/* Glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl" />
      
      {/* Project Image/Visual */}
      <div className="relative aspect-video bg-gradient-to-br from-primary/30 via-primary/10 to-transparent overflow-hidden">
        {images.length > 0 ? (
          <>
            {/* Previous image (exiting) */}
            {prevImageIndex !== null && (
              <img
                src={images[prevImageIndex]}
                alt={`${project.title} - Image ${prevImageIndex + 1}`}
                className={`absolute inset-0 w-full h-full object-cover carousel-image ${
                  direction === 'right' ? 'slide-exit-left' : 'slide-exit-right'
                }`}
                draggable={false}
              />
            )}

            {/* Current image (entering) */}
            <img
              key={`${images[currentImageIndex]}-${currentImageIndex}`}
              src={images[currentImageIndex]}
              alt={`${project.title} - Image ${currentImageIndex + 1}`}
              className={`absolute inset-0 w-full h-full object-cover carousel-image ${
                isAnimating ? (direction === 'right' ? 'slide-enter-right' : 'slide-enter-left') : ''
              }`}
              draggable={false}
              onError={(e) => {
                console.error('Image failed to load:', images[currentImageIndex]);
              }}
            />

            {/* Navigation Controls */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  disabled={isAnimating}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 text-primary hover:bg-background transition-all opacity-0 group-hover:opacity-100 z-10 disabled:opacity-50"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goToNext}
                  disabled={isAnimating}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 text-primary hover:bg-background transition-all opacity-0 group-hover:opacity-100 z-10 disabled:opacity-50"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Image Indicators */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => startTransition(idx, idx > currentImageIndex ? 'right' : 'left')}
                      disabled={isAnimating}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentImageIndex ? 'bg-primary w-6' : 'bg-primary/50'
                      } disabled:opacity-50`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-2 right-2 px-3 py-1 bg-background/80 rounded-full text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center flex-col gap-4">
            <span className="font-display text-6xl text-foreground/10 group-hover:text-foreground/20 transition-colors duration-300">
              0{index + 1}
            </span>
            <div className="text-center px-4">
              <p className="text-xs text-muted-foreground">Add images to:</p>
              <p className="text-xs text-primary font-semibold">public/projects/{project.folder}/</p>
              <p className="text-xs text-muted-foreground mt-2">Then update:</p>
              <p className="text-xs text-primary font-semibold">images.json</p>
            </div>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 pointer-events-none group-hover:pointer-events-auto">
          <Button variant="hero" size="lg" asChild className="group/btn">
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={18} className="group-hover/btn:rotate-45 transition-transform duration-300" />
              Live Demo
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild className="group/btn border-2">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github size={18} className="group-hover/btn:scale-110 transition-transform duration-300" />
              Code
            </a>
          </Button>
        </div>
      </div>

      {/* Project Info */}
      <div className="relative z-10 p-6 bg-card/80 backdrop-blur-sm">
        <h3 className="font-display text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-muted-foreground font-body text-sm mb-5 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-xs font-body rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-20" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <p className="text-primary font-body tracking-widest uppercase text-sm font-medium">
                Portfolio
              </p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">Featured Projects</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-lg">
              A collection of projects that showcase my skills, creativity, and passion for building exceptional digital experiences
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} />
            ))}
          </div>

          {/* View More */}
          <div className="text-center mt-16">
            <Button variant="heroOutline" size="lg" className="group">
              <span>View All Projects</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
