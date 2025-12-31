import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    CourseCardSkeleton,
    CourseGridSkeleton,
    InstructorCardSkeleton,
    InstructorGridSkeleton,
    InstructorProfileSkeleton,
    StatsCardSkeleton,
    TableRowSkeleton,
    DashboardCourseCardSkeleton,
    TransactionRowSkeleton,
    AdminDashboardSkeleton,
    DashboardCourseGridSkeleton
} from './index';

/**
 * Skeleton Demo Component
 * 
 * This component showcases all available skeleton loaders.
 * Use this as a reference for implementing skeletons in your pages.
 * 
 * To view: Import and render this component in any page during development
 */
export const SkeletonDemo = () => {
    return (
        <div className="min-h-screen bg-background p-8 space-y-12">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold mb-2">Skeleton Loader Showcase</h1>
                <p className="text-muted-foreground mb-8">
                    Professional loading states for all components
                </p>

                {/* Course Skeletons */}
                <section className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Course Skeletons</h2>
                        <p className="text-muted-foreground mb-4">
                            Use these for course listing pages and course grids
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Single Course Card</h3>
                        <div className="max-w-sm">
                            <CourseCardSkeleton />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Course Grid (6 cards)</h3>
                        <CourseGridSkeleton count={6} />
                    </div>
                </section>

                <hr className="my-12 border-border" />

                {/* Instructor Skeletons */}
                <section className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Instructor Skeletons</h2>
                        <p className="text-muted-foreground mb-4">
                            Use these for instructor listing and profile pages
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Single Instructor Card</h3>
                        <div className="max-w-2xl">
                            <InstructorCardSkeleton />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Instructor Grid (4 cards)</h3>
                        <InstructorGridSkeleton count={4} />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Instructor Profile (Large)</h3>
                        <div className="max-w-3xl">
                            <InstructorProfileSkeleton />
                        </div>
                    </div>
                </section>

                <hr className="my-12 border-border" />

                {/* Dashboard Skeletons */}
                <section className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Dashboard Skeletons</h2>
                        <p className="text-muted-foreground mb-4">
                            Use these for user and admin dashboards
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Stats Card</h3>
                        <div className="max-w-sm">
                            <StatsCardSkeleton />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Dashboard Course Card</h3>
                        <div className="max-w-sm">
                            <DashboardCourseCardSkeleton />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Dashboard Course Grid (3 cards)</h3>
                        <DashboardCourseGridSkeleton count={3} />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Table Row</h3>
                        <div className="max-w-4xl">
                            <TableRowSkeleton />
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-3">Transaction Row</h3>
                        <Card className="max-w-2xl">
                            <TransactionRowSkeleton />
                            <TransactionRowSkeleton />
                            <TransactionRowSkeleton />
                        </Card>
                    </div>
                </section>

                <hr className="my-12 border-border" />

                {/* Complete Admin Dashboard */}
                <section className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">Complete Admin Dashboard</h2>
                        <p className="text-muted-foreground mb-4">
                            Full admin dashboard skeleton with stats, search, and table
                        </p>
                    </div>

                    <AdminDashboardSkeleton />
                </section>

                {/* Usage Instructions */}
                <section className="mt-12 p-6 bg-muted rounded-lg">
                    <h3 className="text-xl font-bold mb-3">How to Use</h3>
                    <div className="space-y-2 text-sm">
                        <p>1. Import the skeleton component you need:</p>
                        <code className="block bg-background p-2 rounded">
                            import &#123; CourseGridSkeleton &#125; from '@/components/skeletons';
                        </code>

                        <p className="mt-4">2. Show it while loading:</p>
                        <code className="block bg-background p-2 rounded">
                            if (loading) return &lt;CourseGridSkeleton count=&#123;6&#125; /&gt;;
                        </code>

                        <p className="mt-4">3. Replace with actual content when data loads</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SkeletonDemo;
