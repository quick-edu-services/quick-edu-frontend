import { Card } from "@/components/ui/card";

// Stats Card Skeleton for Dashboard
export const StatsCardSkeleton = () => {
    return (
        <Card className="p-6 hover:shadow-elevated transition-smooth animate-pulse">
            <div className="flex items-center gap-4">
                {/* Icon Skeleton */}
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 animate-shimmer bg-[length:200%_100%]" />

                <div className="flex-1 space-y-2">
                    {/* Value Skeleton */}
                    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-20" />
                    {/* Label Skeleton */}
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                </div>
            </div>
        </Card>
    );
};

// Table Row Skeleton for Admin Dashboard
export const TableRowSkeleton = () => {
    return (
        <Card className="p-4 mb-3 animate-pulse">
            <div className="flex justify-between items-start">
                <div className="flex-1 space-y-3">
                    {/* Title Row */}
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded" />
                        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                    </div>

                    {/* Badges Row */}
                    <div className="flex flex-wrap gap-2">
                        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>

                    {/* Description Row */}
                    <div className="space-y-1">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    </div>

                    {/* Stats Row */}
                    <div className="flex gap-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                    <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded" />
                    <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded" />
                </div>
            </div>
        </Card>
    );
};

// Dashboard Course Card Skeleton
export const DashboardCourseCardSkeleton = () => {
    return (
        <Card className="overflow-hidden hover:shadow-elevated transition-all duration-300 border-2 animate-pulse">
            {/* Image with Progress Badge */}
            <div className="relative">
                <div className="w-full h-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer bg-[length:200%_100%]" />
                <div className="absolute top-3 right-3 h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>

            <div className="p-5 space-y-4">
                {/* Title */}
                <div className="space-y-2">
                    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12" />
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                </div>

                {/* Button */}
                <div className="h-10 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded animate-shimmer bg-[length:200%_100%]" />
            </div>
        </Card>
    );
};

// Transaction Row Skeleton
export const TransactionRowSkeleton = () => {
    return (
        <div className="flex items-center justify-between p-4 border-b border-border animate-pulse">
            <div className="flex items-center gap-4 flex-1">
                {/* Icon */}
                <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600" />

                <div className="flex-1 space-y-2">
                    {/* Course Name */}
                    <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/3" />
                    {/* Date */}
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                </div>
            </div>

            {/* Amount */}
            <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-20" />
        </div>
    );
};

// Complete Admin Dashboard Skeleton
export const AdminDashboardSkeleton = () => {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="space-y-2 animate-pulse">
                <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-64" />
                <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-96" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <StatsCardSkeleton key={i} />
                ))}
            </div>

            {/* Content Area */}
            <Card className="p-4">
                {/* Search Bar Skeleton */}
                <div className="flex items-center gap-2 mb-4 animate-pulse">
                    <div className="w-4 h-4 bg-gray-300 dark:bg-gray-600 rounded" />
                    <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded flex-1 max-w-sm" />
                </div>

                {/* Table Rows */}
                <div className="space-y-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <TableRowSkeleton key={i} />
                    ))}
                </div>
            </Card>
        </div>
    );
};

// Grid of Dashboard Course Cards
export const DashboardCourseGridSkeleton = ({ count = 3 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <DashboardCourseCardSkeleton key={index} />
            ))}
        </div>
    );
};
