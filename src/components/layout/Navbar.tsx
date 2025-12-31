import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, User, LogOut, ChevronDown, ShoppingCart, Shield, Settings, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import QuickEduLogo from "@/assets/Quickedulogo-01.png";
import { getCartCount } from "@/lib/cart";
import { getSettingsApi, SiteSettings } from "@/networking/settings-apis";
import { useAuthContext } from "@/context/AuthProvider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { userData, logout: authLogout } = useAuthContext();
  const [cartCount, setCartCount] = useState(0);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Update cart count on mount and when storage changes
    const updateCartCount = () => setCartCount(getCartCount());
    updateCartCount();

    window.addEventListener('storage', updateCartCount);
    // Custom event for cart updates within the same tab
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettingsApi();
        if (data) setSettings(data);
      } catch (e) {
        console.error("Failed to fetch settings", e);
      }
    };
    fetchSettings();
  }, []);

  const handleLogout = () => {
    authLogout("/");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/courses", label: "Courses" },
    { to: "/about", label: "About Us" },
    { to: "/instructors", label: "Instructor" },
  ];

  const moreLinks = [
    { to: "/blog", label: "Blog" },
    { to: "/refunds", label: "Refunds and Returns" },
    { to: "/privacy", label: "Privacy Policy" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/98 backdrop-blur-lg shadow-lg border-b border-gray-200" : "bg-white/90 backdrop-blur-md shadow-sm"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={QuickEduLogo}
                alt="QuickEdu Logo"
                className="w-12 h-12 rounded-xl object-cover shadow-lg transition-all duration-300 group-hover:scale-110"
              />
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                  {settings?.siteName || "QuickEdu"}
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wider">
                  {settings?.tagline || "LEARN • GROW • SUCCEED"}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-foreground/80 hover:text-foreground transition-smooth relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-smooth"
                >
                  {link.label}
                </Link>
              ))}

              {/* More Dropdown */}
              <div className="relative group">
                <button className="text-foreground/80 hover:text-foreground transition-smooth flex items-center gap-1">
                  More
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {moreLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                className="text-foreground/80 hover:text-foreground transition-smooth relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-smooth"
              >
                Contact Us
              </Link>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild className="relative">
                <Link to="/cart">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs gradient-accent text-white border-0">
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>

              {userData ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0">
                      <Avatar className="h-10 w-10 border-2 border-purple-100 transition-all hover:border-purple-300">
                        <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white font-bold">
                          {userData.fullName?.charAt(0).toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal p-4">
                      <div className="flex flex-col space-y-2">
                        <p className="text-sm font-bold leading-none">{userData.fullName}</p>
                        <p className="text-xs leading-none text-muted-foreground truncate">{userData.email}</p>
                        <Badge variant="outline" className="w-fit text-[10px] uppercase font-bold tracking-wider px-2 py-0 h-5 bg-slate-50">
                          {userData.role}
                        </Badge>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="cursor-pointer py-3 px-4 flex items-center focus:bg-purple-50 transition-colors">
                        <LayoutDashboard className="mr-3 h-4 w-4 text-slate-500" />
                        <span className="font-medium text-slate-700">Student Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    {userData.role === 'admin' && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin/dashboard" className="cursor-pointer py-3 px-4 flex items-center focus:bg-purple-50 transition-colors">
                          <Shield className="mr-3 h-4 w-4 text-purple-600" />
                          <span className="font-medium text-slate-700">Admin Control Panel</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-700 focus:bg-red-50 cursor-pointer py-3 px-4 flex items-center font-bold"
                      onClick={() => setShowLogoutDialog(true)}
                    >
                      <LogOut className="mr-3 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" asChild className="mr-1" title="Admin Access">
                    <Link to="/admin/login">
                      <Shield className="w-5 h-5 text-slate-400 hover:text-purple-600 transition-colors" />
                    </Link>
                  </Button>
                  <Button variant="ghost" asChild className="font-medium text-slate-600">
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button asChild className="gradient-primary shadow-glow hover:shadow-glow-lg transition-all duration-300 px-6 rounded-full">
                    <Link to="/register">Sign Up Free</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground hover:bg-slate-100 p-2 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
            >
              <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
                {userData && (
                  <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
                    <Avatar className="h-12 w-12 ring-2 ring-purple-100">
                      <AvatarFallback className="bg-gradient-to-br from-purple-600 to-blue-600 text-white font-bold text-lg">
                        {userData.fullName?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900">{userData.fullName}</span>
                      <span className="text-xs text-slate-500 truncate max-w-[200px]">{userData.email}</span>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-lg font-medium text-slate-700 hover:text-purple-600 transition-colors py-1"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="space-y-4">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">More Resources</div>
                  <div className="flex flex-col gap-3">
                    {moreLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="font-medium text-slate-600 hover:text-purple-600 transition-colors py-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-6 border-t border-slate-100">
                  {userData ? (
                    <>
                      <Button variant="ghost" asChild className="w-full justify-start h-12">
                        <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                          <LayoutDashboard className="w-5 h-5 mr-3 text-slate-500" />
                          Dashboard
                        </Link>
                      </Button>
                      {userData.role === 'admin' && (
                        <Button variant="ghost" asChild className="w-full justify-start h-12">
                          <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                            <Shield className="w-5 h-5 mr-3 text-purple-600" />
                            Admin Dashboard
                          </Link>
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        onClick={() => { setShowLogoutDialog(true); setIsMobileMenuOpen(false); }}
                        className="w-full h-12 justify-center border-red-100 text-red-600 hover:bg-red-50 hover:border-red-200 mt-2 font-bold"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" asChild className="w-full h-12 border-slate-200">
                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                      </Button>
                      <Button asChild className="w-full h-12 gradient-primary rounded-lg shadow-glow">
                        <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>Create Free Account</Link>
                      </Button>
                      <Button variant="ghost" asChild className="w-full h-10 text-slate-400 mt-2">
                        <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
                          <Shield className="w-4 h-4 mr-2" />
                          Admin Login
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Logout Confirmation Dialog */}
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent className="bg-white border-2 border-purple-100 rounded-2xl shadow-elevated max-w-md">
          <AlertDialogHeader>
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-red-100">
              <LogOut className="w-8 h-8 text-red-600" />
            </div>
            <AlertDialogTitle className="text-2xl font-bold text-center text-slate-900 border-0">
              Confirm Sign Out
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-slate-600 text-lg py-2">
              Are you sure you want to sign out from your account? You will need to sign in again to access your courses.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-row gap-3 sm:justify-center pt-6">
            <AlertDialogCancel className="flex-1 h-12 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold m-0 transition-all hover:border-slate-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleLogout}
              className="flex-1 h-12 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold shadow-lg shadow-red-200 transition-all active:scale-95 border-0"
            >
              Sign Out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
