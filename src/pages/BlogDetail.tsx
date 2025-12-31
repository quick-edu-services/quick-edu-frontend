import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowLeft } from "lucide-react";

const BlogDetail = () => {
  const { id } = useParams();

  // Sample blog posts data (same as in Blog.tsx)
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Education: Transforming Learning Experiences",
      excerpt: "Discover how artificial intelligence is revolutionizing online education and creating personalized learning paths for students India-wide.",
      category: "Research",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      content: `
        <p>Artificial Intelligence is fundamentally transforming the landscape of online education. From personalized learning paths to intelligent tutoring systems, AI is making education more accessible and effective than ever before.</p>
        
        <h2>Personalized Learning Paths</h2>
        <p>AI algorithms analyze student performance and learning patterns to create customized educational experiences. This ensures that each student receives content tailored to their pace and learning style.</p>
        
        <h2>Intelligent Tutoring Systems</h2>
        <p>Modern AI-powered tutoring systems can provide instant feedback, answer questions, and guide students through complex topics with unprecedented accuracy.</p>
        
        <h2>The Future</h2>
        <p>As AI technology continues to evolve, we can expect even more innovative applications in education, making quality learning accessible to everyone.</p>
      `
    },
    {
      id: 2,
      title: "Remote Learning Statistics: 2024 India Education Report",
      excerpt: "Latest research shows 73% increase in online course enrollment. Explore the comprehensive data on remote learning trends and student outcomes.",
      category: "News",
      author: "Michael Chen",
      date: "2024-01-12",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      content: `
        <p>The shift to remote learning in India has accelerated dramatically, with enrollment in online courses increasing by 73% over the past year.</p>
        
        <h2>Key Statistics</h2>
        <p>Our comprehensive analysis reveals significant trends in online education adoption across different demographics and regions.</p>
        
        <h2>Student Outcomes</h2>
        <p>Data shows that students in well-designed online courses achieve learning outcomes comparable to or better than traditional classroom settings.</p>
      `
    },
    {
      id: 3,
      title: "Breakthrough in Microlearning: 15-Minute Sessions Show 40% Better Retention",
      excerpt: "New research from Stanford University reveals that short, focused learning sessions significantly improve knowledge retention and student engagement.",
      category: "Research",
      author: "Prof. Emily Rodriguez",
      date: "2024-01-10",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      content: `
        <p>Stanford University researchers have discovered that microlearning sessions of 15 minutes or less result in 40% better knowledge retention compared to traditional hour-long lectures.</p>
        
        <h2>The Science Behind Microlearning</h2>
        <p>Short, focused learning sessions align better with human attention spans and cognitive processing capabilities.</p>
        
        <h2>Implementation Strategies</h2>
        <p>Educational institutions are now redesigning curricula to incorporate microlearning principles for maximum effectiveness.</p>
      `
    },
    {
      id: 4,
      title: "QuickEdu Reaches 300,000 Students Milestone Across 200 Countries",
      excerpt: "Celebrating our India-wide community growth and the launch of 50 new courses in emerging technologies including blockchain and quantum computing.",
      category: "News",
      author: "QuickEdu Team",
      date: "2024-01-08",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      content: `
        <p>We're thrilled to announce that QuickEdu has reached a major milestone: 300,000 active students India-wide!</p>
        
        <h2>New Course Offerings</h2>
        <p>To celebrate this achievement, we're launching 50 new courses in cutting-edge technologies including blockchain development, quantum computing, and advanced AI.</p>
        
        <h2>Community Impact</h2>
        <p>Our growing community represents the future of accessible, quality education for all.</p>
      `
    },
    {
      id: 5,
      title: "The Science Behind Effective Online Learning: Cognitive Load Theory",
      excerpt: "Understanding how the human brain processes information can help design better online courses. Latest neuroscience research insights.",
      category: "Research",
      author: "Dr. James Wilson",
      date: "2024-01-05",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      content: `
        <p>Cognitive Load Theory provides crucial insights into how we can design more effective online learning experiences.</p>
        
        <h2>Understanding Cognitive Load</h2>
        <p>The human brain has limited working memory capacity. Effective course design must account for these limitations.</p>
        
        <h2>Practical Applications</h2>
        <p>By applying cognitive load principles, educators can create courses that maximize learning while minimizing mental strain.</p>
      `
    },
    {
      id: 6,
      title: "Industry Report: Top 10 Most In-Demand Skills for 2024",
      excerpt: "Based on analysis of 50,000+ job postings, we reveal the skills that employers are actively seeking in the current market.",
      category: "News",
      author: "Career Research Team",
      date: "2024-01-03",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      content: `
        <p>Our comprehensive analysis of over 50,000 job postings reveals the most in-demand skills for 2024.</p>
        
        <h2>Top Skills</h2>
        <p>AI/ML, cloud computing, cybersecurity, and data science lead the list of most sought-after skills.</p>
        
        <h2>Career Implications</h2>
        <p>Professionals who develop these skills position themselves for significant career advancement opportunities.</p>
      `
    },
    {
      id: 7,
      title: "Gamification in Education: Research Shows 45% Increase in Course Completion",
      excerpt: "Comprehensive study analyzing 10,000+ students reveals how game mechanics improve learning outcomes and student retention rates.",
      category: "Research",
      author: "Dr. Lisa Chen",
      date: "2024-01-01",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      content: `
        <p>A comprehensive study of over 10,000 students demonstrates that gamification increases course completion rates by 45%.</p>
        
        <h2>Game Mechanics in Learning</h2>
        <p>Points, badges, leaderboards, and challenges create engaging learning experiences that motivate students.</p>
        
        <h2>Long-term Benefits</h2>
        <p>Gamified courses not only improve completion rates but also enhance long-term knowledge retention.</p>
      `
    },
    {
      id: 8,
      title: "Blockchain Certificates Gain Recognition from Major Universities",
      excerpt: "Harvard, MIT, and Stanford announce acceptance of blockchain-verified credentials, marking a shift toward decentralized education verification.",
      category: "News",
      author: "Higher Ed Today",
      date: "2023-12-28",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      content: `
        <p>Major universities including Harvard, MIT, and Stanford are now accepting blockchain-verified educational credentials.</p>
        
        <h2>The Blockchain Advantage</h2>
        <p>Blockchain technology provides tamper-proof, instantly verifiable credentials that employers can trust.</p>
        
        <h2>Future of Credentials</h2>
        <p>This marks a significant shift toward decentralized, secure educational verification systems.</p>
      `
    }
  ];

  const post = blogPosts.find(p => p.id === parseInt(id || "0"));

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <Navbar />

      <article className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button asChild variant="ghost" className="mb-6">
              <Link to="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            <Badge className={`mb-4 ${post.category === 'Research' ? 'bg-blue-500' : 'bg-green-500'} text-white`}>
              {post.category}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>

            <div className="flex items-center gap-6 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <span>{post.readTime}</span>
            </div>

            <img
              src={post.image}
              alt={post.title}
              className="w-full h-96 object-cover rounded-xl mb-8 shadow-lg"
            />

            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 pt-8 border-t">
              <Button asChild>
                <Link to="/blog">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to All Posts
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogDetail;
