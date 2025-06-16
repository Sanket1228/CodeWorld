import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../redux/reducers/authReducer";
import type { AppDispatch, RootState } from "../redux/store";
import { DisplayBox } from "./DisplayBox";

export const Navbar = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const dispatch = useDispatch<AppDispatch>();

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-white w-full shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600 mx-4">CodeWorld</div>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Dashboard
        </Link>
        <DisplayBox display={!!user}>
          <Link
            to="/create-snippet"
            className="text-gray-700 hover:text-blue-600"
          >
            Create Snippet
          </Link>
        </DisplayBox>
        <DisplayBox display={!user}>
          <Link to="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
        </DisplayBox>
        <DisplayBox display={!user}>
          <Link to="/register" className="text-gray-700 hover:text-blue-600">
            Register
          </Link>
        </DisplayBox>
        <DisplayBox display={!!user}>
          <button onClick={handleLogoutClick}>Logout</button>
        </DisplayBox>
      </div>
    </nav>
  );
};
