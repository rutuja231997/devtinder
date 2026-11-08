import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { data: user, authChecked } = useSelector((store) => store.user);

  if (!authChecked) return null;

  return user ? <Navigate to="/feed" replace /> : <Outlet />;
};

export default PublicRoute;
