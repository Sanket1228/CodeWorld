import type { JSX } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../redux/store";

export type ProtectedRouteProps = {
  children: JSX.Element;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.auth.user);

  return user ? children : <Navigate to="/login" />;
};
