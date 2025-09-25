import { Navigate } from "react-router-dom";
import { authStore } from "../../store/authStore";
export default function ProtectedUserRoute({ children }) {
    const { user } = authStore();
    const role = user?.role?.toLowerCase();

    // if (!isLoggedIn) return <Navigate to="/login" replace />;
    if (role === "admin") return <Navigate to="/admin" replace />;

    return children;
}

