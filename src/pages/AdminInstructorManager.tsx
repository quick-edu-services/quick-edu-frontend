import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Plus, Edit, Trash2, Search, Users } from "lucide-react";
import { toast } from "sonner";
import {
  getAllInstructorsApi,
  createInstructorApi,
  updateInstructorApi,
  deleteInstructorApi,
  Instructor
} from "@/networking/instructor-apis";

const AdminInstructorManager = () => {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
  const [formData, setFormData] = useState<Partial<Instructor>>({
    name: "",
    title: "",
    avatar: "",
    rating: 4.5,
    students: 0,
    courses: 0,
    bio: "",
    expertise: []
  });

  const fetchInstructors = async () => {
    try {
      const data = await getAllInstructorsApi();
      setInstructors(data);
    } catch (error) {
      console.error("Failed to fetch instructors", error);
      toast.error("Failed to load instructors");
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleAddInstructor = async () => {
    if (!formData.name || !formData.title) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      const newInstructor: Partial<Instructor> = {
        ...formData,
        avatar: formData.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'IN',
        rating: 4.5,
        students: 0,
        courses: 0,
      };

      await createInstructorApi(newInstructor);
      toast.success("Instructor created successfully!");
      setIsDialogOpen(false);
      resetForm();
      fetchInstructors();
    } catch (error) {
      console.error("Create instructor error", error);
      toast.error("Failed to create instructor");
    }
  };

  const handleUpdateInstructor = async () => {
    if (!editingInstructor || (!editingInstructor._id && !editingInstructor.id)) return;
    const instructorId = editingInstructor._id || editingInstructor.id;

    try {
      if (instructorId) {
        await updateInstructorApi(instructorId, formData);
        toast.success("Instructor updated successfully!");
        setIsDialogOpen(false);
        setEditingInstructor(null);
        resetForm();
        fetchInstructors();
      }
    } catch (error) {
      console.error("Update instructor error", error);
      toast.error("Failed to update instructor");
    }
  };

  const handleDeleteInstructor = async (id: string) => {
    if (confirm("Are you sure you want to delete this instructor?")) {
      try {
        await deleteInstructorApi(id);
        toast.success("Instructor deleted successfully!");
        fetchInstructors();
      } catch (error) {
        console.error("Delete instructor error", error);
        toast.error("Failed to delete instructor");
      }
    }
  };

  const openEditDialog = (instructor: Instructor) => {
    setEditingInstructor(instructor);
    setFormData(instructor);
    setIsDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      title: "",
      avatar: "",
      rating: 4.5,
      students: 0,
      courses: 0,
      bio: "",
      expertise: []
    });
    setEditingInstructor(null);
  };

  const filteredInstructors = instructors.filter(instructor =>
    instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    instructor.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Instructor Management</h2>
          <p className="text-muted-foreground">Manage all instructors on the platform</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Instructor
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingInstructor ? "Edit Instructor" : "Add New Instructor"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Instructor name"
                />
              </div>
              <div>
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Senior Web Developer & Tech Educator"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Rating</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Students</Label>
                  <Input
                    type="number"
                    value={formData.students}
                    onChange={(e) => setFormData({ ...formData, students: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label>Courses</Label>
                  <Input
                    type="number"
                    value={formData.courses}
                    onChange={(e) => setFormData({ ...formData, courses: Number(e.target.value) })}
                  />
                </div>
              </div>
              <div>
                <Label>Bio</Label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Instructor biography"
                  rows={4}
                />
              </div>
              <div>
                <Label>Expertise (comma-separated)</Label>
                <Input
                  value={formData.expertise?.join(", ")}
                  onChange={(e) => setFormData({ ...formData, expertise: e.target.value.split(",").map(s => s.trim()) })}
                  placeholder="e.g., Web Development, JavaScript, React"
                />
              </div>
              <Button onClick={editingInstructor ? handleUpdateInstructor : handleAddInstructor} className="w-full">
                {editingInstructor ? "Update Instructor" : "Add Instructor"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Search className="w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search instructors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredInstructors.map((instructor) => (
            <motion.div
              key={instructor._id || instructor.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Card className="p-4">
                <div className="flex gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-purple-500 to-blue-600 text-white">
                      {instructor.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{instructor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{instructor.title}</p>
                    <div className="flex gap-2 mb-2 text-sm">
                      <Badge variant="outline">⭐ {instructor.rating}</Badge>
                      <Badge variant="secondary">{instructor.courses} courses</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{instructor.students.toLocaleString()} students</p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {instructor.expertise?.slice(0, 3).map((skill, i) => (
                        <Badge key={i} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(instructor)}>
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteInstructor(instructor._id || instructor.id!)}>
                        <Trash2 className="w-3 h-3 mr-1" />
                        Delete
                      </Button>
                    </div>
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

export default AdminInstructorManager;
