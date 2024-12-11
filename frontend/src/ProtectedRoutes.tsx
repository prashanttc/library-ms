import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Loader from "./components/ui/Loader";

const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="w-full h-screen flex items-center justify-center">
      <Loader />
      </div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
