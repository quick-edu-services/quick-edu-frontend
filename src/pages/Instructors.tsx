import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, Users, BookOpen, GraduationCap, Award, Globe, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { getAllInstructorsApi, Instructor } from "@/networking/instructor-apis";
import { InstructorGridSkeleton } from "@/components/skeletons";

const Instructors = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const data = await getAllInstructorsApi();
        setInstructors(data);
      } catch (error) {
        console.error("Failed to fetch instructors", error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-purple-900/90 to-blue-900/95"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                <GraduationCap className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">Meet Our Expert Instructors</h1>
            <p className="text-xl text-gray-200 drop-shadow-md">
              Learn from industry professionals with years of real-world experience
            </p>
            <div className="flex items-center justify-center gap-8 mt-8 text-white/80">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">500+ Expert Instructors</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm">1000+ Courses Taught</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-sm">4.8 Average Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="overflow-x-auto">
            <div className="flex gap-6 min-w-max justify-center pb-4">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="text-center flex-shrink-0"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg hover:scale-110 transition-transform duration-300">
                  <Users className="w-7 h-7 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">50+</div>
                <div className="text-sm text-gray-600 whitespace-nowrap">Expert Instructors</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-center flex-shrink-0"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">100+</div>
                <div className="text-sm text-gray-600 whitespace-nowrap">Courses Taught</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center flex-shrink-0"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg hover:scale-110 transition-transform duration-300">
                  <Star className="w-7 h-7 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">4.8</div>
                <div className="text-sm text-gray-600 whitespace-nowrap">Average Rating</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
                className="text-center flex-shrink-0"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg hover:scale-110 transition-transform duration-300">
                  <Award className="w-7 h-7 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-2">3+</div>
                <div className="text-sm text-gray-600 whitespace-nowrap">Branches</div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Instructors Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 gradient-primary text-white px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Our Team
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Featured Instructors</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the industry experts who will guide your learning journey
            </p>
          </div>

          {loading ? (
            <>
              <div className="mb-6 text-center text-muted-foreground">
                Loading instructors...
              </div>
              <InstructorGridSkeleton count={8} />
            </>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {instructors.map((instructor, index) => (
                <motion.div
                  key={instructor.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 hover:border-primary/20 bg-gradient-to-br from-white to-gray-50/50 h-full min-h-[320px]">
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
                          <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                            {instructor.avatar || instructor.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{instructor.name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{instructor.title}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{instructor.rating}</span>
                          <span className="text-sm text-muted-foreground">({instructor.courses} courses)</span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {instructor.students.toLocaleString()} students
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{instructor.bio}</p>

                      <div className="flex flex-wrap gap-2">
                        {/* Handle expertise array safely if it's undefined initially or from simplified API response */}
                        {instructor.expertise?.slice(0, 3).map((skill, i) => (
                          <Badge key={i} variant="outline" className="text-xs hover:bg-primary hover:text-white transition-colors">
                            {skill}
                          </Badge>
                        ))}
                        {instructor.expertise?.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{instructor.expertise.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative overflow-hidden">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.1
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-white">Ready to Learn from the Best?</h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of students learning from industry experts
            </p>
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/courses">
                  <Badge className="bg-white/20 text-white px-6 py-3 text-lg cursor-pointer hover:bg-white/30 transition-colors">
                    Browse All Courses
                  </Badge>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Instructors;
