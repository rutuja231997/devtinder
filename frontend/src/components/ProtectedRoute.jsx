import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { data: user, authChecked } = useSelector((store) => store.user);

  if (!authChecked) return null;

  return user ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
