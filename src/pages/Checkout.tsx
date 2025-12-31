import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  CreditCard,
  Lock,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { updateUserCourses } from "@/lib/auth";
import { useAuthContext } from "@/context/AuthProvider";
import { initiatePayment } from "@/lib/paymentGateway";
import { toast } from "sonner";
import { clearCart, type CartItem } from "@/lib/cart";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;
  const courses = location.state?.courses as CartItem[] | undefined;
  const { userData: user } = useAuthContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Support both single course and multiple courses
  const isMultipleCourses = !!courses && courses.length > 0;
  const orderItems = isMultipleCourses ? courses : (course ? [course] : []);
  const totalAmount = isMultipleCourses
    ? courses.reduce((sum, c) => sum + c.price, 0)
    : course?.price || 0;
  const originalTotalAmount = isMultipleCourses
    ? courses.reduce((sum, c) => sum + c.originalPrice, 0)
    : course?.originalPrice || 0;

  const [formData, setFormData] = useState({
    // Billing Details
    firstName: "",
    lastName: "",
    companyName: "",
    country: "India",
    streetAddress: "",
    apartment: "",
    town: "",
    state: "",
    pincode: "",
    phone: "",
    emailAddress: "",
    // Payment Details
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  if (orderItems.length === 0) {
    navigate("/courses");
    return null;
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // INTEGRATION POINT: This calls the mock payment gateway
      // Replace with your actual payment gateway integration
      const courseTitle = isMultipleCourses
        ? `${orderItems.length} Courses`
        : orderItems[0].title || orderItems[0].courseTitle;

      const result = await initiatePayment({
        courseId: isMultipleCourses ? 'multiple' : orderItems[0].id || orderItems[0].courseId,
        courseTitle,
        amount: totalAmount,
        currency: "INR",
        userId: user._id, // Changed from .id
        userName: user.fullName || user.email, // Changed from .name
        userEmail: user.email,
        courses: orderItems.map(item => ({
          courseId: item.id || item.courseId,
          title: item.title || item.courseTitle,
          price: item.price
        }))
      }, formData.phone || '9999999999');

      if (result.success) {
        setPaymentSuccess(true);

        // Update user courses for all purchased courses
        orderItems.forEach(item => {
          const courseId = item.id || item.courseId;
          updateUserCourses(courseId);
        });

        // Clear cart if multiple courses
        if (isMultipleCourses) {
          clearCart();
        }

        toast.success(result.message);

        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="p-8 text-center shadow-elevated">
            <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
              <CheckCircle2 className="w-12 h-12 text-primary-foreground" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Payment Successful!</h2>
            <p className="text-muted-foreground mb-6">
              {isMultipleCourses ? (
                <>You've successfully enrolled in <span className="font-semibold text-foreground">{orderItems.length} courses</span></>
              ) : (
                <>You've successfully enrolled in <span className="font-semibold text-foreground">{orderItems[0].title || orderItems[0].courseTitle}</span></>
              )}
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Redirecting to your dashboard...
            </p>
            <Button onClick={() => navigate("/dashboard")} className="gradient-primary shadow-glow">
              Go to Dashboard
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Design */}
      <div
        className="absolute inset-0 opacity-15 bg-no-repeat bg-center bg-cover pointer-events-none"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1639322537228-f710d846310a?w=1920&h=1080&fit=crop&crop=center&auto=format&q=80')"
        }}
      />

      <Navbar />

      <div className="pt-32 pb-16 relative z-10">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl font-bold mb-2">Checkout</h1>
            <p className="text-muted-foreground mb-8">Complete your purchase securely</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Student Details & Payment Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Billing Details */}
                <Card className="p-6">
                  <h2 className="text-2xl font-bold mb-6">Billing details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label htmlFor="companyName">Company name (optional)</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label htmlFor="country">Country / Region *</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label htmlFor="streetAddress">Street address *</Label>
                    <Input
                      id="streetAddress"
                      value={formData.streetAddress}
                      onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label htmlFor="apartment">Apartment, suite, unit, etc. (optional)</Label>
                    <Input
                      id="apartment"
                      value={formData.apartment}
                      onChange={(e) => setFormData({ ...formData, apartment: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label htmlFor="town">Town / City *</Label>
                    <Input
                      id="town"
                      value={formData.town}
                      onChange={(e) => setFormData({ ...formData, town: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label htmlFor="pincode">PIN Code *</Label>
                    <Input
                      id="pincode"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emailAddress">Email address *</Label>
                    <Input
                      id="emailAddress"
                      type="email"
                      value={formData.emailAddress}
                      onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                      required
                    />
                  </div>
                </Card>

                {/* Payment Button */}
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Lock className="w-5 h-5 text-primary" />
                    <h2 className="text-2xl font-bold">Complete Payment</h2>
                  </div>

                  <form onSubmit={handlePayment} className="space-y-6">
                    <div className="bg-muted/50 p-4 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        Your payment will be processed securely through Cashfree Payment Gateway.
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full gradient-primary shadow-glow"
                      size="lg"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing Payment...
                        </>
                      ) : (
                        <>
                          Proceed to Payment - {`₹${totalAmount.toLocaleString('en-IN')}`}
                        </>
                      )}
                    </Button>
                  </form>
                </Card>
              </div>

              {/* Order Summary */}
              <div>
                <Card className="p-6 sticky top-24">
                  <h3 className="text-xl font-bold mb-4">Order Summary</h3>

                  <div className="space-y-4">
                    {orderItems.map((item, index) => (
                      <div key={index}>
                        <div className="font-semibold mb-1 line-clamp-2 text-sm">
                          {item.title || item.courseTitle}
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge variant="secondary" className="text-xs">
                            {item.category || 'Course'}
                          </Badge>
                          <span className="text-sm font-semibold">
                            ₹{item.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        {index < orderItems.length - 1 && <Separator className="mt-3" />}
                      </div>
                    ))}

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Original Price</span>
                        <span className="line-through">{`₹${originalTotalAmount.toLocaleString('en-IN')}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Discount</span>
                        <span className="text-green-500">
                          -{`₹${(originalTotalAmount - totalAmount).toLocaleString('en-IN')}`}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">{`₹${totalAmount.toLocaleString('en-IN')}`}</span>
                    </div>
                  </div>

                  <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Lifetime Access</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>Certificate of Completion</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                      <span>30-Day Money-Back Guarantee</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
