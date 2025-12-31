import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import { getCartItems, removeFromCart, getCartTotal, clearCart } from "@/lib/cart";
import { useAuthContext } from "@/context/AuthProvider";
import { toast } from "sonner";

const Cart = () => {
  const navigate = useNavigate();
  const { userData } = useAuthContext();
  const [cartItems, setCartItems] = useState(getCartItems());
  const [cartTotal, setCartTotal] = useState(getCartTotal());

  useEffect(() => {
    updateCart();
  }, []);

  const updateCart = () => {
    setCartItems(getCartItems());
    setCartTotal(getCartTotal());
  };

  const handleRemove = (courseId: string) => {
    removeFromCart(courseId);
    updateCart();
    toast.success("Course removed from cart");
  };

  const handleCheckout = () => {
    if (!userData) {
      toast.error("Please login to proceed with checkout");
      navigate("/login");
      return;
    }
    navigate("/checkout", { state: { courses: cartItems } });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto"
          >
            <ShoppingBag className="w-24 h-24 mx-auto mb-6 text-muted-foreground" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">
              Start adding courses to your cart and enroll in multiple courses at once!
            </p>
            <Button asChild size="lg" className="gradient-primary">
              <Link to="/courses">
                Browse Courses
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <ShoppingCart className="w-8 h-8 text-primary" />
              <h1 className="text-4xl font-bold">Shopping Cart</h1>
              <Badge className="gradient-accent text-white">
                {cartItems.length} {cartItems.length === 1 ? 'Course' : 'Courses'}
              </Badge>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.courseId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 hover:shadow-elevated transition-shadow">
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.courseTitle}
                          className="w-32 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <Link
                            to={`/courses/${item.slug}`}
                            className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2"
                          >
                            {item.courseTitle}
                          </Link>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-2xl font-bold text-primary">
                              ₹{item.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{item.originalPrice.toLocaleString('en-IN')}
                            </span>
                            <Badge variant="outline" className="text-green-600">
                              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                            </Badge>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemove(item.courseId)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-5 h-5" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="sticky top-24"
                >
                  <Card className="p-6 shadow-elevated">
                    <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-muted-foreground">
                        <span>Original Price:</span>
                        <span>₹{cartTotal.originalTotal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-green-600 font-semibold">
                        <span>Savings:</span>
                        <span>-₹{cartTotal.savings.toLocaleString('en-IN')}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total:</span>
                        <span className="text-primary">₹{cartTotal.total.toLocaleString('en-IN')}</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      className="w-full gradient-primary shadow-glow text-lg py-6 mb-3"
                      size="lg"
                    >
                      Proceed to Checkout
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="w-full"
                      size="lg"
                    >
                      <Link to="/courses">Continue Shopping</Link>
                    </Button>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;
