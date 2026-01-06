import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";

const AdminRoute = ({ children }) => {
  const { loginUser } = useAuth();

  if (!loginUser || loginUser.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
