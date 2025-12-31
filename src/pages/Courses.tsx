import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Star,
  Users,
  Clock,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { getAllCoursesApi, Course } from "@/networking/course-apis";
import { CourseGridSkeleton } from "@/components/skeletons";
// Generate unique image for each course based on course ID
const getCourseImage = (course: Course) => {
  const courseId = course.id || '';
  const category = course.category;
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
    "course-065": "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&h=600&fit=crop&auto=format&q=80",

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
    "course-027": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&auto=format&q=80",

    // Additional courses
    "course-071": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format&q=80",
    "course-072": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&auto=format&q=80",
    "course-073": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&auto=format&q=80",
    "course-074": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format&q=80",
    "course-075": "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop&auto=format&q=80",
    "course-076": "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&fit=crop&auto=format&q=80",

    "course-078": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop&auto=format&q=80",
    "course-079": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format&q=80",
    "course-080": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop&auto=format&q=80",
    "course-081": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format&q=80",
    "course-082": "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=800&h=600&fit=crop&auto=format&q=80",
    "course-083": "https://images.unsplash.com/photo-1527474305487-b87b222841cc?w=800&h=600&fit=crop&auto=format&q=80"
  };

  // Fallback images based on category if specific course not found
  const categoryFallbacks: Record<string, string> = {
    "Web Development": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format&q=80",
    "Data Science": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&auto=format&q=80",
    "Marketing": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format&q=80",
    "Design": "https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop&auto=format&q=80",
    "Mobile": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&auto=format&q=80",
    "Cloud": "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=600&fit=crop&auto=format&q=80",
    "DevOps": "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&h=600&fit=crop&auto=format&q=80",
    "Security": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop&auto=format&q=80",
    "Cybersecurity": "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop&auto=format&q=80",
    "Business": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format&q=80",
    "Product": "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&auto=format&q=80",
    "Career": "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&h=600&fit=crop&auto=format&q=80",
    "Technology": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format&q=80",
    "AI": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop&auto=format&q=80",
    "Artificial Intelligence": "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&auto=format&q=80",
    "Blockchain": "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop&auto=format&q=80",
    "Cloud Computing": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&auto=format&q=80",
    "Database": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=600&fit=crop&auto=format&q=80",
    "Machine Learning": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&auto=format&q=80",
    "Emerging Technology": "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=600&fit=crop&auto=format&q=80",
    "Data Engineering": "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop&auto=format&q=80",
    "Scripting": "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=800&h=600&fit=crop&auto=format&q=80",
    "IT": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format&q=80"
  };

  return imageMap[courseId] || categoryFallbacks[category] || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop&auto=format&q=80";
};

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");

  const categories = ["All", "Web Development", "Data Science", "Marketing", "Design"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const data = await getAllCoursesApi();
        setCourses(data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    const matchesLevel = selectedLevel === "All" || course.level === selectedLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-primary" />
            <h1 className="text-5xl font-bold mb-4">Explore Our Courses</h1>
            <p className="text-xl text-muted-foreground">
              Browse {courses.length} expertly crafted courses to advance your career
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-card border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
              />
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "gradient-primary" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Level Filter */}
            <div className="flex gap-2 w-full md:w-auto">
              {levels.map((level) => (
                <Button
                  key={level}
                  variant={selectedLevel === level ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLevel(level)}
                  className={selectedLevel === level ? "gradient-accent" : ""}
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {loading ? (
            <>
              <div className="mb-6 text-muted-foreground">
                Loading courses...
              </div>
              <CourseGridSkeleton count={9} />
            </>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20">
              <Filter className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-bold mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <>
              <div className="mb-6 text-muted-foreground">
                Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link to={`/courses/${course.slug}`}>
                      <Card className="group overflow-hidden border-2 border-border hover:border-primary transition-all duration-300 shadow-card hover:shadow-elevated h-full flex flex-col">
                        <div className="relative overflow-hidden">
                          <img
                            src={getCourseImage(course)}
                            alt={course.title}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <Badge className="absolute top-4 left-4 gradient-accent text-white">
                            {course.level}
                          </Badge>
                          <Badge className="absolute top-4 right-4 bg-card text-foreground">
                            {course.category}
                          </Badge>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-smooth line-clamp-2">
                            {course.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-1">
                            {course.description}
                          </p>

                          <div className="space-y-3">
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                <span className="font-semibold">{course.rating}</span>
                                <span>({course.reviews.toLocaleString()})</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                <span>{course.students.toLocaleString()}</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{course.duration}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                <span>{course.lectures} lectures</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between pt-3 border-t border-border">
                              <div>
                                <span className="text-2xl font-bold text-primary">{`₹${course.price.toLocaleString('en-IN')}`}</span>
                                <span className="text-sm text-muted-foreground line-through ml-2">
                                  {`₹${course.originalPrice.toLocaleString('en-IN')}`}
                                </span>
                              </div>
                              <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-smooth" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
