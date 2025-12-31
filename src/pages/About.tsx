import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Target,
  Eye,
  Heart,
  Award,
  Users,
  Globe,
  TrendingUp,
  Sparkles
} from "lucide-react";

import { useState, useEffect } from "react";
import { getContentApi, AboutContent } from "@/networking/content-apis";

// ... existing imports ...

const About = () => {
  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: "About QuickEdu",
    description: "At QuickEdu, (MirawoTech Solutions Private Limited) where ambition meets achievement, Hyderabad's emerging learning destination.",
    mission: "To democratize education by providing high-quality, affordable online courses that empower individuals to acquire new skills, advance their careers, and achieve their goals. We believe that everyone deserves access to world-class education, regardless of their background or location.",
    vision: "To become the world's most trusted online learning platform, where millions of learners connect with expert instructors to build the skills they need to thrive in an ever-changing world. We envision a future where learning knows no boundaries."
  });

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getContentApi<AboutContent>('about');
        if (data && data.title) setAboutContent(data);
      } catch (err) {
        console.error("Failed to fetch about content", err);
      }
    };
    fetchContent();
  }, []);

  const stats = [
    { value: "250K+", label: "Active Students" },
    { value: "100+", label: "Courses" },
    { value: "50+", label: "Instructors" },
    { value: "3+", label: "Branches" },
  ];

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for the highest quality in every course we offer.",
    },
    {
      icon: Heart,
      title: "Accessibility",
      description: "Education should be accessible to everyone, everywhere.",
    },
    {
      icon: Globe,
      title: "Community",
      description: "Building an India-wide community of passionate learners.",
    },
    {
      icon: TrendingUp,
      title: "Innovation",
      description: "Continuously improving our platform and learning experience.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-blue-900/90 to-indigo-900/95"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white px-6 py-3 text-sm">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              About Us
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              {aboutContent.title}
            </h1>
            <p className="text-xl text-gray-200 mb-8 drop-shadow-md">
              {aboutContent.description}
            </p>
            <div className="flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span className="text-sm">Industry Leading</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">India-wide Community</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                <span className="text-sm">India-wide Access</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 shadow-xl border border-purple-100">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">{stat.value}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 relative">
        <div
          className="absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Mission & Vision</h2>
            <p className="text-xl text-gray-600">Driving our purpose and future aspirations</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-2 hover:border-primary transition-all duration-300 hover:shadow-2xl bg-white/95 backdrop-blur-sm h-full">
                <div className="w-20 h-20 gradient-primary rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {aboutContent.mission}
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 border-2 hover:border-primary transition-all duration-300 hover:shadow-2xl bg-white/95 backdrop-blur-sm h-full">
                <div className="w-20 h-20 gradient-accent rounded-3xl flex items-center justify-center mb-6 shadow-2xl">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {aboutContent.vision}
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center h-full hover:shadow-elevated transition-all duration-300 border-2 hover:border-primary">
                  <div className="w-14 h-14 mx-auto mb-4 gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                    <value.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-white/95"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Story</h2>
              <p className="text-xl text-gray-600">The journey that brought us here</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-purple-100 h-full">
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p className="text-lg">
                      Founded in 2020, QuickEdu was born from a simple idea: that quality education should be accessible to everyone India-wide. What started as a small team of passionate educators has grown into a platform serving over 250,000 students India-wide.
                    </p>
                    <p>
                      We do business India-wide and support 100+ courses. Our platform brings together expert instructors who are passionate about sharing their knowledge and helping students succeed. Each course is carefully crafted to provide practical, hands-on learning experiences that prepare students for real-world challenges.
                    </p>
                  </div>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl border-2 border-blue-100 h-full">
                  <div className="space-y-6 text-gray-700 leading-relaxed">
                    <p>
                      Today, we're proud to offer 100+ courses across multiple disciplines, from web development and data science to digital marketing and design. Our community continues to grow every day, and we remain committed to our mission of making education accessible, affordable, and effective.
                    </p>
                    <p className="text-lg">
                      As we look to the future, we're excited to continue innovating and expanding our course offerings, always keeping our students' success at the heart of everything we do.
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">Why Choose QuickEdu?</h2>
            <p className="text-xl text-purple-100">Features that make us stand out</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: Award,
                title: "Certified Courses",
                description: "Get industry-recognized certificates upon completion"
              },
              {
                icon: Users,
                title: "Expert Instructors",
                description: "Learn from professionals with real-world experience"
              },
              {
                icon: Globe,
                title: "India-wide Access",
                description: "Access courses anytime, anywhere in India"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 text-center bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                  <p className="text-purple-100">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
