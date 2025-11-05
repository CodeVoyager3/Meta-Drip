import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, Target, Cpu, Users, Sparkles } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description:
        "To revolutionize the online shopping experience by bridging the gap between digital and physical, giving customers the confidence to purchase accessories from anywhere.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description:
        "We envision a future where Meta Drip is the standard for e-commerce, making shopping more accessible, personal, and enjoyable for everyone.",
    },
    {
      icon: Cpu,
      title: "Our Technology",
      description:
        "We utilize advanced facial landmark detection and real-time 3D rendering to provide an accurate, natural-looking preview of how accessories will look on you.",
    },
    {
      icon: Users,
      title: "Our Team",
      description:
        "We are a passionate team of developers, designers, and AI experts dedicated to creating intuitive and powerful tools that change the way people shop.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              About <span className="gradient-text">Meta Drip</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-6">
              We're revolutionizing the way you shop for accessories online.
              Discover our story, our technology, and our mission to bring the
              store to your screen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative glass rounded-3xl overflow-hidden shadow-lg p-8 aspect-square"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center h-full">
                <Sparkles className="w-32 h-32 text-accent opacity-20" />
              </div>
              <div className="absolute inset-0 p-8 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-4 text-primary">
                  Our Story
                </h2>
                <p className="text-muted-foreground mb-4">
                  Meta Drip was born from a simple problem: shopping for
                  accessories online is a gamble. We wanted to take the guesswork
                  out of the equation.
                </p>
                <p className="text-muted-foreground">
                  Using
                  cutting-edge computer vision and AI, we built a platform that
                  enables customers to virtually try on eyeglasses, sunglasses,
                  and more, all from the comfort of their home. Our AI ensures
                  proper positioning, sizing, and perspective for a truly
                  realistic experience.
                </p>
              </div>
            </motion.div>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold">
                Bridging the Gap Between Digital & Reality
              </h2>
              <p className="text-muted-foreground text-lg">
                Our mission is to give you the confidence to find products that
                perfectly match your style and fit, just as if you were in the
                store.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                  Shop with confidence
                </li>
                <li className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                  Explore styles risk-free
                </li>
                <li className="flex items-center text-muted-foreground">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3 flex-shrink-0" />
                  Find your perfect fit every time
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We Stand For
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our core values drive every decision we make and every feature
              we build.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
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
                  <value.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-primary">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">{value.description}</p>
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
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-accent/20 via-primary/20 to-transparent -z-10"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to See For Yourself?
            </motion.h2>
            <motion.p
              className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              Explore our collection and experience the future of online
              shopping today.
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
