import { Card } from "@/components/ui/card";

export const CourseCardSkeleton = () => {
    return (
        <Card className="overflow-hidden border-2 border-border h-full flex flex-col animate-pulse">
            {/* Image Skeleton */}
            <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-shimmer bg-[length:200%_100%]" />
                {/* Badge Skeletons */}
                <div className="absolute top-4 left-4 h-6 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
                <div className="absolute top-4 right-4 h-6 w-24 bg-gray-300 dark:bg-gray-600 rounded" />
            </div>

            {/* Content Skeleton */}
            <div className="p-6 flex-1 flex flex-col space-y-4">
                {/* Title Skeleton */}
                <div className="space-y-2">
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                </div>

                {/* Description Skeleton */}
                <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                </div>

                {/* Stats Skeleton */}
                <div className="space-y-3">
                    <div className="flex items-center gap-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28" />
                    </div>
                </div>

                {/* Price Skeleton */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="space-y-1">
                        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-24" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                    </div>
                    <div className="h-5 w-5 bg-gray-300 dark:bg-gray-600 rounded-full" />
                </div>
            </div>
        </Card>
    );
};

// Grid of skeleton cards
export const CourseGridSkeleton = ({ count = 6 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: count }).map((_, index) => (
                <CourseCardSkeleton key={index} />
            ))}
        </div>
    );
};
