import { Navigate, Outlet } from "react-router-dom";
import { authStore } from "../../store/authStore";

export default function AdminRoute() {

  const user = authStore((s) => s.user);
  const role = (user?.role || "").toLowerCase();
  const token = authStore((s) => s.token);
  if (!token) return <Navigate to="/login" replace />;
  if (role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}

