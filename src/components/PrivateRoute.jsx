import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectCurrentToken } from "../redux/user/userSlice";
import { addToast } from "../redux/toast/toastSlice";

const PrivateRoute = ({ component }) => {
  const token = useSelector(selectCurrentToken);
  const dispatch = useDispatch();
  if (token) {
    return component;
  }
  dispatch(
    addToast({
      message: "You need to be logged in to access this page",
      messageType: "error",
    })
  );

  return <Navigate to="/login" />;
};

export default PrivateRoute;
