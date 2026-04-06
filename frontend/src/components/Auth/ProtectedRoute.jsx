// components/auth/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userInfo, isLoading } = useSelector((store) => store.user);
  if (isLoading) return <span className="flex justify-center loading loading-ring loading-xl"></span>
  if (!userInfo) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
