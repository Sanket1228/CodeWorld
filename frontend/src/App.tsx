import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/Navbar";
import type { RootState } from "./redux/store";
import { AppRoutes } from "./routes/AppRoutes";

function App() {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Navbar />
      <div className="w-full max-w-screen-lg mx-auto px-4 py-6">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
