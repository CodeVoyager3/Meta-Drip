import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, ShoppingBag, Shield, ImageIcon, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-image.jpg";
import { motion } from "framer-motion";

const Landing = () => {
  const features = [
    {
      icon: Camera,
      title: "Real-Time Preview",
      description: "See accessories on your face instantly using advanced computer vision technology.",
    },
    {
      icon: ShoppingBag,
      title: "Wide Selection",
      description: "Browse hundreds of eyeglasses, hats, and premium accessories tailored to your style.",
    },
    {
      icon: Shield,
      title: "Perfect Fit Guarantee",
      description: "AI-powered facial landmark detection ensures accurate positioning and natural movement.",
    },
    {
      icon: ImageIcon,
      title: "Instant Capture",
      description: "Save and share your virtual try-on moments with a single click.",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Browse",
      description: "Explore our curated collection of eyeglasses, hats, and accessories",
    },
    {
      number: "02",
      title: "Try",
      description: "Use your device camera to see how items look on your face in real-time",
    },
    {
      number: "03",
      title: "Capture & Share",
      description: "Capture moments and share your favorite looks with friends",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            className="absolute top-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div 
            className="absolute bottom-20 left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [90, 0, 90],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Try Before You Buy -{" "}
                  <span className="gradient-text">Virtual Accessories</span> for Everyone
                </h1>
              </motion.div>
              
              <motion.p 
                className="text-lg text-muted-foreground max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Experience our innovative Meta Drip technology. Browse our collection of eyeglasses, 
                hats, and more. See how they look on you in real-time with AI-powered facial landmark detection.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="hero" size="xl">
                    <Link to="/store">
                      <Sparkles className="w-5 h-5 mr-2" />
                      Explore Store
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button asChild variant="outline" size="xl">
                    <Link to="#how-it-works">Learn More</Link>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="relative glass rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={heroImage}
                  alt="Virtual Try-On Technology"
                  className="w-full h-auto"
                />
                {/* Floating badge */}
                <motion.div
                  className="absolute top-6 right-6 glass-strong px-4 py-2 rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="text-sm font-semibold text-accent">AI Powered</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose <span className="gradient-text">Meta Drip</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge technology meets fashion to bring you the best virtual try-on experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass p-6 rounded-2xl group hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <motion.div 
                  className="w-14 h-14 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mb-4 shadow-lg"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-primary">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div 
                key={index} 
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="text-center space-y-4 glass p-8 rounded-2xl">
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-accent to-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    {step.number}
                  </motion.div>
                  <h3 className="text-2xl font-semibold text-primary">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
                
                {/* Animated connector line */}
                {index < steps.length - 1 && (
                  <motion.div 
                    className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-accent to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
                    viewport={{ once: true }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="glass-strong rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/20 to-transparent -z-10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />

            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Transform Your Look?
            </motion.h2>
            <motion.p 
              className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Visit our store and start trying on accessories today. Find your perfect style with confidence.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="xl" variant="accent">
                  <Link to="/store">Go to Store</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button asChild size="xl" variant="outline">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
