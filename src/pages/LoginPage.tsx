
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, School, User, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"student" | "teacher">("student");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Mock login process
    setTimeout(() => {
      const success = login(email, role);
      if (success) {
        navigate(role === "student" ? "/student/courses" : "/teacher/courses");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-main">
      <div className="w-full max-w-md animate-fade-in">
        <div className="flex items-center justify-center mb-8">
          <GraduationCap size={40} className="text-college-blue" />
          <h1 className="text-3xl font-bold text-college-blue ml-3">Campus Hub</h1>
        </div>
        
        <Card className="border-0 card-shadow">
          <CardHeader>
            <CardTitle className="text-center text-college-blue text-2xl">Login</CardTitle>
            <CardDescription className="text-center">
              Sign in to access your college account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="focus:border-picton-blue"
                />
              </div>
              
              <div className="space-y-2">
                <Label>I am a:</Label>
                <RadioGroup 
                  value={role} 
                  onValueChange={(value) => setRole(value as "student" | "teacher")} 
                  className="flex space-x-2"
                >
                  <div className="flex-1">
                    <RadioGroupItem
                      value="student"
                      id="student"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="student"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-persian-blue [&:has([data-state=checked])]:border-persian-blue"
                    >
                      <School size={24} />
                      <span className="mt-2">Student</span>
                    </Label>
                  </div>
                  <div className="flex-1">
                    <RadioGroupItem
                      value="teacher"
                      id="teacher"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="teacher"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-transparent p-4 hover:bg-muted hover:text-accent-foreground peer-data-[state=checked]:border-persian-blue [&:has([data-state=checked])]:border-persian-blue"
                    >
                      <User size={24} />
                      <span className="mt-2">Teacher</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* <div className="text-xs text-muted-foreground">
                <p>Demo Student: ewilson@college.edu</p>
                <p>Demo Teacher: sjohnson@college.edu</p>
              </div> */}
              
              <Button 
                type="submit" 
                className="w-full primary-btn" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : (
                  <div className="flex items-center">
                    <LogIn className="mr-2 h-4 w-4" />
                    <span>Sign In</span>
                  </div>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-muted-foreground">
              <p>© 2023 Campus Hub. All rights reserved.</p>
              {/* <p className="mt-1 text-xs">This is a demo application.</p> */}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
