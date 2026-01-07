import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "bethimanideep@gmail.com",
    href: "mailto:bethimanideep@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 8106340328",
    href: "tel:+918106340328",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Hyderabad, India",
    href: "#",
  },
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-card/20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <p className="text-primary font-body tracking-widest uppercase text-sm font-medium">
                Get in Touch
              </p>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">Let's Work Together</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto text-lg">
            ✨ Great things happen when we collaborate. Let's bring your ideas to life!
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group relative flex items-center gap-4 p-5 rounded-2xl bg-card/50 border border-border hover:border-primary/50 transition-all duration-300 hover-lift overflow-hidden"
                  >
                    {/* Gradient background on hover */}
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                    
                    <div className="relative z-10 p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                      <item.icon size={22} />
                    </div>
                    <div className="relative z-10 flex-1">
                      <p className="text-xs text-muted-foreground font-body uppercase tracking-wider mb-1">
                        {item.label}
                      </p>
                      <p className="text-foreground font-body font-semibold text-lg">
                        {item.value}
                      </p>
                    </div>
                    <div className="relative z-10 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      →
                    </div>
                  </a>
                ))}
              </div>

              {/* Additional Info Card */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  Let's Connect
                </h3>
                <p className="text-sm text-muted-foreground font-body leading-relaxed">
                  I'm always open for discussing new projects, creative ideas, or opportunities to be part of your vision.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="relative p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/30 transition-all duration-300"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-primary/20 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-accent/20 rounded-bl-3xl" />
                <div className="relative z-10 grid sm:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-body font-medium text-foreground">
                      Name
                    </label>
                    <Input
                      type="text"
                      placeholder="John Smith"
                      required
                      className="bg-secondary/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-12"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-body font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="bg-secondary/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-12"
                    />
                  </div>
                </div>

                <div className="relative z-10 mb-6 space-y-2">
                  <label className="block text-sm font-body font-medium text-foreground">
                    Subject
                  </label>
                  <Input
                    type="text"
                    placeholder="Project Inquiry"
                    required
                    className="bg-secondary/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 h-12"
                  />
                </div>

                <div className="relative z-10 mb-8 space-y-2">
                  <label className="block text-sm font-body font-medium text-foreground">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell me about your project..."
                    required
                    rows={6}
                    className="bg-secondary/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none transition-all duration-300"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="relative z-10 w-full group"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
