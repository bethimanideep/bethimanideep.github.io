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
    <section id="contact" className="py-24 md:py-32 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-primary font-body tracking-widest uppercase text-sm mb-4">
              Get in Touch
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mb-6">
               <span className="text-gradient">Let's Work Together</span>
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">
               ✨ Great things happen when we collaborate. ✨
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-body">
                        {item.label}
                      </p>
                      <p className="text-foreground font-body font-medium">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl bg-card border border-border"
              >
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-body text-foreground mb-2">
                      Name
                    </label>
                    <Input
                      type="text"
                      placeholder="John Smith"
                      required
                      className="bg-secondary border-border focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-body text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      required
                      className="bg-secondary border-border focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-body text-foreground mb-2">
                    Subject
                  </label>
                  <Input
                    type="text"
                    placeholder="Project Inquiry"
                    required
                    className="bg-secondary border-border focus:border-primary"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-body text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="bg-secondary border-border focus:border-primary resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send size={18} />
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
