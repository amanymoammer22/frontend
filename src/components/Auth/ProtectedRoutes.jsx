import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ isLoggedIn, redirectTo, children }) {
    if (!isLoggedIn)
        return <Navigate to={redirectTo} />;
    return children;
}