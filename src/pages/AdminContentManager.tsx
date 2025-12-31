import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, FileText } from "lucide-react";
import { toast } from "sonner";

import { getContentApi, updateContentApi, HeroContent, AboutContent, ScrollingCourses } from "@/networking/content-apis";

const AdminContentManager = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "Transform Your Future with",
    subtitle: "World-Class Education",
    description: "Master in-demand skills with expert-led courses.",
    ctaText: "Explore Courses"
  });

  const [aboutContent, setAboutContent] = useState<AboutContent>({
    title: "About QuickEdu",
    description: "At QuickEdu, (MirawoTech Solutions Private Limited) where ambition meets achievement, Hyderabad's emerging learning destination.",
    mission: "Empowering learners to rise with skill, clarity, and confidence.",
    vision: "Your online path to progress simple, smart, and career-focused."
  });

  const [scrollingCourses, setScrollingCourses] = useState<ScrollingCourses>({
    courses: [
      "Microsoft Azure Fundamentals",
      "Cisco Cybersecurity Essentials",
      "Data Analytics with AI"
      // ... truncated list in logic, allow initializing with API data
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hero = await getContentApi<HeroContent>('hero');
        if (hero && hero.title) setHeroContent(hero);

        const about = await getContentApi<AboutContent>('about');
        if (about && about.title) setAboutContent(about);

        const scrolling = await getContentApi<ScrollingCourses>('scrolling');
        if (scrolling && scrolling.courses && scrolling.courses.length > 0) setScrollingCourses(scrolling);
      } catch (error) {
        console.error("Failed to load content:", error);
        toast.error("Failed to load content from server");
      }
    };
    fetchData();
  }, []);

  const handleSaveHero = async () => {
    try {
      await updateContentApi('hero', heroContent);
      toast.success("Hero content saved successfully!");
    } catch (error) {
      toast.error("Failed to save hero content");
    }
  };

  const handleSaveAbout = async () => {
    try {
      await updateContentApi('about', aboutContent);
      toast.success("About content saved successfully!");
    } catch (error) {
      toast.error("Failed to save about content");
    }
  };

  const handleSaveScrolling = async () => {
    try {
      await updateContentApi('scrolling', scrollingCourses);
      toast.success("Scrolling courses saved successfully!");
    } catch (error) {
      toast.error("Failed to save scrolling courses");
    }
  };

  const handleAddCourse = () => {
    setScrollingCourses({
      courses: [...scrollingCourses.courses, ""]
    });
  };

  const handleRemoveCourse = (index: number) => {
    setScrollingCourses({
      courses: scrollingCourses.courses.filter((_, i) => i !== index)
    });
  };

  const handleUpdateCourse = (index: number, value: string) => {
    const updated = [...scrollingCourses.courses];
    updated[index] = value;
    setScrollingCourses({ courses: updated });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Content Management</h2>
        <p className="text-muted-foreground">Manage homepage and website content</p>
      </div>

      <Tabs defaultValue="hero" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="about">About Content</TabsTrigger>
          <TabsTrigger value="scrolling">Scrolling Courses</TabsTrigger>
        </TabsList>

        <TabsContent value="hero">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label>Main Title</Label>
                <Input
                  value={heroContent.title}
                  onChange={(e) => setHeroContent({ ...heroContent, title: e.target.value })}
                  placeholder="Transform Your Future with"
                />
              </div>
              <div>
                <Label>Subtitle (Gradient Text)</Label>
                <Input
                  value={heroContent.subtitle}
                  onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                  placeholder="World-Class Education"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={heroContent.description}
                  onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                  placeholder="Master in-demand skills with expert-led courses."
                  rows={3}
                />
              </div>
              <div>
                <Label>CTA Button Text</Label>
                <Input
                  value={heroContent.ctaText}
                  onChange={(e) => setHeroContent({ ...heroContent, ctaText: e.target.value })}
                  placeholder="Explore Courses"
                />
              </div>
              <Button onClick={handleSaveHero} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Hero Content
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card className="p-6">
            <div className="space-y-4">
              <div>
                <Label>About Title</Label>
                <Input
                  value={aboutContent.title}
                  onChange={(e) => setAboutContent({ ...aboutContent, title: e.target.value })}
                  placeholder="About QuickEdu"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={aboutContent.description}
                  onChange={(e) => setAboutContent({ ...aboutContent, description: e.target.value })}
                  placeholder="Company description"
                  rows={4}
                />
              </div>
              <div>
                <Label>Mission Statement</Label>
                <Textarea
                  value={aboutContent.mission}
                  onChange={(e) => setAboutContent({ ...aboutContent, mission: e.target.value })}
                  placeholder="Our mission"
                  rows={3}
                />
              </div>
              <div>
                <Label>Vision Statement</Label>
                <Textarea
                  value={aboutContent.vision}
                  onChange={(e) => setAboutContent({ ...aboutContent, vision: e.target.value })}
                  placeholder="Our vision"
                  rows={3}
                />
              </div>
              <Button onClick={handleSaveAbout} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save About Content
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="scrolling">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <Label>Scrolling Course Names</Label>
                <Button onClick={handleAddCourse} size="sm">Add Course</Button>
              </div>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {scrollingCourses.courses.map((course, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={course}
                      onChange={(e) => handleUpdateCourse(index, e.target.value)}
                      placeholder="Course name"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveCourse(index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
              <Button onClick={handleSaveScrolling} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Scrolling Courses
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminContentManager;
