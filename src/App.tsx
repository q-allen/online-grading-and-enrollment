
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFoundPage from "./pages/NotFoundPage";
import MainLayout from "./components/layout/MainLayout";

// Student Pages
import StudentCoursesPage from "./pages/student/StudentCoursesPage";
import StudentEnrolledPage from "./pages/student/StudentEnrolledPage";
import StudentGradesPage from "./pages/student/StudentGradesPage";
import StudentRecordPage from "./pages/student/StudentRecordPage";

// Teacher Pages
import TeacherCoursesPage from "./pages/teacher/TeacherCoursesPage";
import TeacherSchedulesPage from "./pages/teacher/TeacherSchedulesPage";
import TeacherGradesPage from "./pages/teacher/TeacherGradesPage";

// Protected Route component to check authentication and role
const ProtectedRoute = ({ children, requiredRole }: { children: JSX.Element, requiredRole?: string }) => {
  const storedUser = localStorage.getItem("currentUser");
  const isAuthenticated = !!storedUser;
  const userRole = storedUser ? JSON.parse(storedUser).role : null;
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Student Routes */}
            <Route 
              path="/student/courses" 
              element={
                <MainLayout>
                  <StudentCoursesPage />
                </MainLayout>
              } 
            />
            <Route 
              path="/student/enrolled" 
              element={
                <MainLayout>
                  <StudentEnrolledPage />
                </MainLayout>
              } 
            />
            <Route 
              path="/student/grades" 
              element={
                <MainLayout>
                  <StudentGradesPage />
                </MainLayout>
              } 
            />
            <Route 
              path="/student/record" 
              element={
                <MainLayout>
                  <StudentRecordPage />
                </MainLayout>
              } 
            />
            
            {/* Teacher Routes */}
            <Route 
              path="/teacher/courses" 
              element={
                <MainLayout>
                  <TeacherCoursesPage />
                </MainLayout>
              } 
            />
            <Route 
              path="/teacher/schedules" 
              element={
                <MainLayout>
                  <TeacherSchedulesPage />
                </MainLayout>
              } 
            />
            <Route 
              path="/teacher/students" 
              element={
                <MainLayout>
                  <TeacherGradesPage />
                </MainLayout>
              } 
            />
            
            {/* Catch-all for 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
