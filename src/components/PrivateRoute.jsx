import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "../redux/auth/selectors";
import { SyncLoader } from "react-spinners";

const PrivateRoute = ({ component }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) return <SyncLoader color="#646cff" />;

  return isLoggedIn ? component : <Navigate to="/login" />;
};

export default PrivateRoute;
