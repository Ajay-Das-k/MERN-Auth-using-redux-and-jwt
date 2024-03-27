import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminPrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  // Check if userInfo is defined and userInfo.isAdmin is true
  const isAdmin = userInfo && userInfo.isAdmin;

  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminPrivateRoute;
