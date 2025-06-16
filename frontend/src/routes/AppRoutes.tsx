import { Route, Routes } from "react-router-dom";
import { CreateSnippetPage } from "../pages/CreateSnippetPage";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { ProtectedRoute } from "./ProtectedRoute";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route
        path="/create-snippet"
        element={
          <ProtectedRoute>
            <CreateSnippetPage />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
