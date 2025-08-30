import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import emailjs from "@emailjs/browser";

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.target;

    try {
      await emailjs.sendForm(
        "service_sh65zt1",  // replace with your EmailJS service ID
        "template_xi5f1yf", // replace with your EmailJS template ID
        form,
        "S67GHfRO_k2uCJ-kE"   // replace with your EmailJS public key
      );

      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });

      form.reset();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        {/* Heading */}
        <h2 className="text-center text-4xl font-extrabold mb-4">
          Get In{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Touch
          </span>
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? Feel free to reach out
          — I’m always open to discussing new ideas and opportunities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-10">
            <h3 className="text-3xl font-bold mb-8 tracking-tight">Contact Information</h3>
            <div className="space-y-8">
              <ContactItem
                icon={<Mail className="h-6 w-6 text-indigo-500" />}
                label="Email"
                value="khorolsuren1111@gmail.com"
                link="mailto:khorolsuren1111@gmail.com"
              />
              <ContactItem
                icon={<Phone className="h-6 w-6 text-indigo-500" />}
                label="Phone"
                value="+1 (619) 841-4477"
                link="tel:+16198414477"
              />
              <ContactItem
                icon={<MapPin className="h-6 w-6 text-indigo-500" />}
                label="Location"
                value="Brooklyn, NY, USA"
              />
            </div>

            {/* Social Links */}
            <div className="mt-10">
              <h4 className="font-semibold text-xl mb-5 text-gray-900 dark:text-white">
                Connect With Me
              </h4>
              <div className="flex items-center gap-6">
                <SocialLink
                  href="https://linkedin.com/in/khorolshuren-dashdavaa-2427581b8"
                  icon={<Linkedin className="h-7 w-7 text-indigo-600 dark:text-indigo-400 hover:scale-110 transition-transform" />}
                />
                <SocialLink
                  href="https://www.instagram.com/khrl.sn/"
                  icon={<Instagram className="h-7 w-7 text-pink-500 hover:scale-110 transition-transform" />}
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form
            className="p-8 rounded-2xl bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 space-y-6"
            onSubmit={handleSubmit}
          >
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Send a Message
            </h3>

            <InputField label="Your Name" name="name" placeholder="John Doe" />
            <InputField label="Your Email" type="email" name="email" placeholder="john@example.com" />
            <TextAreaField label="Your Message" name="message" placeholder="Hello, I'd like to talk about..." />

            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-white",
                "bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 transition-all duration-200 shadow-md hover:shadow-lg"
              )}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

/* --- Subcomponents --- */
const ContactItem = ({ icon, label, value, link }) => (
  <div className="flex items-start space-x-4">
    <div className="p-3 rounded-full bg-primary/10">{icon}</div>
    <div>
      <h4 className="font-medium">{label}</h4>
      {link ? (
        <a href={link} className="text-gray-400 hover:text-primary transition-colors">
          {value}
        </a>
      ) : (
        <span className="text-gray-400">{value}</span>
      )}
    </div>
  </div>
);

const SocialLink = ({ href, icon }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-700 hover:bg-primary hover:text-white transition-colors">
    {icon}
  </a>
);

const InputField = ({ label, name, type = "text", placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium mb-2">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      required
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-md border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-primary outline-none"
    />
  </div>
);

const TextAreaField = ({ label, name, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium mb-2">{label}</label>
    <textarea
      id={name}
      name={name}
      required
      rows={4}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-md border border-gray-600 bg-gray-900 text-white focus:ring-2 focus:ring-primary outline-none resize-none"
    />
  </div>
);