import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Shield,
  LogOut,
  BookOpen,
  Users,
  Award,
  Settings,
  Mail,
  Phone,
  MapPin,
  Save,
  Edit,
  Trash2,
  Plus,
  CreditCard,
  TrendingUp,
  Calendar,
  Search,
  Download,
  Filter,
  Eye
} from "lucide-react";
// import { getCurrentAdmin, adminLogout } from "@/lib/adminAuth";
import { toast } from "sonner";
import QuickEduLogo from "@/assets/Quickedulogo-01.png";

import { getAllTransactions, getTransactionStats, searchTransactions, type Transaction } from "@/lib/transactions";
import AdminCourseManager from "./AdminCourseManager";
import AdminInstructorManager from "./AdminInstructorManager";
import AdminContentManager from "./AdminContentManager";
import { useAuthContext } from "@/context/AuthProvider";
import { getSettingsApi, updateSettingsApi, SiteSettings } from "@/networking/settings-apis";
import { getStatsApi, updateStatsApi, PlatformStats } from "@/networking/statistics-apis";
import { TableRowSkeleton, StatsCardSkeleton, TransactionRowSkeleton } from "@/components/skeletons";

// ... existing imports ...

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { userData, logout } = useAuthContext();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Transactions State
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionStats, setTransactionStats] = useState(getTransactionStats());

  // Site Settings State
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: "QuickEdu",
    tagline: "LEARN • GROW • SUCCEED",
    email: "info@quickedu.org.in",
    phone: "+91 9392328940",
    address: "PLOT NO - 39/C, H. NO - 301, SR TOWERS, HMT HILLS, ADDAGUTTA, TIRUMALAGIRI, KUKATPALLY, Medchal - Malkajgiri, HYDERABAD, TELANGANA - 500072, INDIA",
    aboutText: "At QuickEdu, (MirawoTech Solutions Private Limited) where ambition meets achievement, Hyderabad's emerging learning destination. Your online path to progress simple, smart, and career-focused. Empowering learners to rise with skill, clarity, and confidence.",
  });

  // Stats State
  const [stats, setStats] = useState<PlatformStats>({
    totalCourses: 0,
    totalInstructors: 0,
    activeStudents: "250,000+",
    branches: "3+"
  });

  useEffect(() => {
    // Fetch settings and stats on mount
    const fetchData = async () => {
      try {
        setLoading(true);
        const [settings, statsData] = await Promise.all([
          getSettingsApi(),
          getStatsApi()
        ]);

        if (settings) {
          setSiteSettings(prev => ({ ...prev, ...settings }));
        }
        if (statsData) {
          setStats(statsData);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Filter transactions based on search
    if (searchTerm) {
      const filtered = searchTransactions(transactions, searchTerm);
      setFilteredTransactions(filtered);
    } else {
      setFilteredTransactions(transactions);
    }
  }, [searchTerm, transactions]);

  const handleLogout = () => {
    setIsLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    logout('/admin/login');
    toast.success("Logged out successfully");
    setIsLogoutDialogOpen(false);
  };

  const handleSaveSettings = async () => {
    try {
      await updateSettingsApi(siteSettings);
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings");
    }
  };

  const handleSaveStats = async () => {
    try {
      await updateStatsApi({ activeStudents: stats.activeStudents, branches: stats.branches });
      toast.success("Statistics updated successfully!");
    } catch (error) {
      toast.error("Failed to update statistics");
    }
  };

  const formatCurrency = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'failed': return 'bg-red-100 text-red-700 border-red-200';
      case 'refunded': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={QuickEduLogo} alt="QuickEdu" className="w-10 h-10 rounded-lg" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
                <p className="text-sm text-slate-600">Manage your platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                <Shield className="w-3 h-3 mr-1" />
                {userData?.fullName || userData?.email || 'Admin'}
              </Badge>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="instructors">Instructors</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="stats">Statistics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-bold mb-6">Platform Overview</h2>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <StatsCardSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="p-6 border-2 hover:border-purple-200 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <BookOpen className="w-8 h-8 text-purple-600" />
                      <Badge className="bg-purple-100 text-purple-700">Active</Badge>
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{stats.totalCourses}</h3>
                    <p className="text-slate-600">Total Courses</p>
                  </Card>

                  <Card className="p-6 border-2 hover:border-blue-200 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="w-8 h-8 text-blue-600" />
                      <Badge className="bg-blue-100 text-blue-700">Active</Badge>
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{stats.totalInstructors}</h3>
                    <p className="text-slate-600">Instructors</p>
                  </Card>

                  <Card className="p-6 border-2 hover:border-green-200 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <Users className="w-8 h-8 text-green-600" />
                      <Badge className="bg-green-100 text-green-700">Growing</Badge>
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{stats.activeStudents}</h3>
                    <p className="text-slate-600">Active Students</p>
                  </Card>

                  <Card className="p-6 border-2 hover:border-orange-200 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <Award className="w-8 h-8 text-orange-600" />
                      <Badge className="bg-orange-100 text-orange-700">Awarded</Badge>
                    </div>
                    <h3 className="text-3xl font-bold mb-2">{stats.branches}</h3>
                    <p className="text-slate-600">Branches</p>
                  </Card>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Transaction History</h2>
                <Button variant="outline" className="border-purple-200">
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </div>

              {/* Transaction Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card className="p-6 border-2 hover:border-green-200 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <CreditCard className="w-8 h-8 text-green-600" />
                    <Badge className="bg-green-100 text-green-700">Total</Badge>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{transactionStats.totalTransactions}</h3>
                  <p className="text-slate-600">Total Transactions</p>
                </Card>

                <Card className="p-6 border-2 hover:border-blue-200 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                    <Badge className="bg-blue-100 text-blue-700">Revenue</Badge>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{formatCurrency(transactionStats.totalRevenue)}</h3>
                  <p className="text-slate-600">Total Revenue</p>
                </Card>

                <Card className="p-6 border-2 hover:border-purple-200 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <Calendar className="w-8 h-8 text-purple-600" />
                    <Badge className="bg-purple-100 text-purple-700">Today</Badge>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{transactionStats.todayTransactions}</h3>
                  <p className="text-slate-600">Today's Orders</p>
                </Card>

                <Card className="p-6 border-2 hover:border-orange-200 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <Award className="w-8 h-8 text-orange-600" />
                    <Badge className="bg-orange-100 text-orange-700">Average</Badge>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{formatCurrency(transactionStats.averageOrderValue)}</h3>
                  <p className="text-slate-600">Avg Order Value</p>
                </Card>
              </div>

              {/* Search and Filters */}
              <Card className="p-6 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <Input
                      placeholder="Search by order ID, user name, email, or course..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </Card>

              {/* Transactions Table */}
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50 border-b">
                      <tr>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Order ID</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Customer</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Course(s)</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Amount</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Date & Time</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Status</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {filteredTransactions.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                            <CreditCard className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                            <p className="text-lg font-medium mb-2">No transactions found</p>
                            <p className="text-sm">Transactions will appear here once customers make purchases</p>
                          </td>
                        </tr>
                      ) : (
                        filteredTransactions.map((transaction) => (
                          <tr key={transaction.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <code className="text-sm font-mono bg-slate-100 px-2 py-1 rounded">
                                  {transaction.orderId.substring(0, 12)}...
                                </code>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div>
                                <p className="font-medium text-slate-900">{transaction.userName}</p>
                                <p className="text-sm text-slate-500">{transaction.userEmail}</p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="max-w-xs">
                                {transaction.courses.map((course, idx) => (
                                  <p key={idx} className="text-sm text-slate-700 truncate">
                                    {course.courseTitle}
                                  </p>
                                ))}
                                {transaction.courses.length > 1 && (
                                  <Badge variant="outline" className="mt-1">
                                    +{transaction.courses.length - 1} more
                                  </Badge>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="font-semibold text-slate-900">
                                {formatCurrency(transaction.totalAmount)}
                              </p>
                              <p className="text-xs text-slate-500">{transaction.currency}</p>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <span className="text-sm text-slate-700">
                                  {formatDate(transaction.transactionDate)}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <Badge className={getStatusColor(transaction.status)}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                              </Badge>
                            </td>
                            <td className="px-6 py-4">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </Card>

              {/* Pagination Info */}
              {filteredTransactions.length > 0 && (
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600">
                    Showing {filteredTransactions.length} of {transactions.length} transactions
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm" disabled>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </TabsContent>

          {/* Site Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Site Settings</h2>
                <Button onClick={handleSaveSettings} className="bg-purple-600 hover:bg-purple-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>

              <Card className="p-6">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={siteSettings.tagline || ''}
                      onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={siteSettings.email}
                        onChange={(e) => setSiteSettings({ ...siteSettings, email: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        value={siteSettings.phone}
                        onChange={(e) => setSiteSettings({ ...siteSettings, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Address
                    </Label>
                    <Textarea
                      id="address"
                      value={siteSettings.address}
                      onChange={(e) => setSiteSettings({ ...siteSettings, address: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aboutText">About Text (Footer)</Label>
                    <Textarea
                      id="aboutText"
                      value={siteSettings.aboutText}
                      onChange={(e) => setSiteSettings({ ...siteSettings, aboutText: e.target.value })}
                      rows={4}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Statistics Tab */}
          <TabsContent value="stats" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Platform Statistics</h2>
                <Button onClick={handleSaveStats} className="bg-purple-600 hover:bg-purple-700">
                  <Save className="w-4 h-4 mr-2" />
                  Update Stats
                </Button>
              </div>

              <Card className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="activeStudents">Active Students</Label>
                    <Input
                      id="activeStudents"
                      value={stats.activeStudents}
                      onChange={(e) => setStats({ ...stats, activeStudents: e.target.value })}
                      placeholder="e.g., 250,000+"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="branches">Branches</Label>
                    <Input
                      id="branches"
                      value={stats.branches}
                      onChange={(e) => setStats({ ...stats, branches: e.target.value })}
                      placeholder="e.g., 3+"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Total Courses</Label>
                    <Input
                      value={stats.totalCourses}
                      disabled
                      className="bg-slate-100"
                    />
                    <p className="text-sm text-slate-500">Auto-calculated from courses data</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Total Instructors</Label>
                    <Input
                      value={stats.totalInstructors}
                      disabled
                      className="bg-slate-100"
                    />
                    <p className="text-sm text-slate-500">Auto-calculated from instructors data</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Courses Management Tab */}
          <TabsContent value="courses" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AdminCourseManager />
            </motion.div>
          </TabsContent>

          {/* Instructors Management Tab */}
          <TabsContent value="instructors" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AdminInstructorManager />
            </motion.div>
          </TabsContent>

          {/* Content Management Tab */}
          <TabsContent value="content" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AdminContentManager />

              <Card className="p-6 bg-yellow-50 border-yellow-200">
                <h3 className="text-lg font-semibold mb-2 text-yellow-900">Note</h3>
                <p className="text-sm text-yellow-800">
                  This is a demo admin panel. In production, course and instructor management would be connected to a backend API for real-time updates.
                </p>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
        <DialogContent className="sm:max-w-md bg-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <LogOut className="w-5 h-5" />
              Confirm Logout
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to log out of the admin dashboard?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:justify-end">
            <Button
              variant="outline"
              onClick={() => setIsLogoutDialogOpen(false)}
              className="border-slate-200"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmLogout}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
