import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { verifyPayment } from "@/lib/paymentGateway";
import { updateUserCourses } from "@/lib/auth";
import { useAuthContext } from "@/context/AuthProvider";
import { sendPaymentConfirmationEmail } from "@/lib/emailService";
import { recordTransactionApi } from "@/networking/transaction-apis";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifying, setVerifying] = useState(true);
  const { userData: user } = useAuthContext();
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | null>(null);
  const orderId = searchParams.get('order_id');

  useEffect(() => {
    const verifyPaymentStatus = async () => {
      if (!orderId) {
        setPaymentStatus('failed');
        setVerifying(false);
        return;
      }

      try {
        const isSuccess = await verifyPayment(orderId);

        if (isSuccess) {
          // Update purchase status in localStorage
          const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
          const updatedPurchases = purchases.map((p: any) =>
            p.orderId === orderId ? { ...p, status: 'completed' } : p
          );
          localStorage.setItem('purchases', JSON.stringify(updatedPurchases));

          // Update user courses
          const purchase = updatedPurchases.find((p: any) => p.orderId === orderId);

          // NEW: RECORD ON BACKED DB
          if (user && purchase) {
            try {
              const coursesToRecord = purchase.courseId === 'multiple'
                ? purchase.courses.map((c: any) => ({
                  courseId: c.courseId || c._id || c.id,
                  title: c.courseTitle || c.title,
                  price: c.price
                }))
                : [{
                  courseId: purchase.courseId,
                  title: purchase.courseTitle,
                  price: purchase.amount
                }];

              await recordTransactionApi({
                orderId: purchase.orderId,
                cfOrderId: purchase.transactionId,
                userId: user._id,
                userName: user.fullName || user.email,
                userEmail: user.email,
                courses: coursesToRecord,
                amount: purchase.amount,
                status: 'SUCCESS'
              });
              console.log("✅ Transaction recorded in backend");
            } catch (err) {
              console.error("❌ Failed to record transaction in backend:", err);
            }
          }

          if (purchase && purchase.courseId !== 'multiple') {
            updateUserCourses(purchase.courseId);
          }

          // Send confirmation email
          if (user && purchase) {
            sendPaymentConfirmationEmail({
              userName: user.fullName || user.email,
              userEmail: user.email,
              courseTitle: purchase.courseTitle,
              amount: purchase.amount,
              orderId: purchase.orderId,
              transactionId: purchase.transactionId,
              purchaseDate: purchase.purchaseDate
            }).catch(err => console.error('Email failed:', err));
          }

          setPaymentStatus('success');
        } else {
          setPaymentStatus('failed');
        }
      } catch (error) {
        console.error('Payment verification error:', error);
        setPaymentStatus('failed');
      } finally {
        setVerifying(false);
      }
    };

    verifyPaymentStatus();
  }, [orderId, user]);

  if (verifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="p-8 text-center shadow-elevated">
            <Loader2 className="w-16 h-16 mx-auto mb-6 animate-spin text-primary" />
            <h2 className="text-2xl font-bold mb-4">Verifying Payment</h2>
            <p className="text-muted-foreground">
              Please wait while we verify your payment...
            </p>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (paymentStatus === 'success') {
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
              Your payment has been processed successfully. You can now access your course(s).
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => navigate("/dashboard")}
                className="w-full gradient-primary shadow-glow"
              >
                Go to Dashboard
              </Button>
              <Button
                onClick={() => navigate("/courses")}
                variant="outline"
                className="w-full"
              >
                Browse More Courses
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full"
      >
        <Card className="p-8 text-center shadow-elevated">
          <div className="w-20 h-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-destructive" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Payment Failed</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't process your payment. Please try again or contact support if the issue persists.
          </p>
          <div className="space-y-3">
            <Button
              onClick={() => navigate("/courses")}
              className="w-full gradient-primary shadow-glow"
            >
              Try Again
            </Button>
            <Button
              onClick={() => navigate("/contact")}
              variant="outline"
              className="w-full"
            >
              Contact Support
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
