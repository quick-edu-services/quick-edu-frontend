import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Clock, Mail, Phone } from "lucide-react";

const Refunds = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50">
      <Navbar />
      
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-500 text-white px-4 py-2">
              Refunds & Returns Policy
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Refunds and Returns</h1>
            <p className="text-xl text-gray-600">
              We want you to be completely satisfied with your learning experience
            </p>
          </div>
          
          <div className="space-y-8">
            {/* 30-Day Money Back Guarantee */}
            <Card className="p-8 border-2 border-green-200 bg-green-50">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800">30-Day Money Back Guarantee</h2>
              </div>
              <p className="text-green-700 text-lg">
                We offer a full refund within 30 days of purchase if you're not completely satisfied with your course. No questions asked!
              </p>
            </Card>

            {/* Refund Policy Details */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Refund Policy Details</h2>
              
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    Eligible for Full Refund
                  </h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Course purchased within the last 30 days</li>
                    <li>Less than 30% of course content consumed</li>
                    <li>No certificates downloaded</li>
                    <li>Technical issues preventing course access</li>
                    <li>Course content significantly different from description</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    Not Eligible for Refund
                  </h3>
                  <ul className="list-disc pl-6 text-gray-600 space-y-2">
                    <li>Course purchased more than 30 days ago</li>
                    <li>More than 30% of course content completed</li>
                    <li>Certificate of completion downloaded</li>
                    <li>Violation of terms of service</li>
                    <li>Subscription-based courses (different policy applies)</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-500" />
                    Refund Processing Time
                  </h3>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <ul className="text-gray-700 space-y-2">
                      <li><strong>Credit/Debit Cards:</strong> 5-7 business days</li>
                      <li><strong>Bank Transfer:</strong> 7-10 business days</li>
                      <li><strong>UPI/Digital Wallets:</strong> 1-3 business days</li>
                    </ul>
                  </div>
                </section>
              </div>
            </Card>

            {/* How to Request Refund */}
            <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50">
              <h2 className="text-2xl font-bold mb-6">How to Request a Refund</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Contact Support</h3>
                  <p className="text-sm text-gray-600">Email us or call our support team with your order details</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Provide Information</h3>
                  <p className="text-sm text-gray-600">Share your order ID, reason for refund, and any relevant details</p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Get Refund</h3>
                  <p className="text-sm text-gray-600">Receive confirmation and refund within processing timeframe</p>
                </div>
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-8 bg-gray-50">
              <h2 className="text-2xl font-bold mb-6">Need Help with Refunds?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email Support</h3>
                    <p className="text-gray-600">
                      <a href="mailto:info@quickedu.org.in" className="text-blue-600 hover:underline">
                        info@quickedu.org.in
                      </a>
                    </p>
                    <p className="text-sm text-gray-500">Response within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone Support</h3>
                    <p className="text-gray-600">
                      <a href="https://wa.me/919392328940" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        +91 9392328940
                      </a>
                    </p>
                    <p className="text-sm text-gray-500">Mon-Fri, 9 AM - 6 PM IST</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Additional Policies */}
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Additional Information</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Subscription Refunds</h3>
                  <p className="text-gray-600">
                    Monthly subscriptions can be cancelled anytime. You'll retain access until the end of your billing period. 
                    Annual subscriptions are eligible for pro-rated refunds within the first 30 days.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Course Exchanges</h3>
                  <p className="text-gray-600">
                    Instead of a refund, you may exchange your course for another of equal or lesser value within 30 days of purchase.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Partial Refunds</h3>
                  <p className="text-gray-600">
                    In exceptional circumstances, we may offer partial refunds for courses that are partially completed but don't meet expectations.
                  </p>
                </div>
              </div>
            </Card>

            <div className="text-center text-sm text-gray-500 mt-8">
              <p>Last updated: {new Date().toLocaleDateString()}</p>
              <p>This policy is subject to change. Please check regularly for updates.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Refunds;