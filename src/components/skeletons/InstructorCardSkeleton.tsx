import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const InstructorCardSkeleton = () => {
    return (
        <Card className="p-4 animate-pulse">
            <div className="flex gap-4">
                {/* Avatar Skeleton */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 animate-shimmer bg-[length:200%_100%]" />

                {/* Content Skeleton */}
                <div className="flex-1 space-y-3">
                    {/* Name Skeleton */}
                    <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-2/3" />

                    {/* Title Skeleton */}
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />

                    {/* Badges Skeleton */}
                    <div className="flex gap-2">
                        <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>

                    {/* Students Count Skeleton */}
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />

                    {/* Expertise Tags Skeleton */}
                    <div className="flex flex-wrap gap-1">
                        <div className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-5 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-5 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>

                    {/* Action Buttons Skeleton */}
                    <div className="flex gap-2 pt-2">
                        <div className="h-8 w-16 bg-gray-300 dark:bg-gray-600 rounded" />
                        <div className="h-8 w-20 bg-gray-300 dark:bg-gray-600 rounded" />
                    </div>
                </div>
            </div>
        </Card>
    );
};

// Grid of instructor skeleton cards
export const InstructorGridSkeleton = ({ count = 6 }: { count?: number }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: count }).map((_, index) => (
                <InstructorCardSkeleton key={index} />
            ))}
        </div>
    );
};

// Large instructor profile skeleton (for detail pages)
export const InstructorProfileSkeleton = () => {
    return (
        <Card className="p-6 animate-pulse">
            <div className="flex items-start gap-4 mb-4">
                {/* Large Avatar Skeleton */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 animate-shimmer bg-[length:200%_100%]" />

                <div className="flex-1 space-y-3">
                    {/* Name Skeleton */}
                    <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />

                    {/* Title Skeleton */}
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />

                    {/* Stats Skeleton */}
                    <div className="flex flex-wrap gap-4">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-28" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                    </div>
                </div>
            </div>

            {/* Bio Skeleton */}
            <div className="space-y-2 mb-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            </div>

            {/* Expertise Section Skeleton */}
            <div className="space-y-2">
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-32" />
                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
                    ))}
                </div>
            </div>
        </Card>
    );
};
