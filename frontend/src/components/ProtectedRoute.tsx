import { Navigate } from "react-router-dom";
import { useAuthToken } from "../hooks";
import type { ReactNode } from "react";

type Props = { children: ReactNode };

export default function ProtectedRoute({ children }: Props) {
  const token = useAuthToken();
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
