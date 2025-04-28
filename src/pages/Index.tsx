
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import LoginPage from "./LoginPage";

const Index: React.FC = () => {
  const { currentUser } = useAuth();

  if (currentUser) {
    if (currentUser.role === "student") {
      return <Navigate to="/student/courses" replace />;
    } else if (currentUser.role === "teacher") {
      return <Navigate to="/teacher/courses" replace />;
    }
  }

  return <LoginPage />;
};

export default Index;
