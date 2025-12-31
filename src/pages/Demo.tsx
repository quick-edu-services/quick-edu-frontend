import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Play,
  CheckCircle2,
  Users,
  BookOpen,
  Award,
  TrendingUp,
  Clock,
  Globe,
  Smartphone,
  Download,
  MessageSquare,
  Star,
  ArrowRight,
  Sparkles
} from "lucide-react";
import webVideo from "@/assets/web video.mp4";

const Demo = () => {
  const features = [
    {
      icon: BookOpen,
      title: "100+ Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience"
    },
    {
      icon: Users,
      title: "Live Interactive Classes",
      description: "Engage with instructors and peers in real-time sessions"
    },
    {
      icon: Award,
      title: "Industry Certificates",
      description: "Earn recognized certificates to boost your career"
    },
    {
      icon: Clock,
      title: "Learn at Your Pace",
      description: "Access courses anytime, anywhere, on any device"
    },
    {
      icon: MessageSquare,
      title: "24/7 Support",
      description: "Get help whenever you need it from our support team"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Track your progress and achieve your learning goals"
    }
  ];

  const benefits = [
    "Lifetime access to all course materials",
    "Downloadable resources and assignments",
    "Mobile app for learning on-the-go",
    "Community forum for peer discussions",
    "Regular course updates and new content",
    "Money-back guarantee within 30 days"
  ];

  const stats = [
    { value: "250K+", label: "Active Students" },
    { value: "100+", label: "Courses" },
    { value: "50+", label: "Expert Instructors" },
    { value: "4.8/5", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      <Navbar />

      {/* Hero Section with Video */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-blue-600/10 to-pink-600/10" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 gradient-primary text-white px-6 py-3 text-lg">
              <Sparkles className="w-5 h-5 mr-2 inline" />
              Platform Demo
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Experience the Future of
              <span className="block mt-2 pb-2 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent" style={{ lineHeight: '1.2' }}>
                Online Learning
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover how QuickEdu transforms education with interactive courses, 
              expert instructors, and cutting-edge technology
            </p>
          </motion.div>

          {/* Video Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-5xl mx-auto mb-16"
          >
            <Card className="overflow-hidden shadow-2xl border-4 border-purple-200">
              <div className="relative aspect-video bg-gradient-to-br from-purple-900 to-blue-900">
                {/* Local Video Player with Slow Motion - No Controls */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=675&fit=crop&auto=format&q=80"
                  style={{ 
                    filter: 'brightness(1.05) contrast(1.05)',
                  }}
                  onLoadedMetadata={(e) => {
                    const video = e.currentTarget;
                    video.playbackRate = 0.75; // 75% speed for smooth slow motion
                  }}
                >
                  <source src={webVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </Card>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow border-2 hover:border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose QuickEdu?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to succeed in your learning journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What You Get with QuickEdu
              </h2>
              <p className="text-xl text-gray-600">
                Premium features included with every course
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 shadow-xl border-2 border-purple-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                      <span className="text-gray-700 text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join 250,000+ students already transforming their careers with QuickEdu
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-2xl">
                <Link to="/courses">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Courses
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 text-lg px-8 py-6">
                <Link to="/register">
                  Get Started Free
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-white/80">
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <span className="ml-2">4.8/5 from 50,000+ reviews</span>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Demo;
