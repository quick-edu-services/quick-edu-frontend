import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  Award,
  TrendingUp,
  Play,
  CheckCircle2,
  Mail,
  User as UserIcon,
  Calendar
} from "lucide-react";
import { getUserPurchases } from "@/lib/paymentGateway";
import { getAllCoursesApi, Course } from "@/networking/course-apis";
import { DashboardCourseGridSkeleton, StatsCardSkeleton } from "@/components/skeletons";
import { useAuthContext } from "@/context/AuthProvider";

// Generate unique image for each course based on course ID
const getCourseImage = (courseId: string, category: string) => {
  const imageMap: Record<string, string> = {
    "course-065": "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&h=600&fit=crop&auto=format&q=80",
    "test-it-course": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format&q=80",
    "web-dev-bootcamp": "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=600&fit=crop&auto=format&q=80",
    "data-science-ai": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format&q=80"
  };

  const categoryFallbacks: Record<string, string> = {
    "Web Development": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format&q=80",
    "Data Science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format&q=80",
    "Marketing": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format&q=80",
    "Design": "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&auto=format&q=80"
  };

  return imageMap[courseId] || categoryFallbacks[category] || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format&q=80";
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [allCourses, setAllCourses] = useState<Course[]>([]);

  // Since this is a protected route, userData should be available.
  // We use a simple guard just in case.
  if (!userData) {
    return null;
  }

  const user = userData;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getAllCoursesApi();
        setAllCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    if (allCourses.length > 0) {
      try {
        const purchases = getUserPurchases(user._id) || [];
        const purchased = purchases.map((p: any) => {
          const course = allCourses.find(c => c.id === p.courseId);
          if (!course) return null;
          return {
            ...course,
            purchaseDate: p.purchaseDate,
            progress: Math.floor(Math.random() * 100), // Mock progress
          };
        }).filter(c => c !== null); // Filter out nulls if course not found
        setEnrolledCourses(purchased);
      } catch (error) {
        console.log("Could not fetch purchases for guest", error);
        setEnrolledCourses([]);
      }
    }
  }, [navigate, user._id, allCourses]);



  const stats = [
    { icon: BookOpen, label: "Enrolled Courses", value: enrolledCourses.length },
    { icon: Clock, label: "Hours Learned", value: enrolledCourses.length * 12 },
    { icon: CheckCircle2, label: "Completed", value: Math.floor(enrolledCourses.length * 0.3) },
    { icon: Award, label: "Certificates", value: Math.floor(enrolledCourses.length * 0.3) },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          {/* User Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-2 border-purple-200 dark:border-purple-800">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {(user.fullName || user.email || "U").charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-1">{user.fullName || "User"}</h2>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {user.email}
                    </div>
                    {user.username && (
                      <div className="flex items-center gap-1">
                        <UserIcon className="w-4 h-4" />
                        @{user.username}
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {user.role === 'admin' ? 'Administrator' : user.role === 'instructor' ? 'Instructor' : 'Student'}
                    </div>
                  </div>
                </div>
                <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2">
                  {user.role === 'admin' ? '👑 Admin' : user.role === 'instructor' ? '👨‍🏫 Instructor' : '🎓 Student'}
                </Badge>
              </div>
            </Card>
          </motion.div>

          {/* Welcome Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user.fullName || "User"}! 👋</h1>
            <p className="text-xl text-muted-foreground">Continue your learning journey</p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <StatsCardSkeleton key={i} />
              ))
            ) : (
              stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6 hover:shadow-elevated transition-smooth">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                        <stat.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {/* Enrolled Courses */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">My Courses</h2>
              <Button asChild variant="outline">
                <Link to="/courses">Browse More Courses</Link>
              </Button>
            </div>

            {loading ? (
              <DashboardCourseGridSkeleton count={3} />
            ) : enrolledCourses.length === 0 ? (
              <Card className="p-12 text-center">
                <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">No courses yet</h3>
                <p className="text-muted-foreground mb-6">
                  Start learning by enrolling in a course
                </p>
                <Button asChild className="gradient-primary shadow-glow">
                  <Link to="/courses">Explore Courses</Link>
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden hover:shadow-elevated transition-all duration-300 border-2 hover:border-primary">
                      <div className="relative">
                        <img
                          src={getCourseImage(course.id, course.category)}
                          alt={course.title}
                          className="w-full h-40 object-cover"
                        />
                        <Badge className="absolute top-3 right-3 bg-card text-foreground">
                          {course.progress}% Complete
                        </Badge>
                      </div>
                      <div className="p-5">
                        <h3 className="font-bold mb-2 line-clamp-2">{course.title}</h3>
                        <div className="mb-4">
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-semibold">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                        <Button className="w-full gradient-primary">
                          <Play className="w-4 h-4 mr-2" />
                          Continue Learning
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Learning Path */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Recommended for You</h2>

            {loading ? (
              <DashboardCourseGridSkeleton count={3} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {allCourses.slice(0, 3).map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={`/courses/${course.slug}`}>
                      <Card className="overflow-hidden hover:shadow-elevated transition-all duration-300 border-2 hover:border-primary group">
                        <img
                          src={getCourseImage(course.id || '', course.category)}
                          alt={course.title}
                          className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="p-5">
                          <Badge className="mb-2" variant="secondary">{course.category}</Badge>
                          <h3 className="font-bold mb-2 group-hover:text-primary transition-smooth line-clamp-2">
                            {course.title}
                          </h3>
                          <div className="text-2xl font-bold text-primary">{`₹${course.price.toLocaleString('en-IN')}`}</div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
