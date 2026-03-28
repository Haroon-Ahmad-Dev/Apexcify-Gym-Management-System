import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const ProtectedRoute = ({ children, role }) => {
  const { token, user } = useAuthStore();

  if (!token) return <Navigate to="/login" />;

  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};
