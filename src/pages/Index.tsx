import { BottomNav } from "@/components/SideNav";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { ScrollProgress } from "@/components/ScrollProgress";
import { StarField } from "@/components/StarField";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <StarField />
      <ScrollProgress />
      <BottomNav />

      <main className="relative z-10">
        <div id="hero">
          <HeroSection />
        </div>
        
        <div id="about">
          <AboutSection />
        </div>
        
        <div id="skills">
          <SkillsSection />
        </div>
        
        <div id="projects">
          <ProjectsSection />
        </div>
        
        <div id="contact">
          <ContactSection />
        </div>
      </main>
    </div>
  );
};

export default Index;
