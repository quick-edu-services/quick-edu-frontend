import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Play,
  BookOpen,
  Users,
  Award,
  TrendingUp,
  Star,
  ChevronRight,
  CheckCircle2,
  Globe,
  Clock,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import testimonials from "@/data/testimonials.json";
import heroImage from "@/assets/hero-bg.jpg";
import webVideo from "@/assets/web video.mp4";
import courseWebDev from "@/assets/course-web-dev.jpg";
import courseDataScience from "@/assets/course-data-science.jpg";
import courseMarketing from "@/assets/course-marketing.jpg";
import courseDesign from "@/assets/course-design.jpg";
import socialMediaImage from "@/assets/social media.png";
import ThreeBackground from "@/components/ui/ThreeBackground";

// Generate unique image for each course based on course ID
const getCourseImage = (courseId: string, category: string) => {
  const imageMap: Record<string, string> = {
    // Web Development
    "test-it-course": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format&q=80",
    "web-dev-bootcamp": "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop&auto=format&q=80",
    "course-001": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop&auto=format&q=80",
    "course-002": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&auto=format&q=80",
    "course-004": "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&h=600&fit=crop&auto=format&q=80",
    "course-026": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&auto=format&q=80",
    "course-028": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&auto=format&q=80",
    "course-031": "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=800&h=600&fit=crop&auto=format&q=80",
    "course-036": "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&auto=format&q=80",
    "course-037": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&h=600&fit=crop&auto=format&q=80",
    "course-052": "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&h=600&fit=crop&auto=format&q=80",
    "course-057": "https://images.unsplash.com/photo-1545670723-196ed0954986?w=800&h=600&fit=crop&auto=format&q=80",
    "course-059": "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=800&h=600&fit=crop&auto=format&q=80",
    "course-060": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=600&fit=crop&auto=format&q=80",
    "course-065": "https://images.unsplash.com/photo-1555949963-f7fe82fcdc00?w=800&h=600&fit=crop&auto=format&q=80",

    // Data Science
    "data-science-ai": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format&q=80",
    "course-003": "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&h=600&fit=crop&auto=format&q=80",
    "course-010": "https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&h=600&fit=crop&auto=format&q=80",
    "course-011": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format&q=80",
    "course-012": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format&q=80",
    "course-016": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop&auto=format&q=80",
    "course-018": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format&q=80",
    "course-038": "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?w=800&h=600&fit=crop&auto=format&q=80",
    "course-044": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop&auto=format&q=80",
    "course-046": "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=600&fit=crop&auto=format&q=80",
    "course-049": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop&auto=format&q=80",
    "course-051": "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=800&h=600&fit=crop&auto=format&q=80",
    "course-054": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&auto=format&q=80",
    "course-062": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop&auto=format&q=80",
    "course-063": "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=600&fit=crop&auto=format&q=80",

    // Marketing
    "digital-marketing": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format&q=80",
    "course-008": "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&h=600&fit=crop&auto=format&q=80",
    "course-020": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&auto=format&q=80",
    "course-025": "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&auto=format&q=80",
    "course-030": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format&q=80",
    "course-045": "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop&auto=format&q=80",
    "course-050": "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&auto=format&q=80",
    "course-055": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&auto=format&q=80",
    "course-058": "https://images.unsplash.com/photo-1556155092-8707de31f9c4?w=800&h=600&fit=crop&auto=format&q=80",

    // Design
    "ui-ux-design": "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&auto=format&q=80",
    "course-009": "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?w=800&h=600&fit=crop&auto=format&q=80",
    "course-022": "https://images.unsplash.com/photo-1541462608143-67571c6738dd?w=800&h=600&fit=crop&auto=format&q=80",
    "course-023": "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&h=600&fit=crop&auto=format&q=80",
    "course-035": "https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=800&h=600&fit=crop&auto=format&q=80",
    "course-047": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format&q=80",
    "course-053": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format&q=80",
    "course-061": "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop&auto=format&q=80",
    "course-064": "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=600&fit=crop&auto=format&q=80",
    "course-070": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&auto=format&q=80",

    // Mobile
    "course-006": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&auto=format&q=80",
    "course-007": "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop&auto=format&q=80",
    "course-043": "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=800&h=600&fit=crop&auto=format&q=80",
    "course-068": "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=600&fit=crop&auto=format&q=80",

    // Cloud
    "course-005": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&auto=format&q=80",
    "course-019": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format&q=80",
    "course-041": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop&auto=format&q=80",
    "course-056": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&auto=format&q=80",

    // DevOps
    "course-014": "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&fit=crop&auto=format&q=80",
    "course-033": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=600&fit=crop&auto=format&q=80",
    "course-048": "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=800&h=600&fit=crop&auto=format&q=80",
    "course-069": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format&q=80",

    // Security
    "course-015": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&auto=format&q=80",
    "course-032": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&auto=format&q=80",
    "course-039": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop&auto=format&q=80",

    // Business
    "course-021": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format&q=80",
    "course-034": "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&h=600&fit=crop&auto=format&q=80",
    "course-040": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format&q=80",
    "course-066": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format&q=80",

    // Product
    "course-013": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format&q=80",
    "course-067": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format&q=80",

    // Career
    "course-029": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format&q=80",
    "course-042": "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop&auto=format&q=80",

    // Technology
    "course-017": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&auto=format&q=80",
    "course-024": "https://images.unsplash.com/photo-1555949963-f7fe82fcdc00?w=800&h=600&fit=crop&auto=format&q=80",

    // AI
    "course-027": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&auto=format&q=80"
  };

  return imageMap[courseId] || `https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format&q=80`;
};

import { useEffect, useState } from "react";
import { getContentApi, HeroContent, ScrollingCourses } from "@/networking/content-apis";
import { getAllCoursesApi, Course } from "@/networking/course-apis";
import { CourseGridSkeleton } from "@/components/skeletons";

// ... existing imports ...

const Index = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "Transform Your Future with",
    subtitle: "World-Class Education",
    description: "Master in-demand skills with expert-led courses. Build projects, earn certificates, and advance your career.",
    ctaText: "Explore Courses"
  });

  const [scrollingCourses, setScrollingCourses] = useState<string[]>([
    "Cisco Cybersecurity Essentials",
    "Data Analytics with AI",
    "Google Cloud Platform",
    "Python for Data Science",
    "Machine Learning Basics",
    "Digital Marketing Mastery",
    "React & Node.js Development",
    "Kubernetes Administration",
    "Ethical Hacking & Penetration Testing",
    "Blockchain Development",
    "UI/UX Design Principles",
    "DevOps with Docker",
    "Artificial Intelligence Fundamentals",
    "Project Management (PMP)",
    "Salesforce Administration",
    "Power BI Analytics",
    "Java Spring Boot",
    "iOS App Development",
    "Android Development with Kotlin",
    "Tableau Data Visualization",
    "MongoDB Database Design",
    "GraphQL API Development",
    "Flutter Cross-Platform",
    "Vue.js Frontend Framework",
    "Angular Enterprise Applications",
    "PostgreSQL Database Management",
    "Redis Caching Solutions",
    "Microservices Architecture",
    "Terraform Infrastructure",
    "Jenkins CI/CD Pipeline",
    "Elasticsearch & Kibana",
    "Apache Kafka Streaming",
    "TensorFlow Deep Learning",
    "PyTorch Neural Networks",
    "Computer Vision with OpenCV",
    "Natural Language Processing",
    "Robotic Process Automation",
    "Quantum Computing Basics",
    "Augmented Reality Development",
    "Virtual Reality Programming",
    "Game Development with Unity",
    "3D Modeling with Blender",
    "Adobe Creative Suite Mastery",
    "Video Editing with Premiere Pro",
    "Photoshop Advanced Techniques",
    "Illustrator Vector Graphics"
  ]);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const [hero, scrolling, coursesData] = await Promise.all([
          getContentApi<HeroContent>('hero'),
          getContentApi<ScrollingCourses>('scrolling'),
          getAllCoursesApi()
        ]);

        if (hero && hero.title) setHeroContent(hero);

        if (scrolling && scrolling.courses && scrolling.courses.length > 0) {
          setScrollingCourses(scrolling.courses);
        }

        if (coursesData) {
          setCourses(coursesData);
        }

      } catch (err) {
        console.error("Failed to fetch content", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, []);

  const stats = [
    { icon: Users, label: "Active Students", value: "250,000+" },
    { icon: BookOpen, label: "Total Courses", value: "100+" },
    { icon: Award, label: "Expert Instructors", value: "50+" },
    { icon: Award, label: "Branches", value: "3+" },
  ];

  const features = [
    {
      icon: Sparkles,
      title: "Learn at Your Pace",
      description: "Access courses anytime, anywhere, and learn at your own schedule with lifetime access.",
    },
    {
      icon: Users,
      title: "Expert Instructors",
      description: "Learn from industry professionals with years of real-world experience.",
    },
    {
      icon: Award,
      title: "Certification",
      description: "Earn recognized certificates to showcase your newly acquired skills.",
    },
    {
      icon: CheckCircle2,
      title: "Hands-on Projects",
      description: "Build real-world projects to solidify your learning and grow your portfolio.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative">
      <ThreeBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster={heroImage}
          >
            <source src="/web-video.mp4" type="video/mp4" />
            {/* Fallback to image if video doesn't load */}
          </video>
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80"></div>
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30 animate-pulse"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight text-white drop-shadow-lg">
                {heroContent.title}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block mt-1">{heroContent.subtitle}</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl mx-auto drop-shadow-md">
                {heroContent.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild size="lg" className="gradient-primary shadow-glow px-6 py-5">
                  <Link to="/courses">
                    {heroContent.ctaText}
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="px-6 py-5 border-2">
                  <Link to="/demo">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-8 max-w-3xl mx-auto"
            >
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                      <stat.icon className="w-6 h-6 text-purple-300 mb-2 mx-auto" />
                      <div className="text-2xl font-bold mb-1 text-white">{stat.value}</div>
                      <div className="text-xs text-gray-200">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Quote Section - Compact */}
      <section className="py-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-white"
            >
              <div className="relative inline-block">
                {/* Compact Icon */}
                <div className="relative w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>

                {/* QuickEdu Text - Smaller */}
                <h2 className="relative text-2xl md:text-3xl font-bold mb-2 text-white drop-shadow-lg">
                  QuickEdu
                </h2>

                {/* Tagline - Smaller */}
                <p className="text-sm md:text-base text-purple-100 max-w-xl mx-auto">
                  Transform Your Future with World-Class Online Education
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Scrolling Courses Ticker */}
      <section className="py-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/90 via-pink-600/85 to-purple-600/90 animate-gradient-x"></div>
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full animate-float"></div>
            <div className="absolute top-20 right-20 w-24 h-24 bg-white/15 rounded-full animate-float-delayed"></div>
            <div className="absolute bottom-10 left-1/3 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          </div>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&auto=format&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 text-center mb-6 relative z-10">
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">🎯 These are the courses waiting for you!!! 🚀</h3>
        </div>
        <div className="relative z-10">
          <div className="flex animate-scroll whitespace-nowrap">
            {scrollingCourses.map((course, index) => (
              <span key={index} className="inline-block text-white text-lg font-semibold mx-8 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                {course}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Learn Anywhere Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl animate-gradient-shift">
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full animate-float-3d"></div>
                <div className="absolute top-20 right-16 w-16 h-16 bg-yellow-400/30 rounded-lg animate-rotate-3d"></div>
                <div className="absolute bottom-16 left-20 w-12 h-12 bg-green-400/40 rounded-full animate-bounce-3d"></div>
                <div className="absolute bottom-20 right-10 w-24 h-6 bg-white/10 rounded-full animate-pulse-3d"></div>
                {/* Animated Device Mockup */}
                <div className="absolute inset-8 bg-gray-900 rounded-xl animate-device-glow">
                  <div className="absolute top-4 left-4 right-4 h-8 bg-gray-800 rounded flex items-center gap-2 px-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                  <div className="absolute top-16 left-4 right-4 bottom-4 bg-white rounded animate-screen-flicker">
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-blue-200 rounded animate-loading-bar"></div>
                      <div className="h-4 bg-purple-200 rounded animate-loading-bar" style={{ animationDelay: '0.5s' }}></div>
                      <div className="h-4 bg-pink-200 rounded animate-loading-bar" style={{ animationDelay: '1s' }}></div>
                      <div className="mt-6 grid grid-cols-2 gap-2">
                        <div className="h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded animate-card-flip"></div>
                        <div className="h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded animate-card-flip" style={{ animationDelay: '0.3s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 gradient-primary text-white px-4 py-2">
                Flexible Learning
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                Learn Anywhere, Anytime
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Access your courses on any device. Our platform adapts to your lifestyle, whether you're at home, commuting, or traveling.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span>Mobile-optimized learning experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span>Offline content download</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-500" />
                  <span>Progress sync across devices</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expert Instructors Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-gray-900 to-black rounded-2xl animate-gradient-shift">
                <div className="absolute top-6 left-6 w-20 h-3 bg-green-400/80 rounded animate-pulse"></div>
                <div className="absolute top-12 left-6 text-white text-xs font-bold">INDUSTRY LEADERS NETWORK</div>
                <div className="absolute bottom-20 right-8 w-16 h-16 bg-blue-400/40 rounded-full animate-bounce-3d"></div>
                {/* Professional Network Mockup */}
                <div className="absolute inset-8 bg-gray-800 rounded-lg animate-device-glow">
                  <div className="absolute top-3 left-3 right-3 h-6 bg-gray-700 rounded flex items-center px-2">
                    <div className="text-xs text-white font-bold">Expert Guidance Platform</div>
                  </div>
                  <div className="absolute top-12 left-3 right-3 bottom-16">
                    <div className="grid grid-cols-3 gap-2 h-full">
                      {/* Company Logos */}
                      <div className="bg-gradient-to-br from-blue-600 to-blue-400 rounded flex items-center justify-center animate-instructor-glow">
                        <div className="text-white text-xs font-bold">GOOGLE</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-600 to-green-400 rounded flex items-center justify-center animate-instructor-glow" style={{ animationDelay: '0.3s' }}>
                        <div className="text-white text-xs font-bold">MSFT</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-600 to-orange-400 rounded flex items-center justify-center animate-instructor-glow" style={{ animationDelay: '0.6s' }}>
                        <div className="text-white text-xs font-bold">AMZN</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-600 to-purple-400 rounded flex items-center justify-center animate-instructor-glow" style={{ animationDelay: '0.9s' }}>
                        <div className="text-white text-xs font-bold">META</div>
                      </div>
                      <div className="bg-gradient-to-br from-red-600 to-red-400 rounded flex items-center justify-center animate-instructor-glow" style={{ animationDelay: '1.2s' }}>
                        <div className="text-white text-xs font-bold">NFLX</div>
                      </div>
                      <div className="bg-gradient-to-br from-indigo-600 to-indigo-400 rounded flex items-center justify-center animate-instructor-glow" style={{ animationDelay: '1.5s' }}>
                        <div className="text-white text-xs font-bold">UBER</div>
                      </div>
                    </div>
                  </div>
                  {/* Stats Bar */}
                  <div className="absolute bottom-3 left-3 right-3 flex gap-2">
                    <div className="flex-1 h-6 bg-gradient-to-r from-blue-500 to-cyan-400 rounded flex items-center justify-center animate-stat-pulse">
                      <div className="text-xs font-bold text-white">50+ Experts</div>
                    </div>
                    <div className="flex-1 h-6 bg-gradient-to-r from-purple-500 to-pink-400 rounded flex items-center justify-center animate-stat-pulse" style={{ animationDelay: '0.3s' }}>
                      <div className="text-xs font-bold text-white">15+ Years</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 gradient-accent text-white px-4 py-2">
                Expert Guidance
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                Learn from Industry Leaders
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Our instructors are working professionals with expertise from leading companies. Get real-world insights and practical knowledge.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                  <div className="text-sm text-gray-600">Expert Instructors</div>
                </div>
                <div className="text-center p-4 bg-white rounded-xl shadow-lg">
                  <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 relative h-96 hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 via-blue-500 to-cyan-400 rounded-2xl animate-gradient-shift">
                <div className="absolute top-8 left-8 w-32 h-4 bg-white/20 rounded animate-slide-right"></div>
                <div className="absolute top-16 left-12 w-24 h-4 bg-white/15 rounded animate-slide-right" style={{ animationDelay: '0.5s' }}></div>
                <div className="absolute top-24 left-8 w-28 h-4 bg-white/10 rounded animate-slide-right" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-20 right-8 w-16 h-16 bg-yellow-400/40 rounded-full animate-bounce-3d"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-white text-6xl animate-pulse-slow">👨‍🏫</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Career Growth Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-96"
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-green-500 via-emerald-600 to-teal-500 rounded-2xl animate-gradient-shift">
                <div className="absolute top-12 left-12 w-8 h-20 bg-white/30 rounded animate-grow-up"></div>
                <div className="absolute top-8 left-24 w-8 h-24 bg-white/25 rounded animate-grow-up" style={{ animationDelay: '0.3s' }}></div>
                <div className="absolute top-4 left-36 w-8 h-28 bg-white/20 rounded animate-grow-up" style={{ animationDelay: '0.6s' }}></div>
                <div className="absolute bottom-16 right-12 w-20 h-20 bg-yellow-400/40 rounded-full animate-rotate-3d"></div>
                {/* Dashboard Mockup */}
                <div className="absolute inset-6 bg-white/95 rounded-lg animate-dashboard-glow">
                  <div className="absolute top-4 left-4 right-4 h-8 bg-gray-100 rounded flex items-center px-3">
                    <div className="text-xs font-bold text-gray-600">Career Dashboard</div>
                  </div>
                  <div className="absolute top-16 left-4 right-4 bottom-16">
                    <div className="relative h-full flex items-end justify-center gap-3">
                      <div className="w-8 bg-gradient-to-t from-blue-500 to-blue-300 rounded-t animate-chart-grow" style={{ height: '40%' }}></div>
                      <div className="w-8 bg-gradient-to-t from-purple-500 to-purple-300 rounded-t animate-chart-grow" style={{ height: '60%', animationDelay: '0.2s' }}></div>
                      <div className="w-8 bg-gradient-to-t from-green-500 to-green-300 rounded-t animate-chart-grow" style={{ height: '80%', animationDelay: '0.4s' }}></div>
                      <div className="w-8 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t animate-chart-grow" style={{ height: '95%', animationDelay: '0.6s' }}></div>
                      <div className="w-8 bg-gradient-to-t from-red-500 to-red-300 rounded-t animate-chart-grow" style={{ height: '70%', animationDelay: '0.8s' }}></div>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                    <div className="flex-1 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded animate-stat-pulse flex items-center justify-center">
                      <div className="text-xs font-bold text-white">87% Growth</div>
                    </div>
                    <div className="flex-1 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded animate-stat-pulse flex items-center justify-center" style={{ animationDelay: '0.3s' }}>
                      <div className="text-xs font-bold text-white">+$50K Salary</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4 gradient-primary text-white px-4 py-2">
                Career Success
              </Badge>
              <h2 className="text-4xl font-bold mb-6">
                Accelerate Your Career Growth
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Join thousands of professionals who have transformed their careers with our courses. Get the skills that employers are looking for.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                  <span>87% of students get promoted within 6 months</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-6 h-6 text-yellow-500" />
                  <span>Industry-recognized certificates</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-500" />
                  <span>Career support and job placement assistance</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Courses Slider */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 gradient-primary text-white px-4 py-2">
              Popular Courses
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Start Learning Today
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our most popular courses and start your learning journey
            </p>
          </div>

          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-12"
          >
            {courses.map((course) => (
              <SwiperSlide key={course.id}>
                <Link to={`/courses/${course.slug}`}>
                  <Card className="group overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 shadow-card hover:shadow-elevated">
                    <div className="relative overflow-hidden">
                      <img
                        src={getCourseImage(course.id, course.category)}
                        alt={course.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 right-4 gradient-accent text-white">
                        {course.level}
                      </Badge>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{course.category}</Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-smooth line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                          <span className="font-semibold">{course.rating}</span>
                          <span>({course.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{course.students.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-primary">{`₹${course.price.toLocaleString('en-IN')}`}</span>
                          <span className="text-sm text-muted-foreground line-through ml-2">
                            {`₹${course.originalPrice.toLocaleString('en-IN')}`}
                          </span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-smooth" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="text-center mt-8">
            <Button asChild size="lg" variant="outline" className="border-2">
              <Link to="/courses">
                View All Courses
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Creative Portfolio Showcase */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-white"></div>
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1558655146-d09347e92766?w=1920&h=1080&fit=crop&auto=format&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-10 w-24 h-24 bg-gradient-to-br from-purple-200/40 to-blue-200/40 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
          <div className="absolute bottom-1/4 right-10 w-20 h-20 bg-gradient-to-br from-pink-200/40 to-purple-200/40 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <Badge className="mb-6 gradient-primary text-white px-4 py-2">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Student Showcase
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Creative Projects by Our Students
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                See the amazing work created by our students in design, digital art, and creative media courses. From concept to completion, witness the transformation of ideas into professional portfolios.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  className="text-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </motion.div>
                <motion.div
                  className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg"
                  whileHover={{ scale: 1.05, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
                  <div className="text-sm text-gray-600">Portfolio Success</div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
                <motion.img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="AI-powered learning and student projects showcase"
                  className="relative w-full h-auto rounded-2xl shadow-2xl"
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50"></div>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop&auto=format&q=80')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-16 h-16 bg-purple-300/30 rounded-full animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-12 h-12 bg-blue-300/30 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-pink-300/30 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 gradient-primary text-white px-4 py-2">
              Why Choose Us
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Learn with Confidence
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to succeed in your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center group hover:shadow-elevated transition-all duration-300 border-2 hover:border-primary h-full bg-white">
                  <div className="w-16 h-16 mx-auto mb-4 gradient-primary rounded-2xl flex items-center justify-center shadow-glow group-hover:scale-110 transition-smooth">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-secondary/30"></div>
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&auto=format&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-10 left-10 w-16 h-16 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 gradient-accent text-white px-4 py-2">
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our Students Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied learners who transformed their careers
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                768: { slidesPerView: 2 }
              }}
              className="!pb-8"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide key={testimonial.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                  >
                    <Card className="p-6 hover:shadow-elevated transition-all duration-300 h-full">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <p className="text-foreground mb-6 leading-relaxed">"{testimonial.text}"</p>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12 gradient-primary">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {testimonial.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
              Ready to Start Learning?
            </h2>
            <p className="text-base text-gray-200 mb-5">
              Join 250,000+ students already transforming their careers with QuickEdu
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-6 shadow-2xl">
                <Link to="/courses">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse Courses
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <button
                onClick={() => window.location.href = '/register'}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-lg font-medium transition-colors border-2 border-white px-8 py-6 h-11 cursor-pointer"
                style={{
                  backgroundColor: 'rgba(255, 0, 0, 0.5)',
                  color: '#ffffff',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                Get Started Free
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-white/80">
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <Star className="w-5 h-5 fill-yellow-300 text-yellow-300" />
              <span className="ml-2">4.8/5 from 50,000+ reviews</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
