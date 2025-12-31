import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";

const Terms = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <section className="pt-32 pb-16 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">
              Please read these terms carefully before using our platform
            </p>
          </div>
        </div>
      </section>

      <div className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <Card className="p-8 shadow-elevated border-2">
            <div className="prose prose-invert max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using QuickEdu, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, you should not use this platform.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
                <p className="text-muted-foreground">
                  Permission is granted to temporarily access the courses on QuickEdu for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground mt-2 space-y-1">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to decompile or reverse engineer any software contained on QuickEdu</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">3. User Account</h2>
                <p className="text-muted-foreground">
                  You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">4. Course Access</h2>
                <p className="text-muted-foreground">
                  Upon successful enrollment, you will have lifetime access to the course content, subject to these terms. We reserve the right to modify or discontinue courses at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">5. Refund Policy</h2>
                <p className="text-muted-foreground">
                  We offer a 30-day money-back guarantee for all courses. If you're not satisfied with your purchase, contact us within 30 days for a full refund.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">6. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All content on QuickEdu, including courses, videos, text, and graphics, are the property of QuickEdu or its content suppliers and are protected by copyright laws.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  QuickEdu shall not be liable for any damages arising out of the use or inability to use the materials on QuickEdu, even if QuickEdu has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">8. Modifications</h2>
                <p className="text-muted-foreground">
                  We may revise these terms of service at any time without notice. By using this platform, you are agreeing to be bound by the current version of these terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">9. Contact Information</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms, please contact us at info@quickedu.org.in
                </p>
              </section>

              <p className="text-sm text-muted-foreground mt-8">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
