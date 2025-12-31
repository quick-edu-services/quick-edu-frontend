import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Search, BookOpen } from "lucide-react";
import { toast } from "sonner";
import {
  getAllCoursesApi,
  createCourseApi,
  updateCourseApi,
  deleteCourseApi,
  Course
} from "@/networking/course-apis";

const AdminCourseManager = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState<Partial<Course>>({
    title: "",
    category: "",
    level: "Beginner",
    price: 0,
    originalPrice: 0,
    instructor: "Default Instructor",
    instructorId: "instructor-1",
    duration: "",
    lectures: 0,
    description: "",
    highlights: [],
    image: ""
  });

  const fetchCourses = async () => {
    try {
      const data = await getAllCoursesApi();
      setCourses(data);
    } catch (error) {
      console.error("Failed to fetch courses", error);
      toast.error("Failed to load courses");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleAddCourse = async () => {
    if (!formData.title || !formData.category) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      const newCourseData: Partial<Course> = {
        ...formData,
        slug: formData.title.toLowerCase().replace(/\s+/g, '-'),
        rating: 4.5, // Default
        reviews: 0,
        students: 0,
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085", // Default placeholder
      };

      await createCourseApi(newCourseData);
      toast.success("Course created successfully!");
      setIsDialogOpen(false);
      resetForm();
      fetchCourses();
    } catch (error) {
      console.error("Create course error", error);
      toast.error("Failed to create course");
    }
  };

  const handleUpdateCourse = async () => {
    if (!editingCourse || (!editingCourse._id && !editingCourse.id)) return;
    const courseId = editingCourse._id || editingCourse.id;

    try {
      if (courseId) {
        await updateCourseApi(courseId, formData);
        toast.success("Course updated successfully!");
        setIsDialogOpen(false);
        setEditingCourse(null);
        resetForm();
        fetchCourses();
      }
    } catch (error) {
      console.error("Update course error", error);
      toast.error("Failed to update course");
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteCourseApi(id);
        toast.success("Course deleted successfully!");
        fetchCourses();
      } catch (error) {
        console.error("Delete course error", error);
        toast.error("Failed to delete course");
      }
    }
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setFormData(course);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      level: "Beginner",
      price: 0,
      originalPrice: 0,
      instructor: "Default Instructor",
      instructorId: "instructor-1",
      duration: "",
      lectures: 0,
      description: "",
      highlights: [],
      image: ""
    });
    setEditingCourse(null);
  };

  const filteredCourses = courses.filter(course =>
    course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Course Management</h2>
          <p className="text-muted-foreground">Manage all courses on the platform</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCourse ? "Edit Course" : "Add New Course"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Course title"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category *</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Web Development"
                  />
                </div>
                <div>
                  <Label>Level</Label>
                  <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price (₹)</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Original Price (₹)</Label>
                  <Input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Duration</Label>
                  <Input
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    placeholder="e.g., 10 hours"
                  />
                </div>
                <div>
                  <Label>Lectures</Label>
                  <Input
                    type="number"
                    value={formData.lectures}
                    onChange={(e) => setFormData({ ...formData, lectures: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <Label>Instructor</Label>
                <Input
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  placeholder="Instructor name"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Course description"
                  rows={4}
                />
              </div>
              <div>
                <Label>Highlights (comma-separated)</Label>
                <Input
                  value={formData.highlights?.join(", ")}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value.split(",").map(h => h.trim()) })}
                  placeholder="e.g., Live Projects, Certification, Career Support"
                />
              </div>
              <Button onClick={editingCourse ? handleUpdateCourse : handleAddCourse} className="w-full">
                {editingCourse ? "Update Course" : "Add Course"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="space-y-4">
          {filteredCourses.map((course) => (
            <motion.div
              key={course._id || course.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                      <h3 className="font-bold text-lg">{course.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline">{course.category}</Badge>
                      <Badge variant="secondary">{course.level}</Badge>
                      <Badge>₹{course.price?.toLocaleString() || 0}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>{course.duration}</span>
                      <span>{course.lectures} lectures</span>
                      <span>{course.students?.toLocaleString() || 0} students</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => openEditDialog(course)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDeleteCourse(course._id || course.id!)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AdminCourseManager;
