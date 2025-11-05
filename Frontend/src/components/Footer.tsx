import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "About Us", to: "/about" },
        { label: "Careers", to: "#" },
        { label: "Press", to: "#" },
      ],
    },
    {
      title: "Product",
      links: [
        { label: "Browse Store", to: "/store" },
        { label: "How It Works", to: "#" },
        { label: "Features", to: "#" },
      ],
    },
    {
      title: "Support",
      links: [
        { label: "Contact Us", to: "/contact" },
        { label: "FAQ", to: "#" },
        { label: "Shipping", to: "#" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", to: "#" },
        { label: "Terms of Service", to: "#" },
        { label: "Cookie Policy", to: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
  ];

  return (
    <footer className="glass mt-20 border-t border-border/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-primary mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-12 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2025 VirtualTryOn. All rights reserved.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label={social.label}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
