import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Star,
  Users,
  Clock,
  BookOpen,
  PlayCircle,
  CheckCircle2,
  Download,
  Award,
  Smartphone,
  Infinity,
} from "lucide-react";
import { getCourseBySlugApi, Course } from "@/networking/course-apis";
import { getInstructorByIdApi, Instructor } from "@/networking/instructor-apis";
import { isAuthenticated } from "@/lib/auth";
import { toast } from "sonner";
import { addToCart, isInCart, removeFromCart } from "@/lib/cart";
import { ShoppingCart } from "lucide-react";

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

const CourseDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [instructor, setInstructor] = useState<Instructor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const courseData = await getCourseBySlugApi(slug);

        if (!courseData) {
          setError(true);
          return;
        }

        setCourse(courseData);

        if (courseData.instructorId) {
          try {
            const instructorData = await getInstructorByIdApi(courseData.instructorId);
            setInstructor(instructorData);
          } catch (err) {
            console.log("Instructor fetch failed, continuing without instructor details");
          }
        }
      } catch (err) {
        console.error("Failed to fetch course details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  useEffect(() => {
    if (course) {
      setInCart(isInCart(course.id || ''));
    }
  }, [course]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center animate-pulse">
          <h1 className="text-2xl font-bold mb-4">Loading Course Details...</h1>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">The course you are looking for does not exist or has been removed.</p>
          <Button asChild>
            <Link to="/courses">Back to Courses</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!isAuthenticated()) {
      toast.error("Please login to enroll in this course");
      navigate("/login");
      return;
    }
    navigate("/checkout", { state: { course } });
  };

  const handleAddToCart = () => {
    if (!course) return;

    const cartItem = {
      courseId: course.id,
      courseTitle: course.title,
      price: course.price,
      originalPrice: course.originalPrice,
      image: getCourseImage(course.id, course.category),
      slug: course.slug,
    };

    const added = addToCart(cartItem);
    if (added) {
      setInCart(true);
      toast.success("Course added to cart");
    } else {
      toast.info("Course already in cart");
    }
  };

  const handleRemoveFromCart = () => {
    if (!course) return;
    removeFromCart(course.id);
    setInCart(false);
    toast.success("Course removed from cart");
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const features = [
    { icon: Infinity, label: "Lifetime Access" },
    { icon: Smartphone, label: "Mobile Friendly" },
    { icon: Download, label: "Downloadable Resources" },
    { icon: Award, label: "Certificate of Completion" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="gradient-accent text-white">{course.level}</Badge>
                  <Badge variant="outline">{course.category}</Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
                <p className="text-xl text-muted-foreground mb-6">{course.description}</p>

                <div className="flex flex-wrap items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-muted-foreground">
                      ({course.reviews.toLocaleString()} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span>{course.lectures} lectures</span>
                  </div>
                </div>

                {instructor && (
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm text-muted-foreground">Instructor</div>
                      <Link to="/instructors" className="font-semibold hover:text-primary transition-smooth">
                        {instructor.name}
                      </Link>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right Card - Sticky Enrollment */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="sticky top-24"
              >
                <Card className="overflow-hidden shadow-elevated border-2">
                  <div className="relative">
                    <img
                      src={getCourseImage(course.id, course.category)}
                      alt={course.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group cursor-pointer">
                      <PlayCircle className="w-16 h-16 text-white group-hover:scale-110 transition-smooth" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-6">
                      <div className="flex items-baseline gap-3 mb-2">
                        <span className="text-4xl font-bold text-primary">{`₹${course.price.toLocaleString('en-IN')}`}</span>
                        <span className="text-xl text-muted-foreground line-through">
                          {`₹${course.originalPrice.toLocaleString('en-IN')}`}
                        </span>
                      </div>
                      <Badge className="gradient-accent text-white">
                        {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <Button
                        onClick={handleEnroll}
                        className="w-full gradient-primary shadow-glow text-lg py-6"
                        size="lg"
                      >
                        Enroll Now
                      </Button>

                      {!inCart ? (
                        <Button
                          onClick={handleAddToCart}
                          variant="outline"
                          className="w-full text-lg py-6"
                          size="lg"
                        >
                          <ShoppingCart className="w-5 h-5 mr-2" />
                          Add to Cart
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            onClick={handleGoToCart}
                            variant="outline"
                            className="flex-1 text-lg py-6"
                            size="lg"
                          >
                            Go to Cart
                          </Button>
                          <Button
                            onClick={handleRemoveFromCart}
                            variant="outline"
                            className="text-lg py-6"
                            size="lg"
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3 text-sm">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-muted-foreground">
                          <feature.icon className="w-5 h-5 text-primary" />
                          <span>{feature.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-12">
              {/* What You'll Learn */}
              <div>
                <h2 className="text-3xl font-bold mb-6">What You'll Learn</h2>
                <Card className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Course Curriculum */}
              <div>
                <h2 className="text-3xl font-bold mb-6">Course Curriculum</h2>
                <Card className="p-6">
                  <div className="mb-4 text-muted-foreground">
                    {course.curriculum.reduce((sum, section) => sum + section.lectures, 0)} lectures • {course.duration} total length
                  </div>
                  <Accordion type="single" collapsible className="w-full">
                    {course.curriculum.map((section, index) => (
                      <AccordionItem key={index} value={`section-${index}`}>
                        <AccordionTrigger className="text-left">
                          <div className="flex items-center justify-between w-full pr-4">
                            <span className="font-semibold">{section.section}</span>
                            <span className="text-sm text-muted-foreground">
                              {section.lectures} lectures • {section.duration}
                            </span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-2 pl-4">
                            {[...Array(Math.min(5, section.lectures))].map((_, i) => (
                              <div key={i} className="flex items-center gap-2 text-sm py-2">
                                <PlayCircle className="w-4 h-4 text-muted-foreground" />
                                <span>Lecture {i + 1}: Introduction to {section.section}</span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </Card>
              </div>

              {/* Instructor Info */}
              {instructor && (
                <div>
                  <h2 className="text-3xl font-bold mb-6">Your Instructor</h2>
                  <Card className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="w-20 h-20">
                        <AvatarFallback>{instructor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-1">{instructor.name}</h3>
                        <p className="text-muted-foreground mb-3">{instructor.title}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span>{instructor.rating} Rating</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{instructor.students.toLocaleString()} Students</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{instructor.courses} Courses</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{instructor.bio}</p>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CourseDetails;
