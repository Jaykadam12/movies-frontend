import { Navigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext";


const PrivateRoute = ({ children }) => {
  const { loginUser, loading } = useAuth();

  if (loading) return null;

  if (!loginUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
