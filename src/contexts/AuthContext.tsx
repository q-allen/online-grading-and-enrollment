
import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, UserRole } from "../types";
import { users } from "../data/mockData";
import { useToast } from "../hooks/use-toast";

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const { toast } = useToast();

  const login = (email: string, role: UserRole): boolean => {
    const user = users.find(u => u.email === email && u.role === role);
    
    if (user) {
      setCurrentUser(user);
      toast({
        title: "Login successful",
        description: `Welcome back, ${user.name}!`,
        duration: 3000,
      });
      return true;
    }
    
    toast({
      title: "Login failed",
      description: "Invalid email or user role",
      variant: "destructive",
      duration: 3000,
    });
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
      duration: 3000,
    });
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, isAuthenticated: !!currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
