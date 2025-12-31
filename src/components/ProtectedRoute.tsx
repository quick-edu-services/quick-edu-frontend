import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "@/context/AuthProvider";

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRole?: string;
}

export const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
    const { userData, loading } = useAuthContext();
    const location = useLocation();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    // If no user is logged in
    if (!userData) {
        // If trying to access admin dashboard, redirect to admin login
        if (location.pathname.startsWith('/admin')) {
            return <Navigate to="/admin/login" state={{ from: location }} replace />;
        }
        // Otherwise redirect to general login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If role-based access is required
    if (allowedRole && userData.role !== allowedRole) {
        // If user is not admin and tries to access admin dashboard
        if (allowedRole === 'admin') {
            return <Navigate to="/admin/login" replace />;
        }
        // General fallback
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
