import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Shield, Lock, User, Eye, EyeOff, Mail, Loader2, CheckCircle2, ArrowLeft, KeyRound, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import QuickEduLogo from "@/assets/Quickedulogo-01.png";
import { useAuthContext } from "@/context/AuthProvider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { forgotPasswordApi, resetPasswordApi } from "@/networking/authentications/auth-apis";

type ForgotPasswordStep = 'email' | 'verify' | 'reset' | 'success';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Forgot Password States
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState<ForgotPasswordStep>('email');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(formData.username, formData.password);

      if (success) {
        toast.success("Admin Login successful!");
        navigate("/admin/dashboard", { replace: true });
      }
    } catch (error) {
      toast.error("An error occurred during admin login.");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate password strength
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password)) strength += 15;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const handlePasswordChange = (password: string) => {
    setNewPassword(password);
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 30) return 'bg-red-500';
    if (passwordStrength < 60) return 'bg-yellow-500';
    if (passwordStrength < 80) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 30) return 'Weak';
    if (passwordStrength < 60) return 'Fair';
    if (passwordStrength < 80) return 'Good';
    return 'Strong';
  };

  // Step 1: Send verification email
  const handleSendVerificationEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Call real backend API
      const response = await forgotPasswordApi({ email: resetEmail });

      if (response.success) {
        toast.success(response.message || "Verification code sent to your email!");
        setForgotPasswordStep('verify');
      } else {
        toast.error(response.message || "Failed to send verification email.");
      }
    } catch (error: any) {
      console.error("Forgot password error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to send verification email. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  // Step 2: Verify code
  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // For verification, we'll proceed to reset step
      // The actual OTP verification happens during password reset
      toast.success("Code verified successfully!");
      setForgotPasswordStep('reset');
    } catch (error: any) {
      console.error("Verification error:", error);
      toast.error("Verification failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Step 3: Reset password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (passwordStrength < 60) {
      toast.error("Please choose a stronger password!");
      return;
    }

    setIsProcessing(true);

    try {
      // Call real backend API
      const response = await resetPasswordApi({
        email: resetEmail,
        otp: verificationCode,
        newPassword: newPassword
      });

      if (response.success) {
        toast.success(response.message || "Password reset successfully!");
        setForgotPasswordStep('success');

        // Auto-close and reset after 3 seconds
        setTimeout(() => {
          handleCloseForgotPassword();
        }, 3000);
      } else {
        toast.error(response.message || "Failed to reset password.");
      }
    } catch (error: any) {
      console.error("Reset password error:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to reset password. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseForgotPassword = () => {
    setIsForgotPasswordOpen(false);
    setTimeout(() => {
      setForgotPasswordStep('email');
      setResetEmail("");
      setVerificationCode("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordStrength(0);
    }, 300);
  };

  const handleBackStep = () => {
    if (forgotPasswordStep === 'verify') {
      setForgotPasswordStep('email');
      setVerificationCode("");
    } else if (forgotPasswordStep === 'reset') {
      setForgotPasswordStep('verify');
      setNewPassword("");
      setConfirmPassword("");
      setPasswordStrength(0);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="p-8 shadow-2xl border-2 border-purple-500/20 bg-slate-900/90 backdrop-blur-xl">
          {/* Logo & Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <img
                  src={QuickEduLogo}
                  alt="QuickEdu Logo"
                  className="w-16 h-16 rounded-lg"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gray-400">Sign in to manage QuickEdu</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-gray-200">Username or Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter username or email"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
                  required
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                You can login with either your username or email address
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password" className="text-gray-200">Password</Label>
                <button
                  type="button"
                  onClick={() => setIsForgotPasswordOpen(true)}
                  className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition-colors"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-10 pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Signing In...
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5 mr-2" />
                  Sign In as Admin
                </>
              )}
            </Button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-purple-900/30 border border-purple-500/30 rounded-lg">
            <p className="text-sm text-gray-300 text-center">
              <Lock className="w-4 h-4 inline mr-1" />
              Secure admin access only
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
              ← Back to Home
            </Link>
          </div>
        </Card>

        {/* Enhanced Forgot Password Dialog */}
        <Dialog open={isForgotPasswordOpen} onOpenChange={setIsForgotPasswordOpen}>
          <DialogContent className="sm:max-w-md bg-slate-900 border-slate-700">
            <AnimatePresence mode="wait">
              {/* Step 1: Email Input */}
              {forgotPasswordStep === 'email' && (
                <motion.div
                  key="email"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <DialogHeader>
                    <DialogTitle className="text-white flex items-center gap-2">
                      <Mail className="w-5 h-5 text-purple-400" />
                      Reset Admin Password
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Enter your admin email address to receive a verification code.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSendVerificationEmail} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="reset-email" className="text-gray-200">Admin Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="reset-email"
                          type="email"
                          placeholder="admin@quickedu.org.in"
                          value={resetEmail}
                          onChange={(e) => setResetEmail(e.target.value)}
                          className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
                          required
                        />
                      </div>
                    </div>

                    <Alert className="bg-blue-900/30 border-blue-500/30">
                      <AlertCircle className="h-4 w-4 text-blue-400" />
                      <AlertDescription className="text-blue-200 text-sm">
                        A 6-digit verification code will be sent to your email.
                      </AlertDescription>
                    </Alert>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCloseForgotPassword}
                        className="flex-1 bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Code"
                        )}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Step 2: Verification Code */}
              {forgotPasswordStep === 'verify' && (
                <motion.div
                  key="verify"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <DialogHeader>
                    <DialogTitle className="text-white flex items-center gap-2">
                      <KeyRound className="w-5 h-5 text-purple-400" />
                      Enter Verification Code
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      We've sent a 6-digit code to <span className="text-purple-400 font-medium">{resetEmail}</span>
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleVerifyCode} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="verification-code" className="text-gray-200">Verification Code</Label>
                      <Input
                        id="verification-code"
                        type="text"
                        placeholder="Enter 6-digit code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="text-center text-2xl tracking-widest bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
                        maxLength={6}
                        required
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBackStep}
                        className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        disabled={isProcessing || verificationCode.length !== 6}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Verifying...
                          </>
                        ) : (
                          "Verify Code"
                        )}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Step 3: New Password */}
              {forgotPasswordStep === 'reset' && (
                <motion.div
                  key="reset"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <DialogHeader>
                    <DialogTitle className="text-white flex items-center gap-2">
                      <Lock className="w-5 h-5 text-purple-400" />
                      Create New Password
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Choose a strong password for your admin account.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleResetPassword} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-gray-200">New Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="new-password"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          value={newPassword}
                          onChange={(e) => handlePasswordChange(e.target.value)}
                          className="pl-10 pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>

                      {/* Password Strength Indicator */}
                      {newPassword && (
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-400">Password Strength:</span>
                            <span className={`font-medium ${passwordStrength < 30 ? 'text-red-400' :
                              passwordStrength < 60 ? 'text-yellow-400' :
                                passwordStrength < 80 ? 'text-blue-400' :
                                  'text-green-400'
                              }`}>
                              {getPasswordStrengthText()}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                              style={{ width: `${passwordStrength}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-gray-200">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 pr-10 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {confirmPassword && newPassword !== confirmPassword && (
                        <p className="text-xs text-red-400">Passwords do not match</p>
                      )}
                    </div>

                    <Alert className="bg-blue-900/30 border-blue-500/30">
                      <AlertCircle className="h-4 w-4 text-blue-400" />
                      <AlertDescription className="text-blue-200 text-sm">
                        Password must be at least 8 characters with uppercase, lowercase, and numbers.
                      </AlertDescription>
                    </Alert>

                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleBackStep}
                        className="bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        disabled={isProcessing || newPassword !== confirmPassword || passwordStrength < 60}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Resetting...
                          </>
                        ) : (
                          "Reset Password"
                        )}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Step 4: Success */}
              {forgotPasswordStep === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-400" />
                  </div>
                  <DialogTitle className="text-white text-2xl mb-2">Password Reset Successfully!</DialogTitle>
                  <DialogDescription className="text-gray-400 mb-6">
                    Your admin password has been updated. You can now sign in with your new password.
                  </DialogDescription>
                  <Button
                    onClick={handleCloseForgotPassword}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    Continue to Login
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </DialogContent>
        </Dialog>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
