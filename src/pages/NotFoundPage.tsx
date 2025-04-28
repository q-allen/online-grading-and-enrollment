
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFoundPage: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-main p-4">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-center mb-4">
          <AlertTriangle size={48} className="text-persian-blue" />
        </div>
        <h1 className="text-4xl font-bold text-college-blue mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Page not found</p>
        <p className="mb-6 text-muted-foreground">
          The page <code className="bg-muted px-1 py-0.5 rounded">{location.pathname}</code> could not be found.
        </p>
        <Button asChild className="primary-btn">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
