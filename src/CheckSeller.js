import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ checkUser }) => {
  const user = useSelector((state) => state.user);
  const location = useLocation();

  if (!user || (checkUser && user.seller !== checkUser)) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
