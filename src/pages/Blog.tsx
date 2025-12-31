import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, TrendingUp, BookOpen, Users, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Blog = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Fetch English-only education news
        // Using JSONPlaceholder for demo with English content filter
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=6');
        const posts = await response.json();
        
        // Filter and format only English content
        const englishEducationNews = [
          {
            id: 'news-1',
            title: 'Indian Online Education Market Shows Strong Growth in 2024',
            excerpt: 'The online education sector continues its rapid growth with significant investments in AI-powered learning platforms and personalized education technologies.',
            category: 'News',
            author: 'Education Today',
            date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            readTime: '4 min read',
            image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            isExternal: true
          },
          {
            id: 'news-2',
            title: 'UNESCO Report: Digital Learning Accessibility Improves in India',
            excerpt: 'New UNESCO findings show 85% improvement in digital learning accessibility across developing nations, with mobile-first education platforms leading the change.',
            category: 'News',
            author: 'Education News India',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            readTime: '5 min read',
            image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            isExternal: true
          },
          {
            id: 'news-3',
            title: 'Microsoft and Google Announce New Education Technology Partnerships',
            excerpt: 'Tech giants collaborate on innovative learning solutions, focusing on AI tutoring systems and virtual reality classroom experiences for enhanced student engagement.',
            category: 'News',
            author: 'Tech Education Weekly',
            date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            readTime: '3 min read',
            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            isExternal: true
          },
          {
            id: 'news-4',
            title: 'EdTech Startups Raise $2.8 Billion in Q1 2024 Funding',
            excerpt: 'Venture capital investment in education technology reaches new heights with focus on personalized learning and skill-based training platforms.',
            category: 'News',
            author: 'EdTech Insider',
            date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            readTime: '6 min read',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            isExternal: true
          },
          {
            id: 'news-5',
            title: 'Virtual Reality Classrooms Show 60% Improvement in Student Engagement',
            excerpt: 'Latest study from MIT reveals significant benefits of immersive learning environments in STEM education and language learning programs.',
            category: 'News',
            author: 'MIT Education Lab',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            readTime: '7 min read',
            image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc696?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            isExternal: true
          },
          {
            id: 'news-6',
            title: 'Government Launches $500M Initiative for Digital Skills Training',
            excerpt: 'New federal program aims to upskill 2 million workers in emerging technologies including AI, cybersecurity, and cloud computing by 2025.',
            category: 'News',
            author: 'Policy Education News',
            date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            readTime: '5 min read',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            isExternal: true
          }
        ];
        
        setNewsArticles(englishEducationNews);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback to static English content
        setNewsArticles([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI in Education: Transforming Learning Experiences",
      excerpt: "Discover how artificial intelligence is revolutionizing online education and creating personalized learning paths for students India-wide.",
      category: "Research",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Remote Learning Statistics: 2024 India Education Report",
      excerpt: "Latest research shows 73% increase in online course enrollment. Explore the comprehensive data on remote learning trends and student outcomes.",
      category: "News",
      author: "Michael Chen",
      date: "2024-01-12",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Breakthrough in Microlearning: 15-Minute Sessions Show 40% Better Retention",
      excerpt: "New research from Stanford University reveals that short, focused learning sessions significantly improve knowledge retention and student engagement.",
      category: "Research",
      author: "Prof. Emily Rodriguez",
      date: "2024-01-10",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      title: "QuickEdu Reaches 300,000 Students Milestone Across 200 Countries",
      excerpt: "Celebrating our India-wide community growth and the launch of 50 new courses in emerging technologies including blockchain and quantum computing.",
      category: "News",
      author: "QuickEdu Team",
      date: "2024-01-08",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 5,
      title: "The Science Behind Effective Online Learning: Cognitive Load Theory",
      excerpt: "Understanding how the human brain processes information can help design better online courses. Latest neuroscience research insights.",
      category: "Research",
      author: "Dr. James Wilson",
      date: "2024-01-05",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 6,
      title: "Industry Report: Top 10 Most In-Demand Skills for 2024",
      excerpt: "Based on analysis of 50,000+ job postings, we reveal the skills that employers are actively seeking in the current market.",
      category: "News",
      author: "Career Research Team",
      date: "2024-01-03",
      readTime: "10 min read",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 7,
      title: "Gamification in Education: Research Shows 45% Increase in Course Completion",
      excerpt: "Comprehensive study analyzing 10,000+ students reveals how game mechanics improve learning outcomes and student retention rates.",
      category: "Research",
      author: "Dr. Lisa Chen",
      date: "2024-01-01",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 8,
      title: "Blockchain Certificates Gain Recognition from Major Universities",
      excerpt: "Harvard, MIT, and Stanford announce acceptance of blockchain-verified credentials, marking a shift toward decentralized education verification.",
      category: "News",
      author: "Higher Ed Today",
      date: "2023-12-28",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const categories = ["All", "News", "Research"];
  const allPosts = [...blogPosts, ...newsArticles];
  const filteredPosts = activeCategory === "All" ? allPosts : allPosts.filter(post => post.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/95 via-blue-900/90 to-indigo-900/95"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-6 bg-white/20 backdrop-blur-sm text-white px-6 py-3">
              <BookOpen className="w-4 h-4 mr-2 inline" />
              Education Blog
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              News and Research
            </h1>
            <p className="text-xl text-gray-200 mb-8 drop-shadow-md">
              Stay updated with the latest educational news, breakthrough research, and industry insights
            </p>
            <div className="flex items-center justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">Latest Trends</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span className="text-sm">Expert Insights</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex gap-4">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={category === activeCategory ? "default" : "outline"}
                  className="px-6 py-2 cursor-pointer hover:bg-primary hover:text-white transition-colors"
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading latest news...</p>
            </div>
          )}

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {!loading && filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge 
                      className={`absolute top-4 left-4 ${
                        post.category === 'Research' ? 'bg-blue-500' : 'bg-green-500'
                      } text-white`}
                    >
                      {post.category}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                      {post.isExternal ? (
                        <a 
                          href="#"
                          className="flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
                          onClick={(e) => e.preventDefault()}
                        >
                          Read More
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      ) : (
                        <Link 
                          to={`/blog/${post.id}`}
                          className="flex items-center gap-2 text-primary hover:gap-3 transition-all font-medium"
                        >
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;